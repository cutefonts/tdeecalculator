import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Calculator as CalculatorIcon, Target, TrendingUp, Brain, Heart, Activity, Zap, Download, FileDown, Eye, RotateCcw, Info, CheckCircle, AlertTriangle, Clock, Sparkles } from 'lucide-react';
import AdvancedMetrics from './AdvancedMetrics';
import BodyCompositionAnalyzer from './BodyCompositionAnalyzer';
import NutritionTiming from './NutritionTiming';
import ProgressTracker from './ProgressTracker';
import AdvancedTools from './AdvancedTools';
import { generatePDFReport, generateJPGReport, exportJSON, ExportData } from '../utils/exportUtils';

interface CalculatorData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: number;
  goal: 'lose' | 'maintain' | 'gain';
  bodyFat?: number;
  formula: 'mifflin' | 'harris' | 'katch';
  workoutIntensity: 'low' | 'moderate' | 'high' | 'extreme';
  sleepHours: number;
  stressLevel: 'low' | 'moderate' | 'high';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

interface CalculatorResults {
  bmr: number;
  tdee: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  bodyMassIndex: number;
  idealWeight: number;
  metabolicAge: number;
  hydrationNeeds: number;
  weeklyWeightChange: number;
  timeToGoal: number;
}

const Calculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({
    age: 25,
    gender: 'male',
    weight: 70,
    height: 175,
    activityLevel: 1.55,
    goal: 'maintain',
    formula: 'mifflin',
    workoutIntensity: 'moderate',
    sleepHours: 7,
    stressLevel: 'moderate',
    experienceLevel: 'intermediate'
  });

  const [results, setResults] = useState<CalculatorResults | null>(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [resultsTab, setResultsTab] = useState('overview');
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Activity level options
  const activityLevels = [
    { value: 1.2, label: 'Sedentary', description: 'Little to no exercise, desk job', icon: '🪑' },
    { value: 1.375, label: 'Lightly Active', description: 'Light exercise 1-3 days/week', icon: '🚶' },
    { value: 1.55, label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week', icon: '🏃' },
    { value: 1.725, label: 'Very Active', description: 'Hard exercise 6-7 days/week', icon: '💪' },
    { value: 1.9, label: 'Extremely Active', description: 'Very hard exercise, physical job', icon: '🏋️' }
  ];

  // Validation function
  const validateInputs = useCallback((): string[] => {
    const errors: string[] = [];
    
    if (data.age < 13 || data.age > 120) {
      errors.push('Age must be between 13 and 120 years');
    }
    if (data.weight < 20 || data.weight > 300) {
      errors.push('Weight must be between 20 and 300 kg');
    }
    if (data.height < 100 || data.height > 250) {
      errors.push('Height must be between 100 and 250 cm');
    }
    if (data.bodyFat !== undefined && (data.bodyFat < 3 || data.bodyFat > 50)) {
      errors.push('Body fat percentage must be between 3% and 50%');
    }
    if (data.sleepHours < 3 || data.sleepHours > 12) {
      errors.push('Sleep hours must be between 3 and 12 hours');
    }
    
    return errors;
  }, [data]);

  // BMR calculation functions
  const calculateBMR = useCallback((): number => {
    const { age, gender, weight, height, bodyFat, formula } = data;
    
    switch (formula) {
      case 'harris':
        return gender === 'male'
          ? 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
          : 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      
      case 'katch':
        if (bodyFat) {
          const leanMass = weight * (1 - bodyFat / 100);
          return 370 + (21.6 * leanMass);
        }
        // Fall back to Mifflin if no body fat
        return gender === 'male'
          ? (10 * weight) + (6.25 * height) - (5 * age) + 5
          : (10 * weight) + (6.25 * height) - (5 * age) - 161;
      
      case 'mifflin':
      default:
        return gender === 'male'
          ? (10 * weight) + (6.25 * height) - (5 * age) + 5
          : (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
  }, [data]);

  // TDEE calculation with lifestyle factors
  const calculateTDEE = useCallback((bmr: number): number => {
    let tdee = bmr * data.activityLevel;
    
    // Adjust for workout intensity
    const intensityMultipliers = {
      low: 1.0,
      moderate: 1.05,
      high: 1.1,
      extreme: 1.15
    };
    tdee *= intensityMultipliers[data.workoutIntensity];
    
    // Adjust for sleep quality
    if (data.sleepHours < 6) {
      tdee *= 0.95; // Reduce by 5% for poor sleep
    } else if (data.sleepHours > 9) {
      tdee *= 1.02; // Slight increase for excellent sleep
    }
    
    // Adjust for stress level
    const stressMultipliers = {
      low: 1.0,
      moderate: 1.02,
      high: 1.05
    };
    tdee *= stressMultipliers[data.stressLevel];
    
    return Math.round(tdee);
  }, [data]);

  // Goal calories calculation
  const calculateGoalCalories = useCallback((tdee: number): number => {
    const { goal, experienceLevel } = data;
    
    if (goal === 'maintain') return tdee;
    
    // Adjust deficit/surplus based on experience level
    const experienceMultipliers = {
      beginner: 1.0,
      intermediate: 0.85,
      advanced: 0.7
    };
    
    const baseChange = goal === 'lose' ? -500 : 500;
    const adjustedChange = baseChange * experienceMultipliers[experienceLevel];
    
    return Math.round(tdee + adjustedChange);
  }, [data]);

  // Macro calculation
  const calculateMacros = useCallback((goalCalories: number) => {
    const { goal, weight, experienceLevel } = data;
    
    let proteinRatio, carbRatio, fatRatio;
    
    switch (goal) {
      case 'lose':
        proteinRatio = 0.35;
        carbRatio = 0.35;
        fatRatio = 0.30;
        break;
      case 'gain':
        proteinRatio = 0.25;
        carbRatio = 0.50;
        fatRatio = 0.25;
        break;
      default: // maintain
        proteinRatio = 0.25;
        carbRatio = 0.45;
        fatRatio = 0.30;
    }
    
    // Adjust protein based on experience level
    if (experienceLevel === 'advanced') {
      proteinRatio *= 1.1;
      carbRatio *= 0.95;
    }
    
    const protein = Math.round((goalCalories * proteinRatio) / 4);
    const carbs = Math.round((goalCalories * carbRatio) / 4);
    const fat = Math.round((goalCalories * fatRatio) / 9);
    
    return { protein, carbs, fat };
  }, [data]);

  // Additional metrics calculations
  const calculateAdditionalMetrics = useCallback((bmr: number, tdee: number) => {
    const { weight, height, age, gender, goal } = data;
    
    // BMI
    const heightM = height / 100;
    const bodyMassIndex = Math.round((weight / (heightM * heightM)) * 10) / 10;
    
    // Ideal weight (using BMI 22)
    const idealWeight = Math.round(22 * heightM * heightM);
    
    // Metabolic age (simplified calculation)
    const avgBMR = gender === 'male' ? 1800 : 1400;
    const metabolicAge = Math.round(age * (avgBMR / bmr));
    
    // Hydration needs (basic calculation)
    const hydrationNeeds = Math.round((weight * 0.035 + (tdee - bmr) * 0.0012) * 10) / 10;
    
    // Weekly weight change estimate
    let weeklyWeightChange = 0;
    if (goal === 'lose') {
      weeklyWeightChange = -0.5; // 0.5 kg per week
    } else if (goal === 'gain') {
      weeklyWeightChange = 0.25; // 0.25 kg per week
    }
    
    // Time to goal (simplified)
    const targetWeightChange = goal === 'lose' ? weight * 0.1 : weight * 0.05;
    const timeToGoal = weeklyWeightChange !== 0 ? Math.abs(targetWeightChange / weeklyWeightChange) : 0;
    
    return {
      bodyMassIndex,
      idealWeight,
      metabolicAge,
      hydrationNeeds,
      weeklyWeightChange,
      timeToGoal
    };
  }, [data]);

  // Main calculation function
  const calculateResults = useCallback(async () => {
    const errors = validateInputs();
    setValidationErrors(errors);
    
    if (errors.length > 0) {
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate calculation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const bmr = calculateBMR();
      const tdee = calculateTDEE(bmr);
      const goalCalories = calculateGoalCalories(tdee);
      const macros = calculateMacros(goalCalories);
      const additionalMetrics = calculateAdditionalMetrics(bmr, tdee);
      
      const calculatedResults: CalculatorResults = {
        bmr: Math.round(bmr),
        tdee,
        goalCalories,
        ...macros,
        ...additionalMetrics
      };
      
      setResults(calculatedResults);
      setShowResults(true);
      setResultsTab('overview');
    } catch (error) {
      console.error('Calculation error:', error);
      setValidationErrors(['An error occurred during calculation. Please try again.']);
    } finally {
      setIsCalculating(false);
    }
  }, [data, validateInputs, calculateBMR, calculateTDEE, calculateGoalCalories, calculateMacros, calculateAdditionalMetrics]);

  // Reset function
  const resetCalculator = useCallback(() => {
    setData({
      age: 25,
      gender: 'male',
      weight: 70,
      height: 175,
      activityLevel: 1.55,
      goal: 'maintain',
      formula: 'mifflin',
      workoutIntensity: 'moderate',
      sleepHours: 7,
      stressLevel: 'moderate',
      experienceLevel: 'intermediate'
    });
    setResults(null);
    setShowResults(false);
    setValidationErrors([]);
    setActiveTab('basic');
    setResultsTab('overview');
  }, []);

  // Export functions
  const exportData = useCallback((format: 'pdf' | 'jpg' | 'json') => {
    if (!results) return;
    
    const exportData: ExportData = {
      personalInfo: data,
      results,
      timestamp: new Date().toISOString(),
      recommendations: generateRecommendations(),
      domain: 'calculatortdee.app'
    };
    
    switch (format) {
      case 'pdf':
        generatePDFReport(exportData);
        break;
      case 'jpg':
        generateJPGReport(exportData);
        break;
      case 'json':
        exportJSON(exportData);
        break;
    }
  }, [results, data]);

  // Generate recommendations
  const generateRecommendations = useCallback((): string[] => {
    if (!results) return [];
    
    const recommendations: string[] = [];
    
    // BMI recommendations
    if (results.bodyMassIndex < 18.5) {
      recommendations.push('Your BMI indicates you may be underweight. Consider consulting a healthcare provider.');
    } else if (results.bodyMassIndex > 25) {
      recommendations.push('Your BMI indicates you may be overweight. A gradual weight loss approach is recommended.');
    }
    
    // Goal-specific recommendations
    if (data.goal === 'lose') {
      recommendations.push('For sustainable weight loss, aim for 0.5-1 kg per week through a moderate caloric deficit.');
      recommendations.push('Prioritize protein intake to preserve muscle mass during weight loss.');
    } else if (data.goal === 'gain') {
      recommendations.push('For healthy weight gain, focus on nutrient-dense foods and resistance training.');
      recommendations.push('Aim for gradual weight gain of 0.25-0.5 kg per week to minimize fat gain.');
    }
    
    // Sleep recommendations
    if (data.sleepHours < 7) {
      recommendations.push('Aim for 7-9 hours of quality sleep per night to optimize metabolism and recovery.');
    }
    
    // Stress recommendations
    if (data.stressLevel === 'high') {
      recommendations.push('High stress can impact metabolism. Consider stress management techniques like meditation or yoga.');
    }
    
    // Hydration recommendations
    recommendations.push(`Aim for ${results.hydrationNeeds} liters of water daily to support optimal metabolism.`);
    
    return recommendations;
  }, [results, data]);

  // Input change handlers
  const handleInputChange = useCallback((field: keyof CalculatorData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
    setValidationErrors([]);
  }, []);

  // Tab components
  const TabButton: React.FC<{ id: string; label: string; icon: React.ComponentType<any> }> = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
        activeTab === id
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-105'
          : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  const ResultsTabButton: React.FC<{ id: string; label: string; icon: React.ComponentType<any> }> = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setResultsTab(id)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 ${
        resultsTab === id
          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
          : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </button>
  );

  return (
    <section id="calculator" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            <span className="text-xs sm:text-sm text-blue-700 font-medium">AI-Powered Professional Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Advanced TDEE Calculator
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              with Smart Analytics
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Get precise calorie recommendations with our AI-powered calculator that considers 
            lifestyle factors, workout intensity, and personal goals for optimal results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <div className="flex items-center space-x-3">
                <div className="bg-white/20 rounded-xl p-3">
                  <CalculatorIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Personal Information</h3>
                  <p className="text-blue-100">Enter your details for personalized analysis</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Validation Errors */}
              {validationErrors.length > 0 && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertTriangle className="h-5 w-5 text-red-500" />
                    <span className="text-red-700 font-medium">Please fix the following errors:</span>
                  </div>
                  <ul className="space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index} className="text-red-600 text-sm">• {error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tab Navigation */}
              <div className="flex flex-wrap gap-2 mb-6">
                <TabButton id="basic" label="Basic Info" icon={CalculatorIcon} />
                <TabButton id="advanced" label="Advanced" icon={Brain} />
                <TabButton id="lifestyle" label="Lifestyle" icon={Heart} />
              </div>

              {/* Basic Information Tab */}
              {activeTab === 'basic' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                      <input
                        type="number"
                        value={data.age}
                        onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="25"
                        min="13"
                        max="120"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <select
                        value={data.gender}
                        onChange={(e) => handleInputChange('gender', e.target.value as 'male' | 'female')}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      >
                        <option value="male" className="bg-white">Male</option>
                        <option value="female" className="bg-white">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        value={data.weight}
                        onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="70"
                        min="20"
                        max="300"
                        step="0.1"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                      <input
                        type="number"
                        value={data.height}
                        onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                        className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        placeholder="175"
                        min="100"
                        max="250"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Activity Level</label>
                    <div className="space-y-3">
                      {activityLevels.map((level) => (
                        <label key={level.value} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer border border-gray-200 hover:border-blue-300">
                          <input
                            type="radio"
                            name="activityLevel"
                            value={level.value}
                            checked={data.activityLevel === level.value}
                            onChange={(e) => handleInputChange('activityLevel', parseFloat(e.target.value))}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div className="text-2xl">{level.icon}</div>
                          <div className="flex-1">
                            <div className="text-gray-900 font-medium">{level.label}</div>
                            <div className="text-gray-600 text-sm">{level.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Goal</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: 'lose', label: 'Lose Weight', icon: TrendingUp, color: 'from-red-500 to-pink-500' },
                        { value: 'maintain', label: 'Maintain', icon: Target, color: 'from-blue-500 to-indigo-500' },
                        { value: 'gain', label: 'Gain Weight', icon: Activity, color: 'from-green-500 to-emerald-500' }
                      ].map((goal) => {
                        const Icon = goal.icon;
                        return (
                          <button
                            key={goal.value}
                            onClick={() => handleInputChange('goal', goal.value)}
                            className={`flex items-center justify-center space-x-2 p-4 rounded-xl transition-all duration-300 border-2 ${
                              data.goal === goal.value
                                ? `bg-gradient-to-r ${goal.color} text-white border-transparent shadow-lg transform scale-105`
                                : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span className="text-sm font-medium">{goal.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Advanced Tab */}
              {activeTab === 'advanced' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Body Fat Percentage (Optional)
                      <span className="text-gray-500 text-xs ml-2">For more accurate calculations</span>
                    </label>
                    <input
                      type="number"
                      value={data.bodyFat || ''}
                      onChange={(e) => handleInputChange('bodyFat', e.target.value ? parseFloat(e.target.value) : undefined)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="15"
                      min="3"
                      max="50"
                      step="0.1"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Calculation Formula</label>
                    <div className="space-y-3">
                      {[
                        { value: 'mifflin', label: 'Mifflin-St Jeor', description: 'Most accurate for most people (recommended)', recommended: true },
                        { value: 'harris', label: 'Harris-Benedict', description: 'Traditional formula, slightly less accurate', recommended: false },
                        { value: 'katch', label: 'Katch-McArdle', description: 'Best if you know your body fat percentage', recommended: false }
                      ].map((formula) => (
                        <label key={formula.value} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors cursor-pointer border border-gray-200 hover:border-blue-300">
                          <input
                            type="radio"
                            name="formula"
                            value={formula.value}
                            checked={data.formula === formula.value}
                            onChange={(e) => handleInputChange('formula', e.target.value)}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-gray-900 font-medium">{formula.label}</span>
                              {formula.recommended && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                                  Recommended
                                </span>
                              )}
                            </div>
                            <div className="text-gray-600 text-sm">{formula.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Experience Level</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: 'beginner', label: 'Beginner', description: '< 1 year' },
                        { value: 'intermediate', label: 'Intermediate', description: '1-3 years' },
                        { value: 'advanced', label: 'Advanced', description: '3+ years' }
                      ].map((level) => (
                        <button
                          key={level.value}
                          onClick={() => handleInputChange('experienceLevel', level.value)}
                          className={`p-4 rounded-xl transition-all duration-300 border-2 text-center ${
                            data.experienceLevel === level.value
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-sm">{level.label}</div>
                          <div className="text-xs opacity-80">{level.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Lifestyle Tab */}
              {activeTab === 'lifestyle' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Workout Intensity</label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { value: 'low', label: 'Low', description: 'Walking, light yoga', emoji: '🚶' },
                        { value: 'moderate', label: 'Moderate', description: 'Jogging, weight training', emoji: '🏃' },
                        { value: 'high', label: 'High', description: 'HIIT, heavy lifting', emoji: '💪' },
                        { value: 'extreme', label: 'Extreme', description: 'Professional athlete level', emoji: '🏋️' }
                      ].map((intensity) => (
                        <button
                          key={intensity.value}
                          onClick={() => handleInputChange('workoutIntensity', intensity.value)}
                          className={`p-4 rounded-xl transition-all duration-300 text-left border-2 ${
                            data.workoutIntensity === intensity.value
                              ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white border-transparent shadow-lg'
                              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{intensity.emoji}</span>
                            <span className="font-medium text-sm">{intensity.label}</span>
                          </div>
                          <div className="text-xs opacity-80">{intensity.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sleep Hours per Night
                      <span className="text-gray-500 text-xs ml-2">Affects metabolism significantly</span>
                    </label>
                    <input
                      type="number"
                      value={data.sleepHours}
                      onChange={(e) => handleInputChange('sleepHours', parseFloat(e.target.value) || 0)}
                      className="w-full bg-gray-50 border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                      placeholder="7"
                      min="3"
                      max="12"
                      step="0.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Stress Level</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { value: 'low', label: 'Low', description: 'Relaxed, minimal stress', emoji: '😌', color: 'from-green-500 to-emerald-500' },
                        { value: 'moderate', label: 'Moderate', description: 'Normal daily stress', emoji: '😐', color: 'from-yellow-500 to-orange-500' },
                        { value: 'high', label: 'High', description: 'High stress, demanding lifestyle', emoji: '😰', color: 'from-red-500 to-pink-500' }
                      ].map((stress) => (
                        <button
                          key={stress.value}
                          onClick={() => handleInputChange('stressLevel', stress.value)}
                          className={`p-4 rounded-xl transition-all duration-300 text-center border-2 ${
                            data.stressLevel === stress.value
                              ? `bg-gradient-to-r ${stress.color} text-white border-transparent shadow-lg`
                              : 'bg-white text-gray-600 hover:bg-gray-50 border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-2xl mb-1">{stress.emoji}</div>
                          <div className="font-medium text-sm">{stress.label}</div>
                          <div className="text-xs opacity-80">{stress.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <button
                  onClick={calculateResults}
                  disabled={isCalculating || validationErrors.length > 0}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      <span>Calculate TDEE</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetCalculator}
                  className="flex items-center justify-center space-x-2 px-6 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                >
                  <RotateCcw className="h-5 w-5" />
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {!showResults ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12 px-6">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full p-8 mb-6">
                  <CalculatorIcon className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Calculate</h3>
                <p className="text-gray-600 max-w-md leading-relaxed">
                  Fill in your information and click "Calculate TDEE" to get your personalized 
                  metabolic analysis and nutrition recommendations.
                </p>
              </div>
            ) : results ? (
              <div>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white/20 rounded-xl p-3">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">Your Results</h3>
                        <p className="text-green-100">Comprehensive metabolic analysis complete</p>
                      </div>
                    </div>
                    
                    {/* Export Buttons */}
                    <div className="flex space-x-2">
                      <button
                        onClick={() => exportData('pdf')}
                        className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        title="Export as PDF"
                      >
                        <FileDown className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => exportData('jpg')}
                        className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        title="Export as Image"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => exportData('json')}
                        className="p-2 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
                        title="Export as JSON"
                      >
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Results Tab Navigation */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <ResultsTabButton id="overview" label="Overview" icon={CalculatorIcon} />
                    <ResultsTabButton id="advanced" label="Advanced" icon={Brain} />
                    <ResultsTabButton id="composition" label="Body Comp" icon={Activity} />
                    <ResultsTabButton id="timing" label="Timing" icon={Clock} />
                    <ResultsTabButton id="progress" label="Progress" icon={TrendingUp} />
                    <ResultsTabButton id="tools" label="Tools" icon={Zap} />
                  </div>

                  {/* Results Content */}
                  {resultsTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Main Results Cards */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                          <div className="flex items-center space-x-3 mb-3">
                            <Heart className="h-6 w-6" />
                            <span className="font-semibold">BMR</span>
                          </div>
                          <div className="text-3xl font-bold">{results.bmr}</div>
                          <div className="text-sm opacity-90">calories/day</div>
                        </div>

                        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl p-6 text-white">
                          <div className="flex items-center space-x-3 mb-3">
                            <Zap className="h-6 w-6" />
                            <span className="font-semibold">TDEE</span>
                          </div>
                          <div className="text-3xl font-bold">{results.tdee}</div>
                          <div className="text-sm opacity-90">calories/day</div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                          <div className="flex items-center space-x-3 mb-3">
                            <Target className="h-6 w-6" />
                            <span className="font-semibold">Goal Calories</span>
                          </div>
                          <div className="text-3xl font-bold">{results.goalCalories}</div>
                          <div className="text-sm opacity-90">calories/day</div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                          <div className="flex items-center space-x-3 mb-3">
                            <Activity className="h-6 w-6" />
                            <span className="font-semibold">BMI</span>
                          </div>
                          <div className="text-3xl font-bold">{results.bodyMassIndex}</div>
                          <div className="text-sm opacity-90">kg/m²</div>
                        </div>
                      </div>

                      {/* Macro Breakdown */}
                      <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                        <h4 className="text-gray-900 font-semibold mb-4">Optimized Macro Distribution</h4>
                        <div className="grid grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-500 mb-1">{results.protein}g</div>
                            <div className="text-sm text-gray-600 mb-1">Protein</div>
                            <div className="text-xs text-gray-500">{Math.round((results.protein * 4 / results.goalCalories) * 100)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-yellow-500 mb-1">{results.carbs}g</div>
                            <div className="text-sm text-gray-600 mb-1">Carbs</div>
                            <div className="text-xs text-gray-500">{Math.round((results.carbs * 4 / results.goalCalories) * 100)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-500 mb-1">{results.fat}g</div>
                            <div className="text-sm text-gray-600 mb-1">Fat</div>
                            <div className="text-xs text-gray-500">{Math.round((results.fat * 9 / results.goalCalories) * 100)}%</div>
                          </div>
                        </div>
                      </div>

                      {/* Additional Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-200">
                          <div className="text-xl font-bold text-blue-600">{results.metabolicAge}</div>
                          <div className="text-sm text-blue-700">Metabolic Age</div>
                        </div>
                        <div className="bg-cyan-50 rounded-xl p-4 text-center border border-cyan-200">
                          <div className="text-xl font-bold text-cyan-600">{results.hydrationNeeds}L</div>
                          <div className="text-sm text-cyan-700">Daily Water</div>
                        </div>
                        <div className="bg-purple-50 rounded-xl p-4 text-center border border-purple-200">
                          <div className="text-xl font-bold text-purple-600">{results.idealWeight}kg</div>
                          <div className="text-sm text-purple-700">Ideal Weight</div>
                        </div>
                      </div>

                      {/* Recommendations */}
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                        <h4 className="text-gray-900 font-semibold mb-3 flex items-center space-x-2">
                          <Info className="h-5 w-5 text-yellow-600" />
                          <span>Personalized Recommendations</span>
                        </h4>
                        <div className="space-y-3">
                          {generateRecommendations().map((recommendation, index) => (
                            <div key={index} className="flex items-start space-x-3">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span className="text-gray-700 text-sm leading-relaxed">{recommendation}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {resultsTab === 'advanced' && (
                    <AdvancedMetrics data={data} results={results} />
                  )}

                  {resultsTab === 'composition' && (
                    <BodyCompositionAnalyzer data={data} results={results} />
                  )}

                  {resultsTab === 'timing' && (
                    <NutritionTiming data={data} results={results} />
                  )}

                  {resultsTab === 'progress' && (
                    <ProgressTracker data={data} results={results} />
                  )}

                  {resultsTab === 'tools' && (
                    <AdvancedTools data={data} results={results} />
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;