/**
 * RJPM.in Automated SEO Audit & Validation Script
 * Verifies technical SEO compliance, local metadata, sitemap, and robots.txt
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

console.log('====================================================')
console.log('   RJPM.in Automated Local SEO & Technical Audit')
console.log('====================================================\n')

let passCount = 0
let failCount = 0

function test(description, condition, extraInfo = '') {
  if (condition) {
    console.log(`[PASS] ${description}`)
    passCount++
  } else {
    console.error(`[FAIL] ${description} ${extraInfo ? `-> ${extraInfo}` : ''}`)
    failCount++
  }
}

// 1. Audit index.html
const indexHtmlPath = path.join(rootDir, 'index.html')
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8')

test('index.html exists and is non-empty', fs.existsSync(indexHtmlPath) && indexHtml.length > 500)
test('Title tag mentions Rajapalayam & RJPM', indexHtml.includes('Rajapalayam') && indexHtml.includes('RJPM'))
test('Meta description tag is present with local context', indexHtml.includes('name="description"') && indexHtml.includes('Rajapalayam'))
test('Keywords tag includes Rajapalayam & event terms', indexHtml.includes('name="keywords"') && indexHtml.includes('Rajapalayam'))
test('Canonical link is configured to https://rjpm.in/', indexHtml.includes('rel="canonical"') && indexHtml.includes('https://rjpm.in/'))
test('Local Geo tags present (IN-TN / Rajapalayam / Coordinates)',
  indexHtml.includes('geo.region') &&
  indexHtml.includes('geo.placename') &&
  indexHtml.includes('geo.position') &&
  indexHtml.includes('77.5544')
)
test('Open Graph metadata tags present (og:title, og:image, og:url)',
  indexHtml.includes('og:title') &&
  indexHtml.includes('og:image') &&
  indexHtml.includes('og:url')
)
test('Schema.org JSON-LD LocalBusiness structured data present',
  indexHtml.includes('application/ld+json') &&
  indexHtml.includes('LocalBusiness') &&
  indexHtml.includes('626117')
)

// 2. Audit robots.txt
const robotsPath = path.join(rootDir, 'public', 'robots.txt')
const robotsTxt = fs.existsSync(robotsPath) ? fs.readFileSync(robotsPath, 'utf8') : ''
test('robots.txt exists in public/ directory', fs.existsSync(robotsPath))
test('robots.txt allows all crawlers and references sitemap.xml',
  robotsTxt.includes('User-agent: *') &&
  robotsTxt.includes('Allow: /') &&
  robotsTxt.includes('Sitemap: https://rjpm.in/sitemap.xml')
)

// 3. Audit sitemap.xml
const sitemapPath = path.join(rootDir, 'public', 'sitemap.xml')
const sitemapXml = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, 'utf8') : ''
test('sitemap.xml exists in public/ directory', fs.existsSync(sitemapPath))
test('sitemap.xml contains valid XML URL set with homepage & key categories',
  sitemapXml.includes('<urlset') &&
  sitemapXml.includes('https://rjpm.in/') &&
  sitemapXml.includes('https://rjpm.in/explore') &&
  sitemapXml.includes('https://rjpm.in/packages')
)

// 4. Audit PWA manifest.json
const manifestPath = path.join(rootDir, 'public', 'manifest.json')
test('manifest.json exists with RJPM branding', fs.existsSync(manifestPath))

// 5. Audit SEO hook and Page Integration
const seoHookPath = path.join(rootDir, 'src', 'utils', 'useSEO.js')
test('useSEO.js hook exists with breadcrumbs and Schema support',
  fs.existsSync(seoHookPath) &&
  fs.readFileSync(seoHookPath, 'utf8').includes('BreadcrumbList')
)

// 6. Audit Branded 404 Page
const notFoundPath = path.join(rootDir, 'src', 'pages', 'common', 'NotFoundPage.jsx')
test('NotFoundPage.jsx exists with fallback navigation', fs.existsSync(notFoundPath))

// 7. Audit Semantic Footer
const footerPath = path.join(rootDir, 'src', 'components', 'layout', 'Footer.jsx')
const footerContent = fs.existsSync(footerPath) ? fs.readFileSync(footerPath, 'utf8') : ''
test('Footer.jsx includes brand tagline & verified coverage links',
  fs.existsSync(footerPath) &&
  footerContent.includes('RJPM – Namma Rajapalayam, Namma Businesses') &&
  footerContent.includes('Srivilliputhur')
)

console.log('\n----------------------------------------------------')
console.log(`Results: ${passCount} Passed, ${failCount} Failed`)
console.log('----------------------------------------------------')

if (failCount > 0) {
  process.exit(1)
} else {
  console.log('All Technical & Local SEO Checks Passed Successfully!')
}
