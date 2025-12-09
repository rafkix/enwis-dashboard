"use client";

import { JSX, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { Eye, EyeOff, Mail, Lock } from "lucide-react";

import {
  loginAPI,
  meAPI,
  registerAPI,
  telegramRegisterAPI,
} from "@/lib/api/auth";

/* ---------------- TYPES ---------------- */

type Mode = "login" | "signup";

type LoginForm = {
  username: string;
  password: string;
};

type SignupForm = {
  full_name: string;
  username: string;
  email: string;
  phone: string;
  age: string; // ✅ string sifatida saqlaymiz
  password: string;
  confirm: string;
  level: string;
  bio: string;
  profile_image: string;
};

/* ---------------- COMPONENT ---------------- */

export default function AuthPage(): JSX.Element {
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  /* ---------------- STATE ---------------- */

  const [login, setLogin] = useState<LoginForm>({
    username: "",
    password: "",
  });

  const [signup, setSignup] = useState<SignupForm>({
    full_name: "",
    username: "",
    email: "",
    phone: "",
    age: "",
    password: "",
    confirm: "",
    level: "beginner",
    bio: "",
    profile_image: "default.png",
  });

  /* ---------------- HELPERS ---------------- */

  const redirectByRole = (role: string) => {
    const map: Record<string, string> = {
      student: "/student",
      teacher: "/teacher",
      mentor: "/mentor",
      admin: "/admin",
    };
    router.push(map[role] ?? "/");
  };

  const changeSignup = (key: keyof SignupForm, value: string) => {
    setSignup((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- TELEGRAM SIGNUP ---------------- */

  useEffect(() => {
    if (mode !== "signup") return;

    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-widget.js?22";
    script.async = true;
    document.body.appendChild(script);

    (window as any).TelegramLoginCallback = async (user: any) => {
      try {
        setLoading(true);

        await telegramRegisterAPI({
          full_name: `${user.first_name} ${user.last_name || ""}`,
          username: user.username || "",
          telegram_id: String(user.id),
          profile_image: user.photo_url || "default.png",
          bio: "",
        });

        const me = await meAPI();
        redirectByRole(me.data.role);
      } catch {
        setError("Telegram signup failed");
      } finally {
        setLoading(false);
      }
    };

    return () => {
      document.body.removeChild(script);
      (window as any).TelegramLoginCallback = undefined;
    };
  }, [mode, router]);

  /* ---------------- LOGIN ---------------- */

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!login.username || !login.password) {
      setError("Enter username and password");
      return;
    }

    try {
      setLoading(true);

      const res = await loginAPI(login);
      localStorage.setItem("access_token", res.data.access_token);

      const me = await meAPI();
      redirectByRole(me.data.role);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          err?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- SIGNUP ---------------- */

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!signup.full_name || !signup.username || !signup.email) {
      setError("Please fill required fields");
      return;
    }

    if (!signup.age) {
      setError("Age is required");
      return;
    }

    if (signup.password !== signup.confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await registerAPI({
        full_name: signup.full_name,
        username: signup.username,
        email: signup.email,
        phone: signup.phone,
        age: Number(signup.age), // ✅ ALWAYS number
        password: signup.password,
        level: signup.level,
        role: "student",
        profile_image: signup.profile_image,
      });

      setMode("login");
      setLogin({ username: signup.username, password: "" });
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.response?.data?.detail ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-linear-to-br from-slate-100 to-slate-200">
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-xl border p-8 rounded-3xl shadow-xl">
        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground">
            {mode === "login"
              ? "Sign in to continue"
              : "Join and start learning"}
          </p>
        </div>

        {/* MODE SWITCH */}
        <div className="flex justify-center gap-3 mb-4">
          {["login", "signup"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as Mode)}
              className={`px-4 py-2 rounded-xl border ${
                mode === m
                  ? "bg-emerald-600 text-white"
                  : "bg-white/70"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {error && (
          <p className="text-center text-red-500 text-sm mb-4">
            {error}
          </p>
        )}

        {/* LOGIN */}
        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-4">
            <InputWithIcon
              label="Username"
              icon={<Mail size={16} />}
              value={login.username}
              onChange={(v: string) =>
                setLogin((p) => ({ ...p, username: v }))
              }
            />

            <PasswordInput
              label="Password"
              value={login.password}
              show={showPassword}
              onChange={(v: string) =>
                setLogin((p) => ({ ...p, password: v }))
              }
              toggle={() => setShowPassword((s) => !s)}
            />

            <Button className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        )}

        {/* SIGNUP */}
        {mode === "signup" && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <InputPart label="Full Name" value={signup.full_name}
                onChange={(v: string) => changeSignup("full_name", v)} />

              <InputPart label="Username" value={signup.username}
                onChange={(v: string) => changeSignup("username", v)} />

              <InputPart label="Email" type="email" value={signup.email}
                onChange={(v: string) => changeSignup("email", v)} />

              <InputPart label="Phone" value={signup.phone}
                onChange={(v: string) => changeSignup("phone", v)} />

              <InputPart label="Age" type="number" value={signup.age}
                onChange={(v: string) => changeSignup("age", v)} />

              <div>
                <Label>Level</Label>
                <select
                  className="w-full rounded-xl border px-3 py-2"
                  value={signup.level}
                  onChange={(e) =>
                    changeSignup("level", e.target.value)
                  }
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <Label>Bio</Label>
              <Textarea
                value={signup.bio}
                onChange={(e) =>
                  changeSignup("bio", e.target.value)
                }
              />
            </div>

            <PasswordInput
              label="Password"
              value={signup.password}
              show={showPassword}
              onChange={(v: string) =>
                changeSignup("password", v)
              }
              toggle={() => setShowPassword((s) => !s)}
            />

            <PasswordInput
              label="Confirm Password"
              value={signup.confirm}
              show={showPassword}
              onChange={(v: string) =>
                changeSignup("confirm", v)
              }
              toggle={() => setShowPassword((s) => !s)}
            />

            <Button className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

/* ---------------- UI HELPERS ---------------- */

function InputPart({ label, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function InputWithIcon({ label, value, onChange, icon }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-muted-foreground">
          {icon}
        </span>
        <Input
          className="pl-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}

function PasswordInput({ label, value, onChange, show, toggle }: any) {
  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
        <Input
          type={show ? "text" : "password"}
          className="pl-10 pr-10"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-3"
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}
