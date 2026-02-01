import React from 'react';
import { useNavigate } from 'react-router-dom';

const Icon = ({ path, className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

const OrganizerDash = () => {
  const navigate = useNavigate();

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Events", path: "/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Team", path: "/role", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "Attendance", path: "/attendance", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  ];

  const stats = [
    { label: "Registrations", value: "245", isPrimary: true },
    { label: "Checked – In", value: "198", isPrimary: false },
    { label: "Feedback Rate", value: "82%", isPrimary: false },
    { label: "Certificates Issued", value: "190", isPrimary: true },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#e9eff6] font-sans text-slate-700 overflow-hidden">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-12 py-5 bg-white shadow-sm sticky top-0 z-50 shrink-0">
        <h1 
          onClick={() => navigate('/dashboard')} 
          className="text-2xl font-black text-[#1e40af] tracking-tight cursor-pointer"
        >
          QRBase Meetings
        </h1>
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-sm font-bold items-center uppercase tracking-widest">
            <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Dashboard</button>
            <button onClick={() => navigate('/events')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Events</button>
            <button onClick={() => navigate('/role')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Team</button>
            <button onClick={() => navigate('/attendance')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Attendance</button>
          </div>
          <div className="flex gap-4 items-center border-l pl-8 border-gray-100">
            <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-gray-400 transition-colors text-sm font-black uppercase tracking-widest bg-transparent border-none p-0 cursor-pointer outline-none">
              Log Out
            </button>
          </div>
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
                className={`flex items-center w-full py-3.5 px-3 rounded-2xl transition-all ${
                  link.name === "Dashboard" ? "bg-[#2563eb] text-white" : "text-slate-400 hover:bg-[#2563eb] hover:text-white"
                }`}
              >
                <div className="min-w-[24px] flex justify-center"><Icon path={link.icon} /></div>
                <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[11px] uppercase tracking-widest whitespace-nowrap">
                  {link.name}
                </span>
              </button>
            ))}
          </div>

          <div className="p-4 mb-2">
            <button 
              onClick={() => navigate('/login')}
              className="flex items-center w-full py-3.5 px-3 rounded-2xl text-red-400 hover:bg-red-500 hover:text-white transition-all"
            >
              <div className="min-w-[24px] flex justify-center">
                <Icon path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </div>
              <span className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity font-black text-[11px] uppercase tracking-widest whitespace-nowrap">
                Log Out
              </span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 ml-24 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 ml-2">
              <h2 className="text-3xl font-black text-[#1e40af] tracking-tight uppercase leading-none">Summary</h2>
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Event Overview 2026</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-8">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`rounded-[2.5rem] p-12 flex flex-col items-center justify-center shadow-xl transition-all hover:scale-[1.02] border border-white/50 
                    ${stat.isPrimary ? "bg-[#2563eb] text-white" : "bg-white text-[#1e40af]"}`}
                >
                  <span className="text-7xl font-black mb-3 tracking-tighter">
                    {stat.value}
                  </span>
                  <span className={`text-xs font-black uppercase tracking-[0.2em] ${stat.isPrimary ? "text-blue-100" : "text-gray-400"}`}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* FOOTER  */}
      <footer className="bg-white border-t border-gray-100 px-12 py-5 flex justify-between items-center sticky bottom-0 z-50 shrink-0">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          © 2026 QRBase Meetings
        </div>
        <nav className="hidden md:flex items-center">
          <div className="flex gap-8 text-[11px] font-bold items-center uppercase tracking-widest">
            <button onClick={() => navigate('/dashboard')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Dashboard</button>
            <button onClick={() => navigate('/events')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Events</button>
            <button onClick={() => navigate('/role')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Team</button>
            <button onClick={() => navigate('/attendance')} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">Attendance</button>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default OrganizerDash;