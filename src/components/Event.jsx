import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// --- Standardized Icon Component ---
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

const Events = () => {
  const navigate = useNavigate();

  // --- Calendar & Event State ---
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 0, 30)); 
  const [viewDate, setViewDate] = useState(new Date(2026, 0, 1)); 
  
  const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
  const years = Array.from({ length: 10 }, (_, i) => 2020 + i);

  const [events, setEvents] = useState([
    { id: 1, title: "FUN PLACE DUPR", date: "30 Jan 2026", requested: "JAN 29, 02:26 AM" },
  ]);
  
  const [formData, setFormData] = useState({ title: "", details: "" });

  // --- Sidebar Links (Synced with Dashboard/Attendance) ---
  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Events", path: "/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Team", path: "/role", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "Attendance", path: "/attendance", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  ];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const handleApply = () => {
    if (!formData.title) return;
    const dateStr = `${selectedDate.getDate()} ${months[selectedDate.getMonth()].charAt(0) + months[selectedDate.getMonth()].slice(1).toLowerCase()} ${selectedDate.getFullYear()}`;
    const newEvent = {
      id: Date.now(),
      title: formData.title.toUpperCase(),
      date: dateStr,
      requested: new Date().toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).toUpperCase()
    };
    setEvents([newEvent, ...events]);
    setFormData({ title: "", details: "" });
  };

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
                  link.name === "Events" ? "bg-[#2563eb] text-white" : "text-slate-400 hover:bg-[#2563eb] hover:text-white"
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

        {/* MAIN CONTENT */}
        <main className="flex-1 ml-24 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* COLUMN 1: ADD */}
            <section className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">Add</span>
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 min-h-[580px] flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-black text-[#1e40af] tracking-tight mb-8 text-center uppercase">Event Registration</h2>
                  <div className="flex flex-col gap-2">
                    <label className="text-[9px] font-black text-[#1e40af] uppercase tracking-widest ml-1">Event Name</label>
                    <input 
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-[#f1f5f9] border-2 border-slate-100 rounded-xl p-3 text-xs outline-none focus:border-blue-500 font-bold" 
                      placeholder="ENTER TITLE..."
                    />
                  </div>
                </div>
                <button onClick={handleApply} className="w-full bg-[#1e293b] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black shadow-lg transition-all">
                  + Add Events
                </button>
              </div>
            </section>

            {/* COLUMN 2: SCHEDULE */}
            <section className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">Date</span>
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 min-h-[580px] space-y-6">
                <h3 className="text-2xl font-black text-[#1e40af] tracking-tight text-center uppercase">Schedule</h3>
                
                <div className="p-4 bg-[#f1f5f9] rounded-xl flex items-center gap-4 text-[#2563eb]">
                  <Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  <div className="flex flex-col">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">Selected Date</span>
                    <span className="text-sm font-bold text-slate-700 uppercase">
                      {selectedDate.getDate()} {months[selectedDate.getMonth()]} {selectedDate.getFullYear()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <select 
                    className="flex-1 bg-white border-2 border-slate-50 rounded-lg p-2 text-[10px] font-black text-[#1e40af] outline-none cursor-pointer"
                    value={viewDate.getMonth()}
                    onChange={(e) => setViewDate(new Date(viewDate.getFullYear(), parseInt(e.target.value), 1))}
                  >
                    {months.map((m, i) => <option key={m} value={i}>{m}</option>)}
                  </select>
                  <select 
                    className="w-24 bg-white border-2 border-slate-50 rounded-lg p-2 text-[10px] font-black text-[#1e40af] outline-none cursor-pointer"
                    value={viewDate.getFullYear()}
                    onChange={(e) => setViewDate(new Date(parseInt(e.target.value), viewDate.getMonth(), 1))}
                  >
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>

                <div className="bg-white p-2">
                  <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400">
                    {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }, (_, i) => {
                      const day = i + 1;
                      const isSelected = selectedDate.getDate() === day && selectedDate.getMonth() === viewDate.getMonth() && selectedDate.getFullYear() === viewDate.getFullYear();
                      return (
                        <div key={i} onClick={() => setSelectedDate(new Date(viewDate.getFullYear(), viewDate.getMonth(), day))}
                          className={`p-2 rounded-lg cursor-pointer transition-all ${isSelected ? 'bg-[#2563eb] text-white shadow-lg shadow-blue-200 font-black' : 'hover:bg-slate-50'}`}>
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* COLUMN 3: MY EVENTS */}
            <section className="flex flex-col gap-4">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-4">List</span>
              <div className="bg-white rounded-[2.5rem] shadow-xl p-8 min-h-[580px] flex flex-col">
                <h2 className="text-2xl font-black text-[#1e40af] tracking-tight mb-8 text-center uppercase">My events</h2>
                <div className="flex-grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {events.map((event) => (
                    <div key={event.id} className="p-5 border-2 border-slate-50 rounded-[2rem] bg-white relative flex justify-between items-center group hover:border-blue-100 transition-all">
                      <div className="flex flex-col gap-2">
                        <h4 className="text-sm font-black text-slate-800 uppercase tracking-tight">{event.title}</h4>
                        <div className="flex items-center gap-3">
                          <div className="text-blue-600 bg-blue-50 p-2 rounded-xl">
                            <Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Date : <span className="text-slate-800 font-black">{event.date}</span></span>
                            <span className="text-[7px] font-medium text-slate-300 uppercase">Requested on {event.requested}</span>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => setEvents(events.filter(e => e.id !== event.id))} className="bg-[#1e293b] text-white p-3 rounded-xl hover:bg-red-500 transition-colors shadow-sm">
                        <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* FOOTER */}
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

export default Events;