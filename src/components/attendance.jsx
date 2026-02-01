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

const Attendance = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Pending');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // --- Attendance State ---
  const [requests, setRequests] = useState([
    { id: 1, name: "SUNNY MEHTA", role: "UI/UX DESIGNER", dateRange: "29 JAN - 05 FEB", status: "Pending" },
    { id: 2, name: "BHOOMI SHAH", role: "EVENT MANAGER", dateRange: "30 JAN - 31 JAN", status: "Pending" },
    { id: 3, name: "ALICE COOPER", role: "VOLUNTEER", dateRange: "28 JAN - 28 JAN", status: "Confirmed" },
  ]);

  // --- Form State ---
  const [newEntry, setNewEntry] = useState({ name: '', role: '', dateRange: '' });

  const handleStatusUpdate = (id, nextStatus) => {
    setRequests(requests.map(r => r.id === id ? { ...r, status: nextStatus } : r));
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(r => r.id !== id));
  };

  const handleCreateEntry = (e) => {
    e.preventDefault();
    if (!newEntry.name || !newEntry.role) return;

    const entry = {
      id: Date.now(),
      ...newEntry,
      name: newEntry.name.toUpperCase(),
      role: newEntry.role.toUpperCase(),
      status: 'Pending'
    };

    setRequests([entry, ...requests]);
    setNewEntry({ name: '', role: '', dateRange: '' });
    setIsModalOpen(false);
  };

  const sidebarLinks = [
    { name: "Dashboard", path: "/dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { name: "Events", path: "/events", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
    { name: "Team", path: "/role", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" },
    { name: "Attendance", path: "/attendance", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#e9eff6] font-sans text-slate-700 overflow-hidden relative">
      
      {/* --- CREATE ENTRY MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-black text-[#1e40af] uppercase tracking-tight mb-6 text-center">New Attendance Request</h3>
            <form onSubmit={handleCreateEntry} className="space-y-4">
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                <input required value={newEntry.name} onChange={e => setNewEntry({...newEntry, name: e.target.value})} className="w-full bg-[#f1f5f9] rounded-xl p-3 text-xs font-bold outline-none border-2 border-transparent focus:border-blue-500" placeholder="E.G. JOHN DOE" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Role</label>
                <input required value={newEntry.role} onChange={e => setNewEntry({...newEntry, role: e.target.value})} className="w-full bg-[#f1f5f9] rounded-xl p-3 text-xs font-bold outline-none border-2 border-transparent focus:border-blue-500" placeholder="E.G. DEVELOPER" />
              </div>
              <div>
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Date Range</label>
                <input required value={newEntry.dateRange} onChange={e => setNewEntry({...newEntry, dateRange: e.target.value})} className="w-full bg-[#f1f5f9] rounded-xl p-3 text-xs font-bold outline-none border-2 border-transparent focus:border-blue-500" placeholder="E.G. 01 FEB - 05 FEB" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" className="flex-1 bg-[#2563eb] text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg transition-all">Submit Request</button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 bg-slate-100 text-slate-500 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER */}
      <header className="flex justify-between items-center px-12 py-5 bg-white shadow-sm sticky top-0 z-50 shrink-0">
        <h1 onClick={() => navigate('/dashboard')} className="text-2xl font-black text-[#1e40af] tracking-tight cursor-pointer">QRBase Meetings</h1>
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-sm font-bold items-center uppercase tracking-widest">
            {sidebarLinks.map(link => (
              <button key={link.name} onClick={() => navigate(link.path)} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">{link.name}</button>
            ))}
          </div>
          <div className="flex gap-4 items-center border-l pl-8 border-gray-100">
            <button onClick={() => navigate('/login')} className="text-blue-600 hover:text-gray-400 transition-colors text-sm font-black uppercase tracking-widest bg-transparent border-none p-0 cursor-pointer outline-none">Log Out</button>
          </div>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {/* SIDEBAR */}
        <aside className="group absolute inset-y-0 left-0 z-20 flex flex-col justify-between w-20 hover:w-64 bg-[#1e293b] transition-all duration-300 m-4 rounded-[2rem] shadow-2xl overflow-hidden">
          <div className="flex flex-col gap-2 p-4 mt-2">
            {sidebarLinks.map((link) => (
              <button key={link.name} onClick={() => navigate(link.path)} className={`flex items-center w-full py-3.5 px-3 rounded-2xl transition-all ${link.name === "Attendance" ? "bg-[#2563eb] text-white" : "text-slate-400 hover:bg-[#2563eb] hover:text-white"}`}>
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

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 ml-24 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto flex flex-col gap-6">
            <div className="flex justify-between items-end px-4">
              <div>
                <h2 className="text-3xl font-black text-[#1e40af] tracking-tight uppercase leading-none">Attendance</h2>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Management</span>
              </div>
              {/* FIXED BUTTON: Toggle Modal */}
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-[#1e293b] text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all shadow-lg active:scale-95"
              >
                + Create Entry
              </button>
            </div>

            <section className="bg-white rounded-[2.5rem] shadow-xl p-10 min-h-[600px] flex flex-col">
              <div className="flex gap-10 mb-10 border-b border-gray-100">
                {['Pending', 'Confirmed', 'Rejected'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-5 text-[11px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-300 hover:text-slate-500'}`}>
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full" />}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-y-auto pr-2 custom-scrollbar">
                {requests.filter(r => r.status === activeTab).length === 0 ? (
                  <div className="col-span-full flex flex-col items-center justify-center text-slate-300 py-20">
                    <Icon path="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" className="w-12 h-12 mb-4" />
                    <span className="font-black text-[10px] uppercase tracking-[0.3em]">No {activeTab} Requests</span>
                  </div>
                ) : (
                  requests.filter(r => r.status === activeTab).map(req => (
                    <div key={req.id} className="bg-[#f8fafc] border-2 border-transparent hover:border-blue-100 p-6 rounded-[2.5rem] shadow-sm transition-all group relative">
                      <button onClick={() => handleDelete(req.id)} className="absolute top-6 right-6 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Icon path="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </button>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                          <Icon path="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Selected Period</p>
                          <p className="text-xs font-black text-slate-800">{req.dateRange}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 py-4 border-t border-slate-200/50">
                        <div className="w-10 h-10 bg-blue-100 rounded-full border-4 border-white shadow-sm flex items-center justify-center font-black text-blue-600 text-xs">{req.name.charAt(0)}</div>
                        <div>
                          <p className="text-[10px] font-black text-slate-800 uppercase tracking-tight">{req.name}</p>
                          <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest">{req.role}</p>
                        </div>
                      </div>
                      {activeTab === 'Pending' && (
                        <div className="flex gap-3 mt-4">
                          <button onClick={() => handleStatusUpdate(req.id, 'Confirmed')} className="flex-1 bg-blue-600 text-white py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">Approve</button>
                          <button onClick={() => handleStatusUpdate(req.id, 'Rejected')} className="flex-1 bg-white border-2 border-slate-100 text-red-500 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-red-50 transition-all">Reject</button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        </main>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 px-12 py-5 flex justify-between items-center sticky bottom-0 z-50 shrink-0">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">© 2026 QRBase Meetings</div>
        <nav className="hidden md:flex items-center">
          <div className="flex gap-8 text-[11px] font-bold items-center uppercase tracking-widest">
            {sidebarLinks.map(link => (
              <button key={link.name} onClick={() => navigate(link.path)} className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 cursor-pointer font-bold uppercase tracking-widest">{link.name}</button>
            ))}
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Attendance;