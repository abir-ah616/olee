import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImage } from './Gallery';

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  const currentImage = images[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === images.length - 1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && !isFirst) onPrev();
      if (e.key === 'ArrowRight' && !isLast) onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev, isFirst, isLast]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full shadow-glow transition-all duration-300 hover:scale-110 z-10"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {!isFirst && (
        <button
          onClick={onPrev}
          className="absolute left-6 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full shadow-glow transition-all duration-300 hover:scale-110 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {!isLast && (
        <button
          onClick={onNext}
          className="absolute right-6 p-3 bg-slate-800/80 hover:bg-slate-700 text-white rounded-full shadow-glow transition-all duration-300 hover:scale-110 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div className="relative max-w-7xl max-h-[90vh] mx-6 animate-slide-up">
        <img
          src={currentImage.url}
          alt={currentImage.caption || 'Gallery image'}
          className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-glow-xl"
        />

        {currentImage.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent rounded-b-3xl p-6">
            <p className="text-white text-lg text-center">{currentImage.caption}</p>
          </div>
        )}

        <div className="absolute -bottom-12 left-0 right-0 text-center">
          <p className="text-gray-400 text-sm">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </div>

      <div
        className="absolute inset-0 -z-10"
        onClick={onClose}
        aria-label="Close lightbox backdrop"
      />
    </div>
  );
}
