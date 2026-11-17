import path from "node:path"; import fs from "node:fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
const browserExecutable = "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const chromiumOptions = { gl: "swangle" };
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts"), publicDir: path.resolve("public") });
const composition = await selectComposition({ serveUrl, id: "BlueThroat", browserExecutable, chromiumOptions });
await renderMedia({ composition, serveUrl, codec: "h264", crf: 18, outputLocation: "out/bluethroat_raw.mp4", browserExecutable, chromiumOptions, concurrency: 2, timeoutInMilliseconds: 240000,
  onProgress: ({ progress }) => { if (Math.round(progress * 100) % 10 === 0) console.log(Math.round(progress * 100)); } });
fs.rmSync(serveUrl, { recursive: true, force: true }); console.log("done");
