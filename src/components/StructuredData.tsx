import { Helmet } from "react-helmet";

const StructuredData = () => {
  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Asimov AI",
    "alternateName": "Asimov AI Lab",
    "url": "https://asimov-ai.org",
    "logo": "https://asimov-ai.org/logo.png",
    "description": "Expert AI risk assessment and project delivery services. Navigate AI with confidence through comprehensive evaluation, rapid assessment, and expert consultation.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+44-7733-393956",
      "contactType": "customer service",
      "email": "info@asimov-ai.org",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.linkedin.com/company/asimov-ai"
    ],
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "serviceType": [
      "AI Risk Assessment",
      "AI Governance Consulting",
      "AI Compliance Services",
      "AI Project Delivery",
      "EU AI Act Compliance"
    ]
  };

  // LocalBusiness Schema
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Asimov AI",
    "image": "https://asimov-ai.org/logo.png",
    "telephone": "+44-7733-393956",
    "email": "info@asimov-ai.org",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "London",
      "addressCountry": "GB"
    },
    "priceRange": "£££",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "17:00"
    }
  };

  // Service Schema - AI Risk Assessment
  const riskAssessmentService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Risk Assessment",
    "provider": {
      "@type": "Organization",
      "name": "Asimov AI"
    },
    "areaServed": "Worldwide",
    "description": "Comprehensive AI risk assessment aligned with EU AI Act, GDPR, and industry-specific regulatory requirements. Expert evaluation of AI systems for compliance, governance, and ethical deployment.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  // Service Schema - AI Governance Consulting
  const governanceService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "AI Governance Consulting",
    "provider": {
      "@type": "Organization",
      "name": "Asimov AI"
    },
    "areaServed": "Worldwide",
    "description": "Strategic AI governance consulting for enterprises. We help organizations establish robust AI governance frameworks aligned with ASIMOV methodology and regulatory requirements.",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock"
    }
  };

  // WebSite Schema with Search Action
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Asimov AI",
    "url": "https://asimov-ai.org",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://asimov-ai.org/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://asimov-ai.org/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://asimov-ai.org/#services"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Assessment",
        "item": "https://asimov-ai.org/assessment"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Framework",
        "item": "https://asimov-ai.org/framework"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(riskAssessmentService)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(governanceService)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;
