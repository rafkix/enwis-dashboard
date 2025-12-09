// lib/api/words.ts
import api from "./axios"

export type DailyWord = {
    id: number;
    word: string;
    uz_translation: string;
    level: string;
    created_at: string;
};

export const getDailyWordsAPI = () =>
    api.get<DailyWord[]>("/daily-words");

export const markDailyWordAsSeenAPI = (dailyWordId: number) =>
    api.post(`/daily-words/select/${dailyWordId}`)

export const createDailyWordsAPI = () =>
    api.post("/daily-words/create_word")

export const updateDailyWordAPI = (dailyWordId: number, payload: {
    word_id: number
}) => api.post(`/daily-words/update_word${dailyWordId}`, payload)

export const deleteDailyWordAPI = (dailyWordId: number) =>
    api.post(`/daily-words/${dailyWordId}`)