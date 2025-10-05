import { GalleryImage } from './Gallery';

interface GalleryItemProps {
  image: GalleryImage;
  index: number;
  isAnimated: boolean;
  onClick: () => void;
}

const flyInDirections = [
  'translate(100vw, -100vh) rotate(45deg)',
  'translate(-100vw, -100vh) rotate(-45deg)',
  'translate(100vw, 100vh) rotate(-45deg)',
  'translate(-100vw, 100vh) rotate(45deg)',
];

export default function GalleryItem({ image, index, isAnimated, onClick }: GalleryItemProps) {
  const direction = flyInDirections[index % flyInDirections.length];

  return (
    <div
      className={`relative aspect-square group cursor-pointer transition-all duration-300 ${
        isAnimated ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        animation: isAnimated ? 'flyIn 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' : 'none',
        transform: isAnimated ? 'none' : direction,
      }}
      onClick={onClick}
    >
      <div className="relative w-full h-full overflow-hidden rounded-3xl bg-slate-800 shadow-lg hover:shadow-glow-lg transition-all duration-300">
        <img
          src={image.url}
          alt={image.caption || 'Gallery image'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            {image.caption && (
              <p className="text-white text-sm font-medium">{image.caption}</p>
            )}
          </div>
        </div>

        <div className="absolute inset-0 border-2 border-glow-500/0 group-hover:border-glow-500/50 rounded-3xl transition-all duration-300"></div>
      </div>

      <div className="absolute inset-0 rounded-3xl animate-float" style={{ animationDelay: `${index * 0.1}s` }}></div>
    </div>
  );
}
