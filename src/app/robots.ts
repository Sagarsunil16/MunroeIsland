import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.munroe-island.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        // Block parameterized booking page variants — prevents ?exp= query
        // strings from being indexed as duplicate pages in Google Search Console
        "/booking?",
        "/booking/confirmation/",
        "/booking/lookup",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
