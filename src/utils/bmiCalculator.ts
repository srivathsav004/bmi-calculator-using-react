import { BMIResult, UserData } from '../types';
import { convertHeightToCm, convertWeightToKg } from './unitConverter';

export const calculateBMI = (userData: UserData): BMIResult => {
  // Convert height to cm and weight to kg for calculation
  const heightInCm = userData.height.unit === 'cm' 
    ? userData.height.value 
    : convertHeightToCm(userData.height.feet || 0, userData.height.inches || 0);
  
  const weightInKg = userData.weight.unit === 'kg'
    ? userData.weight.value
    : convertWeightToKg(userData.weight.value);

  // BMI formula: weight (kg) / (height (m))²
  const heightInMeters = heightInCm / 100;
  const bmi = weightInKg / (heightInMeters * heightInMeters);
  const roundedBMI = Math.round(bmi * 10) / 10;

  // Determine BMI category
  let category: BMIResult['category'];
  let message: string;

  if (bmi < 18.5) {
    category = 'underweight';
    message = 'Consider focusing on nutrient-dense foods and strength training to build healthy weight.';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'normal';
    message = 'Excellent! Maintain your healthy lifestyle with balanced nutrition and regular activity.';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'overweight';
    message = 'Consider incorporating more physical activity and mindful eating habits.';
  } else {
    category = 'obese';
    message = 'Focus on gradual lifestyle changes including regular activity, hydration, and portion control.';
  }

  return {
    bmi: roundedBMI,
    category,
    message
  };
};

export const getCategoryColor = (category: BMIResult['category']): string => {
  switch (category) {
    case 'underweight':
      return 'from-blue-300 to-blue-500';
    case 'normal':
      return 'from-green-300 to-green-500';
    case 'overweight':
      return 'from-yellow-300 to-yellow-500';
    case 'obese':
      return 'from-red-300 to-red-500';
    default:
      return 'from-gray-300 to-gray-500';
  }
};

export const getCategoryEmoji = (category: BMIResult['category']): string => {
  switch (category) {
    case 'underweight':
      return '🥗';
    case 'normal':
      return '🎉';
    case 'overweight':
      return '🚶';
    case 'obese':
      return '💪';
    default:
      return '📊';
  }
};

export const getBMIRange = (category: BMIResult['category']): string => {
  switch (category) {
    case 'underweight':
      return 'Below 18.5';
    case 'normal':
      return '18.5 - 24.9';
    case 'overweight':
      return '25 - 29.9';
    case 'obese':
      return '30 or higher';
    default:
      return '';
  }
};