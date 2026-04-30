"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { LockKeyhole, Mail } from "lucide-react";
import { companyInfo } from "@/data/company";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10 sm:px-6">
      <section className="w-full max-w-md border border-slate-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="mb-8 text-center">
          <Image src="/LOGO.png" alt={companyInfo.name} width={72} height={72} className="mx-auto h-16 w-16 object-contain" priority />
          <h1 className="mt-4 text-2xl font-bold text-primary">Radiatech Electra</h1>
          <p className="mt-1 text-sm text-slate-500">Admin Login</p>
        </div>

        <div className="mb-6 border-b border-slate-100 pb-5">
          <h2 className="text-xl font-semibold text-slate-950">Sign in to continue</h2>
          <p className="mt-1 text-sm text-slate-500">Enter your registered admin credentials.</p>
        </div>

        {error && <div className="mb-4 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Email</span>
            <span className="relative block">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="admin-input pl-10" placeholder="admin@radiatech.in" />
            </span>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-slate-700">Password</span>
            <span className="relative block">
              <LockKeyhole size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="admin-input pl-10" placeholder="Enter password" />
            </span>
          </label>
          <button type="submit" disabled={loading} className="w-full bg-primary px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </section>
    </main>
  );
}