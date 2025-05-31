import { Github, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="py-6 mt-10 text-center text-gray-500 text-sm"
    >
      <div className="flex justify-center items-center space-x-1">
        <span>Created with</span>
        <Heart className="text-pink-500 w-4 h-4" />
        <span>for your health</span>
      </div>
      <div className="mt-2">
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center text-indigo-500 hover:text-indigo-700 transition-colors"
        >
          <Github className="w-4 h-4 mr-1" />
          <span>View Source</span>
        </a>
      </div>
    </motion.footer>
  );
};

export default Footer;