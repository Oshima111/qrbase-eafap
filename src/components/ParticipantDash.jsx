import React, { useState } from 'react';
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

const ParticipantDash = () => {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Mock Data
  const events = [
    { id: 1, title: "IT CONFERENCE 2025", date: "29 JAN 2026", location: "Grand Hall A", status: "Upcoming", description: "Annual gathering of tech innovators and developers to discuss the future of AI and Web3." },
    { id: 2, title: "RESEARCH SEMINAR", date: "15 JAN 2026", location: "Room 402", status: "Completed", description: "A deep dive into modern data structures and algorithmic efficiency." },
  ];

  // Updated paths to match App.js: /participant and /qr
  const sidebarLinks = [
    { name: "My Events", path: "/participant", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "QR Codes", path: "/qr", icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#e9eff6] font-sans text-slate-700 overflow-hidden relative">
      
      {/* --- EVENT OVERVIEW MODAL --- */}
      {selectedEvent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${selectedEvent.status === 'Upcoming' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                  {selectedEvent.status}
                </span>
                <h3 className="text-2xl font-black text-[#1e40af] uppercase mt-2">{selectedEvent.title}</h3>
              </div>
              <button onClick={() => setSelectedEvent(null)} className="text-slate-300 hover:text-slate-500 transition-colors">
                <Icon path="M6 18L18 6M6 6l12 12" />
              </button>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 font-medium mb-8">{selectedEvent.description}</p>
            <button 
              onClick={() => navigate('/qr')} 
              className="w-full bg-[#1e293b] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
            >
              {selectedEvent.status === 'Upcoming' ? 'Go to QR Scanner' : 'View Certificate'}
            </button>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex justify-between items-center px-12 py-5 bg-white shadow-sm sticky top-0 z-50 shrink-0">
        <h1 onClick={() => navigate('/home')} className="text-2xl font-black text-[#1e40af] tracking-tight cursor-pointer">QRBase Meetings</h1>
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
                className={`flex items-center w-full py-3.5 px-3 rounded-2xl transition-all ${link.path === "/participant" ? "bg-[#2563eb] text-white" : "text-slate-400 hover:bg-[#2563eb] hover:text-white"}`}
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
        <main className="flex-1 ml-24 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="px-4">
              <h2 className="text-3xl font-black text-[#1e40af] tracking-tight uppercase leading-none">Overview</h2>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Participant Portal</span>
            </div>

            <section className="bg-white rounded-[2.5rem] shadow-xl p-10 min-h-[600px]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map(event => (
                  <div key={event.id} onClick={() => setSelectedEvent(event)} className="group bg-[#f8fafc] p-8 rounded-[2.5rem] border-2 border-transparent hover:border-blue-100 hover:shadow-lg transition-all cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm"><Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></div>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${event.status === 'Upcoming' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>{event.status}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{event.title}</h3>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{event.date} • {event.location}</p>
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default ParticipantDash;