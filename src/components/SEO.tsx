import { Helmet } from "react-helmet-async";

type Props = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  lang?: "id" | "en";
};

export default function SEO({ title, description, canonical, ogImage, lang }: Props) {
  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* hreflang */}
      <link rel="alternate" hrefLang="id" href="https://arkahf.com/" />
      <link rel="alternate" hrefLang="en" href="https://arkahf.com/?lang=en" />
      <link rel="alternate" hrefLang="x-default" href="https://arkahf.com/" />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Helmet>
  );
}
