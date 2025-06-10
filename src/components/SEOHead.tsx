import React from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  keywords?: string;
  noindex?: boolean;
  structuredData?: object;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage,
  keywords,
  noindex = false,
  structuredData
}) => {
  React.useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }
    
    // Update keywords if provided
    if (keywords) {
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }
    
    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }
    
    // Update robots meta tag
    const robotsMeta = document.querySelector('meta[name="robots"]');
    if (robotsMeta) {
      robotsMeta.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow');
    }
    
    // Update Open Graph tags
    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
      ogTitleMeta.setAttribute('content', ogTitle || title);
    }
    
    const ogDescMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescMeta) {
      ogDescMeta.setAttribute('content', ogDescription || description);
    }
    
    const ogUrlMeta = document.querySelector('meta[property="og:url"]');
    if (ogUrlMeta && canonical) {
      ogUrlMeta.setAttribute('content', canonical);
    }
    
    if (ogImage) {
      const ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (ogImageMeta) {
        ogImageMeta.setAttribute('content', ogImage);
      }
    }
    
    // Update Twitter Card tags
    const twitterTitleMeta = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitleMeta) {
      twitterTitleMeta.setAttribute('content', ogTitle || title);
    }
    
    const twitterDescMeta = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescMeta) {
      twitterDescMeta.setAttribute('content', ogDescription || description);
    }
    
    const twitterUrlMeta = document.querySelector('meta[property="twitter:url"]');
    if (twitterUrlMeta && canonical) {
      twitterUrlMeta.setAttribute('content', canonical);
    }
    
    if (ogImage) {
      const twitterImageMeta = document.querySelector('meta[property="twitter:image"]');
      if (twitterImageMeta) {
        twitterImageMeta.setAttribute('content', ogImage);
      }
    }

    // Add structured data if provided
    if (structuredData) {
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"][data-dynamic]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic', 'true');
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

    // Add breadcrumb structured data for non-home pages
    if (canonical && canonical !== 'https://calculatortdee.app') {
      const breadcrumbScript = document.querySelector('script[data-breadcrumb]');
      if (breadcrumbScript) {
        breadcrumbScript.remove();
      }

      const pageName = canonical.split('/').pop();
      const breadcrumbData = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://calculatortdee.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": title.split('|')[0].trim(),
            "item": canonical
          }
        ]
      };

      const breadcrumbScriptEl = document.createElement('script');
      breadcrumbScriptEl.type = 'application/ld+json';
      breadcrumbScriptEl.setAttribute('data-breadcrumb', 'true');
      breadcrumbScriptEl.textContent = JSON.stringify(breadcrumbData);
      document.head.appendChild(breadcrumbScriptEl);
    }
  }, [title, description, canonical, ogTitle, ogDescription, ogImage, keywords, noindex, structuredData]);

  return null;
};

export default SEOHead;