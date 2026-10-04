import { describe, it, expect } from "vitest";
import {
  generateUpiUri,
  generateAppIntentUrls,
  validateUtrNumber,
} from "@/lib/upi";

describe("Direct UPI Protocol & Intent Utilities", () => {
  const samplePayment = {
    upiId: "sagarsunil16-2@oksbi",
    payeeName: "Sagar Sunil",
    amount: 300,
    bookingNumber: "MNI-20260929-6049",
  };

  describe("NPCI UPI URI Generation", () => {
    it("generates compliant upi://pay URI with all mandatory parameters", () => {
      const uri = generateUpiUri(samplePayment);

      expect(uri).toContain("upi://pay?");
      expect(uri).toContain("pa=sagarsunil16-2%40oksbi");
      expect(uri).toContain("am=300.00");
      expect(uri).toContain("cu=INR");
      expect(uri).toContain("tn=Munroe%20Boat%20Token%20MNI-20260929-6049");
    });

    it("formats fractional amounts properly to 2 decimal places", () => {
      const uri = generateUpiUri({
        ...samplePayment,
        amount: 350.5,
      });
      expect(uri).toContain("am=350.50");
    });
  });

  describe("Mobile App Deep Linking Intents", () => {
    it("generates intent targets for Google Pay, PhonePe, Paytm and Universal", () => {
      const intents = generateAppIntentUrls(samplePayment);

      expect(intents.universal).toContain("upi://pay?");
      expect(intents.googlePay).toContain("com.google.android.apps.nbu.paisa.user");
      expect(intents.phonePe).toContain("com.phonepe.app");
      expect(intents.paytm).toContain("net.one97.paytm");
      expect(intents.bhim).toContain("in.org.npci.upiapp");
    });

    it("generates dedicated iOS URL schemes when running on iPhone", () => {
      const originalNavigator = global.navigator;
      // Mock iPhone userAgent
      Object.defineProperty(global, "navigator", {
        value: { userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)" },
        configurable: true,
      });

      const iosIntents = generateAppIntentUrls(samplePayment);
      expect(iosIntents.googlePay).toContain("tez://upi/pay?");
      expect(iosIntents.phonePe).toContain("phonepe://upi/pay?");
      expect(iosIntents.paytm).toContain("paytmmp://upi/pay?");
      expect(iosIntents.bhim).toContain("bhim://pay?");

      // Restore navigator
      Object.defineProperty(global, "navigator", {
        value: originalNavigator,
        configurable: true,
      });
    });
  });

  describe("12-Digit UTR Reference Validation", () => {
    it("accepts valid 12-digit numeric Indian bank UTR", () => {
      const result = validateUtrNumber("427189104821");
      expect(result.isValid).toBe(true);
      expect(result.cleanUtr).toBe("427189104821");
      expect(result.error).toBeUndefined();
    });

    it("cleans up formatted spaces and dashes in UTR", () => {
      const resultWithSpaces = validateUtrNumber("4271 8910 4821");
      expect(resultWithSpaces.isValid).toBe(true);
      expect(resultWithSpaces.cleanUtr).toBe("427189104821");

      const resultWithDashes = validateUtrNumber("4271-8910-4821");
      expect(resultWithDashes.isValid).toBe(true);
      expect(resultWithDashes.cleanUtr).toBe("427189104821");
    });

    it("rejects strings with incorrect length or non-numeric characters", () => {
      expect(validateUtrNumber("123456").isValid).toBe(false);
      expect(validateUtrNumber("12345678901234").isValid).toBe(false);
      expect(validateUtrNumber("42718910482A").isValid).toBe(false);
      expect(validateUtrNumber("").isValid).toBe(false);
      expect(validateUtrNumber("payment_done").isValid).toBe(false);
    });
  });
});
