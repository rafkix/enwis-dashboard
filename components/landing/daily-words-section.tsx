"use client";

import React, { JSX, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/* Minimal local VolumeUpIcon */
const VolumeUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M11 5L6 9H2v6h4l5 4V5z" />
    <path d="M15.54 8.46a5 5 0 010 7.07 1 1 0 0 0 1.41-1.41 3 3 0 000-4.24 1 1 0 0 0-1.41-1.42z" />
    <path d="M17.66 6.34a8 8 0 010 11.32 1 1 0 0 0 1.41-1.41 6 6 0 000-8.5 1 1 0 0 0-1.41-1.41z" />
  </svg>
);


/* Types */
type BaseWord = {
  word: string;
  uz_translation: string;
  level: string;
  bgClass: string;
  borderClass: string;
};

type WordDetails = {
  word: string;
  definitions: { definition: string; example?: string }[];
  phonetic?: string;
  audio?: string;
  part?: string;
  synonyms: string[];
  antonyms: string[];
  origin?: string;
};

/* ✅ DEFAULT WORDS (API bo‘lmasa ishlaydi) */
const BASE_WORDS: BaseWord[] = [
  { word: "Meticulous", uz_translation: "Juda ehtiyotkor, juda aniqlik bilan ishlovchi", level: "C1", bgClass: "bg-purple-400", borderClass: "border-purple-500" },
  { word: "Inevitable", uz_translation: "Muqarrar, oldini olib bo‘lmaydigan", level: "B2", bgClass: "bg-blue-400", borderClass: "border-blue-500" },
  { word: "Comprehensive", uz_translation: "Har tomonlama to‘liq qamrab oluvchi", level: "C1", bgClass: "bg-emerald-400", borderClass: "border-emerald-500" },
  { word: "Transform", uz_translation: "Tubdan o‘zgartirmoq", level: "B1", bgClass: "bg-yellow-400", borderClass: "border-yellow-500" },
  { word: "Innovative", uz_translation: "Yangi texnologiya yoki usulni qo‘llovchi", level: "C1", bgClass: "bg-pink-400", borderClass: "border-pink-500" },
];

/* ✅ LEVEL COLORS */
const LEVEL_STYLES: Record<string, { bgClass: string; borderClass: string }> = {
  A1: { bgClass: "bg-gray-400", borderClass: "border-gray-500" },
  A2: { bgClass: "bg-green-400", borderClass: "border-green-500" },
  B1: { bgClass: "bg-yellow-400", borderClass: "border-yellow-500" },
  B2: { bgClass: "bg-blue-400", borderClass: "border-blue-500" },
  C1: { bgClass: "bg-purple-400", borderClass: "border-purple-500" },
  C2: { bgClass: "bg-red-400", borderClass: "border-red-500" },
};

const COLOR_SET = [
  { bgClass: "bg-purple-400", borderClass: "border-purple-500" },
  { bgClass: "bg-blue-400", borderClass: "border-blue-500" },
  { bgClass: "bg-emerald-400", borderClass: "border-emerald-500" },
  { bgClass: "bg-pink-400", borderClass: "border-pink-500" },
  { bgClass: "bg-yellow-400", borderClass: "border-yellow-500" },
  { bgClass: "bg-red-400", borderClass: "border-red-500" },
  { bgClass: "bg-indigo-400", borderClass: "border-indigo-500" },
];


/* ✅ DAILY WORDS API */
async function fetchDailyWords(): Promise<BaseWord[]> {
  try {
    const res = await fetch("https://api.enwis.uz/v1/api/daily-words");
    if (!res.ok) return BASE_WORDS;

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return BASE_WORDS;

    return data.slice(0, 5).map((item: any, idx: number) => {
      const color = COLOR_SET[idx % COLOR_SET.length];

      return {
        word: item.word || BASE_WORDS[idx]?.word || `Word${idx + 1}`,
        uz_translation:
          item.uz_translation ||
          item.translation ||
          BASE_WORDS[idx]?.uz_translation ||
          "",
        level: item.level || "—", // level bor, lekin rangga ta’sir qilmaydi
        bgClass: color.bgClass,
        borderClass: color.borderClass,
      };
    });
  } catch {
    return BASE_WORDS;
  }
}


