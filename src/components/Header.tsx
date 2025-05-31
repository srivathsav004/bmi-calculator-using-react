import { Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-6 mb-4"
    >
      <div className="flex items-center justify-center mb-2">
        <Activity size={32} className="text-indigo-600 mr-2" />
        <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          BMI Calculator
        </h1>
      </div>
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600 max-w-2xl mx-auto px-4"
      >
        Calculate your Body Mass Index — a key indicator of your body health based on your height and weight.
      </motion.p>
    </motion.header>
  );
};

export default Header;