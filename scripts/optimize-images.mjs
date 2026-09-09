#!/usr/bin/env node
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, "..", "src", "assets");

const images = [
  {
    input: "rajiv-abeysinghe.png",
    output: "rajiv-abeysinghe.webp",
    size: 256,
  },
  {
    input: "sushila-nair-enhanced.png",
    output: "sushila-nair-enhanced.webp",
    size: 256,
  },
  {
    input: "nick-lockett-enhanced.png",
    output: "nick-lockett-enhanced.webp",
    size: 256,
  },
];

async function optimizeImages() {
  console.log("🖼️  Optimizing portrait images to WebP...\n");

  for (const img of images) {
    const inputPath = path.join(assetsDir, img.input);
    const outputPath = path.join(assetsDir, img.output);

    try {
      await sharp(inputPath)
        .resize(img.size, img.size, {
          fit: "cover",
          position: "center",
        })
        .webp({
          quality: 85,
          effort: 6,
        })
        .toFile(outputPath);

      const inputStats = await fs.stat(inputPath);
      const outputStats = await fs.stat(outputPath);
      const savings = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✅ ${img.input} → ${img.output}`);
      console.log(
        `   ${(inputStats.size / 1024).toFixed(1)}KB → ${(outputStats.size / 1024).toFixed(1)}KB (${savings}% smaller)\n`
      );
    } catch (error) {
      console.error(`❌ Failed to optimize ${img.input}:`, error);
    }
  }

  console.log("✨ Image optimization complete!");
}

optimizeImages();
