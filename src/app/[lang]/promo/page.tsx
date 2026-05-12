import fs from 'fs';
import path from 'path';
import type { Metadata } from "next";
import { dictionaries } from '@/lib/dictionaries';
import dynamic from 'next/dynamic'; 
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

const PromoClient = dynamic(() => import('./PromoClient'), { 
  loading: () => (
    <div className="flex flex-col items-center justify-center py-32 opacity-70 animate-pulse">
      <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">Loading tools...</p>
    </div>
  )
});

export const revalidate = 0; 

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const baseUrl = 'https://1xmobcash.net';
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return {
    title: t.promo?.metaTitle || "1xMobCash | Promo Materials & Banners",
    description: t.promo?.metaDescription || "Download high-converting promotional banners for your campaigns.",
    alternates: { canonical: `${baseUrl}/${lang}/promo` },
  };
}

export default async function PromoPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  let bannerUrls: string[] = [];
  try {
    const dirPath = path.join(process.cwd(), 'public', 'banners');
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath);
      bannerUrls = files
        .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
        .map(file => `/banners/${file}`);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header t={t} langKey={langKey} />
      
      <main className="flex-grow">
        <section className="relative w-full pt-24 pb-20 lg:pt-36 lg:pb-24 overflow-hidden">
          {/* Тот самый красивый фоновый светящийся эффект */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16">
            {/* Пульсирующий бейдж */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold uppercase tracking-wider mb-8">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
              PROMO MATERIALS
            </div>

            {/* Большой заголовок */}
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-tight tracking-tight mb-8 max-w-5xl mx-auto">
              {t.promo?.title || "Promo Materials"}
            </h1>
            
            {/* Описание */}
            <p className="text-lg md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              {t.promo?.subtitle || "Boost your conversions with our official banners. Enter your promo code, preview, and download instantly."}
            </p>
          </div>

          {/* Контейнер для сетки баннеров */}
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 min-h-[400px]">
             <PromoClient t={t} bannerUrls={bannerUrls} />
          </div>
        </section>
      </main>

      <Footer t={t} langKey={langKey} />
    </div>
  );
}