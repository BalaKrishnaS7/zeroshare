import { useEffect, useState } from "react";
import API from "../api/api";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [action, setAction] = useState("");
  const [userId, setUserId] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const actionStyles = {
    UPLOAD: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-200",
    DOWNLOAD: "bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200",
    DELETE: "bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-200",
    DENIED: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-200",
  };

  const searchValue = search.trim().toLowerCase();
  const filteredLogs = logs.filter((log) => {
    const userEmail = log.user?.email || "";
    const userName = log.user?.name || "";
    const fileName = log.file?.originalName || "";
    const message = log.message || "";
    const ipValue = log.ipAddress || log.ip || "";
    const actionValue = log.action || "";

    return [
      userEmail,
      userName,
      fileName,
      message,
      ipValue,
      actionValue,
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchValue);
  });

  const sortedLogs = [...filteredLogs].sort((a, b) => {
    if (sort === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    if (sort === "user-asc") {
      return (a.user?.email || "").localeCompare(b.user?.email || "");
    }
    if (sort === "user-desc") {
      return (b.user?.email || "").localeCompare(a.user?.email || "");
    }
    if (sort === "action-asc") {
      return (a.action || "").localeCompare(b.action || "");
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sortedLogs.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pagedLogs = sortedLogs.slice(startIndex, startIndex + pageSize);

  const counts = filteredLogs.reduce(
    (acc, log) => {
      const key = log.action || "";
      if (acc[key] !== undefined) {
        acc[key] += 1;
      }
      return acc;
    },
    { UPLOAD: 0, DOWNLOAD: 0, DELETE: 0, DENIED: 0 }
  );

  // Initial load (no filters)
  useEffect(() => {
    const loadInitialLogs = async () => {
      try {
        const res = await API.get("/admin/logs");
        setLogs(res.data);
      } catch (err) {
        console.error("Failed to load audit logs", err);
      }
    };

    loadInitialLogs();
  }, []);

  // Apply filters manually
  const applyFilters = async () => {
    try {
      const params = {};
      if (action) params.action = action;
      if (userId) params.userId = userId;
      if (from) params.from = from;
      if (to) params.to = to;

      const res = await API.get("/admin/logs", { params });
      setLogs(res.data);
    } catch (err) {
      console.error("Failed to apply filters", err);
    }
  };

  return (
    <div className="px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/70 pb-4 dark:border-slate-800/70">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Audit Logs
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Filter and review system activity in real time.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white px-3 py-1 text-sm text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-950 dark:text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {sortedLogs.length} events
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-emerald-200/70 bg-emerald-50/80 p-4 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
          <p className="text-xs font-semibold uppercase tracking-wide">Uploads</p>
          <p className="mt-2 text-2xl font-semibold">{counts.UPLOAD}</p>
        </div>
        <div className="rounded-xl border border-sky-200/70 bg-sky-50/80 p-4 text-sky-700 dark:border-sky-500/30 dark:bg-sky-500/10 dark:text-sky-200">
          <p className="text-xs font-semibold uppercase tracking-wide">Downloads</p>
          <p className="mt-2 text-2xl font-semibold">{counts.DOWNLOAD}</p>
        </div>
        <div className="rounded-xl border border-rose-200/70 bg-rose-50/80 p-4 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200">
          <p className="text-xs font-semibold uppercase tracking-wide">Deletes</p>
          <p className="mt-2 text-2xl font-semibold">{counts.DELETE}</p>
        </div>
        <div className="rounded-xl border border-amber-200/70 bg-amber-50/80 p-4 text-amber-700 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
          <p className="text-xs font-semibold uppercase tracking-wide">Denied</p>
          <p className="mt-2 text-2xl font-semibold">{counts.DENIED}</p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-xs">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Search
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users, files, IPs"
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Sort
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="user-asc">User A-Z</option>
              <option value="user-desc">User Z-A</option>
              <option value="action-asc">Action A-Z</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Rows
            </label>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              <option value={6}>6</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-12">
        <div className="md:col-span-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Action
          </label>
          <select
            value={action}
            onChange={(e) => setAction(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          >
            <option value="">All Actions</option>
            <option value="UPLOAD">UPLOAD</option>
            <option value="DOWNLOAD">DOWNLOAD</option>
            <option value="DELETE">DELETE</option>
            <option value="DENIED">DENIED</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            User ID
          </label>
          <input
            placeholder="Filter by user"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            From
          </label>
          <input
            type="date"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            To
          </label>
          <input
            type="date"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm focus:border-slate-400 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
          />
        </div>

        <div className="flex items-end md:col-span-2">
          <button
            onClick={applyFilters}
            className="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Apply Filters
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200/70 dark:border-slate-800/70">
        <table className="min-w-full divide-y divide-slate-200/70 text-sm dark:divide-slate-800/70">
          <thead className="bg-slate-100/70 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">File</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">IP</th>
              <th className="px-4 py-3">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 bg-white dark:divide-slate-800/70 dark:bg-slate-950/40">
            {pagedLogs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No logs found
                </td>
              </tr>
            ) : (
              pagedLogs.map((log, index) => (
                <tr
                  key={log._id}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-slate-950/40"
                      : "bg-slate-50/70 dark:bg-slate-900/60"
                  }
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {log.user?.email || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                        actionStyles[log.action] ||
                        "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      }`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                    {log.file?.originalName || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {log.message}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {log.ipAddress || log.ip || "-"}
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              currentPage === 1
                ? "cursor-not-allowed border-slate-200 text-slate-300 dark:border-slate-700 dark:text-slate-600"
                : "border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-100 dark:hover:text-slate-900"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
              currentPage === totalPages
                ? "cursor-not-allowed border-slate-200 text-slate-300 dark:border-slate-700 dark:text-slate-600"
                : "border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-100 dark:hover:text-slate-900"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
