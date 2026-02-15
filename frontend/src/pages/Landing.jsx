import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-[120px]" />
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />
        <div className="absolute inset-0 bg-grid-mask" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-16 pt-14">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-semibold shadow-sm">
              Z0
            </div>
            <span className="text-lg font-semibold tracking-wide">Zer0Share</span>
          </div>
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a className="hover:text-white" href="#features">
              Features
            </a>
            <a className="hover:text-white" href="#workflow">
              Workflow
            </a>
            <a className="hover:text-white" href="#security">
              Security
            </a>
          </nav>
          <div className="hidden items-center gap-3 md:flex">
            <Link
              to="/login"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Sign Up
            </Link>
          </div>
        </header>

        <section className="mt-16 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.24em] text-slate-300">
              Zero-Trust File Sharing
            </div>
            <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Ship files with confidence, not compromise.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-slate-300">
              Zer0Share gives teams encrypted uploads, role-based access, and
              auditable trails so every handoff stays secure end-to-end.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:translate-y-[-1px] hover:bg-cyan-300"
              >
                Create free workspace
              </Link>
              <Link
                to="/login"
                className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
              >
                I already have an account
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                End-to-end encrypted
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400" />
                Access-bound sharing
              </div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400" />
                Audit-ready logs
              </div>
            </div>
          </div>

          <div className="relative animate-fade-up-delay-1">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Secure transfer</span>
                <span className="rounded-full bg-emerald-400/20 px-3 py-1 text-xs text-emerald-200">
                  Live
                </span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Upload pipeline</span>
                    <span>98% complete</span>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[98%] rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Shares active</p>
                    <p className="mt-2 text-xl font-semibold text-white">128</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-slate-400">Policy checks</p>
                    <p className="mt-2 text-xl font-semibold text-white">24/7</p>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-4">
                  <p className="text-xs text-slate-400">Audit snapshot</p>
                  <p className="mt-2 text-sm text-white">
                    12 events captured in the last 5 minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden h-24 w-24 rounded-3xl border border-white/10 bg-white/5 shadow-lg backdrop-blur md:block animate-float" />
          </div>
        </section>

        <section
          id="features"
          className="mt-20 grid gap-6 md:grid-cols-3 animate-fade-up-delay-2"
        >
          {[
            {
              title: "Encrypted by default",
              copy: "Every upload is wrapped in encryption before it leaves your device.",
            },
            {
              title: "Access you control",
              copy: "Role-aware permissions ensure files stay with the right people.",
            },
            {
              title: "Audit everywhere",
              copy: "Immutable logs track uploads, downloads, and denials in real time.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-slate-300">{item.copy}</p>
            </div>
          ))}
        </section>

        <section
          id="workflow"
          className="mt-20 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Workflow
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-white">
              Upload. Control. Share.
            </h3>
            <p className="mt-4 text-sm text-slate-300">
              Build a trusted pipeline for file transfers with zero-trust guardrails
              at every step.
            </p>
          </div>
          <div className="grid gap-4">
            {[
              "Encrypted uploads with per-user keys",
              "Automatic access enforcement and share links",
              "Audit alerts for every critical action",
            ].map((step, index) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                  0{index + 1}
                </div>
                <p className="text-sm text-slate-200">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="security"
          className="mt-20 rounded-3xl border border-white/10 bg-gradient-to-r from-slate-900/60 to-slate-800/40 p-10 text-center shadow-2xl"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
            Security first
          </p>
          <h3 className="mt-3 text-3xl font-semibold text-white">
            Built for compliance-ready teams
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-300">
            Granular logging, role-based permissions, and encrypted storage ensure
            every file is handled with the governance your organization expects.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              to="/signup"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            >
              Start secure sharing
            </Link>
            <Link
              to="/login"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
            >
              View admin console
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
