import { FormPayload } from "@/app/api/enquiry/route";

export function createOtpMail(firstName: string, otp: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verify your email</title>
    </head>
    <body style="font-family: 'Quicksand', 'Arial', sans-serif; background-color: #FFF9EA; padding: 24px; margin: 0;">
      <div style="max-width: 480px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 3px solid #f39f5f; shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #f39f5f 0%, #ee6b7b 100%); padding: 24px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.5px;">Kingdom Kindergarten Verification</h1>
        </div>
        <div style="padding: 28px 24px; color: #385469; font-size: 16px; line-height: 1.6;">
          <p style="margin: 0 0 16px; font-weight: bold;">Hi ${firstName},</p>
          <p style="margin: 0 0 20px;">Use this 6-digit code to verify your school inquiry and start your child's application:</p>

          <div style="text-align: center; margin: 28px 0;">
            <div style="display: inline-block; background-color: #FFF9EA; border: 2px dashed #f39f5f; border-radius: 16px; padding: 16px 32px;">
              <span style="font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #f39f5f;">${otp}</span>
            </div>
          </div>

          <p style="font-size: 13px; color: #8899a6; text-align: center; margin-bottom: 24px;">
            Valid for <strong>5 minutes</strong>. Please do not share this code.
          </p>
          
          <hr style="border: 0; border-top: 1px solid #eef2f5; margin-bottom: 20px;" />
          
          <p style="margin: 0; font-size: 12px; color: #8899a6; text-align: center; line-height: 1.4;">
            If you didn't make this request, you can safely ignore this email.<br/>
            <strong>— Kingdom Kindergarten Team</strong>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createNewLeadMail(
  {
    submittedAt,
    name,
    email,
    phone,
    childName,
    childAge,
    program,
    address,
    message,
    deviceType,
    browserName,
    referrer,
    pageUrl,
  }: FormPayload,
  programLabel: Record<string, string>,
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Admission Inquiry</title>
    </head>
    <body style="font-family: 'Arial', sans-serif; background-color: #f7fafc; padding: 24px; margin: 0;">
      <div style="max-width: 560px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <div style="background: linear-gradient(135deg, #385469 0%, #203342 100%); padding: 24px; color: #ffffff;">
          <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #ffffff;">New Admission Inquiry 🌟</h1>
          <p style="color: #cbd5e0; margin: 6px 0 0; font-size: 13px;">
            Kingdom Kindergarten • Received on ${new Date(submittedAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
          </p>
        </div>
        <div style="padding: 24px;">
          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #718096; width: 150px; font-weight: 500;">Parent Name</td>
              <td style="padding: 10px 0; color: #1a202c; font-weight: bold;">${name}</td>
            </tr>
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; font-weight: 500;">Parent Email</td>
              <td style="padding: 10px 0; color: #1a202c;"><a href="mailto:${email}" style="color: #f39f5f; text-decoration: none;">${email}</a></td>
            </tr>
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; font-weight: 500;">Phone Number</td>
              <td style="padding: 10px 0; color: #1a202c;"><a href="tel:${phone}" style="color: #f39f5f; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; font-weight: 500;">Child Name</td>
              <td style="padding: 10px 0; color: #1a202c;">${childName || "Not provided"}</td>
            </tr>
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; font-weight: 500;">Child Age</td>
              <td style="padding: 10px 0; color: #1a202c;">${childAge || "Not provided"}</td>
            </tr>
            ${address ? `
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; font-weight: 500;">Home Address</td>
              <td style="padding: 10px 0; color: #1a202c;">${address}</td>
            </tr>` : ""}
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; font-weight: 500;">Program of Interest</td>
              <td style="padding: 10px 0;">
                <span style="background-color: #fffaf0; color: #dd6b20; border: 1px solid #fbd38d; padding: 3px 12px; border-radius: 12px; font-size: 12px; font-weight: bold;">
                  ${programLabel[program] || program}
                </span>
              </td>
            </tr>
            ${message ? `
            <tr style="border-top: 1px solid #edf2f7;">
              <td style="padding: 10px 0; color: #718096; vertical-align: top; font-weight: 500;">Parent Message</td>
              <td style="padding: 10px 0; color: #4a5568; line-height: 1.5;">${message}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top: 24px; padding: 14px; background-color: #f7fafc; border-radius: 10px; font-size: 12px; color: #718096; line-height: 1.5;">
            <strong>Device Details:</strong> ${deviceType} · ${browserName}<br/>
            <strong>Traffic Source:</strong> Referrer: ${referrer} · Page: ${pageUrl}
          </div>

          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${email}?subject=Re: Kingdom Kindergarten Inquiry" style="display: inline-block; background: linear-gradient(135deg, #f39f5f 0%, #dd6b20 100%); color: #ffffff; padding: 12px 28px; border-radius: 10px; font-size: 14px; font-weight: bold; text-decoration: none; box-shadow: 0 4px 6px rgba(221, 107, 32, 0.2);">
              Reply to ${name.split(" ")[0]} →
            </a>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function createConfirmationMail(firstName: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Application Received!</title>
    </head>
    <body style="font-family: 'Quicksand', 'Arial', sans-serif; background-color: #FFF9EA; padding: 24px; margin: 0;">
      <div style="max-width: 520px; margin: 0 auto; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 3px solid #f39f5f; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
        <div style="background: linear-gradient(135deg, #f39f5f 0%, #ee6b7b 100%); padding: 28px 24px; text-align: center; color: #ffffff;">
          <span style="font-size: 40px; display: block; margin-bottom: 8px;">🎉</span>
          <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800;">We received your inquiry, ${firstName}!</h1>
        </div>
        <div style="padding: 28px 24px; color: #385469; font-size: 15px; line-height: 1.6; text-align: center;">
          <p style="margin: 0 0 16px; text-align: left;">Thank you for your interest in Kingdom Kindergarten! We&apos;ve successfully received your details and are excited about the possibility of welcoming your family.</p>
          <p style="margin: 0 0 24px; text-align: left;">One of our admission advisors will contact you <strong>within 24 hours</strong> to schedule a friendly conversation and a tour of our campus.</p>
          
          <div style="margin: 32px 0 16px; text-align: center;">
            <p style="font-size: 12px; color: #8899a6; margin-bottom: 12px;">In the meantime, feel free to reply directly to this email if you have any questions.</p>
            <span style="font-size: 14px; font-weight: bold; color: #385469;">— Kingdom Kindergarten Admissions Team</span>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}
