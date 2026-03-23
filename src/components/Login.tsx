import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login({ onSuccess }: { onSuccess: () => void }) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor, rellena todos los campos.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.');
    } else {
      onSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-[#05050a] flex items-center justify-center relative overflow-hidden">
      {/* Glow elements */}
      <div className="absolute w-96 h-96 bg-primary blur-[150px] rounded-full opacity-10 -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-96 h-96 bg-accent-purple blur-[150px] rounded-full opacity-10 -bottom-20 -right-20 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        {/* Logo */}
        <div className="text-center mb-12">
          <span className="font-label text-secondary uppercase tracking-[0.5em] text-[10px] mb-4 block">
            Panel de Administración
          </span>
          <h1 className="font-headline text-4xl font-extrabold tracking-tighter text-white">
            Raúl Piqueras
          </h1>
          <p className="font-body text-white/40 mt-2 text-sm">
            Accede con tus credenciales para gestionar el portfolio.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <p className="text-red-400 text-sm font-body">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-0 rounded-lg px-4 py-3 pl-12 font-body text-white placeholder:text-white/20 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="font-label text-[10px] uppercase tracking-[0.3em] text-white/40 block">
                Contraseña
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors" />
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 focus:border-primary/50 focus:ring-0 rounded-lg px-4 py-3 pl-12 font-body text-white placeholder:text-white/20 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              id="login-submit"
              className="w-full primary-gradient text-black py-4 rounded-lg font-headline font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Accediendo...
                </>
              ) : (
                <>
                  Entrar al Panel
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
