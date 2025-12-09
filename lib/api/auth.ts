import api from "./axios";
import {
    RegisterPayload,
    LoginPayload,
    TelegramRegisterPayload,
} from "../types/auth";

export const registerAPI = (payload: RegisterPayload) => {
    return api.post("/auth/register", payload);
};

export const loginAPI = ({ username, password }: LoginPayload) => {
    const body = new URLSearchParams();
    body.append("username", username);
    body.append("password", password);

    return api.post("/auth/login", body, {
        headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        },
    });
};

export const meAPI = () => {
    return api.get("/auth/me");
};

export const telegramRegisterAPI = (
    payload: TelegramRegisterPayload
) => {
    return api.post("/auth/telegram_register", payload);
};

export const logoutAPI = () => {
    return api.post("/auth/logout");
};
