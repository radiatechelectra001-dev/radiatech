"use client";

import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, ShieldCheck, User } from "lucide-react";
import AdminShell from "@/components/admin/AdminShell";

interface AdminUser {
  id: string;
  email: string;
  name: string;
  createdAt?: string;
}

function PasswordInput({
  label,
  value,
  onChange,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoComplete?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required
          autoComplete={autoComplete}
          className="w-full border border-slate-200 px-4 py-2.5 pr-11 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
          suppressHydrationWarning
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

export default function AdminProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadUser() {
      const res = await fetch("/api/auth/me");
      if (res.status === 401) {
        router.replace("/admin/login");
        return;
      }
      const data = (await res.json().catch(() => null)) as { user?: AdminUser } | null;
      setUser(data?.user ?? null);
      setLoading(false);
    }
    void loadUser();
  }, [router]);

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const data = (await res.json().catch(() => null)) as { error?: string } | null;

      if (res.ok) {
        setSuccess("Password changed successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data?.error ?? "Failed to change password. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminShell title="My Profile">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse border border-slate-200 bg-white" />
          ))}
        </div>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      title="My Profile"
      description="View your account details and manage your password."
    >
      <div className="mx-auto max-w-xl space-y-6">
        {/* Account Info Card */}
        <section className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-primary/10 text-primary">
              <User size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Account Information</h2>
              <p className="text-xs text-slate-500">Your admin account details</p>
            </div>
          </div>

          <dl className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <dt className="text-sm font-medium text-slate-500">Name</dt>
              <dd className="text-sm font-semibold text-slate-900">{user?.name ?? "—"}</dd>
            </div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <dt className="text-sm font-medium text-slate-500">Email</dt>
              <dd className="text-sm font-semibold text-slate-900">{user?.email ?? "—"}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm font-medium text-slate-500">Account ID</dt>
              <dd className="font-mono text-xs text-slate-400">{user?.id ?? "—"}</dd>
            </div>
          </dl>
        </section>

        {/* Change Password Card */}
        <section className="border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-accent/10 text-accent">
              <KeyRound size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Change Password</h2>
              <p className="text-xs text-slate-500">Use a strong password with at least 8 characters</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <PasswordInput
              label="Current Password"
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
            />
            <PasswordInput
              label="New Password"
              value={newPassword}
              onChange={setNewPassword}
              autoComplete="new-password"
            />
            <PasswordInput
              label="Confirm New Password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />

            {error && (
              <div className="flex items-start gap-2 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700" role="status">
                <ShieldCheck size={16} className="shrink-0" />
                {success}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              className="bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving…" : "Change Password"}
            </button>
          </form>
        </section>
      </div>
    </AdminShell>
  );
}
