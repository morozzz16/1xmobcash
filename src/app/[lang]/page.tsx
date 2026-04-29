'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { dictionaries } from '@/lib/dictionaries';
import Header from '@/components/Header';
import HeroForm from '@/components/HeroForm';
import HowItWorks from '@/components/HowItWorks';
import Comparison from '@/components/Comparison';
import FeaturesSEO from '@/components/FeaturesSEO'; // <-- ИМПОРТ 1
import AudienceSEO from '@/components/AudienceSEO'; // <-- ИМПОРТ 2
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  const params = useParams();
  
  const langKey = (params.lang as keyof typeof dictionaries) || 'en';
  const t = dictionaries[langKey] || dictionaries['en'];

  const [role, setRole] = useState('agent');

  const handleRoleSelect = (selectedRole: string) => {
    setRole(selectedRole);
    const formElement = document.getElementById('registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-200 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      <Header langKey={langKey as string} t={t} />
      
      <main className="flex-grow">
        <HeroForm t={t} role={role} setRole={setRole} />
        <HowItWorks t={t} />
        <Comparison t={t} onSelectRole={handleRoleSelect} />
        <FeaturesSEO t={t} />
        <AudienceSEO t={t} />
        <FAQ t={t} />
      </main>
      
      <Footer langKey={langKey as string} t={t} />
    </div>
  );
}