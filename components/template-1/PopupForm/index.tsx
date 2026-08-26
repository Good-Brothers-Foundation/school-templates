"use client";

import React, { useState, useEffect, useRef } from "react";
import { Loader2, Lock, Mail, ArrowLeft, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useFormContext } from "../context/FormContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── TYPES & CONSTANTS ────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  phone: string;
  childName: string;
  childAge: string;
  program: string;
  address: string;
  message: string;
}

type Step = "form" | "otp" | "success";

const EMPTY_FORM: FormData = {
  name: "",
  email: "",
  phone: "",
  childName: "",
  childAge: "",
  program: "",
  address: "",
  message: "",
};

const PROGRAM_OPTIONS = [
  { value: "playschool", label: "Play School (Ages 1.5 - 2)" },
  { value: "nursery", label: "Nursery (Ages 2 - 3)" },
  { value: "kindergarten", label: "Kindergarten (Ages 3 - 5)" },
  { value: "unsure", label: "Not sure — I want to discuss" },
];

const OTP_RESEND_COOLDOWN = 60; // seconds

// ─── HELPERS ──────────────────────────────────────────────────────────────────

const getBrowserName = (ua: string) => {
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Edge")) return "Edge";
  return "Unknown";
};

const getDeviceType = (ua: string) => {
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

const validateForm = (f: FormData): Partial<FormData> => {
  const e: Partial<FormData> = {};
  if (!f.name || f.name.trim().length < 2) {
    e.name = "Parent's name is required";
  }
  const emailRe = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!f.email || !emailRe.test(f.email.trim())) {
    e.email = "Enter a valid email address";
  }
  const phoneRe = /^[\+]?[0-9]{7,15}$/;
  if (!f.phone || !phoneRe.test(f.phone.replace(/\s/g, ""))) {
    e.phone = "Enter a valid phone number";
  }
  if (!f.program) {
    e.program = "Please select a program of interest";
  }
  return e;
};

