import { useState } from "react";
import API from "../api/api";
import toast from "react-hot-toast";

export default function FileUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileLabel = file
    ? `${file.name} (${Math.ceil(file.size / 1024)} KB)`
    : "Click to select a file";

  const uploadFile = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      await API.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("File uploaded successfully");
      setFile(null);
    } catch (err) {
      console.error(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-6 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950/50">
      <input
        type="file"
        id="fileInput"
        className="hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <label
        htmlFor="fileInput"
        className="cursor-pointer flex flex-col items-center gap-2"
      >
        <span className="text-3xl">📁</span>
        <span className="text-slate-700 dark:text-slate-200">
          {fileLabel}
        </span>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          Max file size depends on server settings
        </span>
      </label>

      <button
        onClick={uploadFile}
        disabled={uploading}
        className={`mt-4 inline-flex items-center justify-center rounded-lg px-6 py-2 text-sm font-semibold text-white transition ${
          uploading
            ? "bg-slate-400 cursor-not-allowed"
            : "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
        }`}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}
