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

// Принимаем bannerUrls из серверного page.tsx
export default function PromoClient({ t, bannerUrls = [] }: { t: any, bannerUrls?: string[] }) {
  const [promoCode, setPromoCode] = useState('');
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [qrPreviews, setQrPreviews] = useState<Record<string, string>>({});
  
  // Массив динамически загруженных баннеров
  const [banners, setBanners] = useState<DynamicBanner[]>([]);
  
  const [editingBanner, setEditingBanner] = useState<DynamicBanner | null>(null);
  const [bannerConfig, setBannerConfig] = useState({ x: 50, y: 50, size: 70, rotation: 0, font: 'Impact' });

  // 1. Автоматическая загрузка размеров картинок с сервера
  useEffect(() => {
    if (!bannerUrls || bannerUrls.length === 0) return;

    const loadImages = async () => {
      const loadedBanners = await Promise.all(bannerUrls.map(async (url, index) => {
        return new Promise<DynamicBanner | null>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const w = img.naturalWidth;
            const h = img.naturalHeight;
            resolve({
              id: index + 1,
              url,
              width: w,
              height: h,
              // Умные дефолтные значения (Текст по центру-снизу, QR в правом нижнем углу)
              textX: w / 2,
              textY: h * 0.85,
              fontSize: Math.max(w * 0.06, 40), // Размер текста зависит от ширины картинки
              textColor: '#ffffff',
              qrX: w * 0.75,
              qrY: h * 0.75,
              qrSize: Math.max(w * 0.2, 100) // QR-код занимает около 20% ширины
            });
          };
          img.onerror = () => resolve(null); // Пропускаем битые картинки
          img.src = url;
        });
      }));
      setBanners(loadedBanners.filter((b): b is DynamicBanner => b !== null));
    };

    loadImages();
  }, [bannerUrls]);

  // Генерация QR
  useEffect(() => {
    const generatePreviewQR = async () => {
      const code = promoCode.trim() || 'YOURPROMO';
      try {
        const qrDataUrl = await QRCode.toDataURL(`https://1xmobcash.net/?promo=${code}`, {
          width: 200, margin: 1, color: { dark: '#0f172a', light: '#ffffff' }
        });
        setQrPreviews({ current: qrDataUrl });
      } catch (err) {}
    };
    generatePreviewQR();
  }, [promoCode]);

  const openEditor = (banner: DynamicBanner) => {
    setBannerConfig({
      x: (banner.textX / banner.width) * 100, 
      y: (banner.textY / banner.height) * 100,
      size: banner.fontSize,
      rotation: 0,
      font: 'Impact'
    });
    setEditingBanner(banner);
  };

  const closeEditor = () => setEditingBanner(null);
  const updateConfig = (key: string, value: number | string) => setBannerConfig(prev => ({ ...prev, [key]: value }));

  const handleDownload = async () => {
    if (!editingBanner) return;
    setDownloadingId(editingBanner.id);
    
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');

      const img = new Image();
      img.crossOrigin = 'anonymous'; 
      await new Promise((resolve, reject) => { img.onload = resolve; img.onerror = reject; img.src = editingBanner.url; });

      canvas.width = editingBanner.width;
      canvas.height = editingBanner.height;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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

      const actualTextX = (bannerConfig.x / 100) * canvas.width;
      const actualTextY = (bannerConfig.y / 100) * canvas.height;

      ctx.save(); 
      ctx.translate(actualTextX, actualTextY); 
      ctx.rotate((bannerConfig.rotation * Math.PI) / 180); 
      
      ctx.font = `900 ${bannerConfig.size}px "${bannerConfig.font}"`;
      ctx.fillStyle = editingBanner.textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;

      ctx.fillText(finalPromo.toUpperCase(), 0, 0); 
      ctx.restore(); 

      const link = document.createElement('a');
      link.download = `1xMobCash_Promo_${finalPromo}.jpg`;
      link.href = canvas.toDataURL('image/jpeg', 0.95);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      closeEditor(); 

    } catch (error) {
      alert('Failed to download banner. Please try again.');
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* Если в папке нет файлов */}
      {banners.length === 0 && (
         <div className="text-slate-400 py-10 text-center">Loading banners from server... Please upload images to /public/banners/</div>
      )}

      {/* Сетка баннеров */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl relative z-10 pt-4">
        {banners.map((banner) => (
          <div key={banner.id} className="group bg-[#0f172a]/60 border border-white/5 rounded-3xl overflow-hidden shadow-xl hover:shadow-[0_0_40px_rgba(30,58,138,0.3)] transition-all duration-300 flex flex-col cursor-pointer" onClick={() => openEditor(banner)}>
            
            {/* ИСПРАВЛЕНО: Жесткий aspect-ratio для витрины */}
            <div className="relative w-full bg-[#1e293b] overflow-hidden flex items-center justify-center" style={{ aspectRatio: `${banner.width} / ${banner.height}` }}>
               <img src={banner.url} alt="Promo Banner" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               
               <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-20">
                  <div className="bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                    Customize
                  </div>
               </div>
               <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white/90 border border-white/10 z-10">
                 {banner.width} x {banner.height}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* ВСПЛЫВАЮЩЕЕ ОКНО РЕДАКТОРА */}
      {editingBanner && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1120] border border-white/10 w-full max-w-6xl max-h-[95vh] rounded-[2rem] shadow-2xl flex flex-col lg:flex-row relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
            
            <button onClick={closeEditor} className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>

            {/* ЛЕВАЯ ЧАСТЬ: Живое превью с исправленными пропорциями */}
            <div className="w-full lg:w-[55%] relative bg-[#1e293b] flex items-center justify-center p-4 lg:p-8 border-b lg:border-b-0 lg:border-r border-white/10 [container-type:inline-size]">
              
              {/* ИСПРАВЛЕНО: Контейнер-обертка со строгим aspect-ratio. Именно он делает QR-код квадратным! */}
              <div 
                className="relative shadow-2xl overflow-hidden w-full"
                style={{ aspectRatio: `${editingBanner.width} / ${editingBanner.height}` }}
              >
                <img src={editingBanner.url} alt="Banner" className="absolute inset-0 w-full h-full object-cover" />
                
                {/* Текст */}
                <div className="absolute inset-0 pointer-events-none">
                    <span 
                      className="absolute font-black drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] uppercase whitespace-nowrap"
                      style={{
                        color: editingBanner.textColor,
                        fontFamily: `"${bannerConfig.font}", sans-serif`,
                        left: `${bannerConfig.x}%`,
                        top: `${bannerConfig.y}%`,
                        transform: `translate(-50%, -50%) rotate(${bannerConfig.rotation}deg)`,
                        fontSize: `calc(${bannerConfig.size}px * (100cqi / ${editingBanner.width}))` 
                      }}
                    >
                      {promoCode || t?.promo?.promoCodePlaceholder || 'YOURPROMO'}
                    </span>
                </div>

                {/* QR-код */}
                {qrPreviews.current && (
                  <div 
                    className="absolute pointer-events-none p-1 bg-white rounded shadow-sm"
                    style={{
                      left: `${(editingBanner.qrX / editingBanner.width) * 100}%`,
                      top: `${(editingBanner.qrY / editingBanner.height) * 100}%`,
                      width: `${(editingBanner.qrSize / editingBanner.width) * 100}%`,
                      height: `${(editingBanner.qrSize / editingBanner.height) * 100}%`,
                    }}
                  >
                    <img src={qrPreviews.current} alt="QR" className="w-full h-full" />
                  </div>
                )}
              </div>
            </div>

            {/* ПРАВАЯ ЧАСТЬ: Панель управления */}
            <div className="w-full lg:w-[45%] p-6 lg:p-8 flex flex-col bg-gradient-to-br from-[#0f172a] to-[#0b1120] overflow-y-auto">
              <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                Banner Editor
              </h3>

              <div className="space-y-6 flex-grow">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                    {t?.promo?.promoCodeLabel || 'Your Promo Code'}
                  </label>
                  <div className="relative flex items-center bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden focus-within:border-blue-500 transition-all">
                    <div className="bg-blue-600/20 text-blue-400 px-3 py-3 flex items-center justify-center border-r border-white/5 font-black shrink-0 text-sm">PROMO</div>
                    <input 
                      type="text" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder={t?.promo?.promoCodePlaceholder || 'MOB1X'}
                      className="w-full py-3 px-4 bg-transparent outline-none text-white font-bold uppercase placeholder-slate-600 text-sm"
                      maxLength={15}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Font Family</label>
                  <select 
                    value={bannerConfig.font}
                    onChange={(e) => updateConfig('font', e.target.value)}
                    className="w-full bg-[#1e293b] border border-white/10 rounded-xl px-4 py-3 text-white font-semibold outline-none focus:border-blue-500 transition-colors cursor-pointer"
                  >
                    {FONTS.map(f => <option key={f} value={f} style={{ fontFamily: f }}>{f}</option>)}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                      Size <span className="text-blue-400">{bannerConfig.size}px</span>
                    </label>
                    <input type="range" min="30" max="250" value={bannerConfig.size} onChange={(e) => updateConfig('size', Number(e.target.value))} className="w-full accent-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                      Rotation <span className="text-blue-400">{bannerConfig.rotation}°</span>
                    </label>
                    <input type="range" min="-90" max="90" value={bannerConfig.rotation} onChange={(e) => updateConfig('rotation', Number(e.target.value))} className="w-full accent-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                      Pos X <span className="text-blue-400">{Math.round(bannerConfig.x)}%</span>
                    </label>
                    <input type="range" min="0" max="100" value={bannerConfig.x} onChange={(e) => updateConfig('x', Number(e.target.value))} className="w-full accent-blue-500" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-400 uppercase flex justify-between">
                      Pos Y <span className="text-blue-400">{Math.round(bannerConfig.y)}%</span>
                    </label>
                    <input type="range" min="0" max="100" value={bannerConfig.y} onChange={(e) => updateConfig('y', Number(e.target.value))} className="w-full accent-blue-500" />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleDownload}
                disabled={downloadingId === editingBanner.id}
                className="w-full mt-8 shrink-0 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white py-4 rounded-xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 hover:scale-[1.02] active:scale-100"
              >
                {downloadingId === editingBanner.id ? 'Processing...' : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    Download Banner
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}