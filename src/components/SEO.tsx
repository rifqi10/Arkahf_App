type Props = {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
};

export default function SEO({ title, description, canonical, ogImage }: Props) {
  return (
    <>
      <title>{title}</title>

      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </>
  );
}
