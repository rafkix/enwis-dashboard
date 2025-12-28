'use client'

import React, { useState } from "react"
import { Volume2, X, Highlighter, PencilLine, Hash } from 'lucide-react'
import { motion, AnimatePresence } from "framer-motion"

const BASE_WORDS = [
  { word: "Meticulous", uz_translation: "Juda ehtiyotkor", level: "C1", color: "#dcfce7", rotate: -2 },
  { word: "Inevitable", uz_translation: "Muqarrar", level: "B2", color: "#dbeafe", rotate: 2 },
  { word: "Comprehensive", uz_translation: "Har tomonlama", level: "C1", color: "#f3e8ff", rotate: -1 },
  { word: "Transform", uz_translation: "O'zgartirmoq", level: "B1", color: "#fef9c3", rotate: 3 },
  { word: "Innovative", uz_translation: "Yangilikchi", level: "C1", color: "#ffe4e6", rotate: -3 },
];

export default function DailyWordsSection() {
  const [selected, setSelected] = useState<typeof BASE_WORDS[0] | null>(null);

  return (
    <section className="py-24 bg-[#FCFCF9] relative overflow-hidden" id="vocabulary">
      
      {/* DAFTAR FON EFFEKTLARI */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px)`, backgroundSize: '100% 40px' }} 
      />
      <div className="absolute left-[5%] md:left-[8%] top-0 bottom-0 w-[2px] bg-red-200/40 z-0" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* SARLAVHA ANIMATSIYASI */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EAB308] text-white font-black text-xs uppercase -rotate-1 mb-4">
             <PencilLine size={14} /> Today's Vocabulary
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter italic uppercase">
            Word <span className="text-[#EAB308]">Stickers</span>
          </h2>
        </motion.div>

        {/* STIKERLAR GRIDI */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {BASE_WORDS.map((w, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <button
                onClick={() => setSelected(w)}
                style={{ backgroundColor: w.color, rotate: `${w.rotate}deg` }}
                className="group relative w-full p-6 min-h-[200px] flex flex-col justify-between text-left border-[3px] border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
              >
                {/* SKOTCH */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-7 bg-white/60 backdrop-blur-sm border-x border-slate-200 -rotate-2" />

                <div>
                  <span className="text-[10px] font-black uppercase text-slate-500/60 block mb-2 underline decoration-slate-300 underline-offset-4">Level {w.level}</span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight break-words uppercase italic">
                    {w.word}
                  </h3>
                </div>

                <div className="mt-4 border-t-2 border-slate-900/10 pt-3 flex justify-between items-center">
                   <span className="text-[10px] font-bold text-slate-600 uppercase">Open Card</span>
                   <Highlighter size={16} className="text-[#EAB308]" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL ANIMATSIYASI */}
      <AnimatePresence>
        {selected && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Fonni qorong'ulashtirish */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Modal Varag'i */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="bg-white border-[4px] border-slate-900 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full relative overflow-hidden z-[101]"
            >
              {/* MODAL HEADER */}
              <div className="bg-slate-900 p-4 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#EAB308]" />
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <button 
                  onClick={() => setSelected(null)} 
                  className="text-white hover:rotate-90 transition-transform bg-white/10 p-1 rounded"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-4xl font-black italic uppercase text-slate-900 tracking-tighter underline decoration-[#EAB308] decoration-4">
                    {selected.word}
                  </h3>
                  <button className="p-3 bg-slate-100 rounded-full hover:bg-[#EAB308] group transition-all">
                    <Volume2 size={24} className="group-hover:text-white" />
                  </button>
                </div>

                {/* Tarjima - Marker foni bilan */}
                <div className="relative inline-block py-1 px-4">
                  <span className="relative z-10 text-2xl font-serif italic font-bold text-slate-800">
                    {selected.uz_translation}
                  </span>
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: '100%' }}
                    className="absolute inset-0 bg-[#EAB308]/40 -rotate-2 z-0" 
                  />
                </div>

                <div className="pt-6 border-t-2 border-dashed border-slate-200">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <Hash size={12} /> Meaning
                  </h4>
                  <p className="text-slate-700 italic leading-relaxed font-medium">
                    Showing great attention to detail; very careful and precise in your work.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                   <div className="flex-1 p-3 bg-emerald-50 border-l-4 border-emerald-400">
                      <p className="text-[9px] font-black text-emerald-600 uppercase">Synonym</p>
                      <p className="text-sm font-bold">Thorough</p>
                   </div>
                   <div className="flex-1 p-3 bg-rose-50 border-l-4 border-rose-400">
                      <p className="text-[9px] font-black text-rose-600 uppercase">Antonym</p>
                      <p className="text-sm font-bold">Careless</p>
                   </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3 border-t border-slate-200 text-center">
                 <p className="text-[9px] font-mono text-slate-400">DAILY_VOCAB_STICKER_SYSTEM_V.1</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}