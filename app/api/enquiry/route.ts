import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {
  createConfirmationMail,
  createNewLeadMail,
  createOtpMail,
} from "@/lib/mailTemplates";

// ─── TYPES ───────────────────────────────────────────────────────────────────

export interface FormPayload {
  name: string;
  email: string;
  phone: string;
  childName?: string;
  childAge?: string;
  program: string;
  address?: string;
  message?: string;
  submittedAt: string;
  browserName: string;
  deviceType: string;
  referrer: string;
  pageUrl: string;
}

interface OTPRecord {
  hash: string;       // sha256 of otp
  expiresAt: number;  // unix ms
  attempts: number;   // brute-force check
}

// ─── IN-MEMORY OTP STORE ──────────────────────────────────────────────────────

const otpStore = new Map<string, OTPRecord>();

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

function generateOTP(): string {
  // Cryptographically random 6-digit number
  return String(crypto.randomInt(100_000, 999_999));
}

function hashOTP(otp: string): string {
  return crypto.createHash("sha256").update(otp).digest("hex");
}

function cleanupExpired() {
  const now = Date.now();
  for (const [key, rec] of otpStore.entries()) {
    if (rec.expiresAt < now) {
      otpStore.delete(key);
    }
  }
}

// ─── NODEMAILER TRANSPORTER ───────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 465),
  secure: process.env.SMTP_SECURE === "true" || process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ─── EMAIL BUILDERS ───────────────────────────────────────────────────────────

function buildOTPEmail(email: string, name: string, otp: string): nodemailer.SendMailOptions {
  const firstName = name.split(" ")[0];
  return {
    from: `"Kingdom Kindergarten" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `🔑 ${otp} is your Kingdom Kindergarten verification code`,
    html: createOtpMail(firstName, otp),
  };
}

function buildInternalEmail(data: FormPayload): nodemailer.SendMailOptions {
  const programLabel: Record<string, string> = {
    nursery: "Nursery (Ages 2-3)",
    kindergarten: "Kindergarten (Ages 3-5)",
    playschool: "Play School (Ages 1.5-2)",
    unsure: "Not sure — wants to discuss",
  };

  return {
    from: `"Kingdom Kindergarten Leads" <${process.env.SMTP_USER}>`,
    to: process.env.NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `🔔 New Admission Inquiry: ${data.name} — ${programLabel[data.program] ?? data.program}`,
    html: createNewLeadMail(data, programLabel),
  };
}

function buildConfirmationEmail(data: FormPayload): nodemailer.SendMailOptions {
  const firstName = data.name.split(" ")[0];
  return {
    from: `"Kingdom Kindergarten" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `We received your inquiry, ${firstName}! 🎉`,
    html: createConfirmationMail(firstName),
  };
}

// ─── ACTION HANDLERS ──────────────────────────────────────────────────────────

async function handleSendOTP(body: { email: string; name: string }) {
  const { email, name } = body;

  if (!email || !name) {
    return NextResponse.json(
      { error: "email and name are required" },
      { status: 422 },
    );
  }

  cleanupExpired();

  // Rate-limiting: prevent sending new OTP if one is still active
  const existing = otpStore.get(email);
  if (existing && existing.expiresAt > Date.now()) {
    const remainingSec = Math.ceil((existing.expiresAt - Date.now()) / 1000);
    return NextResponse.json(
      { error: `Verification code already sent. Please wait ${remainingSec}s.` },
      { status: 429 },
    );
  }

  const otp = generateOTP();
  otpStore.set(email, {
    hash: hashOTP(otp),
    expiresAt: Date.now() + OTP_TTL_MS,
    attempts: 0,
  });

  try {
    await transporter.sendMail(buildOTPEmail(email, name, otp));
  } catch (err) {
    console.error("[SMTP] Failed to send OTP:", err);
    otpStore.delete(email); // Clean up so user can retry immediately
    return NextResponse.json(
      { error: "Failed to send verification email" },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true });
}

async function handleVerifyAndSubmit(body: {
  otp: string;
  payload: FormPayload;
}) {
  const { otp, payload } = body;

  if (!otp || !payload?.email) {
    return NextResponse.json(
      { error: "otp and payload.email are required" },
      { status: 422 },
    );
  }

  const record = otpStore.get(payload.email);

  if (!record) {
    return NextResponse.json(
      { error: "Verification session not found. Request a new code." },
      { status: 400 },
    );
  }

  if (record.expiresAt < Date.now()) {
    otpStore.delete(payload.email);
    return NextResponse.json(
      { error: "Verification code expired. Request a new code." },
      { status: 400 },
    );
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    otpStore.delete(payload.email);
    return NextResponse.json(
      { error: "Too many incorrect attempts. Request a new verification code." },
      { status: 429 },
    );
  }

  if (hashOTP(otp) !== record.hash) {
    record.attempts += 1;
    return NextResponse.json(
      {
        error: "Incorrect verification code.",
        attemptsLeft: MAX_ATTEMRAPT(record.attempts),
      },
      { status: 400 },
    );
  }

  // OTP validated successfully -> Purge from store and send emails
  otpStore.delete(payload.email);

  // Validate payload
  if (!payload.name || !payload.phone || !payload.program) {
    return NextResponse.json(
      { error: "Missing required form fields" },
      { status: 422 },
    );
  }

  try {
    // Send both emails in parallel
    await Promise.all([
      transporter.sendMail(buildInternalEmail(payload)),
      transporter.sendMail(buildConfirmationEmail(payload)),
    ]);
  } catch (err) {
    console.error("[SMTP] Lead submission emails failed:", err);
    return NextResponse.json(
      { error: "Failed to send confirmation emails" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

function MAX_ATTEMRAPT(attempts: number) {
  const left = MAX_ATTEMPTS - attempts;
  return left > 0 ? `${left} attempts left.` : "No attempts left.";
}

// ─── ROUTE ENTRY ──────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  const action = body.action as string;

  switch (action) {
    case "send-otp":
      return handleSendOTP(body as { email: string; name: string });

    case "verify-submit":
      return handleVerifyAndSubmit(
        body as { otp: string; payload: FormPayload },
      );

    default:
      return NextResponse.json(
        { error: `Unsupported action: ${action}` },
        { status: 400 },
      );
  }
}
