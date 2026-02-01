import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Reusable Icon Component ---
const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth="2.5" 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const QR = () => {
  const navigate = useNavigate();
  // Stages: 'initial' | 'scanning' | 'verified' | 'success'
  const [scanStep, setScanStep] = useState('initial');

  // Logic to simulate the automated scanning transition
  useEffect(() => {
    if (scanStep === 'scanning') {
      const timer = setTimeout(() => setScanStep('verified'), 2000);
      return () => clearTimeout(timer);
    }
    if (scanStep === 'verified') {
      const timer = setTimeout(() => setScanStep('success'), 1200);
      return () => clearTimeout(timer);
    }
  }, [scanStep]);

  const sidebarLinks = [
    { name: "My Events", path: "/participant", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "QR Codes", path: "/qr", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#e9eff6] font-sans text-slate-700 overflow-hidden relative">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-12 py-5 bg-white shadow-sm sticky top-0 z-50 shrink-0">
        <h1 onClick={() => navigate('/participant')} className="text-2xl font-black text-[#1e40af] tracking-tight cursor-pointer">QRBase Meetings</h1>
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-sm font-bold items-center uppercase tracking-widest">
             <button onClick={() => navigate('/participant')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">My Events</button>
             <button onClick={() => navigate('/qr')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">QR Codes</button>
          </div>
          <button onClick={() => navigate('/login')} className="ml-8 text-blue-600 hover:text-gray-400 transition-colors text-sm font-black uppercase tracking-widest bg-transparent border-none p-0 cursor-pointer">Log Out</button>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside className="group absolute inset-y-0 left-0 z-20 flex flex-col justify-between w-20 hover:w-64 bg-[#1e293b] transition-all duration-300 m-4 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="flex flex-col gap-2 p-4 mt-2">
            {sidebarLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => navigate(link.path)} 
                className={`flex items-center w-full py-3.5 px-3 rounded-2xl transition-all ${link.path === "/qr" ? "bg-[#2563eb] text-white" : "text-slate-400 hover:bg-[#2563eb] hover:text-white"}`}
              >
                <div className="min-w-[24px] flex justify-center"><Icon path={link.icon} /></div>
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[11px] uppercase tracking-widest whitespace-nowrap">{link.name}</span>
              </button>
            ))}
          </div>
          <div className="p-4 mb-2">
            <button onClick={() => navigate('/login')} className="flex items-center w-full py-3.5 px-3 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all">
              <div className="min-w-[24px] flex justify-center"><Icon path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></div>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[11px] uppercase tracking-widest whitespace-nowrap">Log Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-24 p-8 flex items-center justify-center overflow-y-auto">
          <div className="max-w-md w-full flex flex-col gap-6">
            <div className="px-4 text-center">
              <h2 className="text-3xl font-black text-[#1e40af] tracking-tight uppercase leading-none">Attendance</h2>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Scanner Portal</span>
            </div>

            <section className="bg-white rounded-[2.5rem] shadow-xl p-10 flex flex-col items-center justify-center text-center min-h-[440px]">
              
              {/* STAGE 1: INITIAL */}
              {scanStep === 'initial' && (
                <div className="animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <Icon path="M12 4v1m6 11h2m-6 0h-2v4" className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2">Ready to Scan</h3>
                  <p className="text-[11px] font-medium text-slate-400 max-w-[240px] mx-auto mb-8 leading-relaxed">
                    Position the event QR code within the viewfinder.
                  </p>
                  <button 
                    onClick={() => setScanStep('scanning')}
                    className="bg-[#1e293b] text-white px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                  >
                    Open Camera
                  </button>
                </div>
              )}

              {/* STAGE 2: SCANNING */}
              {scanStep === 'scanning' && (
                <div className="w-full animate-in zoom-in duration-300">
                   <div className="relative w-64 h-64 mx-auto bg-slate-900 rounded-[2rem] overflow-hidden border-4 border-slate-50 shadow-2xl">
                      <div className="absolute inset-0 z-10">
                        <div className="w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan"></div>
                      </div>
                      <div className="h-full w-full flex items-center justify-center bg-slate-800">
                         <Icon path="M12 4v1m6 11h2m-6 0h-2v4" className="w-12 h-12 text-slate-700" />
                      </div>
                   </div>
                   <button 
                    onClick={() => setScanStep('initial')}
                    className="mt-6 text-[9px] font-black uppercase tracking-widest text-red-400 hover:text-red-700 transition-colors"
                   >
                     Cancel Scan
                   </button>
                </div>
              )}

              {/* STAGE 3: VERIFIED */}
              {scanStep === 'verified' && (
                <div className="animate-in fade-in zoom-in duration-300">
                  <h3 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Verified</h3>
                </div>
              )}

              {/* STAGE 4: SUCCESS */}
              {scanStep === 'success' && (
                <div className="flex flex-col items-center text-center animate-in slide-in-from-bottom-8 duration-700">
                   <div className="w-24 h-24 mb-6 text-green-500">
                      <Icon path="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-full h-full" />
                   </div>
                   <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight leading-snug">Check out successful!!</h3>
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mt-2">Thank you for attending</p>
                   <button 
                    onClick={() => setScanStep('initial')}
                    className="mt-10 bg-[#1e293b] text-white py-3 px-10 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-black transition-all shadow-md"
                   >
                     Done
                   </button>
                </div>
              )}
            </section>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 px-12 py-5 flex justify-between items-center sticky bottom-0 z-50 shrink-0">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 QRBase Meetings</div>
        <nav className="flex gap-8 text-[11px] font-bold items-center uppercase tracking-widest">
           <button onClick={() => navigate('/participant')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold">My Events</button>
           <button onClick={() => navigate('/qr')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold">QR Codes</button>
           <button onClick={() => navigate('/login')} className="text-red-500 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold">Log Out</button>
        </nav>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan {
          0% { top: 0%; }
          50% { top: 100%; }
          100% { top: 0%; }
        }
        .animate-scan {
          position: absolute;
          animation: scan 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};

export default QR;