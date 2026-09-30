import { describe, it, expect } from "vitest";
import crypto from "crypto";
import {
  verifyRazorpaySignature,
  verifyWebhookSignature,
  validatePaymentSecurityConfig,
} from "@/lib/payment-security";

describe("Payment Security & Cryptographic Verifications", () => {
  const dummySecret = "test_rzp_secret_key_9988776655";
  const dummyWebhookSecret = "whsec_test_secret_abc123xyz";
  const orderId = "order_Oq7K9bL3MnRoE1";
  const paymentId = "pay_Pz2X8vN4KlOpQ9";

  // Compute a valid test signature
  const validSignature = crypto
    .createHmac("sha256", dummySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  describe("Razorpay Order-Payment Signature Verification", () => {
    it("successfully verifies authentic HMAC-SHA256 signature", () => {
      const isValid = verifyRazorpaySignature(
        orderId,
        paymentId,
        validSignature,
        dummySecret
      );
      expect(isValid).toBe(true);
    });

    it("rejects forged or modified signature", () => {
      const forgedSignature = validSignature.substring(0, validSignature.length - 2) + "00";
      const isValid = verifyRazorpaySignature(
        orderId,
        paymentId,
        forgedSignature,
        dummySecret
      );
      expect(isValid).toBe(false);
    });

    it("rejects when verified against wrong secret key", () => {
      const isValid = verifyRazorpaySignature(
        orderId,
        paymentId,
        validSignature,
        "wrong_secret_key"
      );
      expect(isValid).toBe(false);
    });

    it("rejects when orderId is tampered", () => {
      const isValid = verifyRazorpaySignature(
        "order_tampered_999",
        paymentId,
        validSignature,
        dummySecret
      );
      expect(isValid).toBe(false);
    });

    it("rejects when paymentId is tampered", () => {
      const isValid = verifyRazorpaySignature(
        orderId,
        "pay_tampered_111",
        validSignature,
        dummySecret
      );
      expect(isValid).toBe(false);
    });

    it("safely handles empty or null parameters without throwing", () => {
      expect(verifyRazorpaySignature("", paymentId, validSignature, dummySecret)).toBe(false);
      expect(verifyRazorpaySignature(orderId, "", validSignature, dummySecret)).toBe(false);
      expect(verifyRazorpaySignature(orderId, paymentId, "", dummySecret)).toBe(false);
      expect(verifyRazorpaySignature(orderId, paymentId, validSignature, "")).toBe(false);
    });
  });

  describe("Razorpay Server-to-Server Webhook Signature Verification", () => {
    const rawPayload = JSON.stringify({
      event: "payment.captured",
      payload: {
        payment: {
          entity: {
            id: paymentId,
            order_id: orderId,
            amount: 30000,
            status: "captured",
          },
        },
      },
    });

    const validWebhookSignature = crypto
      .createHmac("sha256", dummyWebhookSecret)
      .update(rawPayload)
      .digest("hex");

    it("authenticates legitimate Razorpay server webhook payload", () => {
      const isValid = verifyWebhookSignature(
        rawPayload,
        validWebhookSignature,
        dummyWebhookSecret
      );
      expect(isValid).toBe(true);
    });

    it("rejects webhook if body was tampered in transit", () => {
      const tamperedPayload = rawPayload.replace("30000", "50000");
      const isValid = verifyWebhookSignature(
        tamperedPayload,
        validWebhookSignature,
        dummyWebhookSecret
      );
      expect(isValid).toBe(false);
    });

    it("rejects webhook if webhook secret is incorrect", () => {
      const isValid = verifyWebhookSignature(
        rawPayload,
        validWebhookSignature,
        "fake_whsec_invalid"
      );
      expect(isValid).toBe(false);
    });
  });

  describe("Environment Configuration & Security Posture", () => {
    it("reports missing secrets when running in strict mode", () => {
      const result = validatePaymentSecurityConfig({
        NODE_ENV: "production",
        RAZORPAY_KEY_ID: "",
        RAZORPAY_KEY_SECRET: "",
      });

      expect(result.isConfigured).toBe(false);
      expect(result.missingKeys).toContain("RAZORPAY_KEY_ID");
      expect(result.missingKeys).toContain("RAZORPAY_KEY_SECRET");
    });

    it("validates live keys properly format-wise", () => {
      const result = validatePaymentSecurityConfig({
        NODE_ENV: "production",
        RAZORPAY_KEY_ID: "rzp_live_abc123def456",
        RAZORPAY_KEY_SECRET: "secret1234567890",
      });

      expect(result.isConfigured).toBe(true);
      expect(result.isLiveKey).toBe(true);
    });
  });

  describe("Input Sanitization & Injection Prevention", () => {
    it("escapes dangerous HTML characters to prevent XSS in email templates", async () => {
      const { escapeHtml } = await import("@/lib/email");
      const malicious = '<script>alert("pwned")</script><img src=x onerror=alert(1)>';
      const safe = escapeHtml(malicious);
      expect(safe).not.toContain("<script>");
      expect(safe).not.toContain("<img");
      expect(safe).toContain("&lt;script&gt;");
      expect(safe).toContain("&quot;pwned&quot;");
    });
  });

  describe("API Rate Limiting", () => {
    it("allows requests under the limit and blocks excess requests", async () => {
      const { checkRateLimit } = await import("@/lib/rate-limit");
      const testKey = `test-ip-${Date.now()}`;
      
      // Allow first 3 requests
      expect(checkRateLimit(testKey, 3, 5000).allowed).toBe(true);
      expect(checkRateLimit(testKey, 3, 5000).allowed).toBe(true);
      expect(checkRateLimit(testKey, 3, 5000).allowed).toBe(true);

      // 4th request must be blocked
      const blocked = checkRateLimit(testKey, 3, 5000);
      expect(blocked.allowed).toBe(false);
      expect(blocked.remaining).toBe(0);
      expect(blocked.resetInSeconds).toBeGreaterThan(0);
    });
  });
});
