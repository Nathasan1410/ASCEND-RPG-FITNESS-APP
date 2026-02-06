"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, ArrowRight, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

const iosSpring = {
  type: "spring" as const,
  stiffness: 350,
  damping: 0.8,
  mass: 0.8,
};

const triggerHaptic = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(5);
  }
};

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password/confirm`,
      });

      if (error) {
        setError(error.message);
        triggerHaptic();
      } else {
        setSuccess(true);
        triggerHaptic();
      }
    } catch (err) {
      setError('An error occurred while sending reset link');
      triggerHaptic();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-void-deep relative overflow-hidden px-4">
      <div className="w-full max-w-md relative z-10">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-8"
          onTouchStart={triggerHaptic}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Login</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="bg-ios-bg-secondary/90 backdrop-blur-xl border-2 border-cyan-400/30 rounded-2xl p-6 md:p-8 shadow-lg"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Reset Password
            </h1>
            <p className="text-base text-white/60">
              {success 
                ? 'Check your email for reset instructions'
                : 'Enter your email to receive password reset link'
              }
            </p>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center p-8"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <p className="text-white/80 mb-6">
                We've sent a password reset link to <span className="text-white font-semibold">{email}</span>
              </p>
              <p className="text-sm text-white/60 mb-6">
                Check your inbox and spam folder. The link will expire in 1 hour.
              </p>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all"
                onTouchStart={triggerHaptic}
              >
                <span>Back to Login</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          ) : (
            <>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
                >
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}

              <form onSubmit={handleReset} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-ios-bg-tertiary/80 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-400/50 transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={loading || !email}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onTouchStart={triggerHaptic}
                  transition={iosSpring}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 rounded-xl border-2 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <Link
                  href="/help/demo-accounts"
                  className="text-sm text-white/50 hover:text-white/70 transition-colors inline-flex items-center gap-2"
                  onTouchStart={triggerHaptic}
                >
                  <span>Try demo accounts instead</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
