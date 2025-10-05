interface TextPageProps {
  text: string;
}

export default function TextPage({ text }: TextPageProps) {
  const isJumpscare = text.includes('Jumpscare');
  const isTrueLove = text.includes('True Love');
  const textWithoutEmoji = text.replace(/[😱🥰]/g, '').trim();
  const emoji = isJumpscare ? '😱' : isTrueLove ? '🥰' : '';

  return (
    <section className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 snap-start snap-always">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-glow-500/20 via-transparent to-transparent"></div>

      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full animate-float ${
              isJumpscare
                ? 'bg-red-400/40'
                : isTrueLove
                ? 'bg-pink-400/40'
                : 'bg-glow-400/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in">
        <div
          className={`inline-block px-8 py-6 rounded-3xl backdrop-blur-sm border ${
            isJumpscare
              ? 'bg-red-900/20 border-red-400/30'
              : isTrueLove
              ? 'bg-pink-900/20 border-pink-300/30'
              : 'bg-slate-900/20 border-white/10'
          }`}
        >
          <h1
            className={`text-6xl md:text-8xl font-bold mb-2 animate-pulse-glow ${
              isJumpscare
                ? 'text-red-400 drop-shadow-[0_0_30px_rgba(248,113,113,0.8)]'
                : isTrueLove
                ? 'bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,207,232,0.8)]'
                : 'bg-gradient-to-r from-white via-glow-200 to-white bg-clip-text text-transparent'
            }`}
          >
            {textWithoutEmoji}
          </h1>
          {emoji && (
            <div className="text-8xl mt-4 filter-none">{emoji}</div>
          )}
        </div>

        {isJumpscare && (
          <div className="mt-8 animate-slide-up">
            <div className="text-9xl animate-bounce">👻</div>
          </div>
        )}

        {isTrueLove && (
          <div className="mt-8 flex justify-center gap-4 animate-slide-up">
            <span className="text-7xl animate-float" style={{ animationDelay: '0s' }}>
              💕
            </span>
            <span className="text-7xl animate-float" style={{ animationDelay: '0.3s' }}>
              💖
            </span>
            <span className="text-7xl animate-float" style={{ animationDelay: '0.6s' }}>
              💕
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
