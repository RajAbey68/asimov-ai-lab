import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
}

const SEO = ({
    title = "Asimov AI - Operationalizing AI Governance & Risk",
    description = "Asimov AI helps organisations operationalise AI governance, ensuring compliance with the EU AI Act, NIST AI RMF, and ISO 42001 while accelerating delivery.",
    keywords = "AI Governance, AI Risk Management, EU AI Act, NIST AI RMF, AI Audit, AI Compliance, Responsible AI",
    canonical
}: SEOProps) => {
    const siteUrl = 'https://www.asimov-ai.org';
    const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

    return (
        <Helmet>
            {/* Basic Metadata */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:site_name" content="Asimov AI" />
            <meta property="og:image" content={`${siteUrl}/og-image.png`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={`${siteUrl}/og-image.png`} />
        </Helmet>
    );
};

export default SEO;
