import type { Metadata } from "next";
import "../globals.css";

// Поддерживаемые языки
const locales = ['en', 'fr', 'es', 'ar', 'hi'];

// Генерация статических параметров для всех языков (SSG)
export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Динамическая генерация SEO-метаданных
export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  const lang = params.lang;
  const baseUrl = 'https://1xmobcash.net';

  // Словари для заголовков и описаний
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
    hi: "1xMobCash नेटवर्क में शामिल हों। 1xBet एजेंट или पार्टनर के रूप में उच्च कमीशन कमाएं। ग्लोबल पेमेंट।",
  };

  // Создаем объект hreflang
  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en`,
  };
  locales.forEach((locale) => {
    languages[locale] = `${baseUrl}/${locale}`;
  });

  const currentTitle = titles[lang] || titles['en'];
  const currentDesc = descriptions[lang] || descriptions['en'];

  return {
    title: currentTitle,
    description: currentDesc,
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: languages,
    },
    // Настройки для соцсетей и мессенджеров (Telegram, WhatsApp)
    openGraph: {
      title: currentTitle,
      description: currentDesc,
      url: `${baseUrl}/${lang}`,
      siteName: '1xMobCash',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`, // Файл должен лежать в public/og-image.jpg
          width: 1200,
          height: 630,
          alt: '1xMobCash Global Partner Network',
        },
      ],
      locale: lang === 'ar' ? 'ar_AR' : 'en_US',
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

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  // Определяем направление текста (RTL для арабского)
  const dir = params.lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={params.lang} dir={dir} className="scroll-smooth">
      <body className="antialiased bg-[#070b14] text-slate-200">
        {children}
      </body>
    </html>
  );
}