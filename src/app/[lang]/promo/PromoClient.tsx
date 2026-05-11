'use client';

import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

const FONTS = ['Impact', 'Arial Black', 'Verdana', 'Tahoma', 'Trebuchet MS', 'sans-serif'];

type DynamicBanner = {
  id: number;
  url: string;
  width: number;
  height: number;
  textX: number;
  textY: number;
  fontSize: number;
  textColor: string;
  qrX: number;
  qrY: number;
  qrSize: number;
};

export default function PromoClient({ t, bannerUrls = [] }: { t: any, bannerUrls?: string[] }) {
  const [promoCode, setPromoCode] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [qrPreview, setQrPreview] = useState<string>('');
  const [banners, setBanners] = useState<DynamicBanner[]>([]);
  const [editingBanner, setEditingBanner] = useState<DynamicBanner | null>(null);
  // ИСПРАВЛЕНО: Добавили color в конфигурацию
  const [bannerConfig, setBannerConfig] = useState({ x: 50, y: 50, size: 70, rotation: 0, font: 'Impact', color: '#ffffff' });

  const updateConfig = (key: string, value: number | string) => {
    setBannerConfig(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    if (!bannerUrls.length) return;

    const loadImages = async () => {
      const results = await Promise.all(bannerUrls.map(url => 
        new Promise<DynamicBanner | null>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            resolve({
              id: Math.random(),
              url, width: w, height: h,
              textX: w / 2, textY: h * 0.85,
              fontSize: Math.max(w * 0.06, 40),
              textColor: '#ffffff', // Базовый цвет
              qrX: w * 0.75, qrY: h * 0.75, qrSize: Math.max(w * 0.2, 100)
            });
          };
          img.onerror = () => resolve(null);
          img.src = url;
        })
      ));
      setBanners(results.filter((b): b is DynamicBanner => b !== null));
    };

    loadImages();
  }, [bannerUrls]);

  useEffect(() => {
    if (!promoCode && !editingBanner) return;
    const code = promoCode.trim() || 'YOURPROMO';
    QRCode.toDataURL(`https://1xmobcash.net/?promo=${code}`, {
      width: 200, margin: 1, color: { dark: '#0f172a', light: '#ffffff' }
    }).then(setQrPreview).catch(() => {});
  }, [promoCode, editingBanner]);

  const openEditor = (banner: DynamicBanner) => {
    setBannerConfig({
      x: (banner.textX / banner.width) * 100, 
      y: (banner.textY / banner.height) * 100,
      size: banner.fontSize,
      rotation: 0,
      font: 'Impact',
      color: banner.textColor // Подхватываем цвет при открытии
    });
    setEditingBanner(banner);
  };

  const handleDownload = async () => {
    if (!editingBanner) return;
    setDownloadingId(editingBanner.id);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const img = new Image();
      img.crossOrigin = 'anonymous'; 
      await new Promise((resolve) => { img.onload = resolve; img.src = editingBanner.url; });

      canvas.width = editingBanner.width;
      canvas.height = editingBanner.height;
      ctx.drawImage(img, 0, 0);

      const finalPromo = promoCode.trim() || 'YOURPROMO';
      const qrDataUrl = await QRCode.toDataURL(`https://1xmobcash.net/?promo=${finalPromo}`, {
        width: editingBanner.qrSize, margin: 1, color: { dark: '#0f172a', light: '#ffffff' }
      });

      const qrImg = new Image();
      await new Promise((resolve) => { qrImg.onload = resolve; qrImg.src = qrDataUrl; });

      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 15;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(editingBanner.qrX - 10, editingBanner.qrY - 10, editingBanner.qrSize + 20, editingBanner.qrSize + 20);
      ctx.shadowBlur = 0;
      ctx.drawImage(qrImg, editingBanner.qrX, editingBanner.qrY, editingBanner.qrSize, editingBanner.qrSize);

      ctx.save(); 
      ctx.translate((bannerConfig.x / 100) * canvas.width, (bannerConfig.y / 100) * canvas.height); 
      ctx.rotate((bannerConfig.rotation * Math.PI) / 180); 
      ctx.font = `900 ${bannerConfig.size}px "${bannerConfig.font}"`;
      
      ctx.fillStyle = bannerConfig.color; 
      
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 12;
      ctx.fillText(finalPromo.toUpperCase(), 0, 0); 
      ctx.restore(); 

      const link = document.createElement('a');
      link.download = `Promo_${finalPromo}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.9);
      link.click();
      setEditingBanner(null);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="w-full">
      <div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' } as any}
      >
        {banners.map((banner) => (
          <div 
            key={banner.id} 
            onClick={() => openEditor(banner)}
            className="group relative bg-[#1e293b] rounded-2xl overflow-hidden cursor-pointer aspect-square"
          >
            <img 
              src={banner.url} 
              loading="lazy"
              alt="Banner" 
              className="w-full h-full object-cover will-change-transform group-hover:scale-105 transition-transform duration-300" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
               <div className="bg-blue-600 text-white text-xs font-bold py-2 px-4 rounded-full uppercase">Customize</div>
            </div>
          </div>
        ))}
      </div>

      {editingBanner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#0b1120] border border-white/10 w-full max-w-5xl rounded-3xl flex flex-col lg:flex-row overflow-hidden shadow-2xl">
            
            <div className="w-full lg:w-1/2 p-4 bg-[#1e293b] flex items-center justify-center">
               <div 
                 className="relative w-full shadow-2xl" 
                 style={{ 
                   aspectRatio: `${editingBanner.width}/${editingBanner.height}`,
                   containerType: 'inline-size'
                 }}
               >
                  <img src={editingBanner.url} className="w-full h-full" alt="Preview" />
                  <span 
                    className="absolute font-black uppercase whitespace-nowrap pointer-events-none"
                    style={{
                      color: bannerConfig.color, // ИСПРАВЛЕНО: Цвет в превью теперь берется из ползунка
                      fontFamily: bannerConfig.font,
                      left: `${bannerConfig.x}%`, 
                      top: `${bannerConfig.y}%`,
                      transform: `translate(-50%, -50%) rotate(${bannerConfig.rotation}deg)`,
                      fontSize: `${(bannerConfig.size / editingBanner.width) * 100}cqi`,
                      textShadow: '0 4px 10px rgba(0,0,0,0.5)'
                    }}
                  >
                    {promoCode || 'PROMO'}
                  </span>
                  {qrPreview && (
                    <img 
                      src={qrPreview} 
                      className="absolute p-1 bg-white rounded shadow-sm"
                      style={{
                        left: `${(editingBanner.qrX / editingBanner.width) * 100}%`,
                        top: `${(editingBanner.qrY / editingBanner.height) * 100}%`,
                        width: `${(editingBanner.qrSize / editingBanner.width) * 100}%`,
                      }}
                      alt="QR"
                    />
                  )}
               </div>
            </div>

            <div className="w-full lg:w-1/2 p-8 space-y-6 overflow-y-auto max-h-[80vh]">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-black text-white uppercase">Editor</h3>
                <button onClick={() => setEditingBanner(null)} className="text-slate-500 hover:text-white transition-colors">✕</button>
              </div>

              <input 
                type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO CODE"
                className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-4 text-white font-bold outline-none focus:border-blue-500 transition-colors uppercase"
                maxLength={15}
              />

              <div className="grid grid-cols-2 gap-4">
                {['size', 'rotation', 'x', 'y'].map((key) => (
                  <div key={key} className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase flex justify-between">
                      <span>{key}</span>
                      <span className="text-blue-400">{Math.round((bannerConfig as any)[key])}</span>
                    </label>
                    <input 
                      type="range" 
                      min={key === 'rotation' ? -90 : key === 'size' ? 20 : 0} 
                      max={key === 'size' ? 300 : key === 'rotation' ? 90 : 100}
                      value={(bannerConfig as any)[key]} 
                      onChange={(e) => updateConfig(key, Number(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                ))}
              </div>

              {/* Блок выбора шрифта и цвета */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Font Family</label>
                  <select 
                    value={bannerConfig.font} onChange={(e) => updateConfig('font', e.target.value)}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500 cursor-pointer h-[50px]"
                  >
                    {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Color</label>
                  <div className="w-full flex items-center justify-between bg-[#1e293b] border border-white/10 rounded-xl p-2 px-3 h-[50px]">
                    <div className="flex items-center gap-3 w-full">
                      <input 
                        type="color" 
                        value={bannerConfig.color}
                        onChange={(e) => updateConfig('color', e.target.value)}
                        className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent p-0"
                      />
                      <span className="text-white text-sm font-semibold uppercase tracking-wider">{bannerConfig.color}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleDownload} disabled={!!downloadingId}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all disabled:opacity-50 mt-4"
              >
                {downloadingId ? 'Generating...' : 'Download Banner'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}