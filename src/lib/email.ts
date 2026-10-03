import nodemailer from 'nodemailer';
import { formatINR } from './utils';

export interface EmailBookingDetails {
  bookingNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  boatType: string;
  experienceTitle: string;
  date: string;
  timeWindow: string;
  adultsCount: number;
  totalAmount: number;
  tokenAdvance: number;
  jettyBalance: number;
  paymentId?: string;
  notes?: string;
  assignedBoatman?: string;
}

/**
 * Escapes unsafe HTML characters to prevent XSS / HTML injection in email templates.
 */
export function escapeHtml(str?: string | number | null): string {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getTransporter() {
  const host =
    process.env.SMTP_HOST ||
    (process.env.SMTP_USER?.includes('@gmail.com') ? 'smtp.gmail.com' : undefined);
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD ? process.env.SMTP_PASSWORD.replace(/\s+/g, '') : undefined;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return null;
}

function generateGuestEmailHtml(booking: EmailBookingDetails, siteUrl: string): string {
  const lookupUrl = `${siteUrl}/booking/lookup?ref=${encodeURIComponent(booking.bookingNumber)}`;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919061710075';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello! Inquiring regarding my booking ${booking.bookingNumber} for ${booking.customerName}.`
  )}`;

  const safeCustomerName = escapeHtml(booking.customerName);
  const safeBookingNumber = escapeHtml(booking.bookingNumber);
  const safeBoatType = escapeHtml(booking.boatType);
  const safeExperienceTitle = escapeHtml(booking.experienceTitle);
  const safeDate = escapeHtml(booking.date);
  const safeTimeWindow = escapeHtml(booking.timeWindow);
  const safePaymentId = escapeHtml(booking.paymentId);
  const safeNotes = escapeHtml(booking.notes);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Munroe Island Reservation Confirmation [${safeBookingNumber}]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917; -webkit-font-smoothing: antialiased;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f1ea; padding: 36px 12px;">
    <tr>
      <td align="center">
        <!-- Main Container Card -->
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #ffffff; border-radius: 24px; overflow: hidden; border: 1px solid #e5dfd5; box-shadow: 0 12px 40px rgba(7, 39, 28, 0.08);">
          
          <!-- Top Brand Header Bar -->
          <tr>
            <td style="background-color: #07271c; background: linear-gradient(135deg, #07271c 0%, #0b3b2c 100%); padding: 36px 36px 30px 36px; text-align: left; border-bottom: 2px solid #dfbd7c;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: #dfbd7c; margin-bottom: 8px;">
                      🌿 BACKWATER EXPEDITIONS • KERALA
                    </div>
                    <div style="font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; line-height: 1.2;">
                      Munroe Island
                    </div>
                    <div style="font-size: 12px; color: #c4d7cf; margin-top: 4px; letter-spacing: 0.05em;">
                      Silent Canal &amp; Lake Journeys
                    </div>
                  </td>
                  <td align="right" valign="top">
                    <span style="display: inline-block; background-color: #059669; color: #ffffff; font-size: 10px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; text-transform: uppercase; letter-spacing: 0.12em; border: 1px solid #34d399; box-shadow: 0 2px 8px rgba(5,150,105,0.3);">
                      ✓ Confirmed &amp; Secured
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Salutation -->
          <tr>
            <td style="padding: 36px 36px 20px 36px;">
              <h1 style="font-size: 24px; font-weight: 800; margin: 0 0 10px 0; color: #07271c; letter-spacing: -0.01em;">
                Namaskaram, ${safeCustomerName}!
              </h1>
              <p style="font-size: 14px; line-height: 1.65; color: #44403c; margin: 0 0 28px 0;">
                Your backwater voyage through the tranquil mangrove canals of Munroe Island is confirmed. Your <strong>token advance</strong> has been received, locking your boat and native captain.
              </p>

              <!-- Luxury Boarding Pass Ticket Card -->
              <div style="background-color: #faf8f5; border: 1px solid #e7e0d6; border-radius: 18px; padding: 22px 24px; margin-bottom: 26px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">
                  <tr>
                    <td>
                      <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: #78716c;">
                        RESERVATION REFERENCE
                      </div>
                      <div style="font-family: 'SF Mono', Consolas, Monaco, monospace; font-size: 22px; font-weight: 800; color: #07271c; letter-spacing: 0.04em; margin-top: 2px;">
                        ${safeBookingNumber}
                      </div>
                    </td>
                    <td align="right" valign="middle">
                      <span style="display: inline-block; background-color: #f5f5f4; color: #07271c; border: 1px solid #d6d3d1; padding: 4px 10px; border-radius: 8px; font-size: 11px; font-weight: 700;">
                        ${safeBoatType}
                      </span>
                    </td>
                  </tr>
                </table>

                <div style="height: 1px; background-color: #e7e0d6; margin-bottom: 16px;"></div>

                <!-- Itinerary Grid -->
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px;">
                  <tr>
                    <td style="padding: 6px 0; color: #78716c; width: 42%;">🛶 Expedition Tour:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #07271c;">${safeExperienceTitle}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">📅 Departure Date:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #07271c;">${safeDate}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">⏰ Time Window:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #c85a32;">${safeTimeWindow} Slot</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">👥 Passengers:</td>
                    <td style="padding: 6px 0; font-weight: 700; color: #07271c;">${booking.adultsCount} Persons</td>
                  </tr>
                  ${safePaymentId ? `
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">💳 Payment Ref / UTR:</td>
                    <td style="padding: 6px 0; font-family: monospace; font-size: 12px; color: #57534e;">${safePaymentId}</td>
                  </tr>` : ''}
                  ${safeNotes ? `
                  <tr>
                    <td style="padding: 6px 0; color: #78716c;">📝 Notes:</td>
                    <td style="padding: 6px 0; font-weight: 500; color: #44403c; font-style: italic;">${safeNotes}</td>
                  </tr>` : ''}
                </table>
              </div>

              <!-- Financial Summary Ledger (Deep Forest Card) -->
              <div style="background-color: #07271c; color: #ffffff; border-radius: 18px; padding: 22px 24px; margin-bottom: 26px; border: 1px solid #144634;">
                <div style="font-size: 10px; font-weight: 800; letter-spacing: 0.18em; text-transform: uppercase; color: #dfbd7c; margin-bottom: 14px;">
                  FARES &amp; PAYMENT LEDGER
                </div>
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #ffffff;">
                  <tr>
                    <td style="padding-bottom: 10px; color: #cbd5e1;">Total Expedition Fare:</td>
                    <td align="right" style="padding-bottom: 10px; font-weight: 700; font-size: 15px; color: #ffffff;">${formatINR(booking.totalAmount)}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 12px; color: #34d399; font-weight: 700;">Token Advance (Secured):</td>
                    <td align="right" style="padding-bottom: 12px; color: #34d399; font-weight: 800; font-size: 16px;">✓ ${formatINR(booking.tokenAdvance)}</td>
                  </tr>
                  <tr style="border-top: 1px solid #1a5640;">
                    <td style="padding-top: 14px; font-weight: 800; color: #fef08a; font-size: 14px;">Remaining Balance (Due at Jetty):</td>
                    <td align="right" style="padding-top: 14px; font-weight: 900; font-size: 20px; color: #fef08a;">${formatINR(booking.jettyBalance)}</td>
                  </tr>
                </table>
                <div style="font-size: 11px; color: #94a3b8; margin-top: 12px; line-height: 1.5; border-top: 1px dashed #1a5640; padding-top: 10px;">
                  * Settle the <strong>₹${booking.jettyBalance}</strong> balance directly with your boat captain at the jetty using Cash or UPI (Google Pay, PhonePe, Paytm).
                </div>
              </div>

              <!-- Boarding Point & Captain Coordination -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 18px; padding: 22px 24px; margin-bottom: 28px;">
                <div style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #166534; margin-bottom: 10px;">
                  📍 Boarding Point &amp; Captain Coordination
                </div>
                <div style="font-size: 13px; color: #14532d; line-height: 1.5; margin-bottom: 12px;">
                  <strong>Boarding Location:</strong> We coordinate with licensed local boatmen across Munroe Island. Your assigned boat captain will share their exact pier location and live Google Maps pin directly with you on WhatsApp prior to departure.
                </div>
                <ul style="font-size: 12px; color: #15803d; line-height: 1.7; margin: 0; padding-left: 20px;">
                  <li>Please arrive <strong>15 minutes prior</strong> to your selected departure slot.</li>
                  <li><strong>100% Certified Life Jackets</strong> are provided for every passenger.</li>
                  <li>Comfortable footwear and light cotton attire are recommended.</li>
                  <li>Vehicle parking is available at the assigned pier location.</li>
                </ul>
              </div>

              <!-- Primary Action Buttons -->
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 12px;">
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${whatsappUrl}" style="display: block; width: 100%; box-sizing: border-box; background-color: #07271c; color: #ffffff; text-align: center; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; padding: 15px 24px; border-radius: 9999px; text-decoration: none; box-shadow: 0 4px 14px rgba(7,39,28,0.25);">
                      💬 Message Captain / Dispatch on WhatsApp →
                    </a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom: 12px;">
                    <a href="${lookupUrl}" style="display: block; width: 100%; box-sizing: border-box; background-color: #c85a32; color: #ffffff; text-align: center; font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.12em; padding: 14px 24px; border-radius: 9999px; text-decoration: none;">
                      📱 Track Live Booking Status Online
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Safety Disclaimer Note -->
              <div style="font-size: 11px; line-height: 1.6; color: #a8a29e; text-align: center; margin-top: 24px; padding-top: 18px; border-top: 1px solid #f5f5f4;">
                Munroe Island acts as a booking facilitator under Section 79 of the IT Act, 2000. All water navigation is operated by licensed independent boat captains. Life jackets are mandatory.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 24px 36px; text-align: center; font-size: 12px; color: #78716c; border-top: 1px solid #e7e0d6;">
              <div style="font-weight: 700; color: #07271c; margin-bottom: 4px;">Munroe Island Backwater Tours</div>
              <div>Munroethuruthu, Kollam District, Kerala, India</div>
              <div style="margin-top: 8px;">
                <a href="${siteUrl}" style="color: #07271c; text-decoration: underline; font-weight: 600;">Visit munroe-island.in</a> • 
                <a href="mailto:munroeisland2@gmail.com" style="color: #07271c; text-decoration: underline; font-weight: 600;">munroeisland2@gmail.com</a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateAdminEmailHtml(booking: EmailBookingDetails, siteUrl: string): string {
  const adminUrl = `${siteUrl}/admin/bookings`;
  const cleanPhone = booking.customerPhone.replace(/[^0-9]/g, '');
  const customerWhatsAppUrl = `https://wa.me/${cleanPhone.startsWith('91') ? cleanPhone : '91' + cleanPhone}?text=${encodeURIComponent(
    `Hello ${booking.customerName}! Greetings from Munroe Island regarding your booking ${booking.bookingNumber}.`
  )}`;

  const safeCustomerName = escapeHtml(booking.customerName);
  const safeCustomerPhone = escapeHtml(booking.customerPhone);
  const safeCustomerEmail = escapeHtml(booking.customerEmail);
  const safeBookingNumber = escapeHtml(booking.bookingNumber);
  const safeBoatType = escapeHtml(booking.boatType);
  const safeExperienceTitle = escapeHtml(booking.experienceTitle);
  const safeDate = escapeHtml(booking.date);
  const safeTimeWindow = escapeHtml(booking.timeWindow);
  const safePaymentId = escapeHtml(booking.paymentId);
  const safeNotes = escapeHtml(booking.notes);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Paid Reservation Alert [${safeBookingNumber}]</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f1ea; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1c1917;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color: #f4f1ea; padding: 28px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e5dfd5; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
          
          <!-- Dispatch Header -->
          <tr style="background-color: #07271c; color: #ffffff;">
            <td style="padding: 28px 32px; border-bottom: 2px solid #dfbd7c;">
              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.22em; text-transform: uppercase; color: #dfbd7c; display: block; margin-bottom: 6px;">
                ⚡ DISPATCH ALERT • NEW PAID EXPEDITION
              </span>
              <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.01em;">
                ${safeBookingNumber} • ${safeCustomerName}
              </h2>
            </td>
          </tr>

          <!-- Dispatch Body -->
          <tr>
            <td style="padding: 30px 32px;">
              <!-- Quick Action Bar for Dispatcher -->
              <div style="background-color: #faf8f5; border: 1px solid #e7e0d6; border-radius: 14px; padding: 16px 20px; margin-bottom: 24px;">
                <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #78716c; margin-bottom: 12px;">
                  QUICK DISPATCH ACTIONS
                </div>
                <table width="100%" border="0" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-right: 8px;" width="50%">
                      <a href="${customerWhatsAppUrl}" style="display: block; background-color: #16a34a; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; padding: 11px 16px; border-radius: 8px; text-decoration: none;">
                        💬 WhatsApp Guest
                      </a>
                    </td>
                    <td style="padding-left: 8px;" width="50%">
                      <a href="tel:${safeCustomerPhone}" style="display: block; background-color: #0284c7; color: #ffffff; text-align: center; font-size: 12px; font-weight: 700; padding: 11px 16px; border-radius: 8px; text-decoration: none;">
                        📞 Call ${safeCustomerPhone}
                      </a>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Customer & Itinerary Details -->
              <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; color: #07271c; margin-bottom: 10px;">
                Trip &amp; Guest Specifications
              </div>
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; margin-bottom: 24px; border: 1px solid #f0eae1; border-radius: 12px; background-color: #ffffff;">
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1; width: 38%;">Guest Name:</td>
                  <td style="padding: 10px 14px; font-weight: 700; color: #07271c; border-bottom: 1px solid #f0eae1;">${safeCustomerName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1;">Guest Phone:</td>
                  <td style="padding: 10px 14px; font-weight: 700; color: #07271c; border-bottom: 1px solid #f0eae1;">${safeCustomerPhone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1;">Guest Email:</td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #44403c; border-bottom: 1px solid #f0eae1;">${safeCustomerEmail || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1;">Boat Experience:</td>
                  <td style="padding: 10px 14px; font-weight: 700; color: #07271c; border-bottom: 1px solid #f0eae1;">${safeExperienceTitle} (${safeBoatType})</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1;">Date &amp; Time Slot:</td>
                  <td style="padding: 10px 14px; font-weight: 800; color: #c85a32; border-bottom: 1px solid #f0eae1;">${safeDate} (${safeTimeWindow})</td>
                </tr>
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1;">Total Passengers:</td>
                  <td style="padding: 10px 14px; font-weight: 700; color: #07271c; border-bottom: 1px solid #f0eae1;">${booking.adultsCount} Persons</td>
                </tr>
                ${safePaymentId ? `
                <tr>
                  <td style="padding: 10px 14px; color: #78716c; border-bottom: 1px solid #f0eae1;">Payment Ref / UTR:</td>
                  <td style="padding: 10px 14px; font-family: monospace; font-size: 12px; color: #57534e; border-bottom: 1px solid #f0eae1;">${safePaymentId}</td>
                </tr>` : ''}
                ${safeNotes ? `
                <tr>
                  <td style="padding: 10px 14px; color: #78716c;">Special Instructions:</td>
                  <td style="padding: 10px 14px; font-weight: 600; color: #dc2626;">${safeNotes}</td>
                </tr>` : ''}
              </table>

              <!-- Financial Box -->
              <div style="background-color: #07271c; color: #ffffff; border-radius: 14px; padding: 18px 22px; margin-bottom: 24px;">
                <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; color: #ffffff;">
                  <tr>
                    <td style="padding-bottom: 8px; color: #cbd5e1;">Total Amount:</td>
                    <td align="right" style="padding-bottom: 8px; font-weight: 700; font-size: 14px; color: #ffffff;">${formatINR(booking.totalAmount)}</td>
                  </tr>
                  <tr>
                    <td style="padding-bottom: 10px; color: #34d399; font-weight: 700;">Token Paid Online:</td>
                    <td align="right" style="padding-bottom: 10px; color: #34d399; font-weight: 800; font-size: 15px;">✓ ${formatINR(booking.tokenAdvance)}</td>
                  </tr>
                  <tr style="border-top: 1px solid #1a5640;">
                    <td style="padding-top: 10px; font-weight: 800; color: #fef08a;">Balance to Collect at Jetty:</td>
                    <td align="right" style="padding-top: 10px; font-weight: 900; font-size: 18px; color: #fef08a;">${formatINR(booking.jettyBalance)}</td>
                  </tr>
                </table>
              </div>

              <!-- Dispatch Link Button -->
              <a href="${adminUrl}" style="display: block; width: 100%; box-sizing: border-box; background-color: #07271c; color: #ffffff; text-align: center; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; padding: 15px 20px; border-radius: 10px; text-decoration: none;">
                Open Admin Portal &amp; Assign Boatman →
              </a>
            </td>
          </tr>

          <!-- Admin Footer -->
          <tr>
            <td style="background-color: #faf8f5; padding: 18px 32px; text-align: center; font-size: 11px; color: #78716c; border-top: 1px solid #e7e0d6;">
              Munroe Island Dispatch System • Automatic Notification
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendBookingConfirmationEmails(booking: EmailBookingDetails): Promise<{
  guestEmailSent: boolean;
  adminEmailSent: boolean;
}> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://munroe-island.in';
  const transporter = getTransporter();
  const smtpUser = process.env.SMTP_USER;
  const rawFrom = process.env.SMTP_FROM?.replace(/^["']|["']$/g, '');
  const fromAddress =
    rawFrom ||
    (smtpUser ? `"Munroe Island Dispatch" <${smtpUser}>` : 'Munroe Island Dispatch <munroeisland2@gmail.com>');
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  let guestEmailSent = false;
  let adminEmailSent = false;

  // 1. Send Guest Confirmation Email
  if (booking.customerEmail && booking.customerEmail.includes('@')) {
    const guestHtml = generateGuestEmailHtml(booking, siteUrl);
    if (transporter) {
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: booking.customerEmail,
          subject: `Confirmed: Your Munroe Island Boat Tour [${booking.bookingNumber}]`,
          html: guestHtml,
        });
        guestEmailSent = true;
        console.log(`[Email] Guest confirmation sent to ${booking.customerEmail}`);
      } catch (err) {
        console.error('[Email] Failed to send guest email:', err);
      }
    } else {
      console.log(`[Email Simulator] SMTP not configured. Simulated guest confirmation to: ${booking.customerEmail}`);
      guestEmailSent = true;
    }
  }

  // 2. Send Admin/Dispatch Email
  if (adminEmail && adminEmail.includes('@')) {
    const adminHtml = generateAdminEmailHtml(booking, siteUrl);
    if (transporter) {
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          subject: `[New Paid Booking] ${booking.bookingNumber} - ${booking.customerName} (${booking.experienceTitle})`,
          html: adminHtml,
        });
        adminEmailSent = true;
        console.log(`[Email] Admin dispatch notification sent to ${adminEmail}`);
      } catch (err) {
        console.error('[Email] Failed to send admin email:', err);
      }
    } else {
      console.log(`[Email Simulator] SMTP not configured. Simulated admin dispatch alert to: ${adminEmail}`);
      adminEmailSent = true;
    }
  }

  return { guestEmailSent, adminEmailSent };
}

export interface ContactInquiryDetails {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

function generateContactCustomerEmailHtml(inquiry: ContactInquiryDetails, siteUrl: string): string {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919061710075';
  const safeName = escapeHtml(inquiry.name);
  const safeSubject = escapeHtml(inquiry.subject);
  const safeMessage = escapeHtml(inquiry.message).replace(/\n/g, '<br/>');

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello! Following up on my inquiry regarding "${inquiry.subject}". Name: ${inquiry.name}`
  )}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>We Received Your Inquiry | Munroe Island</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #111111;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding: 32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e5e5e5; box-shadow: 0 4px 16px rgba(0,0,0,0.04);">
          
          <tr style="background-color: #000000; color: #ffffff;">
            <td style="padding: 28px 32px;">
              <div style="font-size: 10px; font-weight: 900; letter-spacing: 0.25em; text-transform: uppercase; color: #d4af37; margin-bottom: 4px;">
                JETTY HELPDESK &amp; DISPATCH
              </div>
              <div style="font-size: 22px; font-weight: 900;">
                Munroe Island
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px;">
              <h2 style="font-size: 20px; font-weight: 900; margin: 0 0 12px 0;">
                Namaskaram, ${safeName}!
              </h2>
              <p style="font-size: 14px; line-height: 1.6; color: #555555; margin: 0 0 20px 0;">
                Thank you for reaching out to us. We have received your inquiry regarding <strong>${safeSubject}</strong>. Our local team reviews all messages and will respond as soon as possible.
              </p>

              <!-- Message Copy Box -->
              <div style="background-color: #f9f9f9; border: 1px solid #eeeeee; border-radius: 12px; padding: 18px 20px; margin-bottom: 24px;">
                <div style="font-size: 10px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; color: #888888; margin-bottom: 6px;">
                  YOUR MESSAGE
                </div>
                <div style="font-size: 13px; line-height: 1.6; color: #222222; font-style: italic;">
                  "${safeMessage}"
                </div>
              </div>

              <!-- Instant WhatsApp Assistance -->
              <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 18px; margin-bottom: 24px; font-size: 13px; color: #166534;">
                <strong>Need an immediate boat availability check?</strong>
                <p style="margin: 6px 0 12px 0; font-size: 12px; line-height: 1.5; color: #15803d;">
                  Our jetty dispatch desk is on duty from 5:00 AM to 9:00 PM IST daily. For immediate assistance with sunrise slots or train arrivals, reach out directly on WhatsApp.
                </p>
                <a href="${whatsappUrl}" style="display: inline-block; background-color: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 9999px; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">
                  Chat on WhatsApp Desk →
                </a>
              </div>

              <div style="text-align: center;">
                <a href="${siteUrl}/booking" style="color: #000000; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; text-decoration: underline;">
                  Explore Boat Tours &amp; Rates →
                </a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #f7f7f7; padding: 20px 32px; text-align: center; font-size: 11px; color: #888888; border-top: 1px solid #eeeeee;">
              <div>Munroe Island Backwater Tours</div>
              <div style="margin-top: 4px;">Munroe Island, Kollam, Kerala • <a href="${siteUrl}" style="color: #555555;">munroe-island.in</a></div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

