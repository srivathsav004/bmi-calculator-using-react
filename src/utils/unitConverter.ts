// Convert feet and inches to centimeters
export const convertHeightToCm = (feet: number, inches: number): number => {
  const totalInches = feet * 12 + inches;
  return Math.round(totalInches * 2.54);
};

// Convert centimeters to feet and inches
export const convertCmToFeetInches = (cm: number): { feet: number; inches: number } => {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  
  // Handle case where inches rounds up to 12
  if (inches === 12) {
    return { feet: feet + 1, inches: 0 };
  }
  
  return { feet, inches };
};

// Convert pounds to kilograms
export const convertWeightToKg = (pounds: number): number => {
  return Math.round(pounds * 0.453592 * 10) / 10;
};

// Convert kilograms to pounds
export const convertKgToLbs = (kg: number): number => {
  return Math.round(kg * 2.20462 * 10) / 10;
};