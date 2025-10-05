import { useState, useEffect } from 'react';
import GalleryItem from './GalleryItem';
import Lightbox from './Lightbox';

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [animatedImages, setAnimatedImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    images.forEach((image, index) => {
      setTimeout(() => {
        setAnimatedImages((prev) => [...prev, image.id]);
      }, index * 200);
    });
  }, [images]);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleClose = () => {
    setSelectedImageIndex(null);
  };

  const handleNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < images.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  return (
    <>
      <section id="gallery" className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-white via-glow-200 to-white bg-clip-text text-transparent">
            Memory Lane
          </h2>
          <p className="text-center text-gray-400 text-lg mb-16">
            Click on any photo to view it in full size
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, index) => (
              <GalleryItem
                key={image.id}
                image={image}
                index={index}
                isAnimated={animatedImages.includes(image.id)}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {selectedImageIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedImageIndex}
          onClose={handleClose}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </>
  );
}
