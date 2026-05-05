import type { Metadata } from "next";
import AosInit from "@/components/AosInit";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', 
});

// Поддерживаемые языки
const locales = ['en', 'fr', 'es', 'ar', 'hi'];

// Генерация статических параметров для всех языков (SSG)
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = 'https://1xmobcash.net';

  const titles: Record<string, string> = {
    en: "1xMobCash | Official 1xBet Agent & Partner Program",
    fr: "1xMobCash | Programme Officiel d'Agent et Partenaire 1xBet",
    es: "1xMobCash | Programa Oficial de Agentes y Socios de 1xBet",
    ar: "1xMobCash | برنامج وكلاء وشركاء 1xBet الرسمي",
    hi: "1xMobCash | आधिकारिक 1xBet एजेंट और पार्टनर प्रोग्राम",
  };

  const descriptions: Record<string, string> = {
    en: "Join the 1xMobCash network. Earn high commissions as a 1xBet agent or affiliate partner. Global payments and 24/7 support.",
    fr: "Rejoignez le réseau 1xMobCash. Gagnez des commissions élevées en tant qu'agent ou partenaire 1xBet. Paiements mondiaux.",
    es: "Únete a la red 1xMobCash. Gana altas comisiones como agente o socio afiliado de 1xBet. Pagos globales.",
    ar: "انضم إلى شبكة 1xMobCash. اربح عمولات عالية كوكيل أو شريك تابع لـ 1xBet. مدفوعات عالمية.",
    hi: "1xMobCash नेटवर्क में शामिल हों। 1xBet एजेंट या पार्टनर के रूप में उच्च कमीशन कमाएं। ग्लोबल पेमेंट।",
  };

  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en`,
  };
  locales.forEach((locale) => {
    languages[locale] = `${baseUrl}/${locale}`;
  });

  const currentTitle = titles[lang] || titles['en'];
  const currentDesc = descriptions[lang] || descriptions['en'];

  const ogLocales: Record<string, string> = {
    en: 'en_US',
    fr: 'fr_FR',
    es: 'es_ES',
    ar: 'ar_SA',
    hi: 'hi_IN'
  };

  return {
    title: currentTitle,
    description: currentDesc,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: languages,
    },
    openGraph: {
      title: currentTitle,
      description: currentDesc,
      url: `${baseUrl}/${lang}`,
      siteName: '1xMobCash',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: '1xMobCash Global Partner Network',
        },
      ],
      locale: ogLocales[lang] || 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: currentTitle,
      description: currentDesc,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={lang} dir={dir} className="scroll-smooth">
      <head>
        <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased bg-[#070b14] text-slate-200`}>
        
        {children}

        <AosInit />
      </body>
    </html>
  );
}