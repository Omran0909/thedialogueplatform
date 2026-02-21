import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Layout } from "@/components/Layout";
import { getContent } from "@/lib/i18n/get-content";
import { getDir, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/site";

type LayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

const localeToOg: Record<Locale, string> = {
  en: "en_US",
  no: "nb_NO",
  ar: "ar_SA",
};

const languageAlternates: Record<Locale, string> = {
  en: "/en",
  no: "/no",
  ar: "/ar",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: LayoutProps): Metadata {
  if (!isLocale(params.locale)) {
    return {};
  }

  const locale = params.locale;
  const localized = getContent(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description: localized.metadata.siteDescription,
    keywords: localized.metadata.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: languageAlternates.en,
        no: languageAlternates.no,
        ar: languageAlternates.ar,
      },
    },
    openGraph: {
      type: "website",
      locale: localeToOg[locale],
      url: `${siteConfig.url}/${locale}`,
      siteName: siteConfig.name,
      title: siteConfig.name,
      description: localized.metadata.siteDescription,
      images: [
        {
          url: "/assets/logo.png",
          width: 512,
          height: 512,
          alt: `${siteConfig.name} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: siteConfig.name,
      description: localized.metadata.siteDescription,
      images: ["/assets/logo.png"],
    },
  };
}

export default function LocaleLayout({ children, params }: LayoutProps) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale;

  return (
    <div lang={locale} dir={getDir(locale)}>
      <Layout locale={locale}>{children}</Layout>
    </div>
  );
}
