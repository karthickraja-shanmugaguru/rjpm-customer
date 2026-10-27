import { useEffect } from 'react'

/**
 * Custom hook to dynamically manage page-level SEO meta tags, title, OpenGraph, Canonical, and Schema.org JSON-LD
 */
export const useSEO = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  breadcrumbs,
  schema,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    const baseTitle = 'RJPM.in — Namma Rajapalayam, Namma Businesses'
    const finalTitle = title ? `${title} | RJPM.in` : baseTitle
    document.title = finalTitle

    // Helper to set or create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      if (!content) return
      let element = document.querySelector(`meta[${attribute}="${attrValue}"]`)
      if (!element) {
        element = document.createElement('meta')
        element.setAttribute(attribute, attrValue)
        document.head.appendChild(element)
      }
      element.setAttribute('content', content)
    }

    // 2. Standard Meta Description
    const defaultDesc = 'Discover & book top verified local businesses and event services in Rajapalayam (RJPM). Explore wedding mandapams, catering, stage decoration, photography, and celebration packages.'
    setMetaTag('name', 'description', description || defaultDesc)

    // 3. Keywords
    if (keywords) {
      setMetaTag('name', 'keywords', `RJPM, rjpm.in, Rajapalayam, Namma Rajapalayam, ${keywords}`)
    }

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', finalTitle)
    setMetaTag('property', 'og:description', description || defaultDesc)
    setMetaTag('property', 'og:site_name', 'RJPM.in — Namma Rajapalayam, Namma Businesses')
    if (ogImage) {
      setMetaTag('property', 'og:image', ogImage)
    }

    // 5. Canonical Link
    const targetCanonical = canonical || window.location.origin + window.location.pathname
    let canonicalLink = document.querySelector('link[rel="canonical"]')
    if (!canonicalLink) {
      canonicalLink = document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      document.head.appendChild(canonicalLink)
    }
    canonicalLink.setAttribute('href', targetCanonical)

    // 6. JSON-LD Structured Data
    const schemaElements = []
    if (breadcrumbs && breadcrumbs.length > 0) {
      schemaElements.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': breadcrumbs.map((b, idx) => ({
          '@type': 'ListItem',
          'position': idx + 1,
          'name': b.name,
          'item': b.path.startsWith('http') ? b.path : `https://rjpm.in${b.path}`,
        })),
      })
    }

    if (schema) {
      if (Array.isArray(schema)) {
        schemaElements.push(...schema)
      } else {
        schemaElements.push(schema)
      }
    }

    let scriptTag = document.getElementById('rjpm-dynamic-seo-schema')
    if (schemaElements.length > 0) {
      if (!scriptTag) {
        scriptTag = document.createElement('script')
        scriptTag.id = 'rjpm-dynamic-seo-schema'
        scriptTag.type = 'application/ld+json'
        document.head.appendChild(scriptTag)
      }
      scriptTag.textContent = JSON.stringify(
        schemaElements.length === 1 ? schemaElements[0] : { '@context': 'https://schema.org', '@graph': schemaElements }
      )
    } else if (scriptTag) {
      scriptTag.remove()
    }

    return () => {
      // Optional cleanup on route transition
    }
  }, [title, description, keywords, canonical, ogImage, JSON.stringify(breadcrumbs), JSON.stringify(schema)])
}

export default useSEO
