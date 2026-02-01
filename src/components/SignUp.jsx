import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputField({ id, type, placeholder, label, icon, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-[9px] font-black text-[#1e40af] ml-1 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-blue-500 group-focus-within:text-blue-700 transition-colors">
          <div className="flex items-center justify-center w-4 h-4">
            {React.cloneElement(icon, { className: "w-full h-full overflow-visible" })}
          </div>
        </div>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full bg-[#f1f5f9] border-2 border-slate-200 focus:border-[#2563eb] focus:bg-white text-xs text-gray-800 placeholder-gray-400 pl-10 pr-4 py-2.5 rounded-xl shadow-sm outline-none transition-all duration-200"
        />
      </div>
    </div>
  );
}

export default function SignUp() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    navigate("/login");
  };

  const UserIcon = (<svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" /><path d="M4 21v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2" /></svg>);
  const EmailIcon = (<svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>);
  const LockIcon = (<svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>);
  const ShieldIcon = (<svg fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>);

  return (
    <div className="h-screen flex flex-col bg-[#e9eff6] font-sans text-slate-700 overflow-hidden">
      
      {/* HEADER */}
      <header className="flex justify-between items-center px-12 py-5 bg-white shadow-sm sticky top-0 z-50 shrink-0">
        <h1 
          onClick={() => navigate("/")} 
          className="text-2xl font-black text-[#1e40af] tracking-tight cursor-pointer"
        >
          QRBase Meetings
        </h1>
        <nav className="hidden md:flex items-center gap-10">
          <div className="flex gap-8 text-sm font-bold items-center uppercase tracking-widest">
            <button 
              onClick={() => navigate("/home")} 
              className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 font-bold text-sm uppercase tracking-widest cursor-pointer outline-none"
            >
              Home
            </button>
            <a href="#" className="text-blue-600 hover:text-gray-400 transition-colors">Features</a>
            <a href="#" className="text-blue-600 hover:text-gray-400 transition-colors">How It Works</a>
          </div>

          <div className="flex gap-8 items-center border-l pl-8 border-gray-100">
            <button 
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-gray-400 transition-colors font-black text-sm uppercase tracking-widest outline-none bg-transparent border-none p-0 cursor-pointer"
            >
              Log In
            </button>
            <button 
              className="bg-[#2563eb] text-white px-7 py-2.5 rounded-2xl text-sm font-black shadow-lg shadow-blue-200 hover:bg-gray-500 transition-all active:scale-95"
            >
              Sign Up
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex justify-center items-center px-4 py-2">
        <div className="bg-white rounded-[2rem] shadow-2xl p-6 md:p-8 w-full max-w-[440px] border border-white/50">
          
          <div className="text-center mb-4">
            <h2 className="text-2xl font-black text-[#1e40af] tracking-tight mb-0.5">
              Create Account
            </h2>
            <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em]">Join QRBase Meetings</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="bg-slate-100 p-2.5 rounded-xl border border-slate-200 flex items-center justify-between">
              <span className="text-[9px] font-black text-[#1e40af] uppercase tracking-widest ml-1">
                Account Type
              </span>
              <div className="flex gap-5 mr-1">
                {['Organizer', 'User'].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="accountType" required className="w-3.5 h-3.5 accent-[#2563eb]" />
                    <span className="text-xs font-bold text-gray-600 group-hover:text-[#2563eb] transition-colors">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField id="firstName" type="text" placeholder="First Name" label="First Name" icon={UserIcon} />
              <InputField id="lastName" type="text" placeholder="Last Name" label="Last Name" icon={UserIcon} />
            </div>

            <InputField id="email" type="email" placeholder="name@example.com" label="Email Address" icon={EmailIcon} />

            <div className="grid grid-cols-2 gap-3">
              {/* Password Field */}
              <InputField 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                label="Password" 
                icon={LockIcon}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Confirm Password Field */}
              <InputField 
                id="confirmPassword" 
                type="password" 
                placeholder="••••••••" 
                label="Confirm" 
                icon={ShieldIcon}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2 px-1 py-1">
              <input type="checkbox" id="terms" required className="w-3.5 h-3.5 accent-[#2563eb]" />
              <label htmlFor="terms" className="text-[10px] font-black text-gray-400 uppercase tracking-widest cursor-pointer">
                I agree to the <span className="text-blue-600 hover:text-gray-400 transition-colors underline">Terms</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#2563eb] hover:bg-gray-500 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center pt-5 border-t border-gray-50 flex flex-col items-center gap-2">
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
              Already have an account?
            </p>
            <button 
              onClick={() => navigate("/login")}
              className="text-blue-600 font-black text-sm uppercase tracking-widest hover:text-gray-400 transition-colors bg-transparent border-none p-0 outline-none cursor-pointer"
            >
              Log In
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 px-12 py-5 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest shrink-0">
        <div>© 2026 QRBase Meetings</div>
        <nav className="flex gap-8 items-center">
          <button 
            onClick={() => navigate("/home")} 
            className="text-blue-600 hover:text-gray-400 transition-colors bg-transparent border-none p-0 font-bold text-[10px] uppercase tracking-widest cursor-pointer outline-none"
          >
            Home
          </button>
          <a href="#" className="text-blue-600 hover:text-gray-400 transition-colors">Terms</a>
          <a href="#" className="text-blue-600 hover:text-gray-400 transition-colors">Privacy</a>
        </nav>
      </footer>
    </div>
  );
}