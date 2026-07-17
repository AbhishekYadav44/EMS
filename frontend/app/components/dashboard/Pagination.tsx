"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between mt-8">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-lg transition ${
          currentPage === 1
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-800 hover:bg-slate-700 text-white"
        }`}
      >
        Previous
      </button>

      <div className="flex gap-2">

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg transition ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 hover:bg-slate-700 text-slate-300"
              }`}
            >
              {page}
            </button>
          );
        })}

      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-lg transition ${
          currentPage === totalPages
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-slate-800 hover:bg-slate-700 text-white"
        }`}
      >
        Next
      </button>

    </div>
  );
}