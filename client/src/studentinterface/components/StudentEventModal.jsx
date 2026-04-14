import React from "react";
import { X } from "lucide-react";

const StudentEventModal = ({
  open,
  title,
  description,
  submitLabel = "Save Event",
  cancelLabel = "Cancel",
  onClose,
  onSubmit,
  children,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-white border border-gray-100 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 p-5 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            {description ? (
              <p className="mt-1 text-sm text-gray-500">{description}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-black transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="p-5 space-y-4">{children}</div>

          <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100 bg-gray-50/60">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {cancelLabel}
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#242424] hover:bg-[#434343] transition-colors"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentEventModal;
