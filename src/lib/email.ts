import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  quantity?: string;
  productName?: string;
  source: string;
}

/**
 * Send notification email to admin when a new inquiry arrives
 */
export async function sendAdminNotification(data: InquiryEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Email] Resend not configured, skipping admin notification.");
    return;
  }

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0B3D91;padding:24px;border-radius:12px 12px 0 0">
        <h2 style="color:#fff;margin:0">New Inquiry Received</h2>
        <p style="color:#93c5fd;margin:4px 0 0;font-size:14px">From ${data.source === "whatsapp" ? "WhatsApp" : "Website Form"}</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px">
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151;width:140px">Name</td><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#111827">${data.name}</td></tr>
          ${data.email ? `<tr><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151">Email</td><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6"><a href="mailto:${data.email}" style="color:#2563eb">${data.email}</a></td></tr>` : ""}
          <tr><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151">Phone</td><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6"><a href="tel:${data.phone}" style="color:#2563eb">${data.phone}</a></td></tr>
          ${data.company ? `<tr><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151">Company</td><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6">${data.company}</td></tr>` : ""}
          ${data.productName ? `<tr><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151">Product</td><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;color:#F37021;font-weight:600">${data.productName}</td></tr>` : ""}
          ${data.quantity ? `<tr><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6;font-weight:600;color:#374151">Quantity</td><td style="padding:10px 12px;border-bottom:1px solid #f3f4f6">${data.quantity}</td></tr>` : ""}
          ${data.message ? `<tr><td style="padding:10px 12px;font-weight:600;color:#374151;vertical-align:top">Message</td><td style="padding:10px 12px;color:#374151">${data.message}</td></tr>` : ""}
        </table>
        <div style="margin-top:20px;padding:12px;background:#f0f9ff;border-radius:8px;text-align:center">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/inquiries" style="color:#0B3D91;font-weight:600;text-decoration:none">View in Admin Panel →</a>
        </div>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Radiatech Electra <onboarding@resend.dev>",
      to: [process.env.NOTIFICATION_EMAIL || "rariatechelectra@gmail.com"],
      subject: `🔔 New Inquiry${data.productName ? `: ${data.productName}` : ""} — ${data.name}`,
      html,
    });
    console.log("[Email] Admin notification sent successfully");
  } catch (err) {
    console.error("[Email] Failed to send admin notification:", err);
  }
}

/**
 * Send confirmation email to the customer who submitted the inquiry
 */
export async function sendCustomerConfirmation(data: InquiryEmailData) {
  if (!process.env.RESEND_API_KEY) {
    console.log("[Email] Resend not configured, skipping customer confirmation.");
    return;
  }

  if (!data.email) return;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0B3D91;padding:24px;border-radius:12px 12px 0 0;text-align:center">
        <h2 style="color:#fff;margin:0">Thank You for Your Inquiry!</h2>
        <p style="color:#93c5fd;margin:8px 0 0;font-size:14px">Radiatech Electra Private Limited</p>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px">
        <p style="color:#374151;font-size:15px;line-height:1.6">Dear <strong>${data.name}</strong>,</p>
        <p style="color:#374151;font-size:15px;line-height:1.6">Thank you for reaching out to us. We have received your inquiry and our team will review it shortly.</p>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;margin:16px 0">
          <p style="color:#64748b;font-size:13px;margin:0 0 8px;font-weight:600;text-transform:uppercase;letter-spacing:0.5px">Your Inquiry Summary</p>
          ${data.productName ? `<p style="color:#374151;font-size:14px;margin:4px 0"><strong>Product:</strong> ${data.productName}</p>` : ""}
          ${data.message ? `<p style="color:#374151;font-size:14px;margin:4px 0"><strong>Message:</strong> ${data.message}</p>` : ""}
        </div>
        <p style="color:#374151;font-size:15px;line-height:1.6"><strong>What happens next?</strong></p>
        <ul style="color:#374151;font-size:14px;line-height:1.8;padding-left:20px">
          <li>Our team will review your requirement within <strong>2-4 hours</strong></li>
          <li>You'll receive a detailed quotation via email or phone</li>
          <li>We'll connect you with a dedicated product specialist</li>
        </ul>
        <p style="color:#374151;font-size:15px;line-height:1.6">Need immediate assistance? Contact us:</p>
        <div style="display:flex;gap:12px;margin:12px 0">
          <a href="tel:+919457893678" style="background:#0B3D91;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">📞 Call Now</a>
          <a href="https://wa.me/919457893678" style="background:#25D366;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">💬 WhatsApp</a>
        </div>
        <hr style="border:0;border-top:1px solid #e5e7eb;margin:20px 0">
        <p style="color:#9ca3af;font-size:12px;text-align:center">Radiatech Electra Private Limited | Noida, Uttar Pradesh, India</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({
      from: process.env.EMAIL_FROM || "Radiatech Electra <onboarding@resend.dev>",
      to: [data.email],
      subject: `We've received your inquiry — Radiatech Electra`,
      html,
    });
    console.log("[Email] Customer confirmation sent to", data.email);
  } catch (err) {
    console.error("[Email] Failed to send customer confirmation:", err);
  }
}
