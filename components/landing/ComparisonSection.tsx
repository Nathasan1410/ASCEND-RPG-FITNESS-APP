"use client";

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useState } from 'react';

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

export default function ComparisonSection() {
  const [activeTab, setActiveTab] = useState<'ascend' | 'arise' | 'ntc' | 'zombies'>('ascend');

  const comparisons = [
    { feature: "RPG Progression", ascend: true, arise: true, ntc: false, zombies: false },
    { feature: "AI-Personalization", ascend: true, arise: false, ntc: false, zombies: false },
    { feature: "Social Verification", ascend: true, arise: false, ntc: false, zombies: false },
    { feature: "Anti-Cheat System", ascend: true, arise: false, ntc: false, zombies: false },
    { feature: "E→S Rank System", ascend: true, arise: false, ntc: false, zombies: true },
    { feature: "Hunter Classes", ascend: true, arise: false, ntc: false, zombies: false },
    { feature: "Quest Generation", ascend: true, arise: false, ntc: false, zombies: false },
    { feature: "Community Feed", ascend: true, arise: true, ntc: true, zombies: false },
  ];

  const tabs = [
    { id: 'ascend' as const, name: 'ASCEND', highlight: true },
    { id: 'arise' as const, name: 'Arise', highlight: false },
    { id: 'ntc' as const, name: 'NTC', highlight: false },
    { id: 'zombies' as const, name: 'Zombies, Run!', highlight: false },
  ];

  const renderStatus = (status: boolean) => {
    if (status === true) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-400/20">
          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-red-400/20">
        <X className="w-5 h-5 text-red-400 flex-shrink-0" />
      </div>
    );
  };

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
          Compare with Fitness Apps
        </h2>
        <p className="text-base md:text-xl text-white/60 max-w-3xl mx-auto">
          See how ASCEND stacks up against leading fitness and gamification apps
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Mobile View - Card Layout */}
        <div className="md:hidden">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  triggerHaptic();
                }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg border-2 font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-white'
                    : tab.highlight
                    ? 'bg-cyan-400/10 border-cyan-400/30 text-white/80'
                    : 'bg-ios-bg-tertiary/50 border-ios-border text-white/60'
                }`}
              >
                {tab.name}
              </motion.button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-ios-bg-secondary/80 backdrop-blur-xl border-2 border-cyan-400/20 rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="p-4 border-b border-ios-divider">
              <h3 className="text-xl font-bold text-cyan-400">
                {tabs.find(t => t.id === activeTab)?.name}
              </h3>
            </div>
            <div className="divide-y divide-ios-divider">
              {comparisons.map((comparison, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-semibold text-white flex-1">
                    {comparison.feature}
                  </span>
                  {renderStatus(comparison[activeTab])}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Desktop View - Table Layout */}
        <div className="hidden md:block bg-ios-bg-secondary/80 backdrop-blur-xl border-2 border-cyan-400/20 rounded-2xl overflow-hidden shadow-lg">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ios-divider">
                  <th className="p-4 md:p-5 text-left bg-gradient-to-br from-cyan-500/10 to-purple-500/10">
                    <span className="text-base md:text-lg font-bold text-cyan-400">Feature</span>
                  </th>
                  <th className="p-4 md:p-5 text-center bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                    <span className="text-base md:text-lg font-bold text-white">ASCEND</span>
                  </th>
                  <th className="p-4 md:p-5 text-center bg-ios-bg-tertiary/50">
                    <span className="text-sm md:text-base font-semibold text-white/70">Arise</span>
                  </th>
                  <th className="p-4 md:p-5 text-center bg-ios-bg-tertiary/50">
                    <span className="text-sm md:text-base font-semibold text-white/70">NTC</span>
                  </th>
                  <th className="p-4 md:p-5 text-center bg-ios-bg-tertiary/50">
                    <span className="text-sm md:text-base font-semibold text-white/70">Zombies, Run!</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((comparison, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.3 }}
                    className="border-b border-ios-divider last:border-b-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="p-4 md:p-5 text-left">
                      <span className="text-sm md:text-base font-semibold text-white">
                        {comparison.feature}
                      </span>
                    </td>
                    <td className="p-4 md:p-5 text-center bg-cyan-500/5">
                      <div className="flex items-center justify-center">
                        {comparison.ascend ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-center">
                      <div className="flex items-center justify-center">
                        {comparison.arise ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-center">
                      <div className="flex items-center justify-center">
                        {comparison.ntc ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 md:p-5 text-center">
                      <div className="flex items-center justify-center">
                        {comparison.zombies ? (
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-sm md:text-base text-white/60">
          ASCEND offers comprehensive features that competitors can't match, creating a superior fitness RPG experience.
        </p>
      </motion.div>
    </section>
  );
}
