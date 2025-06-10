import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Calculator as CalcIcon, Download, RotateCcw, TrendingUp, Activity, Heart, Zap, Target, Brain, AlertCircle, CheckCircle, Info, FileText, Image, FileDown } from 'lucide-react';
import { generatePDFReport, generateJPGReport, exportJSON, ExportData } from '../utils/exportUtils';

interface CalculatorData {
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: number;
  bodyFat?: number;
  goal: 'lose' | 'maintain' | 'gain';
  formula: 'harris' | 'mifflin' | 'katch';
  workoutIntensity: 'low' | 'moderate' | 'high' | 'extreme';
  sleepHours: number;
  stressLevel: 'low' | 'moderate' | 'high';
  waterIntake: number;
}

interface Results {
  bmr: number;
  tdee: number;
  goalCalories: number;
  protein: number;
  carbs: number;
  fat: number;
  metabolicAge: number;
  bodyMassIndex: number;
  idealWeight: number;
  calorieDeficit?: number;
  calorieSurplus?: number;
  weeklyWeightChange: number;
  hydrationNeeds: number;
  sleepMetabolismImpact: number;
  stressMetabolismImpact: number;
}

const Calculator: React.FC = () => {
  const [data, setData] = useState<CalculatorData>({
    age: 30,
    gender: 'male',
    weight: 70,
    height: 175,
    activityLevel: 1.55,
    goal: 'maintain',
    formula: 'mifflin',
    workoutIntensity: 'moderate',
    sleepHours: 7,
    stressLevel: 'moderate',
    waterIntake: 2.5
  });

  const [results, setResults] = useState<Results | null>(null);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'lifestyle'>('basic');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const activityLevels = useMemo(() => [
    { value: 1.2, label: 'Sedentary', description: 'Desk job, no exercise' },
    { value: 1.375, label: 'Lightly Active', description: 'Light exercise 1-3 days/week' },
    { value: 1.55, label: 'Moderately Active', description: 'Moderate exercise 3-5 days/week' },
    { value: 1.725, label: 'Very Active', description: 'Hard exercise 6-7 days/week' },
    { value: 1.9, label: 'Extremely Active', description: 'Very hard exercise, physical job' }
  ], []);

  const workoutIntensities = useMemo(() => [
    { value: 'low', label: 'Low Intensity', multiplier: 0.95, description: 'Walking, light yoga' },
    { value: 'moderate', label: 'Moderate', multiplier: 1.0, description: 'Jogging, weight training' },
    { value: 'high', label: 'High Intensity', multiplier: 1.05, description: 'HIIT, heavy lifting' },
    { value: 'extreme', label: 'Extreme', multiplier: 1.1, description: 'Professional athlete level' }
  ], []);

  const calculateBMR = useCallback(() => {
    const { age, gender, weight, height, formula, bodyFat } = data;
    
    if (formula === 'katch' && bodyFat) {
      const leanMass = weight * (1 - bodyFat / 100);
      return 370 + (21.6 * leanMass);
    } else if (formula === 'harris') {
      if (gender === 'male') {
        return 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
      } else {
        return 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
      }
    } else {
      if (gender === 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5;
      } else {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161;
      }
    }
  }, [data]);

  const calculateResults = useCallback(() => {
    const bmr = calculateBMR();
    
    const workoutMultiplier = workoutIntensities.find(w => w.value === data.workoutIntensity)?.multiplier || 1.0;
    const baseTdee = bmr * data.activityLevel * workoutMultiplier;
    
    const sleepImpact = data.sleepHours < 7 ? 0.95 : data.sleepHours > 9 ? 0.98 : 1.0;
    const stressMultiplier = data.stressLevel === 'high' ? 1.05 : data.stressLevel === 'low' ? 0.98 : 1.0;
    
    const tdee = baseTdee * sleepImpact * stressMultiplier;
    
    let goalCalories = tdee;
    let weeklyWeightChange = 0;
    let calorieDeficit, calorieSurplus;
    
    if (data.goal === 'lose') {
      calorieDeficit = 500;
      goalCalories = tdee - calorieDeficit;
      weeklyWeightChange = -0.5;
    } else if (data.goal === 'gain') {
      calorieSurplus = 500;
      goalCalories = tdee + calorieSurplus;
      weeklyWeightChange = 0.5;
    }

    let proteinRatio, carbRatio, fatRatio;
    if (data.goal === 'lose') {
      proteinRatio = 0.35;
      carbRatio = 0.35;
      fatRatio = 0.30;
    } else if (data.goal === 'gain') {
      proteinRatio = 0.25;
      carbRatio = 0.50;
      fatRatio = 0.25;
    } else {
      proteinRatio = 0.25;
      carbRatio = 0.45;
      fatRatio = 0.30;
    }

    const protein = (goalCalories * proteinRatio) / 4;
    const carbs = (goalCalories * carbRatio) / 4;
    const fat = (goalCalories * fatRatio) / 9;

    const heightInMeters = data.height / 100;
    const bmi = data.weight / (heightInMeters * heightInMeters);
    const idealWeight = data.gender === 'male' ? 
      22 * heightInMeters * heightInMeters : 
      21 * heightInMeters * heightInMeters;

    const avgBMR = data.gender === 'male' ? 1800 : 1500;
    const metabolicAge = data.age + ((avgBMR - bmr) / 10);

    const baseHydration = data.weight * 0.035;
    const activityHydration = data.activityLevel > 1.5 ? 0.5 : 0;
    const hydrationNeeds = baseHydration + activityHydration;

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goalCalories: Math.round(goalCalories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      metabolicAge: Math.round(metabolicAge),
      bodyMassIndex: Math.round(bmi * 10) / 10,
      idealWeight: Math.round(idealWeight * 10) / 10,
      calorieDeficit,
      calorieSurplus,
      weeklyWeightChange,
      hydrationNeeds: Math.round(hydrationNeeds * 10) / 10,
      sleepMetabolismImpact: Math.round((sleepImpact - 1) * 100),
      stressMetabolismImpact: Math.round((stressMultiplier - 1) * 100)
    });
  }, [data, calculateBMR, workoutIntensities]);

  useEffect(() => {
    // Use requestAnimationFrame for better performance
    const timer = requestAnimationFrame(() => {
      calculateResults();
    });
    return () => cancelAnimationFrame(timer);
  }, [calculateResults]);

  const handleInputChange = useCallback((field: keyof CalculatorData, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setData({
      age: 30,
      gender: 'male',
      weight: 70,
      height: 175,
      activityLevel: 1.55,
      goal: 'maintain',
      formula: 'mifflin',
      workoutIntensity: 'moderate',
      sleepHours: 7,
      stressLevel: 'moderate',
      waterIntake: 2.5
    });
  }, []);

  const generateRecommendations = useCallback(() => {
    if (!results) return [];
    
    const recommendations = [];
    
    if (results.bodyMassIndex < 18.5) {
      recommendations.push("Consider focusing on healthy weight gain with strength training and adequate protein intake.");
    } else if (results.bodyMassIndex > 25) {
      recommendations.push("Consider a moderate calorie deficit with regular exercise and focus on whole foods.");
    }
    
    if (data.sleepHours < 7) {
      recommendations.push("Aim for 7-9 hours of quality sleep to optimize metabolism and recovery.");
    }
    
    if (data.stressLevel === 'high') {
      recommendations.push("Consider stress management techniques like meditation, yoga, or counseling to improve metabolic health.");
    }
    
    if (data.waterIntake < results.hydrationNeeds) {
      recommendations.push(`Increase water intake to ${results.hydrationNeeds}L per day for optimal hydration and metabolism.`);
    }

    if (data.goal === 'lose' && results.protein < 1.6 * data.weight) {
      recommendations.push("Consider increasing protein intake to 1.6-2.2g per kg of body weight to preserve muscle mass during weight loss.");
    }

    if (data.activityLevel < 1.375) {
      recommendations.push("Incorporate more physical activity into your daily routine for better health and increased calorie expenditure.");
    }
    
    return recommendations;
  }, [results, data]);

  const prepareExportData = useCallback((): ExportData => ({
    personalInfo: data,
    results: results!,
    timestamp: new Date().toISOString(),
    recommendations: generateRecommendations(),
    domain: 'Calculatortdee.app'
  }), [data, results, generateRecommendations]);

  const handleExport = useCallback((format: 'pdf' | 'jpg' | 'json') => {
    if (!results) return;
    
    const exportData = prepareExportData();
    
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
    
    setShowExportMenu(false);
  }, [results, prepareExportData]);

  const getBMICategory = useCallback((bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-400' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-400' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-400' };
    return { category: 'Obese', color: 'text-red-400' };
  }, []);

  const TabButton = useCallback(({ tab, label, icon: Icon }: { tab: string, label: string, icon: any }) => (
    <button
      onClick={() => setActiveTab(tab as any)}
      className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg transition-all duration-300 text-xs sm:text-sm will-change-transform ${
        activeTab === tab
          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
          : 'bg-white/10 text-gray-300 hover:bg-white/20'
      }`}
      aria-pressed={activeTab === tab}
    >
      <Icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
      <span className="font-medium hidden sm:inline">{label}</span>
      <span className="font-medium sm:hidden">{label.split(' ')[0]}</span>
    </button>
  ), [activeTab]);

  const Tooltip = useCallback(({ content, children }: { content: string, children: React.ReactNode }) => (
    <div className="relative group">
      {children}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
        {content}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  ), []);

  return (
    <section id="calculator" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Advanced AI-Powered Analysis</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">
            Professional TDEE Calculator
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Get comprehensive metabolic analysis with lifestyle factors, advanced metrics, and personalized recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Input Form */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <h3 className="text-lg sm:text-xl font-semibold text-white">Your Information</h3>
              <button
                onClick={resetForm}
                className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 text-gray-300 hover:text-white text-sm will-change-transform"
                aria-label="Reset form to default values"
              >
                <RotateCcw className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span>Reset</span>
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex space-x-1 sm:space-x-2 mb-4 sm:mb-6 p-1 bg-white/5 rounded-xl overflow-x-auto" role="tablist">
              <TabButton tab="basic" label="Basic Info" icon={CalcIcon} />
              <TabButton tab="advanced" label="Advanced" icon={TrendingUp} />
              <TabButton tab="lifestyle" label="Lifestyle" icon={Heart} />
            </div>

            <div className="space-y-4 sm:space-y-6">
              {activeTab === 'basic' && (
                <>
                  {/* Gender */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Gender</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['male', 'female'].map((gender) => (
                        <button
                          key={gender}
                          onClick={() => handleInputChange('gender', gender)}
                          className={`py-3 px-4 rounded-xl capitalize transition-all duration-300 text-sm sm:text-base will-change-transform ${
                            data.gender === gender
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105'
                          }`}
                          aria-pressed={data.gender === gender}
                        >
                          {gender}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Age */}
                  <div className="space-y-3">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-300">Age (years)</label>
                    <input
                      id="age"
                      type="number"
                      value={data.age}
                      onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      min="15"
                      max="100"
                      aria-describedby="age-help"
                    />
                    <div id="age-help" className="sr-only">Enter your age in years, between 15 and 100</div>
                  </div>

                  {/* Weight */}
                  <div className="space-y-3">
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-300">Weight (kg)</label>
                    <input
                      id="weight"
                      type="number"
                      value={data.weight}
                      onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      min="30"
                      max="300"
                      step="0.1"
                      aria-describedby="weight-help"
                    />
                    <div id="weight-help" className="sr-only">Enter your weight in kilograms</div>
                  </div>

                  {/* Height */}
                  <div className="space-y-3">
                    <label htmlFor="height" className="block text-sm font-medium text-gray-300">Height (cm)</label>
                    <input
                      id="height"
                      type="number"
                      value={data.height}
                      onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      min="120"
                      max="250"
                      aria-describedby="height-help"
                    />
                    <div id="height-help" className="sr-only">Enter your height in centimeters</div>
                  </div>

                  {/* Goal */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Primary Goal</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { value: 'lose', label: 'Lose Weight', icon: TrendingUp },
                        { value: 'maintain', label: 'Maintain', icon: Target },
                        { value: 'gain', label: 'Gain Weight', icon: Activity }
                      ].map((goal) => {
                        const Icon = goal.icon;
                        return (
                          <button
                            key={goal.value}
                            onClick={() => handleInputChange('goal', goal.value)}
                            className={`py-3 px-3 rounded-xl text-xs sm:text-sm transition-all duration-300 flex flex-col items-center space-y-1 will-change-transform ${
                              data.goal === goal.value
                                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg transform scale-105'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105'
                            }`}
                            aria-pressed={data.goal === goal.value}
                          >
                            <Icon className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                            <span>{goal.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'advanced' && (
                <>
                  {/* Body Fat */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <label htmlFor="bodyFat" className="block text-sm font-medium text-gray-300">Body Fat Percentage</label>
                      <Tooltip content="Optional but improves accuracy. Get measured at a gym or use DEXA scan.">
                        <Info className="h-4 w-4 text-gray-400 cursor-help flex-shrink-0" />
                      </Tooltip>
                    </div>
                    <input
                      id="bodyFat"
                      type="number"
                      value={data.bodyFat || ''}
                      onChange={(e) => handleInputChange('bodyFat', parseFloat(e.target.value) || undefined)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      min="5"
                      max="50"
                      step="0.1"
                      placeholder="Leave empty if unknown"
                    />
                  </div>

                  {/* Activity Level */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Activity Level</label>
                    <div className="space-y-2">
                      {activityLevels.map((level) => (
                        <button
                          key={level.value}
                          onClick={() => handleInputChange('activityLevel', level.value)}
                          className={`w-full p-3 rounded-xl text-left transition-all duration-300 will-change-transform ${
                            data.activityLevel === level.value
                              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                          aria-pressed={data.activityLevel === level.value}
                        >
                          <div className="font-medium text-sm sm:text-base">{level.label}</div>
                          <div className="text-xs opacity-80">{level.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Workout Intensity */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Workout Intensity</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {workoutIntensities.map((intensity) => (
                        <button
                          key={intensity.value}
                          onClick={() => handleInputChange('workoutIntensity', intensity.value)}
                          className={`p-3 rounded-xl text-center transition-all duration-300 will-change-transform ${
                            data.workoutIntensity === intensity.value
                              ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105'
                          }`}
                          aria-pressed={data.workoutIntensity === intensity.value}
                        >
                          <div className="font-medium text-xs sm:text-sm">{intensity.label}</div>
                          <div className="text-xs opacity-80">{intensity.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Formula */}
                  <div className="space-y-3">
                    <label htmlFor="formula" className="block text-sm font-medium text-gray-300">Calculation Formula</label>
                    <select
                      id="formula"
                      value={data.formula}
                      onChange={(e) => handleInputChange('formula', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                    >
                      <option value="mifflin" className="bg-gray-800">Mifflin-St Jeor (Recommended)</option>
                      <option value="harris" className="bg-gray-800">Harris-Benedict (Traditional)</option>
                      {data.bodyFat && (
                        <option value="katch" className="bg-gray-800">Katch-McArdle (Body Fat Required)</option>
                      )}
                    </select>
                  </div>
                </>
              )}

              {activeTab === 'lifestyle' && (
                <>
                  {/* Sleep Hours */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-300">Sleep Hours per Night</label>
                      <Tooltip content="Sleep affects metabolism. 7-9 hours is optimal for most adults.">
                        <Info className="h-4 w-4 text-gray-400 cursor-help flex-shrink-0" />
                      </Tooltip>
                    </div>
                    <input
                      id="sleepHours"
                      type="number"
                      value={data.sleepHours}
                      onChange={(e) => handleInputChange('sleepHours', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      min="4"
                      max="12"
                      step="0.5"
                    />
                  </div>

                  {/* Stress Level */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-300">Stress Level</label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        { value: 'low', label: 'Low', color: 'from-green-500 to-emerald-600' },
                        { value: 'moderate', label: 'Moderate', color: 'from-yellow-500 to-orange-600' },
                        { value: 'high', label: 'High', color: 'from-red-500 to-pink-600' }
                      ].map((stress) => (
                        <button
                          key={stress.value}
                          onClick={() => handleInputChange('stressLevel', stress.value)}
                          className={`py-3 px-3 rounded-xl text-xs sm:text-sm transition-all duration-300 will-change-transform ${
                            data.stressLevel === stress.value
                              ? `bg-gradient-to-r ${stress.color} text-white shadow-lg transform scale-105`
                              : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105'
                          }`}
                          aria-pressed={data.stressLevel === stress.value}
                        >
                          {stress.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Water Intake */}
                  <div className="space-y-3">
                    <label htmlFor="waterIntake" className="block text-sm font-medium text-gray-300">Daily Water Intake (Liters)</label>
                    <input
                      id="waterIntake"
                      type="number"
                      value={data.waterIntake}
                      onChange={(e) => handleInputChange('waterIntake', parseFloat(e.target.value) || 0)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                      min="0.5"
                      max="6"
                      step="0.1"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3">
              <h3 className="text-lg sm:text-xl font-semibold text-white">Comprehensive Analysis</h3>
              {results && (
                <div className="relative">
                  <button
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 rounded-lg transition-all duration-300 text-white shadow-lg hover:shadow-xl transform hover:scale-105 text-sm will-change-transform"
                    aria-label="Export analysis report"
                    aria-expanded={showExportMenu}
                  >
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                    <span>Export Report</span>
                  </button>
                  
                  {showExportMenu && (
                    <div className="absolute right-0 top-full mt-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-2 shadow-2xl z-50 min-w-[180px] sm:min-w-[200px]">
                      <button
                        onClick={() => handleExport('pdf')}
                        className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                        aria-label="Download PDF report"
                      >
                        <FileText className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Download PDF</span>
                      </button>
                      <button
                        onClick={() => handleExport('jpg')}
                        className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                        aria-label="Download JPG image"
                      >
                        <Image className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Download JPG</span>
                      </button>
                      <button
                        onClick={() => handleExport('json')}
                        className="w-full flex items-center space-x-3 px-3 sm:px-4 py-2 sm:py-3 text-white hover:bg-white/20 rounded-lg transition-all duration-300"
                        aria-label="Download JSON data"
                      >
                        <FileDown className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 flex-shrink-0" />
                        <span className="text-xs sm:text-sm">Download JSON</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {results ? (
              <div className="space-y-4 sm:space-y-6">
                {/* Main Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-2xl p-3 sm:p-4 hover:scale-105 transition-transform duration-300 will-change-transform">
                    <div className="flex items-center space-x-2 mb-2">
                      <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300">BMR</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-blue-400">{results.bmr}</div>
                    <div className="text-xs text-gray-400">calories/day at rest</div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-2xl p-3 sm:p-4 hover:scale-105 transition-transform duration-300 will-change-transform">
                    <div className="flex items-center space-x-2 mb-2">
                      <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-gray-300">TDEE</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-purple-400">{results.tdee}</div>
                    <div className="text-xs text-gray-400">total daily expenditure</div>
                  </div>
                </div>

                {/* Goal Calories */}
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-4 sm:p-6 hover:scale-105 transition-transform duration-300 will-change-transform">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 flex-shrink-0" />
                      <span className="text-base sm:text-lg font-semibold text-white">Daily Target</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">{results.goalCalories}</div>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-300 mb-2">
                    For {data.goal === 'lose' ? 'weight loss' : data.goal === 'gain' ? 'weight gain' : 'maintenance'}
                  </div>
                  {results.weeklyWeightChange !== 0 && (
                    <div className="text-xs sm:text-sm text-gray-400">
                      Expected: {Math.abs(results.weeklyWeightChange)}kg/week {results.weeklyWeightChange > 0 ? 'gain' : 'loss'}
                    </div>
                  )}
                </div>

                {/* Advanced Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-2xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-gray-300 mb-1">BMI</div>
                    <div className={`text-lg sm:text-xl font-bold ${getBMICategory(results.bodyMassIndex).color}`}>
                      {results.bodyMassIndex}
                    </div>
                    <div className={`text-xs ${getBMICategory(results.bodyMassIndex).color}`}>
                      {getBMICategory(results.bodyMassIndex).category}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-teal-500/20 to-cyan-600/20 border border-teal-500/30 rounded-2xl p-3 sm:p-4">
                    <div className="text-xs sm:text-sm text-gray-300 mb-1">Metabolic Age</div>
                    <div className="text-lg sm:text-xl font-bold text-teal-400">{results.metabolicAge}</div>
                    <div className="text-xs text-gray-400">years</div>
                  </div>
                </div>

                {/* Macro Breakdown */}
                <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 rounded-2xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                    <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-400 flex-shrink-0" />
                    <span>Optimized Macros</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-red-400">{results.protein}g</div>
                      <div className="text-xs sm:text-sm text-gray-300">Protein</div>
                      <div className="text-xs text-gray-400">{Math.round((results.protein * 4 / results.goalCalories) * 100)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-yellow-400">{results.carbs}g</div>
                      <div className="text-xs sm:text-sm text-gray-300">Carbs</div>
                      <div className="text-xs text-gray-400">{Math.round((results.carbs * 4 / results.goalCalories) * 100)}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-green-400">{results.fat}g</div>
                      <div className="text-xs sm:text-sm text-gray-300">Fat</div>
                      <div className="text-xs text-gray-400">{Math.round((results.fat * 9 / results.goalCalories) * 100)}%</div>
                    </div>
                  </div>
                </div>

                {/* Lifestyle Impact */}
                <div className="bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-500/30 rounded-2xl p-4 sm:p-6">
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-4">Lifestyle Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Sleep Impact</span>
                      <span className={`font-medium text-sm ${results.sleepMetabolismImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {results.sleepMetabolismImpact >= 0 ? '+' : ''}{results.sleepMetabolismImpact}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Stress Impact</span>
                      <span className={`font-medium text-sm ${results.stressMetabolismImpact >= 0 ? 'text-red-400' : 'text-green-400'}`}>
                        {results.stressMetabolismImpact >= 0 ? '+' : ''}{results.stressMetabolismImpact}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 text-sm">Hydration Needs</span>
                      <span className="text-cyan-400 font-medium text-sm">{results.hydrationNeeds}L/day</span>
                    </div>
                  </div>
                </div>

                {/* Recommendations */}
                {generateRecommendations().length > 0 && (
                  <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 rounded-2xl p-4 sm:p-6">
                    <h4 className="text-base sm:text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 flex-shrink-0" />
                      <span>Personalized Recommendations</span>
                    </h4>
                    <ul className="space-y-2">
                      {generateRecommendations().map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2 text-xs sm:text-sm text-gray-300">
                          <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-400 py-8 sm:py-12">
                <CalcIcon className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-4 sm:mb-6 opacity-50" />
                <p className="text-base sm:text-lg mb-2">Ready for Analysis</p>
                <p className="text-xs sm:text-sm">Complete your information to see comprehensive results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;