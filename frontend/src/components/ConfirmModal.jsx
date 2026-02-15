export default function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg w-96 p-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
          {title}
        </h3>

        <p className="text-slate-600 dark:text-slate-300 mb-6">
          {message}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-1 rounded bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white hover:opacity-80"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
