'use client';

import Script from 'next/script';

export default function AosInit() {
  return (
    <Script 
      src="https://unpkg.com/aos@2.3.1/dist/aos.js" 
      strategy="lazyOnload" 
      onLoad={() => {
        const AOS = (typeof window !== 'undefined' ? (window as unknown as { AOS?: { init: (opts: Record<string, unknown>) => void } }).AOS : undefined);
        if (AOS) {
          AOS.init({
            duration: 800,
            once: true,
            offset: 100,
          });
        }
      }}
    />
  );
}