/* Dictionary API (o‘zgarmagan) */
async function fetchDictionaryEntry(word: string): Promise<WordDetails | null> {
  try {
    const res = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`
    );
    if (!res.ok) return null;

    const data = await res.json();
    const entry = data[0];
    const meanings = entry?.meanings || [];

    return {
      word,
      definitions: meanings.flatMap((m: any) =>
        (m.definitions || []).map((d: any) => ({
          definition: d.definition,
          example: d.example,
        }))
      ),
      phonetic: entry?.phonetic,
      audio: entry?.phonetics?.find((p: any) => p.audio)?.audio,
      part: meanings[0]?.partOfSpeech,
      synonyms: meanings.flatMap((m: any) => m.synonyms || []),
      antonyms: meanings.flatMap((m: any) => m.antonyms || []),
      origin: entry?.origin,
    };
  } catch {
    return null;
  }
}

/* -----------------------------------------
Component
------------------------------------------- */

export default function DailyWordsSection(): JSX.Element {
  const [words, setWords] = useState<BaseWord[]>(BASE_WORDS);
  const [selected, setSelected] = useState<string | null>(null);
  const [details, setDetails] = useState<WordDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingWords, setLoadingWords] = useState(true);
  const [wordsError, setWordsError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  // Fetch daily words once on mount
  useEffect(() => {
    let mounted = true;
    setLoadingWords(true);
    fetchDailyWords()
      .then((res) => {
        if (!mounted) return;
        setWords(res);
      })
      .catch((err) => {
        if (!mounted) return;
        setWordsError("Failed to load daily words. Showing defaults.");
        setWords(BASE_WORDS);
      })
      .finally(() => {
        if (!mounted) return;
        setLoadingWords(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Fetch dictionary entry when selected changes
  useEffect(() => {
    if (!selected) return;
    let mounted = true;
    setLoading(true);
    setDetails(null);

    fetchDictionaryEntry(selected)
      .then((res) => {
        if (!mounted) return;
        setDetails(res);
      })
      .catch(() => {
        if (!mounted) return;
        setDetails(null);
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [selected]);

  // ESC to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setDetails(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeModal = () => {
    setSelected(null);
    setDetails(null);
  };

  const playAudio = () => {
    if (!details?.audio) return;
    try {
      new Audio(details.audio).play();
    } catch {
      // ignore playback errors
    }
  };

  return (
    <section className="py-24 bg-linear-to-b from-[#F8FAFC] to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
        {/* TITLE */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E293B]" data-aos="fade-up">
          Daily Vocabulary Boost
        </h2>

        {/* STATUS */}
        <div className="mt-4">
          {loadingWords ? (
            <p className="text-gray-500">Loading words...</p>
          ) : wordsError ? (
            <p className="text-yellow-600">{wordsError}</p>
          ) : (
            <p className="text-gray-500">Tap a word to see definitions and examples.</p>
          )}
        </div>

        {/* GRID */}
        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          {words.map((w, i) => (
            <button
              key={`${w.word}-${i}`}
              onClick={() => setSelected(w.word)}
              className="
                group relative p-6 rounded-2xl bg-white/40 backdrop-blur-md
                border border-white/30 shadow-2xl hover:-translate-y-2
                transition-all duration-300 text-left
              "
              aria-label={`Open details for ${w.word}`}
            >
              <div className={`absolute -top-8 -right-8 w-28 h-28 ${w.bgClass} blur-3xl opacity-30`} />

              <span className={`px-3 py-1 text-sm text-white rounded-full ${w.bgClass}`}>
                {w.level}
              </span>

              <h3 className="mt-4 text-2xl font-bold text-[#111827]">{w.word}</h3>

              <p className="mt-2 text-gray-600 text-sm">Tap for details</p>

              {/* Hover bottom neon line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-full ${w.bgClass} opacity-0 group-hover:opacity-80 transition`}
              />
            </button>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl p-6 relative">
            {/* CLOSE BUTTON */}
            <button
              className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-black"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>

            {loading || !details ? (
              <div className="flex flex-col items-center gap-4">
                <p className="text-gray-600">{loading ? "Loading..." : "No details found."}</p>
                <button
                  onClick={() => {
                    // try dictionary with lowercase fallback
                    if (!loading) {
                      setSelected((s) => (s ? s.toLowerCase() : s));
                    }
                  }}
                  className="px-4 py-2 rounded bg-gray-100"
                >
                  Try lowercase
                </button>
              </div>
            ) : (
              <>
                {/* Word + Phonetic + Audio */}
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold">{details.word}</h3>

                  {details.phonetic && <span className="text-gray-500 text-lg">{details.phonetic}</span>}

                  {details.audio && (
                    <button onClick={playAudio} className="text-blue-600 hover:text-blue-800" aria-label="Play audio">
                      <VolumeUpIcon className="w-7 h-7" />
                    </button>
                  )}
                </div>

                <p className="text-gray-600 mt-1">{details.part}</p>

                {/* Uzbek Translation */}
                <div className="mt-4 p-3 rounded-xl bg-linear-to-r from-green-50 to-green-100 border border-green-300 shadow">
                  <h4 className="font-semibold text-green-800">Uzbek Translation</h4>
                  <p className="text-gray-700 mt-1">
                    {words.find((w) => w.word.toLowerCase() === details.word.toLowerCase())
                      ?.uz_translation || "Tarjima mavjud emas."}
                  </p>
                </div>

                {/* Definitions */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">Definitions</h4>
                  <ul className="list-disc ml-6 mt-2 space-y-2">
                    {details.definitions.length > 0 ? (
                      details.definitions.map((d, i) => (
                        <li key={i} className="text-gray-700">
                          {d.definition}
                          {d.example && <p className="text-sm italic text-gray-500">“{d.example}”</p>}
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">No definitions found.</li>
                    )}
                  </ul>
                </div>

                {/* Synonyms */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">Synonyms</h4>
                  {details.synonyms.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.synonyms.map((s, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-gray-100 text-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No synonyms found.</p>
                  )}
                </div>

                {/* Antonyms */}
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-800">Antonyms</h4>
                  {details.antonyms.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {details.antonyms.map((a, i) => (
                        <span key={i} className="px-2 py-1 rounded bg-red-50 text-sm">
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No antonyms found.</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
