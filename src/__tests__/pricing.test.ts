import { describe, it, expect } from "vitest";
import { calculateQuote, EXPERIENCES } from "@/lib/pricing";

describe("Pricing and Quote Calculations", () => {
  describe("Shikara Tiered Pricing", () => {
    it("charges standard tier ₹1,200 for 1-9 passengers on 1-hour cruise", () => {
      const quote1 = calculateQuote("shikara-1h", 1);
      expect(quote1.totalAmount).toBe(1200);
      expect(quote1.tokenAdvance).toBe(400);
      expect(quote1.jettyBalance).toBe(800);

      const quote9 = calculateQuote("shikara-1h", 9);
      expect(quote9.totalAmount).toBe(1200);
      expect(quote9.tokenAdvance).toBe(400);
      expect(quote9.jettyBalance).toBe(800);
    });

    it("charges large-group tier ₹1,400 for 10-15 passengers on 1-hour cruise", () => {
      const quote10 = calculateQuote("shikara-1h", 10);
      expect(quote10.totalAmount).toBe(1400);
      expect(quote10.tokenAdvance).toBe(400);
      expect(quote10.jettyBalance).toBe(1000);

      const quote15 = calculateQuote("shikara-1h", 15);
      expect(quote15.totalAmount).toBe(1400);
      expect(quote15.tokenAdvance).toBe(400);
      expect(quote15.jettyBalance).toBe(1000);
    });

    it("charges standard tier ₹2,000 for 1-9 passengers on 2-hour cruise", () => {
      const quote = calculateQuote("shikara-cruise-2h", 6);
      expect(quote.totalAmount).toBe(2000);
      expect(quote.tokenAdvance).toBe(400);
      expect(quote.jettyBalance).toBe(1600);
    });

    it("charges large-group tier ₹2,400 for 10-15 passengers on 2-hour cruise", () => {
      const quote = calculateQuote("shikara-cruise-2h", 12);
      expect(quote.totalAmount).toBe(2400);
      expect(quote.tokenAdvance).toBe(400);
      expect(quote.jettyBalance).toBe(2000);
    });
  });

  describe("Canoe Flat Boat Pricing", () => {
    it("charges flat ₹800 for 1-hour canoe regardless of 1 to 6 passengers", () => {
      const quote1 = calculateQuote("canoe-1h", 1);
      const quote6 = calculateQuote("canoe-1h", 6);
      expect(quote1.totalAmount).toBe(800);
      expect(quote6.totalAmount).toBe(800);
      expect(quote1.tokenAdvance).toBe(400);
      expect(quote1.jettyBalance).toBe(400);
    });

    it("charges flat ₹1,200 for 2-hour daytime canoe", () => {
      const quote = calculateQuote("canoe-2h", 4);
      expect(quote.totalAmount).toBe(1200);
      expect(quote.tokenAdvance).toBe(400);
      expect(quote.jettyBalance).toBe(800);
    });

    it("charges flat ₹1,200 for signature 2-hour sunrise canoe", () => {
      const quote = calculateQuote("canoe-sunrise", 2);
      expect(quote.totalAmount).toBe(1200);
      expect(quote.tokenAdvance).toBe(400);
      expect(quote.jettyBalance).toBe(800);
    });
  });

  describe("Kayak Per-Head Pricing", () => {
    it("charges strictly ₹250 per paddler for 1-hour kayak", () => {
      const quote1 = calculateQuote("kayak-1h", 1);
      expect(quote1.totalAmount).toBe(250);
      expect(quote1.tokenAdvance).toBe(100);
      expect(quote1.jettyBalance).toBe(150);

      const quote4 = calculateQuote("kayak-1h", 4);
      expect(quote4.totalAmount).toBe(1000);
      expect(quote4.tokenAdvance).toBe(400);
      expect(quote4.jettyBalance).toBe(600);
    });

    it("charges strictly ₹500 per paddler for 2-hour kayak", () => {
      const quote2 = calculateQuote("kayak-2h", 2);
      expect(quote2.totalAmount).toBe(1000);
      expect(quote2.tokenAdvance).toBe(300);
      expect(quote2.jettyBalance).toBe(700);
    });
  });

  describe("Speed Boat Thrill Sprint", () => {
    it("charges flat ₹1,500 for up to 6 guests", () => {
      const quote = calculateQuote("speedboat-10m", 5);
      expect(quote.totalAmount).toBe(1500);
      expect(quote.tokenAdvance).toBe(500);
      expect(quote.jettyBalance).toBe(1000);
    });
  });

  describe("Sanitization and Boundary Edge Cases", () => {
    it("handles zero or negative passengers gracefully by defaulting to minimum 1", () => {
      const quoteZero = calculateQuote("canoe-1h", 0);
      expect(quoteZero.adultsCount).toBe(1);
      expect(quoteZero.totalAmount).toBe(800);

      const quoteNeg = calculateQuote("kayak-1h", -5);
      expect(quoteNeg.adultsCount).toBe(1);
      expect(quoteNeg.totalAmount).toBe(250);
    });

    it("clamps passengers exceeding boat maximum capacity", () => {
      // Canoe max capacity is 6
      const canoeQuote = calculateQuote("canoe-1h", 20);
      expect(canoeQuote.adultsCount).toBe(6);

      // Shikara max capacity is 15
      const shikaraQuote = calculateQuote("shikara-1h", 99);
      expect(shikaraQuote.adultsCount).toBe(15);
      expect(shikaraQuote.totalAmount).toBe(1400);

      // Speedboat max capacity is 6
      const speedQuote = calculateQuote("speedboat-10m", 10);
      expect(speedQuote.adultsCount).toBe(6);
    });

    it("ensures totalAmount always equals tokenAdvance + jettyBalance", () => {
      for (const exp of EXPERIENCES) {
        for (let p = 1; p <= exp.maxCapacity; p++) {
          const q = calculateQuote(exp.id, p);
          expect(q.tokenAdvance + q.jettyBalance).toBe(q.totalAmount);
          expect(q.tokenAdvance).toBeGreaterThan(0);
          expect(q.jettyBalance).toBeGreaterThanOrEqual(0);
        }
      }
    });
  });
});
