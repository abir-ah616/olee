interface ImagePageProps {
  imageUrl: string;
  caption: string;
}

export default function ImagePage({ imageUrl, caption }: ImagePageProps) {
  return (
    <section className="h-screen w-screen relative overflow-hidden snap-start snap-always bg-slate-900">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={imageUrl}
          alt={caption}
          className="w-full h-full object-cover md:object-contain"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
      </div>

      <div className="absolute bottom-16 left-8 md:bottom-8 md:left-8 max-w-[calc(100%-4rem)] md:max-w-none animate-fade-in">
        <h2 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-glow-200 to-white bg-clip-text text-transparent drop-shadow-2xl animate-pulse-glow px-4 py-2 md:px-6 md:py-3 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/10">
          {caption}
        </h2>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-glow-300/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
