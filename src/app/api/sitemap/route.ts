//landing-page/src/app/api/sitemap/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://sprintlaunchers.com";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>${baseUrl}/home</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
