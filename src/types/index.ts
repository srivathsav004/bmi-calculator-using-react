export type Gender = 'male' | 'female' | 'there is no other gender you idiot, just choose either of the above';

export type HeightUnit = 'cm' | 'ft';
export type WeightUnit = 'kg' | 'lb';

export interface UserData {
  age: number;
  gender: Gender;
  height: {
    value: number;
    unit: HeightUnit;
    feet?: number;
    inches?: number;
  };
  weight: {
    value: number;
    unit: WeightUnit;
  };
}

export interface BMIResult {
  bmi: number;
  category: 'underweight' | 'normal' | 'overweight' | 'obese';
  message: string;
}