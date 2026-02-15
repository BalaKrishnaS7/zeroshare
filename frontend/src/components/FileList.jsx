import { useEffect, useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";

export default function FileList() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [fileToDelete, setFileToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  /* =======================
     LOAD FILES
  ======================= */
  const loadFiles = async () => {
    try {
      const res = await API.get("/files/list");
      setFiles(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, sort, pageSize, files.length]);

  /* =======================
     DOWNLOAD FILE (AUTH SAFE)
  ======================= */
  const downloadFile = async (id, name) => {
    try {
      const res = await API.get(`/files/download/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Download started");
    } catch (err) {
      console.error(err);
      toast.error("Download failed");
    }
  };

  /* =======================
     DELETE FILE (MODAL)
  ======================= */
  const requestDelete = (id) => {
    setFileToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await API.delete(`/files/delete/${fileToDelete}`);
      toast.success("File deleted");
      loadFiles();
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    } finally {
      setShowConfirm(false);
      setFileToDelete(null);
    }
  };

  /* =======================
     SHARE FILE
  ======================= */
  const generateShare = async (id) => {
    try {
      const res = await API.get(`/files/share/${id}`);
      await navigator.clipboard.writeText(res.data.link);
      toast.success("Share link copied to clipboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to generate share link");
    }
  };

  /* =======================
     UI STATES
  ======================= */
  if (loading) {
    return (
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Loading files...
      </p>
    );
  }

  if (files.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-950/40 dark:text-slate-400">
        No files uploaded yet.
      </div>
    );
  }

  const searchValue = search.trim().toLowerCase();
  const filteredFiles = files.filter((file) =>
    file.originalName.toLowerCase().includes(searchValue)
  );

  const sortedFiles = [...filteredFiles].sort((a, b) => {
    if (sort === "name-asc") {
      return a.originalName.localeCompare(b.originalName);
    }
    if (sort === "name-desc") {
      return b.originalName.localeCompare(a.originalName);
    }
    if (sort === "oldest") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sortedFiles.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pagedFiles = sortedFiles.slice(startIndex, startIndex + pageSize);

  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:max-w-xs">
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Search files
          </label>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by file name"
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
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
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
          <div className="flex items-end">
            <div className="rounded-full border border-slate-200/70 bg-white px-3 py-2 text-xs text-slate-600 shadow-sm dark:border-slate-800/70 dark:bg-slate-950 dark:text-slate-300">
              {sortedFiles.length} files
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200/70 dark:border-slate-800/70">
        <table className="min-w-full divide-y divide-slate-200/70 text-sm dark:divide-slate-800/70">
          <thead className="bg-slate-100/70 text-left text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-900/70 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">File Name</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/70 bg-white dark:divide-slate-800/70 dark:bg-slate-950/40">
            {pagedFiles.length === 0 ? (
              <tr>
                <td
                  colSpan="2"
                  className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-400"
                >
                  No matching files found.
                </td>
              </tr>
            ) : (
              pagedFiles.map((file, index) => (
                <tr
                  key={file._id}
                  className={
                    index % 2 === 0
                      ? "bg-white dark:bg-slate-950/40"
                      : "bg-slate-50/70 dark:bg-slate-900/60"
                  }
                >
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">
                    {file.originalName}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() =>
                          downloadFile(file._id, file.originalName)
                        }
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:bg-slate-900 hover:text-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-100 dark:hover:text-slate-900"
                      >
                        Download
                      </button>

                      <button
                        onClick={() => generateShare(file._id)}
                        className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-600 hover:text-white dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200 dark:hover:bg-emerald-500"
                      >
                        Share
                      </button>

                      <button
                        onClick={() => requestDelete(file._id)}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 transition hover:bg-rose-600 hover:text-white dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200 dark:hover:bg-rose-500"
                      >
                        Delete
                      </button>
                    </div>
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

      {/* CONFIRM DELETE MODAL */}
      <ConfirmModal
        isOpen={showConfirm}
        title="Delete File"
        message="Are you sure you want to permanently delete this file?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
