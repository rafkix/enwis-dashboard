// lib/api/dashboard.ts
import api from "./axios"; // o'zingizning axios instance-ingiz

export const getDashboardData = async () => {
  const [courses, dailyWords, myTasks] = await Promise.all([
    api.get("/courses/all"),
    api.get("/daily-words/all"),
    api.get("/users/user/my")
  ]);
  return {
    courses: courses.data,
    dailyWords: dailyWords.data,
    tasks: myTasks.data
  };
};