import api from "./axios";

// AI Chat
export const aiChatAPI = (message: string) => api.post("/services/ai/chat", { message });

// Video Shadowing
export const getMyShadowingAttemptsAPI = () => api.get("/services/video-shadowing/me");
export const createShadowingAttemptAPI = (payload: any) => api.post("/services/video-shadowing/create", payload);

// Audio Writing
export const getMyAudioAttemptsAPI = () => api.get("/services/audio-writing/me");