// ─── FIELD LAYOUT ─────────────────────────────────────────────────────────────

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
        {label}
        {required && <span className="text-[#f39f5f] ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs font-semibold" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ─── STEP 1 — FORM BODY ────────────────────────────────────────────────────────

function FormBody({
  formData,
  errors,
  submitError,
  isSending,
  onChange,
  onProgramChange,
  onSubmit,
  onCancel,
}: {
  formData: FormData;
  errors: Partial<FormData>;
  submitError: string;
  isSending: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onProgramChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}) {
  const inputClass = (err?: string) =>
    `w-full rounded-2xl border-2 bg-slate-50 px-4 py-3 text-slate-800 text-sm placeholder-slate-400 outline-none transition-all ` +
    `${err ? "border-red-400 focus:border-red-400 focus:bg-white" : "border-slate-100 focus:border-[#f39f5f] focus:bg-white"}`;

  return (
    <>
      <div className="text-center pb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-[10px] font-extrabold uppercase tracking-wider mb-2">
          <Sparkles size={10} /> Admission Open 2026-27
        </span>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Request School Tour & Inquiry
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Provide your details below to receive a verification code on your email.
        </p>
      </div>

      <div className="border-t border-slate-100 my-2" />

      <form onSubmit={onSubmit} className="space-y-4 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
        <Field id="name" label="Parent's Full name" required error={errors.name}>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={onChange}
            placeholder="e.g. John Doe"
            className={inputClass(errors.name)}
            aria-required="true"
            aria-invalid={!!errors.name}
          />
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field id="email" label="Parent's Email" required error={errors.email}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="name@email.com"
              className={inputClass(errors.email)}
              aria-required="true"
              aria-invalid={!!errors.email}
            />
          </Field>

          <Field id="phone" label="Phone number" required error={errors.phone}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onChange}
              placeholder="+1 (555) 000-0000"
              className={inputClass(errors.phone)}
              aria-required="true"
              aria-invalid={!!errors.phone}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field id="childName" label="Child's Name">
            <input
              type="text"
              id="childName"
              name="childName"
              value={formData.childName}
              onChange={onChange}
              placeholder="Optional"
              className={inputClass()}
            />
          </Field>

          <Field id="childAge" label="Child's Age">
            <input
              type="text"
              id="childAge"
              name="childAge"
              value={formData.childAge}
              onChange={onChange}
              placeholder="Optional"
              className={inputClass()}
            />
          </Field>
        </div>

        <Field id="address" label="Home Address">
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={onChange}
            placeholder="Your home address"
            className={inputClass()}
          />
        </Field>

        <Field id="program" label="Program of Interest" required error={errors.program}>
          <Select value={formData.program} onValueChange={onProgramChange}>
            <SelectTrigger
              id="program"
              className={`w-full h-11 border-2 border-slate-100 bg-slate-50 text-slate-800 text-sm rounded-2xl focus-visible:border-[#f39f5f] focus-visible:ring-0 focus-visible:ring-offset-0 transition-all [&_svg]:ml-auto font-medium ${errors.program ? "border-red-400" : ""}`}
            >
              <SelectValue placeholder="Select a program" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-slate-100 shadow-xl rounded-2xl p-1 z-[200]">
              {PROGRAM_OPTIONS.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  className="cursor-pointer focus:bg-orange-50/70 focus:text-[#f39f5f] rounded-xl py-2 px-3 text-sm font-semibold transition-colors duration-150"
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>

        <Field id="message" label="Additional message or questions">
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={onChange}
            placeholder="Any specific questions for our administration..."
            rows={2}
            className={`${inputClass()} resize-none`}
          />
        </Field>

        {submitError && (
          <div className="p-3.5 bg-red-50 border-2 border-red-100 rounded-2xl">
            <p className="text-red-600 text-xs font-semibold">{submitError}</p>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-2">
          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-[#f39f5f] hover:bg-[#ee8f48] text-white font-extrabold py-3.5 rounded-full shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSending ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Sending verification code...
              </>
            ) : (
              "Verify Email & Submit →"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="w-full text-slate-400 hover:text-slate-600 py-2 font-bold rounded-full transition-colors cursor-pointer text-sm"
          >
            Cancel
          </button>
          <div className="flex items-center justify-center gap-1.5 text-slate-300 text-[11px] pt-1">
            <Lock size={11} />
            <span>Secure connection • We respond within 24 hours</span>
          </div>
        </div>
      </form>
    </>
  );
}

// ─── STEP 2 — OTP BODY ─────────────────────────────────────────────────────────

function OTPBody({
  email,
  onVerify,
  onBack,
  isVerifying,
  otpError,
  onResend,
  resendCooldown,
}: {
  email: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
  isVerifying: boolean;
  otpError: string;
  onResend: () => void;
  resendCooldown: number;
}) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);

  const focusNext = (i: number) => inputs.current[i + 1]?.focus();
  const focusPrev = (i: number) => inputs.current[i - 1]?.focus();

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[i]) focusPrev(i);
  };

  const handleInput = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val) focusNext(i);

    // Auto-submit when all digits filled
    if (next.every((d) => d) && next.join("").length === 6) {
      onVerify(next.join(""));
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const next = pasted.split("");
      setDigits(next);
      inputs.current[5]?.focus();
      onVerify(pasted);
    }
    e.preventDefault();
  };

  const otp = digits.join("");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          Verify your email
        </h2>
      </div>

      <p className="text-slate-500 text-sm leading-relaxed">
        We sent a 6-digit code to <span className="font-bold text-slate-700">{email}</span>.<br />
        Enter it below to complete your admission request. Code expires in 5 minutes.
      </p>

      <div className="border-t border-slate-100 my-1" />

      {/* Mail icon */}
      <div className="flex justify-center py-2">
        <div className="w-16 h-16 rounded-[1.5rem] bg-orange-50 border-2 border-orange-100 flex items-center justify-center">
          <Mail size={28} className="text-[#f39f5f]" />
        </div>
      </div>

      {/* 6-digit input */}
      <div className="flex justify-center gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleInput(i, e)}
            onKeyDown={(e) => handleKey(i, e)}
            className={`w-11 h-14 text-center text-2xl font-black rounded-2xl border-2 bg-slate-50 text-slate-850 outline-none transition-all ` +
              `${otpError ? "border-red-400 bg-red-50 focus:border-red-400" : d ? "border-[#f39f5f] bg-orange-50/30" : "border-slate-100 focus:border-[#f39f5f] focus:bg-white"}`}
            aria-label={`Digit ${i + 1}`}
          />
        ))}
      </div>

      {otpError && (
        <p className="text-red-500 text-sm font-semibold text-center" role="alert">
          {otpError}
        </p>
      )}

      {/* Manual submit */}
      <button
        onClick={() => onVerify(otp)}
        disabled={otp.length < 6 || isVerifying}
        className="w-full bg-[#f39f5f] hover:bg-[#ee8f48] text-white font-extrabold py-3.5 rounded-full shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isVerifying ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Verifying...
          </>
        ) : (
          "Verify & Submit →"
        )}
      </button>

      {/* Resend */}
      <div className="text-center text-xs">
        {resendCooldown > 0 ? (
          <p className="text-slate-400">
            Resend code in <span className="font-bold text-[#f39f5f]">{resendCooldown}s</span>
          </p>
        ) : (
          <button
            onClick={onResend}
            className="text-[#f39f5f] hover:text-[#d38343] font-bold underline cursor-pointer"
          >
            Resend verification code
          </button>
        )}
      </div>
    </div>
  );
}

