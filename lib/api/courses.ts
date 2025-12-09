// lib/api/courses.ts
import api from "./axios"

export const getAllCoursesAPI = () =>
  api.get("/courses/all")

export const getCourseAPI = (id: number) =>
  api.get(`/courses/${id}`)

export const createCourseAPI = (payload: any) =>
  api.post("/courses/create", payload)

export const updateCourseAPI = (id: number, payload: any) =>
  api.put(`/courses/${id}`, payload)

export const deleteCourseAPI = (id: number) =>
  api.delete(`/courses/${id}`)
