import api from "./axios";

export const getAllTasksAPI = () => api.get("/tasks/all");

export const getTaskDetailsAPI = (taskId: number) => api.get(`/tasks/select/${taskId}`);

export const submitTaskAPI = (taskId: number, payload: { content: string; file_url?: string }) => 
    api.post(`/tasks/${taskId}/submit`, payload);

export const getMyTasksAPI = () => api.get("/users/user/my");