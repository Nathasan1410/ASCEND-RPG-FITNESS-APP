"use client";

import { motion } from 'framer-motion';
import { Github, Twitter, Instagram, Linkedin, BookOpen, Mail } from 'lucide-react';
import { SocialLink } from '@/types/landing';

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

export default function SocialLinks() {
  const socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/Nathasan1410/ASCEND-RPG-FITNESS-APP',
      icon: Github,
    },
    {
      name: 'Twitter/X',
      url: 'https://x.com/NthnaelSan',
      icon: Twitter,
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/nthnael.san/',
      icon: Instagram,
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nathanaelsantoso/',
      icon: Linkedin,
    },
    {
      name: 'GitBook',
      url: 'https://nathasan1410.gitbook.io/ascend-fitness-rpg',
      icon: BookOpen,
    },
    {
      name: 'Email',
      url: 'mailto:nthnael.san1410@gmail.com',
      icon: Mail,
    },
  ];

  return (
    <footer className="border-t border-ios-divider bg-ios-bg-secondary/80 backdrop-blur-xl py-12 md:py-16 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Connect with ASCEND
          </h3>
          <p className="text-base md:text-lg text-white/60">
            Follow us on social media and join our growing community
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-2 md:gap-4 lg:gap-6 mb-8 md:mb-12"
        >
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: index * 0.1, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onTouchStart={triggerHaptic}
                className="p-4 bg-ios-bg-tertiary/80 backdrop-blur-xl border-2 border-ios-border hover:border-cyan-400/50 rounded-2xl shadow-lg group transition-all"
              >
                <Icon className="w-6 h-6 md:w-8 md:h-8 text-white/70 group-hover:text-cyan-400 transition-colors" />
              </motion.a>
            );
          })}
        </motion.div>

        <div className="border-t border-ios-divider pt-8 md:pt-10 text-center">
          <p className="text-xs md:text-sm text-white/40 mb-4">
            © 2026 ASCEND: Fitness RPG. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-white/50">
            <span>⭐</span>
            <span>Powered by OPIK AI - Observability for AI Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
