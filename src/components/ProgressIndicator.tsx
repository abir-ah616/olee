interface ProgressIndicatorProps {
  totalPages: number;
  currentPage: number;
  onPageClick: (index: number) => void;
}

export default function ProgressIndicator({ totalPages, currentPage, onPageClick }: ProgressIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalPages }).map((_, index) => {
        const isActive = currentPage === index;
        const isPassed = currentPage > index;

        return (
          <button
            key={index}
            onClick={() => onPageClick(index)}
            className={`transition-all duration-300 rounded-full cursor-pointer hover:scale-125 ${
              isActive
                ? 'w-4 h-4 bg-glow-500 shadow-glow'
                : isPassed
                ? 'w-3 h-3 bg-glow-400/60'
                : 'w-2 h-2 bg-gray-500/50 hover:bg-gray-400'
            }`}
            aria-label={`Go to page ${index + 1}`}
          />
        );
      })}
    </div>
  );
}
