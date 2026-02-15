import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const nav = useNavigate();

  const emailValid = /^\S+@\S+\.\S+$/.test(email);
  const passwordValid = /^(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(password);
  const formValid = emailValid && passwordValid;

  const submit = async () => {
    if (!formValid) {
      setTouched({ email: true, password: true });
      toast.error("Please fix the highlighted fields");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast.success("Login successful");

      res.data.role === "admin" ? nav("/admin") : nav("/user");
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-mask" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-6 py-12">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              Secure access
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
              Welcome back to Zer0Share.
            </h1>
            <p className="mt-4 text-sm text-slate-300">
              Sign in to continue managing encrypted uploads, share links, and
              audit-ready activity.
            </p>
            <div className="mt-6 space-y-3 text-sm text-slate-300">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Role-based access controls
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Encrypted uploads and downloads
              </div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Live audit logs for every action
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/95 p-8 text-slate-900 shadow-2xl shadow-slate-950/30 backdrop-blur">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                Login
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-slate-900">
                Sign in to your workspace
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Use your email and password to continue.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Email
                <input
                  value={email}
                  onBlur={() =>
                    setTouched((prev) => ({ ...prev, email: true }))
                  }
                  className={`mt-2 w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none ${
                    !emailValid && touched.email
                      ? "border-rose-300 focus:border-rose-400"
                      : "border-slate-200 focus:border-slate-400"
                  }`}
                  placeholder="you@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {!emailValid && touched.email && (
                  <p className="mt-2 text-xs text-rose-600">
                    Enter a valid email address.
                  </p>
                )}
              </label>

              <label className="block text-sm font-medium text-slate-700">
                Password
                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onBlur={() =>
                      setTouched((prev) => ({ ...prev, password: true }))
                    }
                    className={`w-full rounded-lg border bg-white px-3 py-2 pr-20 text-sm text-slate-900 shadow-sm focus:outline-none ${
                      !passwordValid && touched.password
                        ? "border-rose-300 focus:border-rose-400"
                        : "border-slate-200 focus:border-slate-400"
                    }`}
                    placeholder="Enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {!passwordValid && touched.password && (
                  <p className="mt-2 text-xs text-rose-600">
                    Use 6+ characters with 1 number and 1 special character.
                  </p>
                )}
              </label>
            </div>

            <button
              onClick={submit}
              disabled={loading || !formValid}
              className={`mt-6 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition ${
                loading || !formValid
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <p className="text-sm text-center mt-5 text-slate-600">
              New here?{" "}
              <span
                className="text-slate-900 hover:underline cursor-pointer"
                onClick={() => nav("/signup")}
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
