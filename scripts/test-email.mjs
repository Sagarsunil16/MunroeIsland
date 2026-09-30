import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

// Load .env if not already in process.env
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf8");
    envContent.split("\n").forEach((line) => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let val = (match[2] || "").trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    });
  }
} catch (e) {}

const host = process.env.SMTP_HOST || "smtp.gmail.com";
const port = Number(process.env.SMTP_PORT) || 587;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASSWORD;
const adminEmail = process.env.ADMIN_EMAIL || user;

console.log("------------------------------------------");
console.log(" Munroe Island SMTP Diagnostics & Test");
console.log("------------------------------------------");
console.log(`Host:     ${host}`);
console.log(`Port:     ${port}`);
console.log(`User:     ${user ? user : "(NOT CONFIGURED)"}`);
console.log(`Password: ${pass ? "********" + pass.slice(-4) : "(NOT CONFIGURED)"}`);
console.log(`Target:   ${adminEmail ? adminEmail : "(NOT CONFIGURED)"}`);
console.log("------------------------------------------\n");

if (!user || !pass) {
  console.error("❌ Error: SMTP_USER and SMTP_PASSWORD must be configured in .env file.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: port === 465,
  auth: { user, pass },
  tls: {
    rejectUnauthorized: false,
  },
});

async function main() {
  console.log("⏳ Verifying SMTP connection with Gmail servers...");
  try {
    await transporter.verify();
    console.log("✅ SMTP Handshake successful! Credentials are authenticated.");

    console.log(`⏳ Dispatching test email to ${adminEmail}...`);
    const info = await transporter.sendMail({
      from: `"Munroe Island Expeditions" <${user}>`,
      to: adminEmail,
      subject: "🛶 Test Email: Munroe Island Boating System Connected!",
      html: `
        <div style="font-family: sans-serif; max-width: 500px; padding: 24px; border: 1px solid #e5e5e5; border-radius: 12px; background: #fafafa;">
          <h2 style="color: #0b3b2c; margin-top: 0;">Munroe Island SMTP Connected!</h2>
          <p>This is a live test email confirming that your Gmail SMTP integration is functioning perfectly.</p>
          <div style="background: #ffffff; padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Sender:</strong> ${user}</p>
            <p style="margin: 4px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
            <p style="margin: 4px 0;"><strong>Status:</strong> Active & Ready for Production</p>
          </div>
          <p style="font-size: 13px; color: #666;">Guest booking receipts and admin alerts will now be sent automatically.</p>
        </div>
      `,
    });

    console.log(`✅ Test email delivered successfully! Message ID: ${info.messageId}`);
    console.log(`📬 Check your inbox at: ${adminEmail}`);
  } catch (error) {
    console.error("❌ Failed to send email via SMTP:");
    console.error(error.message);
    if (error.message?.includes("Invalid login") || error.code === "EAUTH") {
      console.log("\n💡 TIP: For Gmail, ensure you are using a 16-character 'App Password' (not your standard login password).");
      console.log("Generate one here: https://myaccount.google.com/apppasswords");
    }
  }
}

main();
