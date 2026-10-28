import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const iconsDir = path.join(rootDir, 'public', 'icons')

if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true })
}

// 1. Standard 512x512 SVG
const standardSvg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="evLgBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="evLgStar" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%" filterUnits="userSpaceOnUse">
      <feDropShadow dx="0" dy="8" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.3" />
    </filter>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#evLgBg)" />
  <rect x="6" y="6" width="500" height="500" rx="106" stroke="rgba(255,255,255,0.25)" stroke-width="4" />
  <g id="brandMark">
    <text x="44%" y="67%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="280" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">R</text>
    <path d="M358.4 89.6L373.76 133.12L417.28 148.48L373.76 163.84L358.4 207.36L343.04 163.84L299.52 148.48L343.04 133.12L358.4 89.6Z" fill="url(#evLgStar)" filter="url(#shadow)" />
  </g>
</svg>`

// 2. Standard 192x192 SVG
const standardSvg192 = `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="evLgBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="evLgStar" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#evLgBg)" />
  <rect x="6" y="6" width="500" height="500" rx="106" stroke="rgba(255,255,255,0.25)" stroke-width="4" />
  <g id="brandMark">
    <text x="44%" y="67%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="280" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">R</text>
    <path d="M358.4 89.6L373.76 133.12L417.28 148.48L373.76 163.84L358.4 207.36L343.04 163.84L299.52 148.48L343.04 133.12L358.4 89.6Z" fill="url(#evLgStar)" />
  </g>
</svg>`

// 3. Maskable 512x512 SVG (Edge-to-edge solid background, brand mark centered within 70% safe area)
const maskableSvg512 = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512" fill="none">
  <defs>
    <linearGradient id="evLgBg" x1="0" y1="0" x2="512" y2="512" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#1e3a8a" />
    </linearGradient>
    <linearGradient id="evLgStar" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="50%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
  </defs>
  <!-- Full edge-to-edge background without rounded corners for maskable spec -->
  <rect width="512" height="512" fill="url(#evLgBg)" />
  <!-- Brand logo scaled and centered strictly within safe circular area (diameter 410px) -->
  <g transform="translate(64, 64) scale(0.75)">
    <rect width="512" height="512" rx="100" fill="rgba(255,255,255,0.08)" />
    <rect x="4" y="4" width="504" height="504" rx="96" stroke="rgba(255,255,255,0.3)" stroke-width="4" />
    <text x="44%" y="67%" text-anchor="middle" dominant-baseline="middle" fill="#ffffff" font-size="280" font-weight="900" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif">R</text>
    <path d="M358.4 89.6L373.76 133.12L417.28 148.48L373.76 163.84L358.4 207.36L343.04 163.84L299.52 148.48L343.04 133.12L358.4 89.6Z" fill="url(#evLgStar)" />
  </g>
</svg>`

function renderSvgToPng(svgContent, size, outputPath) {
  const tempHtml = path.join(rootDir, `temp-${size}.html`)
  const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: ${size}px; height: ${size}px; overflow: hidden; background: transparent; }
    svg { display: block; width: ${size}px; height: ${size}px; }
  </style>
</head>
<body>
${svgContent}
</body>
</html>`

  fs.writeFileSync(tempHtml, html, 'utf8')

  const cmd = `"${chromePath}" --headless=new --screenshot="${outputPath}" --window-size=${size},${size} --default-background-color=00000000 --hide-scrollbars "file://${tempHtml.replace(/\\/g, '/')}"`
  execSync(cmd, { stdio: 'pipe' })

  fs.unlinkSync(tempHtml)
  console.log(`Generated ${path.basename(outputPath)} (${size}x${size})`)
}

console.log('Generating PWA icons...')
renderSvgToPng(standardSvg192, 192, path.join(iconsDir, 'icon-192.png'))
renderSvgToPng(standardSvg512, 512, path.join(iconsDir, 'icon-512.png'))
renderSvgToPng(maskableSvg512, 512, path.join(iconsDir, 'icon-maskable-512.png'))

// Also update apple-touch-icon.png (180x180) and favicons with real PNGs
renderSvgToPng(standardSvg192, 180, path.join(rootDir, 'public', 'apple-touch-icon.png'))
renderSvgToPng(standardSvg192, 32, path.join(rootDir, 'public', 'favicon-32x32.png'))
renderSvgToPng(standardSvg192, 16, path.join(rootDir, 'public', 'favicon-16x16.png'))

console.log('All icons generated successfully!')
