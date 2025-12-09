// lib/api/lessons.ts
import api from "./axios"

export const getAllLessonsAPI = () =>
    api.get("/lessons/all")

export const getLessonsByCourseAPI = (courseId: number) =>
    api.get(`/lessons/by_course/${courseId}`)

export const createLessonAPI = (payload: {
    title: string
    description?: string
    course_id: number
}) => api.post("/lessons/create", payload)

export const updateLessonAPI = (
    lessonId: number,
    payload: any
) => api.put(`/lessons/update/${lessonId}`, payload)

export const deleteLessonAPI = (lessonId: number) =>
    api.delete(`/lessons/delete/${lessonId}`)
