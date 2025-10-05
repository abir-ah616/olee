import { useState } from 'react';
import { Lock, Heart } from 'lucide-react';

interface PasswordPageProps {
  onUnlock: (imageUrl: string) => void;
  isUnlocked: boolean;
  finalImageUrl: string;
}

export default function PasswordPage({ onUnlock, isUnlocked, finalImageUrl }: PasswordPageProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (password.toLowerCase() === 'olleomu69') {
        onUnlock('/9.jpg');
      } else {
        setError(true);
        setTimeout(() => setError(false), 2000);
      }
      setLoading(false);
    }, 500);
  };

  if (isUnlocked) {
    return (
      <section className="h-screen w-screen relative overflow-hidden snap-start snap-always bg-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
          {finalImageUrl && (
            <img
              src={finalImageUrl}
              alt="Final Memory"
              className="w-full h-full object-cover md:object-contain"
              onError={(e) => {
                console.error('Error loading image:', finalImageUrl);
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"></div>
        </div>

        <div className="absolute bottom-16 left-8 md:bottom-8 md:left-8 max-w-[calc(100%-4rem)] md:max-w-none animate-fade-in">
          <div className="mb-4 animate-pulse-glow">
            <Heart className="w-12 h-12 md:w-16 md:h-16 text-pink-400 fill-pink-400 drop-shadow-[0_0_30px_rgba(251,207,232,0.8)]" />
          </div>
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300 bg-clip-text text-transparent drop-shadow-2xl animate-pulse-glow px-4 py-2 md:px-6 md:py-3 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-pink-300/20">
            Most Special Memory
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-white mt-3 drop-shadow-lg px-4 py-2 md:px-6 md:py-2 bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-pink-300/20">
            Bou 💖
          </p>
        </div>

        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-pink-400/50 rounded-full animate-float"
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

  return (
    <section className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 snap-start snap-always">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-glow-500/20 via-transparent to-transparent"></div>

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

      <div className="relative z-10 text-center px-6 max-w-md mx-auto animate-fade-in">
        <div className="mb-8">
          <Lock className="w-20 h-20 mx-auto text-glow-400 animate-pulse-glow" />
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-glow-200 to-white bg-clip-text text-transparent">
          One Last Memory
        </h2>

        <p className="text-gray-300 text-lg mb-8">
          Enter the secret password to unlock the final surprise
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password..."
            className={`w-full px-6 py-4 bg-slate-800/50 border-2 ${
              error ? 'border-red-500' : 'border-glow-500/30'
            } rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:border-glow-500 transition-all duration-300`}
          />

          {error && (
            <p className="text-red-400 text-sm animate-slide-up">
              Incorrect password. Try again!
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full px-8 py-4 bg-gradient-to-r from-glow-500 to-glow-600 text-white font-semibold rounded-3xl shadow-glow-lg hover:shadow-glow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? 'Verifying...' : 'Unlock'}
          </button>
        </form>
      </div>
    </section>
  );
}
