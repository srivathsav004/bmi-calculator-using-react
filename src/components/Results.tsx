import { ArrowLeft, Share2, Twitter, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { BMIResult } from '../types';
import { getBMIRange, getCategoryColor, getCategoryEmoji } from '../utils/bmiCalculator';
import Button from './UI/Button';
import Card from './UI/Card';
import BMIGauge from './BMIGauge';

interface ResultsProps {
  result: BMIResult;
  onReset: () => void;
}

const Results: React.FC<ResultsProps> = ({ result, onReset }) => {
  const { bmi, category, message } = result;
  const categoryColor = getCategoryColor(category);
  const categoryEmoji = getCategoryEmoji(category);
  const bmiRange = getBMIRange(category);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Share message
  const shareText = `I just calculated my BMI: ${bmi}. It falls in the ${category} category! Calculate yours too! 💪`;
  const shareUrl = window.location.href;

  // Share URLs
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Share menu animation variants
  const shareMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: { opacity: 1, scale: 1, y: 0 }
  };

  // Confetti animation for normal weight
  const showConfetti = category === 'normal';

  return (
    <Card className="relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Header */}
        <motion.div variants={item} className="text-center relative">
          <h2 className="text-2xl font-bold text-gray-800">Your BMI Results</h2>
          <p className="text-gray-600">Based on your height and weight</p>
          
          {/* Share Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-0 top-0 p-2 text-gray-600 hover:text-indigo-600 transition-colors"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 size={20} />
          </motion.button>

          {/* Share Menu */}
          {showShareMenu && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={shareMenuVariants}
              className="absolute right-0 top-12 bg-white rounded-lg shadow-lg p-3 z-10"
            >
              <div className="flex flex-col space-y-2">
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Twitter size={18} className="text-[#1DA1F2]" />
                  <span>Share on Twitter</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MessageCircle size={18} className="text-[#25D366]" />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* BMI Gauge */}
        <motion.div variants={item} className="flex justify-center my-6">
          <BMIGauge bmi={bmi} category={category} />
        </motion.div>

        {/* Result Details */}
        <motion.div variants={item} className="text-center">
          <div className="inline-block py-3 px-6 rounded-full bg-gradient-to-r mb-4 text-white font-semibold shadow-md text-lg">
            <div className={`bg-gradient-to-r ${categoryColor} px-4 py-2 rounded-full`}>
              {categoryEmoji} {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Your BMI: {bmi} kg/m²
          </h3>
          <p className="text-gray-600 mb-2">
            BMI Range: {bmiRange}
          </p>
          <p className="text-gray-700 max-w-md mx-auto">
            {message}
          </p>
        </motion.div>

        {/* Recommendations */}
        <motion.div variants={item} className="bg-gray-50 rounded-xl p-4">
          <h3 className="font-semibold text-gray-800 mb-2">Health Recommendations:</h3>
          <ul className="space-y-2">
            {category === 'underweight' && (
              <>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Focus on nutrient-dense foods like nuts, whole grains, and proteins
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Consider strength training to build muscle mass
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  Consult with a healthcare professional for personalized advice
                </li>
              </>
            )}
            {category === 'normal' && (
              <>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Maintain your balanced diet with plenty of fruits and vegetables
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Stay active with at least 150 minutes of moderate exercise weekly
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Continue regular health check-ups
                </li>
              </>
            )}
            {category === 'overweight' && (
              <>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Incorporate more physical activity into your daily routine
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Focus on portion control and mindful eating
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">•</span>
                  Stay hydrated and reduce sugary beverages
                </li>
              </>
            )}
            {category === 'obese' && (
              <>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Consider consulting with a healthcare provider for a personalized plan
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Start with gentle, low-impact exercises like walking or swimming
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  Focus on gradual, sustainable lifestyle changes rather than quick fixes
                </li>
              </>
            )}
          </ul>
        </motion.div>

        {/* Back Button */}
        <motion.div variants={item} className="flex justify-center pt-2">
          <Button onClick={onReset} className="flex items-center">
            <ArrowLeft size={16} className="mr-2" />
            Back to Calculator
          </Button>
        </motion.div>

        {/* Disclaimer */}
        <motion.div variants={item} className="text-xs text-gray-500 text-center mt-4">
          Note: BMI is a screening tool and does not diagnose body fatness or health.
          Consult with healthcare professionals for a complete health assessment.
        </motion.div>
      </motion.div>

      {/* Confetti for normal weight */}
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: ['#FF6B6B', '#4ECDC4', '#FFD166', '#06D6A0', '#118AB2'][i % 5],
                left: `${Math.random() * 100}%`,
                top: '-10px'
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: [`${Math.random() * 10 - 5}%`, `${Math.random() * 20 - 10}%`],
                rotate: [0, 360 * Math.random() * 5]
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                ease: 'easeOut',
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 0.5
              }}
            />
          ))}
        </motion.div>
      )}
    </Card>
  );
};

export default Results;