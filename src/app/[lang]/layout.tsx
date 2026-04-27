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
  
  // Базовый URL твоего сайта (замени на реальный домен перед релизом)
  const baseUrl = 'https://1xmobcash.net';

  // Создаем объект hreflang для текущего пути
  const languages: Record<string, string> = {
    'x-default': `${baseUrl}/en`, // Язык по умолчанию
  };
  
  locales.forEach((locale) => {
    languages[locale] = `${baseUrl}/${locale}`;
  });

  return {
    title: "1xMobCash | Global Network",
    description: "Join the most extensive iGaming network as an Agent or Partner.",
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: languages,
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
    <html lang={params.lang} dir={dir}>
      <body className="antialiased bg-slate-50 text-gray-900">
        {/* Здесь в будущем можно добавить глобальные <Header /> и <Footer /> */}
        {children}
      </body>
    </html>
  );
}