import { readFile, writeFile, rm } from "node:fs/promises";
import { render, origin, schema } from "../.prerender/entry-server.js";

const template = await readFile("dist/index.html", "utf8");
if (
  !template.includes("<!--app-html-->") ||
  !template.includes("<!--landing-schema-->")
)
  throw new Error("Missing prerender placeholders");
const html = template
  .replace("<!--app-html-->", render())
  .replace(
    "<!--landing-schema-->",
    `<script id="landing-schema" type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
  );
await writeFile("dist/index.html", html);
await writeFile(
  "dist/sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url></urlset>\n`,
);
await writeFile(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\nDisallow: /*?r=\nDisallow: /*&r=\nDisallow: /*?p=admin\nDisallow: /*&p=admin\nSitemap: ${origin}/sitemap.xml\n`,
);
await rm(".prerender", { recursive: true, force: true });
console.log(
  "Landing pré-renderizada; sitemap, robots e dados estruturados gerados.",
);
