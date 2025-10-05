import { Cake } from 'lucide-react';

interface BirthdayHeroProps {
  name: string;
}

export default function BirthdayHero({ name }: BirthdayHeroProps) {
  return (
    <section className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 snap-start snap-always">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-glow-500/20 via-transparent to-transparent"></div>

      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-glow-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 animate-fade-in">
        <div className="inline-flex items-center justify-center w-24 h-24 mb-8 bg-gradient-to-br from-glow-400 to-glow-600 rounded-full shadow-glow-xl animate-pulse-glow">
          <Cake className="w-12 h-12 text-white" />
        </div>

        <h1 className="text-7xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-glow-200 to-white bg-clip-text text-transparent animate-slide-up">
          Happy Birthday
        </h1>

        <h2 className="text-5xl md:text-6xl font-bold mb-8 text-glow-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          {name}!
        </h2>

        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
          Wishing you a day filled with love, laughter, and unforgettable moments
        </p>

        <button
          onClick={() => {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }}
          className="px-8 py-4 bg-gradient-to-r from-glow-500 to-glow-600 text-white font-semibold rounded-3xl shadow-glow-lg hover:shadow-glow-xl hover:scale-105 transition-all duration-300 animate-slide-up"
          style={{ animationDelay: '0.6s' }}
        >
          View Memories
        </button>
      </div>
    </section>
  );
}
