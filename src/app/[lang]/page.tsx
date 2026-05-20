import React from 'react';
import dynamic from 'next/dynamic';
import { dictionaries } from '@/lib/dictionaries';

// ПЕРВЫЙ ЭКРАН
import Header from '@/components/Header';
import HeroForm from '@/components/HeroForm';
import HomeStats from '@/components/HomeStats';
import Footer from '@/components/Footer';
import MyManagerCTA from "@/components/MyManagerCTA";

// НИЖЕ СКРОЛЛА
const HowItWorks = dynamic(() => import('@/components/HowItWorks'));
const Comparison = dynamic(() => import('@/components/Comparison'));
const FeaturesSEO = dynamic(() => import('@/components/FeaturesSEO'));
const AudienceSEO = dynamic(() => import('@/components/AudienceSEO'));
const FAQ = dynamic(() => import('@/components/FAQ'));
const HomeSeoBlock = dynamic(() => import('@/components/HomeSeoBlock'));
const HomePayments = dynamic(() => import('@/components/HomePayments'));
const HomeGeo = dynamic(() => import('@/components/HomeGeo'));
const HomeBlogWidget = dynamic(() => import('@/components/HomeBlogWidget'));
const ProfitCalculator = dynamic(() => import('@/components/ProfitCalculator'));

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {

  const { lang } = await params;
  const langKey = (lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header langKey={langKey} t={t} />
      
      <main className="flex-grow">
        <HeroForm t={t} />
        
        {/* 1. Блок статистики */}
        <HomeStats t={t} />

        <HowItWorks t={t} />

        {/* 2. Блок платежных систем */}
        <HomePayments t={t} />

        <MyManagerCTA t={t} langKey={langKey} />

        <Comparison t={t} />
        

        <FeaturesSEO t={t} />

        {/* 3. Блок Гео-охвата */}
        <HomeGeo t={t} />

        <AudienceSEO t={t} />

        {/* 4. Блок новостей */}
        <HomeBlogWidget langKey={langKey} t={t} />

        {/* 4. Калькулятор */}
        <ProfitCalculator langKey={langKey} t={t} />

        {/* 5. Блок FAQ */}
        <FAQ t={t} />

        {/* 6. Блок SEO */}
        <HomeSeoBlock t={t} />

      </main>

      <Footer langKey={langKey} t={t} />
    </div>
  );
}