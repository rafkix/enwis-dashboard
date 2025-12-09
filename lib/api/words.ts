// lib/api/words.ts
import api from "./axios"

export const searchWordsAPI = (q: string) =>
    api.get("/words/search", { params: { q } })

export const getWordAPI = (id: number) =>
    api.get(`/words/get_word/${id}`)

export const getUserWordsAPI = () =>
    api.get("/words/user")

export const addUserWordAPI = (payload: {
    word_id: number
}) => api.post("/words/user/add", payload)

export const reviewWordAPI = (userWordId: number) =>
    api.post(`/words/user/${userWordId}/review`)
