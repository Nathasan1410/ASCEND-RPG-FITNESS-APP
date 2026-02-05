"use client";

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Video } from '@/types/landing';

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

export default function VideosSection() {
  const videos: Video[] = [
    {
      id: 'intro',
      title: 'ASCEND Introduction',
      description: 'Quick overview of ASCEND and what makes it unique',
      youtubeId: '',
      duration: '2:00',
    },
    {
      id: 'pitch',
      title: 'Why ASCEND Matters',
      description: 'Energetic vlog explaining our vision and mission',
      youtubeId: '',
      duration: '3:00',
    },
    {
      id: 'demo',
      title: 'Full App Demo',
      description: 'Complete walkthrough of all features',
      youtubeId: '',
      duration: '5:00',
    },
  ];

  return (
    <section className="py-8 md:py-20 lg:py-24 px-4 md:px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8 md:mb-16"
      >
        <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-6">
          Watch ASCEND in Action
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          See how ASCEND transforms fitness into an epic adventure
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ delay: index * 0.15, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            onTouchStart={triggerHaptic}
            className="bg-ios-bg-secondary/80 backdrop-blur-xl border border-ios-border overflow-hidden group cursor-pointer shadow-lg"
          >
            <div className="relative w-full aspect-video bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
              {video.youtubeId ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-16 h-16 md:w-20 md:h-20 bg-ios-accent/90 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,184,255,0.5)] group-hover:shadow-[0_0_50px_rgba(0,184,255,0.7)] transition-all duration-300"
                    >
                      <Play className="w-8 h-8 md:w-10 md:h-10 text-white fill-white ml-1" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded text-xs font-bold text-white">
                    {video.duration}
                  </div>
                </>
              )}
            </div>

            <div className="p-4 md:p-5">
              <h3 className="text-lg font-semibold text-white mb-2">
                {video.title}
              </h3>
              <p className="text-sm md:text-base text-white/60 leading-relaxed">
                {video.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