function generateContactAdminEmailHtml(inquiry: ContactInquiryDetails): string {
  const safeName = escapeHtml(inquiry.name);
  const safeEmail = escapeHtml(inquiry.email);
  const safePhone = escapeHtml(inquiry.phone);
  const safeSubject = escapeHtml(inquiry.subject);
  const safeMessage = escapeHtml(inquiry.message);

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Contact Message</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #18181b;">
  <table width="100%" border="0" cellpadding="0" cellspacing="0" style="padding: 24px 12px;">
    <tr>
      <td align="center">
        <table width="100%" border="0" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; border: 1px solid #e4e4e7; overflow: hidden;">
          
          <tr style="background-color: #09090b; color: #ffffff;">
            <td style="padding: 20px 24px;">
              <span style="font-size: 10px; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #38bdf8; display: block; margin-bottom: 4px;">
                📬 NEW CONTACT INQUIRY
              </span>
              <h2 style="margin: 0; font-size: 18px; font-weight: 800;">
                ${safeSubject}
              </h2>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px;">
              <table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-size: 13px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 6px 0; color: #71717a; width: 30%;">From:</td>
                  <td style="padding: 6px 0; font-weight: 700;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #71717a;">Email:</td>
                  <td style="padding: 6px 0; font-weight: 700;">
                    <a href="mailto:${safeEmail}" style="color: #2563eb; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #71717a;">Phone:</td>
                  <td style="padding: 6px 0; font-weight: 700;">
                    <a href="tel:${safePhone}" style="color: #2563eb; text-decoration: none;">${safePhone}</a>
                    (<a href="https://wa.me/${safePhone.replace(/[^0-9]/g, '')}" style="color: #10b981; text-decoration: none;">WhatsApp</a>)
                  </td>
                </tr>
              </table>

              <div style="background-color: #f4f4f5; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: #71717a; margin-bottom: 6px;">
                  MESSAGE CONTENT:
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #18181b; white-space: pre-wrap;">${safeMessage}</div>
              </div>

              <table width="100%" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right: 8px;">
                    <a href="mailto:${safeEmail}?subject=${encodeURIComponent(`Re: ${inquiry.subject}`)}" style="display: block; text-align: center; background-color: #09090b; color: #ffffff; text-decoration: none; padding: 12px; border-radius: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
                      Reply via Email
                    </a>
                  </td>
                  <td style="padding-left: 8px;">
                    <a href="https://wa.me/${safePhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${inquiry.name}, thank you for contacting Munroe Island regarding ${inquiry.subject}.`)}" style="display: block; text-align: center; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 12px; border-radius: 8px; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;">
                      Chat on WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendContactInquiryEmails(inquiry: ContactInquiryDetails): Promise<{
  customerSent: boolean;
  adminSent: boolean;
}> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://munroe-island.in';
  const transporter = getTransporter();
  const smtpUser = process.env.SMTP_USER;
  const rawFrom = process.env.SMTP_FROM?.replace(/^["']|["']$/g, '');
  const fromAddress =
    rawFrom ||
    (smtpUser ? `"Munroe Island Dispatch" <${smtpUser}>` : 'Munroe Island Dispatch <munroeisland2@gmail.com>');
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  let customerSent = false;
  let adminSent = false;

  // 1. Send Customer acknowledgment
  if (inquiry.email && inquiry.email.includes('@')) {
    const custHtml = generateContactCustomerEmailHtml(inquiry, siteUrl);
    if (transporter) {
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: inquiry.email,
          subject: `We received your inquiry: ${inquiry.subject} [Munroe Island]`,
          html: custHtml,
        });
        customerSent = true;
        console.log(`[Contact Email] Customer confirmation sent to ${inquiry.email}`);
      } catch (err) {
        console.error('[Contact Email] Error sending customer email:', err);
      }
    } else {
      console.log(`[Email Simulator] SMTP not configured. Simulated customer contact confirmation to: ${inquiry.email}`);
      customerSent = true;
    }
  }

  // 2. Send Admin alert
  if (adminEmail && adminEmail.includes('@')) {
    const adminHtml = generateContactAdminEmailHtml(inquiry);
    if (transporter) {
      try {
        await transporter.sendMail({
          from: fromAddress,
          to: adminEmail,
          subject: `[Contact Form] ${inquiry.subject} - from ${inquiry.name}`,
          html: adminHtml,
        });
        adminSent = true;
        console.log(`[Contact Email] Admin inquiry alert sent to ${adminEmail}`);
      } catch (err) {
        console.error('[Contact Email] Error sending admin email:', err);
      }
    } else {
      console.log(`[Email Simulator] SMTP not configured. Simulated admin inquiry alert to: ${adminEmail}`);
      adminSent = true;
    }
  }

  return { customerSent, adminSent };
}
