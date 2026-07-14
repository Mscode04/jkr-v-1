/**
 * generate-spa.mjs
 *
 * Post-build script for GitHub Pages deployment of a TanStack Start app.
 *
 * Problem: TanStack Start calls hydrateRoot(document, <App/>) on the client.
 * hydrateRoot needs server-rendered HTML already in the document body — with
 * an empty body (no SSR), React has nothing to hydrate and the page is blank.
 *
 * Solution: Start the Nitro/Wrangler preview server, request the root route,
 * capture the SSR-rendered HTML, and write it as index.html and 404.html.
 * This gives the client bundle real server-rendered markup to hydrate from.
 */
import { writeFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = join(__dirname, "..");
const publicDir = join(root, ".output", "public");
const assetsDir = join(publicDir, "assets");
const serverEntry = join(root, ".output", "server", "index.mjs");

if (!existsSync(assetsDir)) {
  console.error("ERROR: .output/public/assets not found. Run `vite build` first.");
  process.exit(1);
}

// Write .nojekyll so GitHub Pages doesn't ignore _-prefixed files
writeFileSync(join(publicDir, ".nojekyll"), "", "utf-8");

// The base path set in vite.config.ts
const BASE_PATH = "/jkr-web/";
const WRANGLER_PORT = 8788;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 20, delayMs = 500) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        headers: { Accept: "text/html", "User-Agent": "Mozilla/5.0 (prerender)" },
      });
      if (response.ok) {
        return response;
      }
      console.log(`  Attempt ${i + 1}: ${response.status} ${response.statusText}`);
    } catch (e) {
      // Server not ready yet
      if (i < maxRetries - 1) {
        process.stdout.write(".");
      }
    }
    await sleep(delayMs);
  }
  throw new Error(`Failed to fetch ${url} after ${maxRetries} attempts`);
}

async function ssrRenderViaWrangler() {
  console.log("🔄 Starting Wrangler preview server for SSR rendering...");

  return new Promise(async (resolve, reject) => {
    const wrangler = spawn(
      "npx",
      ["wrangler", "dev", "--local", "--port", String(WRANGLER_PORT), "--log-level", "error"],
      {
        cwd: join(root, ".output"),
        stdio: ["pipe", "pipe", "pipe"],
        shell: true,
      }
    );

    let killed = false;
    const killWrangler = () => {
      if (!killed) {
        killed = true;
        wrangler.kill("SIGTERM");
      }
    };

    wrangler.stdout.on("data", (data) => {
      const text = data.toString();
      if (text.includes("Ready on") || text.includes("Listening")) {
        console.log("\n✓ Wrangler server is ready");
      }
    });

    wrangler.on("error", (err) => {
      reject(new Error(`Wrangler process error: ${err.message}`));
    });

    // Wait for server to be ready and then fetch
    await sleep(3000); // Give Wrangler time to start

    try {
      process.stdout.write("⏳ Waiting for SSR server");
      const url = `http://localhost:${WRANGLER_PORT}${BASE_PATH}`;
      const response = await fetchWithRetry(url);
      console.log(`\n✓ SSR response: ${response.status}`);
      const html = await response.text();
      killWrangler();
      resolve(html);
    } catch (err) {
      killWrangler();
      reject(err);
    }
  });
}

try {
  if (!existsSync(serverEntry)) {
    throw new Error("Server entry not found");
  }

  const html = await ssrRenderViaWrangler();

  if (!html || html.length < 500) {
    throw new Error(`SSR HTML too short (${html?.length ?? 0} bytes) — likely an error page`);
  }

  writeFileSync(join(publicDir, "index.html"), html, "utf-8");
  writeFileSync(join(publicDir, "404.html"), html, "utf-8");

  console.log(`✓ SSR-rendered HTML written to index.html (${html.length} bytes)`);
  console.log("✓ Copied to 404.html for GitHub Pages SPA routing");
  console.log("✓ Done. Deploy the .output/public directory to GitHub Pages.");
  process.exit(0);
} catch (error) {
  console.error("\n❌ SSR render failed:", error.message);
  console.error("   Falling back to minimal shell HTML...");
  console.warn("\n⚠️  WARNING: The page may show blank on GitHub Pages because");
  console.warn("   hydrateRoot needs server-rendered HTML but no SSR was performed.\n");

  const files = readdirSync(assetsDir);
  const cssFiles = files.filter((f) => f.endsWith(".css"));
  const jsFiles = files.filter((f) => f.endsWith(".js"));

  const jsFileSorted = jsFiles.sort((a, b) => {
    if (a.startsWith("index-")) return 1;
    if (b.startsWith("index-")) return -1;
    return 0;
  });

  const cssLinks = cssFiles
    .map((f) => `    <link rel="stylesheet" href="${BASE_PATH}assets/${f}">`)
    .join("\n");

  const modulePreloads = jsFileSorted
    .map((f) => `    <link rel="modulepreload" href="${BASE_PATH}assets/${f}">`)
    .join("\n");

  const jsScripts = jsFileSorted
    .map((f) => `    <script type="module" crossorigin src="${BASE_PATH}assets/${f}"></script>`)
    .join("\n");

  const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Aflah C P — Sales Strategist &amp; Corporate Trainer</title>
    <meta name="description" content="Aflah C P: sales strategist, corporate trainer &amp; business mentor. 7+ years turning sales psychology into systems that produce measurable results.">
    <meta name="author" content="Aflah C P">
    <meta property="og:title" content="Aflah C P — Sales Strategist &amp; Corporate Trainer">
    <meta property="og:description" content="Sales psychology, leadership development &amp; business growth training. 1000+ professionals trained across 25+ businesses.">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <link rel="icon" href="${BASE_PATH}favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500&family=Instrument+Serif:ital@0;1&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter+Tight:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap">
${cssLinks}
${modulePreloads}
  </head>
  <body>
    <!--app-html-->
${jsScripts}
  </body>
</html>
`;

  writeFileSync(join(publicDir, "index.html"), fallbackHtml, "utf-8");
  writeFileSync(join(publicDir, "404.html"), fallbackHtml, "utf-8");
  console.log("📝 Fallback HTML written to index.html and 404.html.");
  process.exit(0);
}
