import Navbar from "../components/Navbar";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

export default function UserDashboard() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="mb-6 flex flex-col gap-2">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
              Personal Workspace
            </p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              User Dashboard
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Upload, share, and manage your encrypted files in one place.
            </p>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Encryption
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Active
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Files are secured end-to-end.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Share links
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Ready
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Generate secure access on demand.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Audit trail
              </p>
              <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Tracking
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Every action stays logged.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70">
              <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">
                Upload File
              </h3>
              <FileUpload />
            </div>

            <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/70 md:col-span-2">
              <h3 className="font-semibold mb-3 text-slate-800 dark:text-slate-100">
                My Files
              </h3>
              <FileList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
