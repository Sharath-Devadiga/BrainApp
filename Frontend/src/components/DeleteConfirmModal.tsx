import { CrossIcon } from "../Icons/CrossIcon";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
  isDeleting?: boolean;
}

export const DeleteConfirmModal = ({
  isOpen,
  title,
  onConfirm,
  onCancel,
  isDeleting = false,
}: DeleteConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm mx-auto p-5 sm:p-6 relative">
        <button
          onClick={onCancel}
          disabled={isDeleting}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 disabled:opacity-50 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Close"
        >
          <CrossIcon />
        </button>

        <div className="text-center">
          <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">🗑️</div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 pr-8">Delete Content?</h2>
          <p className="text-gray-600 text-sm mb-5 sm:mb-6">
            Are you sure you want to delete "{title}"? This action cannot be undone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-2 rounded-lg font-medium bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
