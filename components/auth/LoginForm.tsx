"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { loginSchema, type LoginInput } from "@/lib/auth/schemas";
import { loginRequest } from "@/lib/auth/client";
import { useAppDispatch } from "@/lib/store/hooks";
import { setUser } from "@/lib/store/auth-slice";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const passwordValue = watch("password");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (typeof e.getModifierState === "function") {
        setCapsLockOn(e.getModifierState("CapsLock"));
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  async function onSubmit(values: LoginInput) {
    if (submitting) return;
    setSubmitting(true);
    setServerError("");

    try {
      const { ok, data, status } = await loginRequest({
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });

      if (!ok) {
        setServerError(
          data.error ||
            (status === 429
              ? "Too many attempts. Please wait and try again."
              : "Unable to sign in.")
        );
        setSubmitting(false);
        return;
      }

      dispatch(setUser(data.user));
      const next = searchParams.get("next") || "/admin/dashboard";
      router.replace(next.startsWith("/admin") ? next : "/admin/dashboard");
      router.refresh();
    } catch {
      setServerError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-[420px]"
    >
      <div className="mb-6 text-center lg:mb-7 lg:text-left">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald/25 bg-emerald/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-dark">
          <ShieldCheck className="h-3.5 w-3.5" />
          Authorized Access
        </div>
        <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
          Welcome Back
        </h2>
        <p className="mt-1.5 text-sm text-muted">
          Sign in to the EIDF CMS Dashboard
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-2xl border border-line bg-white p-5 shadow-[0_20px_50px_-20px_rgba(11,25,44,0.18)] sm:rounded-3xl sm:p-7"
        noValidate
      >
        {serverError && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-700"
          >
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <div>
          <label htmlFor="email" className="mb-1.5 block text-xs font-bold text-navy">
            Email Address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="email"
              type="email"
              autoComplete="username"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className="w-full rounded-xl border border-line bg-[#f8fafc] py-3 pr-4 pl-11 text-sm text-navy outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20 sm:rounded-2xl"
              placeholder="admin@eidf.org.in"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="mt-1.5 text-xs text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-xs font-bold text-navy">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={
                errors.password || capsLockOn ? "password-hint" : undefined
              }
              className="w-full rounded-xl border border-line bg-[#f8fafc] py-3 pr-12 pl-11 text-sm text-navy outline-none transition focus:border-emerald focus:bg-white focus:ring-2 focus:ring-emerald/20 sm:rounded-2xl"
              placeholder="Enter your password"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-lg p-1.5 text-muted transition hover:bg-navy/5 hover:text-navy"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div id="password-hint" className="mt-1.5 space-y-1">
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password.message}</p>
            )}
            {capsLockOn && passwordValue && (
              <p className="text-xs font-semibold text-amber-600">Caps Lock is on</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-navy/80">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-line text-emerald focus:ring-emerald"
              {...register("rememberMe")}
            />
            Remember Me
          </label>
          <button
            type="button"
            className="text-xs font-bold text-navy/55 transition hover:text-emerald-dark"
            onClick={() =>
              setServerError(
                "Password reset is managed by the EIDF secretariat. Contact hq.ranchi@eidf.org.in"
              )
            }
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={submitting || !isValid}
          className="w-full rounded-full bg-gradient-to-r from-navy to-navy-mid py-3.5 text-sm font-bold text-white shadow-lg shadow-navy/20 transition enabled:hover:from-navy-mid enabled:hover:to-navy-light enabled:hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-55"
        >
          <span className="flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin text-gold" /> Signing in…
              </>
            ) : (
              <>
                Sign In
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </>
            )}
          </span>
        </button>

        <div className="flex items-center gap-3 pt-1 text-[10px] font-semibold tracking-wider text-muted uppercase">
          <div className="h-px flex-1 bg-line" />
          Future Support
          <div className="h-px flex-1 bg-line" />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {["Microsoft", "Google"].map((provider) => (
            <div
              key={provider}
              aria-disabled="true"
              className="select-none rounded-xl border border-dashed border-line bg-[#f8fafc] px-3 py-2.5 text-center opacity-60"
            >
              <div className="text-[11px] font-semibold text-muted">
                Login with {provider}
              </div>
              <div className="mt-0.5 text-[9px] font-bold tracking-wide text-amber-600 uppercase">
                Coming Soon
              </div>
            </div>
          ))}
        </div>

        <p className="pt-1 text-center text-[10px] font-semibold tracking-widest text-muted uppercase">
          Authorized Access Only
        </p>
      </form>
    </motion.div>
  );
}
