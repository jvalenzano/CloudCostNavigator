// scripts/postbuild.js
import { copyFileSync } from "fs";
import { join } from "path";

const src = join("docs", "index.html");
const dest = join("docs", "404.html");

try {
  copyFileSync(src, dest);
  console.log("✅ Copied index.html to 404.html");
} catch (err) {
  console.error("❌ Failed to copy index.html to 404.html", err);
  process.exit(1);
}
