import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { BMIResult, Gender, HeightUnit, UserData, WeightUnit } from '../types';
import { calculateBMI } from '../utils/bmiCalculator';
import { convertCmToFeetInches, convertHeightToCm, convertKgToLbs, convertWeightToKg } from '../utils/unitConverter';
import Button from './UI/Button';
import Card from './UI/Card';
import Results from './Results';

const initialUserData: UserData = {
  age: 30,
  gender: 'male',
  height: {
    value: 170,
    unit: 'cm',
    feet: 5,
    inches: 7
  },
  weight: {
    value: 70,
    unit: 'kg'
  }
};

const Calculator: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [result, setResult] = useState<BMIResult | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Update BMI whenever user data changes
  useEffect(() => {
    if (userData.age > 0 && userData.height.value > 0 && userData.weight.value > 0) {
      setResult(calculateBMI(userData));
    } else {
      setResult(null);
    }
  }, [userData]);

  // Handle age change
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(e.target.value) || 0;
    setUserData((prev) => ({ ...prev, age }));
  };

  // Handle gender change
  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gender = e.target.value as Gender;
    setUserData((prev) => ({ ...prev, gender }));
  };

  // Handle height unit toggle
  const handleHeightUnitChange = (unit: HeightUnit) => {
    if (unit === userData.height.unit) return;

    if (unit === 'cm' && userData.height.feet !== undefined && userData.height.inches !== undefined) {
      // Convert from feet/inches to cm
      const newHeightInCm = convertHeightToCm(userData.height.feet, userData.height.inches);
      setUserData((prev) => ({
        ...prev,
        height: {
          ...prev.height,
          value: newHeightInCm,
          unit
        }
      }));
    } else if (unit === 'ft' && userData.height.value) {
      // Convert from cm to feet/inches
      const { feet, inches } = convertCmToFeetInches(userData.height.value);
      setUserData((prev) => ({
        ...prev,
        height: {
          ...prev.height,
          feet,
          inches,
          unit
        }
      }));
    }
  };

  // Handle height change in cm
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    setUserData((prev) => ({
      ...prev,
      height: {
        ...prev.height,
        value
      }
    }));
  };

  // Handle feet change
  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const feet = parseInt(e.target.value) || 0;
    setUserData((prev) => ({
      ...prev,
      height: {
        ...prev.height,
        feet,
        value: convertHeightToCm(feet, prev.height.inches || 0)
      }
    }));
  };

  // Handle inches change
  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inches = parseInt(e.target.value) || 0;
    setUserData((prev) => ({
      ...prev,
      height: {
        ...prev.height,
        inches,
        value: convertHeightToCm(prev.height.feet || 0, inches)
      }
    }));
  };

  // Handle weight unit toggle
  const handleWeightUnitChange = (unit: WeightUnit) => {
    if (unit === userData.weight.unit) return;

    if (unit === 'kg' && userData.weight.value) {
      // Convert from pounds to kg
      const newWeightInKg = convertWeightToKg(userData.weight.value);
      setUserData((prev) => ({
        ...prev,
        weight: {
          value: newWeightInKg,
          unit
        }
      }));
    } else if (unit === 'lb' && userData.weight.value) {
      // Convert from kg to pounds
      const newWeightInLbs = convertKgToLbs(userData.weight.value);
      setUserData((prev) => ({
        ...prev,
        weight: {
          value: newWeightInLbs,
          unit
        }
      }));
    }
  };

  // Handle weight change
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setUserData((prev) => ({
      ...prev,
      weight: {
        ...prev.weight,
        value
      }
    }));
  };

  // Handle calculate button click
  const handleCalculate = () => {
    if (userData.age > 0 && userData.height.value > 0 && userData.weight.value > 0) {
      setResult(calculateBMI(userData));
      setShowResults(true);
    }
  };

  // Reset the form
  const handleReset = () => {
    setUserData(initialUserData);
    setShowResults(false);
  };

  const isValidData = userData.age > 0 && userData.height.value > 0 && userData.weight.value > 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <Card className="mb-6">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleCalculate(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Age Input */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                min="2"
                max="120"
                value={userData.age || ''}
                onChange={handleAgeChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your age"
              />
            </div>

            {/* Gender Selection */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="relative">
                <select
                  id="gender"
                  value={userData.gender}
                  onChange={handleGenderChange}
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">there is no other gender you idiot, just choose either of the above</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              </div>
            </div>
          </div>

          {/* Height Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Height</label>
              <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => handleHeightUnitChange('cm')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    userData.height.unit === 'cm'
                      ? 'bg-white shadow-sm font-medium text-indigo-600'
                      : 'text-gray-600'
                  }`}
                >
                  cm
                </button>
                <button
                  type="button"
                  onClick={() => handleHeightUnitChange('ft')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    userData.height.unit === 'ft'
                      ? 'bg-white shadow-sm font-medium text-indigo-600'
                      : 'text-gray-600'
                  }`}
                >
                  ft
                </button>
              </div>
            </div>

            {userData.height.unit === 'cm' ? (
              <input
                type="number"
                value={userData.height.value || ''}
                onChange={handleHeightChange}
                min="50"
                max="250"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Height in centimeters"
              />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <input
                    type="number"
                    value={userData.height.feet || ''}
                    onChange={handleFeetChange}
                    min="1"
                    max="8"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Feet"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={userData.height.inches || ''}
                    onChange={handleInchesChange}
                    min="0"
                    max="11"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Inches"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Weight Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700">Weight</label>
              <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => handleWeightUnitChange('kg')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    userData.weight.unit === 'kg'
                      ? 'bg-white shadow-sm font-medium text-indigo-600'
                      : 'text-gray-600'
                  }`}
                >
                  kg
                </button>
                <button
                  type="button"
                  onClick={() => handleWeightUnitChange('lb')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    userData.weight.unit === 'lb'
                      ? 'bg-white shadow-sm font-medium text-indigo-600'
                      : 'text-gray-600'
                  }`}
                >
                  lb
                </button>
              </div>
            </div>

            <input
              type="number"
              value={userData.weight.value || ''}
              onChange={handleWeightChange}
              min="1"
              max={userData.weight.unit === 'kg' ? 300 : 660}
              step="0.1"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder={`Weight in ${userData.weight.unit === 'kg' ? 'kilograms' : 'pounds'}`}
            />
          </div>

          {/* What is BMI section */}
          <div className="mt-2">
            <div 
              className="flex items-center text-indigo-600 cursor-pointer" 
              onClick={() => setShowInfo(!showInfo)}
            >
              <HelpCircle size={16} className="mr-1" />
              <span className="text-sm">What is BMI?</span>
            </div>
            
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-2 text-sm text-gray-600 bg-indigo-50 p-3 rounded-lg"
              >
                <p>Body Mass Index (BMI) is a measure of body fat based on height and weight. It applies to adult men and women.</p>
                <p className="mt-1">The formula is: BMI = weight(kg) / height(m)²</p>
                <ul className="mt-1 list-disc list-inside">
                  <li>Underweight: BMI less than 18.5</li>
                  <li>Normal weight: BMI 18.5-24.9</li>
                  <li>Overweight: BMI 25-29.9</li>
                  <li>Obesity: BMI 30 or greater</li>
                </ul>
              </motion.div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button 
              type="submit" 
              className="flex-1"
              disabled={!isValidData}
            >
              Calculate BMI
            </Button>
            <Button 
              type="button" 
              className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600"
              onClick={handleReset}
            >
              Reset
            </Button>
          </div>
        </form>
      </Card>

      {/* Results Section */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: showResults ? 1 : 0, y: showResults ? 0 : 20 }}
          transition={{ duration: 0.5 }}
        >
          <Results result={result} onReset={handleReset} />
        </motion.div>
      )}
    </div>
  );
};

export default Calculator;