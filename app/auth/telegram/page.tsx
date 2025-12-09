"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        onTelegramAuth: (user: any) => void;
    }
}

export default function TelegramLoginWidget() {
    useEffect(() => {
        window.onTelegramAuth = async function (user) {
        console.log("TG USER:", user);

        const payload = {
            telegram_id: user.id,
            full_name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
            username: user.username,
            profile_image: user.photo_url,
            bio: "",
        };

        const resp = await fetch("/v1/api/auth/telegram_register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        const data = await resp.json();

        if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            window.location.href = "/dashboard";
        }
        };

        const script = document.createElement("script");
        script.src = "https://telegram.org/js/telegram-widget.js?22";
        script.async = true;

        script.setAttribute("data-telegram-login", "walleuzbot");
        script.setAttribute("data-size", "large");
        script.setAttribute("data-radius", "10");
        script.setAttribute("data-request-access", "write");

        // ⚠️ Correct onAuth call (must include user argument)
        script.setAttribute("data-onauth", "window.onTelegramAuth(user)");

        document.getElementById("telegram-login-box")?.appendChild(script);
    }, []);

    return <div id="telegram-login-box"></div>;
}
