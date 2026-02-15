import Navbar from "../components/Navbar";
import AuditLogs from "../components/AuditLogs";

export default function AdminDashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                Admin Console
              </p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                Audit Dashboard
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Review activity across uploads, downloads, and security events.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200/70 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Live monitoring
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/60 bg-white/80 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
            <AuditLogs />
          </div>
        </div>
      </div>
    </>
  );
}