// ─── STEP 3 — SUCCESS BODY ─────────────────────────────────────────────────────

function SuccessBody({
  firstName,
  onClose,
}: {
  firstName: string;
  onClose: () => void;
}) {
  return (
    <div className="py-6 flex flex-col items-center text-center">
      <div className="w-24 h-24 bg-gradient-warm rounded-[2rem] flex items-center justify-center mb-6 shadow-lg rotate-3 animate-bounce">
        <span className="text-5xl">🎉</span>
      </div>
      <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
        Thank you, {firstName}!
      </h2>
      <p className="text-slate-500 text-sm leading-relaxed mb-6 max-w-xs mx-auto">
        Your email has been verified, and we have received your inquiry. We&apos;ll contact you within 24 hours to schedule a campus tour!
      </p>
      <div className="p-3 bg-orange-50 border-2 border-orange-100 rounded-2xl text-[11px] text-[#f39f5f] font-bold mb-8">
        Check your email inbox for a confirmation message.
      </div>
      <button
        onClick={onClose}
        className="w-full bg-[#385469] hover:bg-[#203342] text-white font-extrabold py-3.5 rounded-full shadow-md active:scale-[0.98] transition-all cursor-pointer text-sm"
      >
        Done
      </button>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────────────

export default function PopupForm() {
  const { isOpen, closeForm } = useFormContext();

  const [step, setStep] = useState<Step>("form");
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitError, setSubmitError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Reset states when closed
  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setStep("form");
        setFormData(EMPTY_FORM);
        setErrors({});
        setSubmitError("");
        setOtpError("");
        setResendCooldown(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Resend countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setTimeout(() => setResendCooldown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [resendCooldown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((p) => ({ ...p, [name]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          email: formData.email,
          name: formData.name,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to send verification code");

      setStep("otp");
      setResendCooldown(OTP_RESEND_COOLDOWN);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Could not send verification code. Try again."
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyOTP = async (otp: string) => {
    setIsVerifying(true);
    setOtpError("");

    try {
      const payload = {
        ...formData,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer || "direct",
        pageUrl: window.location.href,
        browserName: getBrowserName(navigator.userAgent),
        deviceType: getDeviceType(navigator.userAgent),
      };

      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify-submit", otp, payload }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "OTP verification failed");

      setStep("success");
    } catch (err) {
      setOtpError(
        err instanceof Error ? err.message : "Verification code incorrect. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    setOtpError("");
    setResendCooldown(OTP_RESEND_COOLDOWN);

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "send-otp",
          email: formData.email,
          name: formData.name,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to resend");
    } catch (err) {
      setOtpError(err instanceof Error ? err.message : "Could not resend code.");
      setResendCooldown(0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeForm}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 flex flex-col gap-4 focus:outline-none border-4 border-orange-100 overflow-hidden font-quicksand"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-warm" />

            {/* Close Button */}
            <button
              onClick={closeForm}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-full hover:bg-slate-50 cursor-pointer"
              aria-label="Close dialog"
            >
              <X size={20} />
            </button>

            {/* Screen selection */}
            {step === "form" && (
              <FormBody
                formData={formData}
                errors={errors}
                submitError={submitError}
                isSending={isSending}
                onChange={handleChange}
                onProgramChange={(val) => {
                  setFormData((p) => ({ ...p, program: val }));
                  if (errors.program) {
                    setErrors((p) => ({ ...p, program: undefined }));
                  }
                }}
                onSubmit={handleFormSubmit}
                onCancel={closeForm}
              />
            )}

            {step === "otp" && (
              <OTPBody
                email={formData.email}
                onVerify={handleVerifyOTP}
                onBack={() => {
                  setStep("form");
                  setOtpError("");
                }}
                isVerifying={isVerifying}
                otpError={otpError}
                onResend={handleResend}
                resendCooldown={resendCooldown}
              />
            )}

            {step === "success" && (
              <SuccessBody
                firstName={formData.name.split(" ")[0]}
                onClose={closeForm}
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
