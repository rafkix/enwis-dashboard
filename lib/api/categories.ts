// lib/api/categories.ts
import api from "./axios"

export const getCategoriesAPI = () =>
    api.get("/categories/all")

export const getCategoryAPI = (id: number) =>
    api.get(`/categories/${id}`)

export const createCategoryAPI = (payload: any) =>
    api.post("/categories/create", payload)

export const updateCategoryAPI = (id: number, payload: any) =>
    api.put(`/categories/${id}`, payload)

export const deleteCategoryAPI = (id: number) =>
    api.delete(`/categories/${id}`)
