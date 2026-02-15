import { Link } from "react-router-dom";

export default function NotFound() {
	return (
		<div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
				<div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-indigo-500/20 blur-[140px]" />
				<div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-emerald-400/20 blur-[120px]" />
				<div className="absolute inset-0 bg-grid-mask" />
			</div>

			<div className="relative mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-16 text-center">
				<div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-slate-300">
					Lost route
				</div>

				<h1 className="text-6xl font-semibold text-white sm:text-7xl">404</h1>
				<p className="mt-4 text-2xl font-semibold text-slate-100">
					Page not found
				</p>
				<p className="mt-3 max-w-xl text-sm text-slate-300">
					The link you followed does not exist or has been moved. Check the URL
					or jump back to a safe spot.
				</p>

				<div className="mt-8 flex flex-wrap justify-center gap-4">
					<Link
						to="/"
						className="rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-400/30 transition hover:translate-y-[-1px] hover:bg-cyan-300"
					>
						Back to home
					</Link>
					<Link
						to="/login"
						className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-white/60 hover:text-white"
					>
						Go to login
					</Link>
				</div>

				<div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
					<span className="rounded-full border border-white/10 px-4 py-2">
						Error code: Z0-404
					</span>
					<span className="rounded-full border border-white/10 px-4 py-2">
						Need access? Create an account.
					</span>
				</div>
			</div>
		</div>
	);
}
