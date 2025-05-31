import { Activity, Apple, Dumbbell, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const Background: React.FC = () => {
  const icons = [
    { Icon: Heart, color: 'text-red-400', size: 24 },
    { Icon: Apple, color: 'text-green-400', size: 20 },
    { Icon: Dumbbell, color: 'text-blue-400', size: 22 },
    { Icon: Activity, color: 'text-purple-400', size: 26 },
  ];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50" />

      {/* Floating bubbles/icons */}
      {[...Array(12)].map((_, index) => {
        const { Icon, color, size } = icons[index % icons.length];
        const delay = Math.random() * 5;
        const duration = 15 + Math.random() * 20;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const amplitude = 10 + Math.random() * 15;

        return (
          <motion.div
            key={index}
            className={`absolute opacity-20 ${color}`}
            initial={{ x: `${startX}vw`, y: `${startY}vh` }}
            animate={{
              x: [
                `${startX}vw`,
                `${startX + amplitude}vw`,
                `${startX - amplitude}vw`,
                `${startX}vw`,
              ],
              y: [
                `${startY}vh`,
                `${startY - amplitude}vh`,
                `${startY + amplitude}vh`,
                `${startY}vh`,
              ],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut',
            }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}

      {/* Large decorative circles */}
      <motion.div
        className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-purple-200 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      <motion.div
        className="absolute -left-32 -bottom-32 w-96 h-96 rounded-full bg-indigo-200 opacity-30 blur-3xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </div>
  );
};

export default Background;