// /context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, meAPI } from "@/lib/api/auth";
import { useRouter } from "next/navigation";

type User = any;

type AuthContextType = {
    user: User | null;
    loading: boolean;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    async function refreshUser() {
        try {
        const u = await meAPI();
        setUser(u);
        } catch (e) {
        setUser(null);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        // On mount, try load user from token
        refreshUser();
    }, []);

    async function login(username: string, password: string) {
        // returns { access_token, token_type, user? }
        const res = await loginAPI(username, password);
        if (res.access_token) {
        localStorage.setItem("token", res.access_token);
        }
        // optionally the login response may also include user — if so use it
        if (res.user) {
        setUser(res.user);
        } else {
        // otherwise call /me
        await refreshUser();
        }
    }

    function logout() {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/auth/login");
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
        {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
