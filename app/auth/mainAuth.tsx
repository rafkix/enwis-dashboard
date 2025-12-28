"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Eye, EyeOff, Mail, Lock, User as UserIcon, 
  BookOpen, Sparkles, Highlighter, Chrome, 
  Send, Pencil, AlertCircle, CheckCircle, 
  Coffee,
  Ruler
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import {
  loginAPI,
  meAPI,
  registerAPI,
  telegramRegisterAPI,
} from "@/lib/api/auth";

/* ---------------- TYPES ---------------- */
type Mode = "login" | "signup";

export default function EnhancedAuthPage(): JSX.Element {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState({ username: "", password: "" });
  const [signup, setSignup] = useState({
    full_name: "", username: "", email: "", phone: "",
    age: "", password: "", confirm: "", level: "beginner",
    bio: "", profile_image: "default.png",
  });

  const redirectByRole = (role: string) => {
    const map: Record<string, string> = {
      student: "/student", teacher: "/teacher",
      mentor: "/mentor", admin: "/admin",
    };
    router.push(map[role] ?? "/");
  };

  /* ---------------- TELEGRAM WIDGET ---------------- */
  useEffect(() => {
    if (mode !== "signup") return;
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    script.setAttribute("data-telegram-login", "enwis_bot"); // Bot username ni yozing
    script.setAttribute("data-size", "large");
    script.setAttribute("data-onauth", "TelegramLoginCallback(user)");
    document.getElementById("telegram-login-container")?.appendChild(script);

    (window as any).TelegramLoginCallback = async (user: any) => {
      try {
        setLoading(true);
        await telegramRegisterAPI({
          full_name: `${user.first_name} ${user.last_name || ""}`,
          username: user.username || "",
          telegram_id: String(user.id),
          profile_image: user.photo_url || "default.png",
          bio: "",
        });
        const me = await meAPI();
        redirectByRole(me.data.role);
      } catch {
        setError("Telegram signup failed");
      } finally { setLoading(false); }
    };
    return () => { (window as any).TelegramLoginCallback = undefined; };
  }, [mode]);

  /* ---------------- HANDLERS ---------------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      setLoading(true);
      const res = await loginAPI(login);
      localStorage.setItem("access_token", res.data.access_token);
      const me = await meAPI();
      redirectByRole(me.data.role);
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Login failed");
    } finally { setLoading(false); }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (signup.password !== signup.confirm) return setError("Passwords mismatch");
    try {
      setLoading(true);
      await registerAPI({ ...signup, age: Number(signup.age), role: "student" });
      setMode("login");
      setLogin({ username: signup.username, password: "" });
    } catch (err: any) {
      setError(err?.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#f0f2f5] relative overflow-hidden font-mono py-16">
      
      {/* 🟦 BACKGROUND DECORATIONS */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#000 1.2px, transparent 1.2px)`, backgroundSize: '100% 2.5rem' }}  />

      {/* 🖍️ ENHANCED WRITING STATION DECORATIONS */}
      
      {/* 1. TOP LEFT - Vocabulary */}
      <FloatingCard color="red" title="Lexical Resource" position="top-5 left-10" rotate="-6deg" delay={0.1}>
        "Stop using 'Good'. Try: <span className="bg-red-200 px-1">Superb</span>, <span className="bg-red-200 px-1">Exemplary</span>, or <span className="bg-red-200 px-1">Outstanding</span>."
      </FloatingCard>

      {/* 2. TOP RIGHT - Grammar */}
      <FloatingCard color="yellow" title="Complex Structures" position="top-12 right-10" rotate="5deg" delay={0.3}>
        "Use inversion for emphasis: <span className="bg-yellow-200 px-1 italic">Not only is it important, but it is also...</span>"
      </FloatingCard>

      {/* 3. MIDDLE LEFT - Task Response */}
      <FloatingCard color="green" title="Task Response" position="top-[40%] left-5" rotate="-3deg" delay={0.5}>
        "Always present a clear position in the <span className="underline">introduction</span> and <span className="underline">conclusion</span>."
      </FloatingCard>

      {/* 4. MIDDLE RIGHT - Linkers */}
      <FloatingCard color="blue" title="Cohesion" position="top-[45%] right-8" rotate="4deg" delay={0.7}>
        "Instead of 'And', use: <span className="bg-blue-200 px-1">Moreover</span>, <span className="bg-blue-200 px-1">Furthermore</span>, or <span className="bg-blue-200 px-1">Additionally</span>."
      </FloatingCard>

      {/* 5. BOTTOM LEFT - Collocations */}
      <FloatingCard color="purple" title="Collocations" position="bottom-12 left-8" rotate="-4deg" delay={0.9}>
        "Don't just say 'Big problem'. Use: <span className="bg-purple-200 px-1 italic">Pressing issue</span> or <span className="bg-purple-200 px-1 italic">Grave concern</span>."
      </FloatingCard>

      {/* 6. BOTTOM RIGHT - Punctuation */}
      <FloatingCard color="orange" title="Punctuation Tip" position="bottom-16 right-5" rotate="7deg" delay={1.1}>
        "A semicolon (;) can connect two independent clauses. Use it wisely to show <span className="font-black">Grammatical Range</span>."
      </FloatingCard>

      {/* 7. TOP CENTER - Motivation (Small Sticky) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 hidden 2xl:block opacity-60">
        <div className="bg-pink-100 border-2 border-slate-900 p-2 rotate-2 shadow-md">
           <p className="text-[10px] font-black uppercase tracking-tighter">Current Goal: IELTS 8.5 🔥</p>
        </div>
      </div>

      {/* 🖋️ FLOATING OBJECTS (Background Props) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Qalam va Chizg'ich kabi elementlar */}
        <motion.div initial={{ x: -100 }} animate={{ x: 0 }} className="absolute top-[20%] right-[15%] opacity-20 rotate-45">
          <Pencil size={150} className="text-slate-400" />
        </motion.div>
        
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-20 left-[20%] opacity-10 -rotate-12">
          <Coffee size={200} className="text-slate-900" />
        </motion.div>

        <div className="absolute top-1/2 left-[10%] opacity-5">
           <Ruler size={300} className="text-slate-900 -rotate-90" />
        </div>
      </div>

      <motion.div 
  initial={{ y: 20, opacity: 0 }} 
  animate={{ y: 0, opacity: 1 }} 
  className="w-full max-w-4xl z-10"
>
  
  {/* 📋 TAPE HEADER (Yopishqoq lenta effekti) */}
  <div className="flex justify-center mb-[-32px] relative z-30 select-none">
  {/* Orqa fon soyasi (Deep Shadow Layer) */}
  <div className="absolute inset-0 bg-slate-900/20 translate-x-2 translate-y-2 blur-sm transform -rotate-1" />

  <div className="relative">
    {/* Asosiy Lenta (Main Tape) */}
    <div 
      className="bg-slate-900 text-white px-14 py-5 flex items-center gap-4 transform -rotate-1 border-y-2 border-slate-700 shadow-[10px_10px_0px_0px_rgba(16,185,129,1)]"
      style={{
        // Yirtilgan qog'oz effekti (Jagged edges)
        clipPath: "polygon(2% 0%, 98% 1%, 100% 15%, 99% 85%, 100% 100%, 0% 98%, 1% 50%, 0% 0%)"
      }}
    >
      {/* Chap tomondagi dekorativ nuqtalar */}
      <div className="flex flex-col gap-1 opacity-40">
        {[...Array(3)].map((_, i) => <div key={i} className="w-1 h-1 bg-white rounded-full" />)}
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Highlighter size={28} className="text-emerald-400 animate-pulse relative z-10" />
          {/* Neon nur taratuvchi effekt */}
          <div className="absolute inset-0 bg-emerald-500/30 blur-xl scale-150 animate-pulse" />
        </div>

        <div className="flex flex-col">
          <h1 className="text-2xl md:text-3xl font-[1000] uppercase italic tracking-tighter leading-none">
            Auth <span className="text-emerald-400">Station</span>
          </h1>
        </div>
      </div>

      {/* O'ng tomondagi dekorativ shtrix-kod simulatsiyasi */}
      <div className="flex gap-[2px] h-8 opacity-20 ml-4 hidden md:flex">
        {[2, 4, 1, 3, 2, 5].map((h, i) => (
          <div key={i} className="w-[3px] bg-white" style={{ height: `${h * 20}%` }} />
        ))}
      </div>
    </div>

    {/* Burchakdagi "Yopishqoq Lenta" bo'lagi (Small transparent tape) */}
    <div className="absolute -top-4 -right-8 w-16 h-8 bg-white/10 backdrop-blur-sm rotate-12 border border-white/5 pointer-events-none" 
         style={{ clipPath: "polygon(10% 0%, 90% 0%, 100% 100%, 0% 100%)" }} />
  </div>
</div>

  {/* 📒 MAIN NOTEBOOK PAPER */}
  <div className="bg-[#fffdfa] border-[4px] border-slate-900 p-8 pt-20 shadow-[20px_20px_0px_0px_rgba(15,23,42,1)] relative overflow-hidden">
    
    {/* Spiral Binder Holes (Daftar teshiklari) */}
    <div className="absolute left-6 top-0 bottom-0 flex flex-col justify-around py-6 z-20">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="group relative">
          <div className="w-5 h-5 rounded-full bg-slate-200 border-2 border-slate-400 shadow-inner" />
          {/* Metal spiral simi effekti */}
          <div className="absolute top-1/2 -left-4 w-8 h-1 bg-gradient-to-r from-slate-400 to-slate-200 rounded-full transform -translate-y-1/2 rotate-12 opacity-50" />
        </div>
      ))}
    </div>

    {/* Vertical Red Margin Line (Hoshiya chizig'i) */}
    <div className="absolute left-20 top-0 bottom-0 w-[2px] bg-red-200" />

    {/* Horizontal Lined Paper Effect (Varroqdagi chiziqlar) */}
    <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
         style={{ backgroundImage: `linear-gradient(#000 1.2px, transparent 1.2px)`, backgroundSize: '100% 2.5rem' }} />

    <div className="pl-16 md:pl-24 relative z-10">
      {error && (
        <motion.div 
          initial={{ x: -20, opacity: 0 }} 
          animate={{ x: 0, opacity: 1 }} 
          className="bg-red-50 border-l-8 border-red-500 p-4 mb-8 flex items-center gap-3 text-red-600 font-black text-xs uppercase italic tracking-wider shadow-sm"
        >
          <AlertCircle size={18} /> {error}
        </motion.div>
      )}

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* 🖊️ FORMS SECTION */}
        <div className="flex-1">
          <div className="flex gap-4 mb-10">
            {["login", "signup"].map((m) => (
              <button 
                key={m} 
                onClick={() => { setMode(m as Mode); setError(null); }}
                className={`flex-1 py-3 font-black uppercase text-xs border-4 border-slate-900 transition-all transform hover:-translate-y-1 ${
                  mode === m 
                    ? "bg-slate-900 text-white shadow-[4px_4px_0px_0px_rgba(16,185,129,1)]" 
                    : "bg-white text-slate-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:text-slate-900"
                }`}
              >
                {m === "login" ? "// access_id" : "// create_profile"}
              </button>
            ))}
          </div>

          <form onSubmit={mode === "login" ? handleLogin : handleSignup} className="space-y-6">
            <AnimatePresence mode="wait">
              <motion.div 
                key={mode} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5"
              >
                {mode === "login" ? (
                  <>
                    <WritingInput label="Student ID" icon={<Mail size={18}/>} value={login.username} onChange={(v: any)=>setLogin({...login, username:v})} />
                    <WritingInput label="Passkey" icon={<Lock size={18}/>} isPassword show={showPassword} toggle={()=>setShowPassword(!showPassword)} value={login.password} onChange={(v: any)=>setLogin({...login, password:v})} />
                  </>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <WritingInput label="Full Name" value={signup.full_name} onChange={(v: any)=>setSignup({...signup, full_name:v})} />
                    <WritingInput label="Username" value={signup.username} onChange={(v: any)=>setSignup({...signup, username:v})} />
                    <WritingInput label="Email" type="email" value={signup.email} onChange={(v: any)=>setSignup({...signup, email:v})} />
                    <WritingInput label="Age" type="number" value={signup.age} onChange={(v: any)=>setSignup({...signup, age:v})} />
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Knowledge Level</Label>
                      <select 
                        className="w-full border-4 border-slate-900 h-12 px-4 font-black text-sm bg-slate-50 focus:bg-white focus:ring-0 outline-none transition-colors" 
                        value={signup.level} 
                        onChange={(e)=>setSignup({...signup, level:e.target.value})}
                      >
                        <option value="beginner">Beginner (B1)</option>
                        <option value="intermediate">Intermediate (B2)</option>
                        <option value="advanced">Advanced (C1+)</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <WritingInput label="Motivation" isTextarea value={signup.bio} onChange={(v: any)=>setSignup({...signup, bio:v})} />
                    </div>
                    <WritingInput label="Password" isPassword show={showPassword} toggle={()=>setShowPassword(!showPassword)} value={signup.password} onChange={(v: any)=>setSignup({...signup, password:v})} />
                    <WritingInput label="Confirm" isPassword show={showPassword} toggle={()=>setShowPassword(!showPassword)} value={signup.confirm} onChange={(v: any)=>setSignup({...signup, confirm:v})} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <Button 
              disabled={loading} 
              className="w-full h-16 bg-emerald-500 hover:bg-emerald-600 text-white font-black border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none text-xl uppercase italic active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            >
              {loading ? "⚡ Processing..." : mode === "login" ? "Enter Dashboard →" : "Sign Up Now →"}
            </Button>
          </form>
        </div>

        {/* 📎 SIDEBAR: POST-IT NOTES STYLE */}
        <div className="w-full lg:w-72 space-y-10">
          
          <div className="space-y-4">
            <Label className="text-[11px] font-black uppercase text-slate-400 tracking-[0.2em] block border-b-2 border-slate-100 pb-2">Rapid Access</Label>
            <button 
              onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`} 
              className="w-full flex items-center justify-center gap-3 border-4 border-slate-900 h-14 bg-white font-black text-xs shadow-[6px_6px_0px_0px_rgba(239,68,68,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
            >
              <Chrome size={20} className="text-red-500" /> Sign with Google
            </button>
            <div id="telegram-login-container" className="flex justify-center border-4 border-slate-900 p-2 shadow-[6px_6px_0px_0px_rgba(59,130,246,1)] bg-white">
              {/* Telegram Widget */}
            </div>
          </div>

          {/* Sticky Note (Eslatma qog'ozi) */}
          <div className="bg-yellow-100 border-2 border-slate-900 p-6 -rotate-2 shadow-lg relative group">
            {/* Yopishtirilgan lenta (Tape) */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/40 backdrop-blur-sm border border-slate-200 rotate-3 group-hover:rotate-0 transition-transform" />
            
            <h4 className="text-[12px] font-black uppercase mb-3 flex items-center gap-2 text-yellow-800">
              <BookOpen size={16}/> Writing Task 2
            </h4>
            <p className="text-[13px] font-bold italic text-yellow-900 leading-snug">
              "Consequently, it can be argued that environmental protection should be prioritized..."
            </p>
            <div className="mt-4 pt-3 border-t border-yellow-200 text-[10px] font-black text-yellow-600 uppercase">
              #Academic_Vocabulary
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</motion.div>
    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

function WritingInput({ label, value, onChange, icon, type = "text", isPassword, show, toggle, isTextarea }: any) {
  return (
    <div className="space-y-1 text-left relative group">
      <Label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
        <Pencil size={10} /> {label}
      </Label>
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 z-10">{icon}</span>}
        {isTextarea ? (
          <Textarea className="w-full border-2 border-slate-900 rounded-none p-3 font-bold text-xs bg-slate-50 focus:bg-white transition-all min-h-[90px] outline-none" value={value} onChange={(e)=>onChange(e.target.value)} />
        ) : (
          <Input type={isPassword ? (show ? "text" : "password") : type} className={`w-full border-2 border-slate-900 rounded-none h-11 font-bold text-xs bg-slate-50 focus:bg-white transition-all outline-none ${icon ? "pl-10" : "pl-3"}`} value={value} onChange={(e)=>onChange(e.target.value)} />
        )}
        {isPassword && (
          <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-900">
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}

function FloatingCard({ children, color, title, position, rotate, delay = 0 }: any) {
  const colors: any = {
    red: "bg-red-50 border-red-500 text-red-700 shadow-red-100",
    yellow: "bg-yellow-50 border-yellow-500 text-yellow-800 shadow-yellow-100",
    green: "bg-emerald-50 border-emerald-500 text-emerald-800 shadow-emerald-100",
    blue: "bg-blue-50 border-blue-500 text-blue-800 shadow-blue-100",
    purple: "bg-purple-50 border-purple-500 text-purple-800 shadow-purple-100",
    orange: "bg-orange-50 border-orange-500 text-orange-800 shadow-orange-100",
  };

  // Lentaning rangi (Tape effect)
  const tapeColors: any = {
    red: "bg-red-400/30",
    yellow: "bg-yellow-400/30",
    green: "bg-emerald-400/30",
    blue: "bg-blue-400/30",
    purple: "bg-purple-400/30",
    orange: "bg-orange-400/30",
  };

  return (
    <motion.div 
      drag 
      // dragConstraints o'rniga dragElastic ishlatamiz, foydalanuvchi butun ekran bo'ylab sura oladi
      dragElastic={0.2} 
      whileDrag={{ scale: 1.05, zIndex: 100, cursor: "grabbing" }}
      initial={{ opacity: 0, scale: 0.5, y: 20, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        rotate: rotate, // Berilgan burchak ostida turadi
      }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: delay 
      }}
      className={`absolute ${position} w-64 hidden xl:block z-40`}
    >
      {/* 📎 Yopishqoq lenta effekti (Tape) */}
      <div className={`absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 ${tapeColors[color]} backdrop-blur-sm border border-white/20 -rotate-2 z-50`} 
           style={{ clipPath: "polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)" }} />

      <div className={`p-5 border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] ${colors[color]} relative`}>
        <h4 className="text-[10px] font-black uppercase mb-2 flex items-center gap-2 border-b-2 border-slate-900/10 pb-1">
          <Sparkles size={14} className="text-slate-900/40" /> {title}
        </h4>
        <div className="text-[12px] font-bold leading-tight tracking-tight italic">
          {children}
        </div>
        
        {/* Burchakdagi kichik pin yoki dog' effekti */}
        <div className="absolute bottom-1 right-1 opacity-10">
          <Pencil size={10} />
        </div>
      </div>
    </motion.div>
  );
}