import { motion } from 'framer-motion';
import React from 'react';
import { BMIResult } from '../types';

interface BMIGaugeProps {
  bmi: number;
  category: BMIResult['category'];
}

const BMIGauge: React.FC<BMIGaugeProps> = ({ bmi, category }) => {
  // Calculate the rotation angle for the needle
  // BMI scale: 15 to 35 maps to -90 to 90 degrees
  const calculateRotation = (bmiValue: number) => {
    // Clamp BMI between 15 and 35 for the gauge
    const clampedBMI = Math.max(15, Math.min(35, bmiValue));
    // Map BMI range to degrees
    return -90 + ((clampedBMI - 15) / (35 - 15)) * 180;
  };

  const needleRotation = calculateRotation(bmi);

  return (
    <div className="relative w-64 h-32">
      {/* Gauge background */}
      <div className="absolute w-full h-full overflow-hidden">
        <div className="absolute bottom-0 w-full h-full rounded-t-full bg-gray-200">
          {/* Colored segments */}
          <div className="absolute bottom-0 left-0 w-1/4 h-full bg-blue-400 opacity-70" />
          <div className="absolute bottom-0 left-1/4 w-1/4 h-full bg-green-400 opacity-70" />
          <div className="absolute bottom-0 left-2/4 w-1/4 h-full bg-yellow-400 opacity-70" />
          <div className="absolute bottom-0 left-3/4 w-1/4 h-full bg-red-400 opacity-70" />
        </div>
      </div>

      {/* BMI markers */}
      <div className="absolute bottom-2 left-0 w-full flex justify-between px-4 text-xs text-gray-600">
        <span>15</span>
        <span>20</span>
        <span>25</span>
        <span>30</span>
        <span>35</span>
      </div>

      {/* Category labels */}
      <div className="absolute bottom-6 left-0 w-full flex justify-between px-1 text-[10px]">
        <span className="text-blue-600 ml-1">Under</span>
        <span className="text-green-600">Normal</span>
        <span className="text-yellow-600">Over</span>
        <span className="text-red-600 mr-1">Obese</span>
      </div>

      {/* Needle */}
      <motion.div
        className="absolute bottom-0 left-1/2 w-1 h-24 bg-gray-800 rounded-t-full origin-bottom"
        initial={{ rotate: -90 }}
        animate={{ rotate: needleRotation }}
        transition={{ type: "spring", stiffness: 60, damping: 15 }}
        style={{ transformOrigin: 'bottom center' }}
      />

      {/* Center point */}
      <div className="absolute bottom-0 left-1/2 w-4 h-4 -ml-2 rounded-full bg-gray-800 border-2 border-white z-10" />

      {/* BMI value */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center"
      >
        <span className={`text-sm font-bold ${
          category === 'underweight' ? 'text-blue-600' :
          category === 'normal' ? 'text-green-600' :
          category === 'overweight' ? 'text-yellow-600' :
          'text-red-600'
        }`}>
          {bmi}
        </span>
      </motion.div>
    </div>
  );
};

export default BMIGauge;