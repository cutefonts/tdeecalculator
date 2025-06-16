import React, { useState, useEffect } from 'react';
import { Calculator, Target, TrendingUp, Brain, Heart, Activity, Zap, Scale, Clock, Droplets, Thermometer, Award, BarChart3, Eye, Download } from 'lucide-react';

interface AdvancedToolsProps {
  data: any;
  results: any;
}

const AdvancedTools: React.FC<AdvancedToolsProps> = ({ data, results }) => {
  const [activeTab, setActiveTab] = useState('metabolic');
  const [selectedTool, setSelectedTool] = useState('flexibility');

  const tools = {
    metabolic: [
      {
        id: 'flexibility',
        name: 'Metabolic Flexibility Score',
        icon: Brain,
        description: 'Assess your body\'s ability to switch between fuel sources',
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'efficiency',
        name: 'Metabolic Efficiency',
        icon: Zap,
        description: 'Compare your metabolism to population averages',
        color: 'from-indigo-500 to-indigo-600'
      },
      {
        id: 'adaptation',
        name: 'Adaptive Thermogenesis',
        icon: Thermometer,
        description: 'Predict metabolic slowdown during dieting',
        color: 'from-purple-500 to-purple-600'
      }
    ],
    body: [
      {
        id: 'composition',
        name: 'Body Composition Analyzer',
        icon: Scale,
        description: 'Detailed body fat and muscle mass analysis',
        color: 'from-blue-600 to-cyan-500'
      },
      {
        id: 'hydration',
        name: 'Hydration Calculator',
        icon: Droplets,
        description: 'Personalized daily water intake recommendations',
        color: 'from-cyan-500 to-blue-500'
      },
      {
        id: 'recovery',
        name: 'Recovery Metrics',
        icon: Heart,
        description: 'Sleep and stress impact on metabolism',
        color: 'from-blue-500 to-indigo-500'
      }
    ],
    nutrition: [
      {
        id: 'timing',
        name: 'Meal Timing Optimizer',
        icon: Clock,
        description: 'Optimize nutrient timing for your goals',
        color: 'from-indigo-500 to-purple-500'
      },
      {
        id: 'cycling',
        name: 'Carb Cycling Planner',
        icon: TrendingUp,
        description: 'Strategic carbohydrate periodization',
        color: 'from-purple-500 to-pink-500'
      },
      {
        id: 'supplements',
        name: 'Supplement Stack',
        icon: Award,
        description: 'Personalized supplement recommendations',
        color: 'from-pink-500 to-red-500'
      }
    ],
    tracking: [
      {
        id: 'progress',
        name: 'Progress Predictor',
        icon: BarChart3,
        description: 'AI-powered progress forecasting',
        color: 'from-blue-500 to-teal-500'
      },
      {
        id: 'biomarkers',
        name: 'Health Biomarkers',
        icon: Activity,
        description: 'Track key health indicators',
        color: 'from-teal-500 to-green-500'
      },
      {
        id: 'comparison',
        name: 'Peer Comparison',
        icon: Eye,
        description: 'Compare with similar demographics',
        color: 'from-green-500 to-blue-500'
      }
    ]
  };

  const calculateMetabolicFlexibility = () => {
    let score = 70;
    if (data.sleepHours >= 7) score += 15;
    if (data.stressLevel === 'low') score += 10;
    if (data.activityLevel >= 1.55) score += 10;
    if (data.workoutIntensity === 'high' || data.workoutIntensity === 'extreme') score += 5;
    return Math.min(100, score);
  };

  const calculateMetabolicEfficiency = () => {
    const expectedBMR = data.gender === 'male' ? 1800 : 1400;
    return Math.round((results?.bmr / expectedBMR) * 100);
  };

  const calculateAdaptiveThermogenesis = () => {
    if (data.goal === 'lose') {
      let adaptation = 5;
      if (data.activityLevel < 1.375) adaptation += 3;
      if (data.stressLevel === 'high') adaptation += 2;
      if (data.sleepHours < 7) adaptation += 2;
      return Math.min(15, adaptation);
    }
    return 0;
  };

  const calculateHydrationNeeds = () => {
    const baseNeeds = data.weight * 0.035;
    const activityBonus = (results?.tdee - results?.bmr) * 0.0012;
    return Math.round((baseNeeds + activityBonus) * 10) / 10;
  };

  const generateMealTiming = () => {
    const totalCalories = results?.goalCalories || 2000;
    
    if (data.workoutIntensity === 'high' || data.workoutIntensity === 'extreme') {
      return [
        { time: '6:00 AM', meal: 'Pre-Workout', calories: Math.round(totalCalories * 0.15), focus: 'Quick energy' },
        { time: '8:00 AM', meal: 'Post-Workout', calories: Math.round(totalCalories * 0.25), focus: 'Recovery' },
        { time: '12:00 PM', meal: 'Lunch', calories: Math.round(totalCalories * 0.30), focus: 'Sustained energy' },
        { time: '3:00 PM', meal: 'Snack', calories: Math.round(totalCalories * 0.10), focus: 'Energy maintenance' },
        { time: '7:00 PM', meal: 'Dinner', calories: Math.round(totalCalories * 0.20), focus: 'Recovery & repair' }
      ];
    } else {
      return [
        { time: '7:00 AM', meal: 'Breakfast', calories: Math.round(totalCalories * 0.25), focus: 'Metabolism kickstart' },
        { time: '12:00 PM', meal: 'Lunch', calories: Math.round(totalCalories * 0.35), focus: 'Peak energy' },
        { time: '3:00 PM', meal: 'Snack', calories: Math.round(totalCalories * 0.15), focus: 'Afternoon fuel' },
        { time: '7:00 PM', meal: 'Dinner', calories: Math.round(totalCalories * 0.25), focus: 'Evening satisfaction' }
      ];
    }
  };

  const generateCarbCycling = () => {
    const totalCarbs = results?.carbs || 200;
    
    return {
      highDays: {
        carbs: Math.round(totalCarbs * 1.3),
        days: ['Monday', 'Wednesday', 'Friday'],
        purpose: 'Training days - fuel performance'
      },
      moderateDays: {
        carbs: totalCarbs,
        days: ['Tuesday', 'Thursday'],
        purpose: 'Light activity days'
      },
      lowDays: {
        carbs: Math.round(totalCarbs * 0.5),
        days: ['Saturday', 'Sunday'],
        purpose: 'Rest days - enhance fat burning'
      }
    };
  };

  const generateSupplementStack = () => {
    const supplements = [];
    
    // Universal supplements
    supplements.push(
      { name: 'Vitamin D3', dosage: '2000-4000 IU', timing: 'Morning', priority: 'Essential' },
      { name: 'Omega-3', dosage: '1-2g EPA/DHA', timing: 'With meals', priority: 'Essential' },
      { name: 'Magnesium', dosage: '200-400mg', timing: 'Evening', priority: 'Important' }
    );
    
    // Goal-specific
    if (data.goal === 'lose') {
      supplements.push(
        { name: 'Green Tea Extract', dosage: '400-500mg', timing: 'Between meals', priority: 'Beneficial' },
        { name: 'L-Carnitine', dosage: '2-3g', timing: 'Pre-workout', priority: 'Beneficial' }
      );
    } else if (data.goal === 'gain') {
      supplements.push(
        { name: 'Creatine', dosage: '5g', timing: 'Post-workout', priority: 'Important' },
        { name: 'Whey Protein', dosage: '25-30g', timing: 'Post-workout', priority: 'Important' }
      );
    }
    
    // Activity-specific
    if (data.activityLevel >= 1.55) {
      supplements.push(
        { name: 'Beta-Alanine', dosage: '3-5g', timing: 'Pre-workout', priority: 'Beneficial' },
        { name: 'Citrulline', dosage: '6-8g', timing: 'Pre-workout', priority: 'Beneficial' }
      );
    }
    
    return supplements;
  };

  const renderToolContent = () => {
    switch (selectedTool) {
      case 'flexibility':
        const flexScore = calculateMetabolicFlexibility();
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="50" 
                    fill="none" 
                    stroke="url(#flexGradient)" 
                    strokeWidth="8"
                    strokeDasharray={`${flexScore * 3.14} 314`}
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="flexGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">{flexScore}</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Metabolic Flexibility Score</h3>
              <p className="text-gray-600">
                {flexScore >= 85 ? 'Excellent - Your body efficiently switches between fuel sources' :
                 flexScore >= 70 ? 'Good - Some room for improvement in metabolic efficiency' :
                 flexScore >= 55 ? 'Fair - Consider optimizing sleep and stress management' :
                 'Poor - Focus on lifestyle factors to improve metabolic health'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Improvement Factors</h4>
                <ul className="space-y-2 text-sm text-blue-700">
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${data.sleepHours >= 7 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Sleep Quality: {data.sleepHours}h/night</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${data.stressLevel === 'low' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Stress Level: {data.stressLevel}</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${data.activityLevel >= 1.55 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>Activity Level: {data.activityLevel >= 1.55 ? 'Active' : 'Sedentary'}</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-200">
                <h4 className="font-semibold text-indigo-800 mb-2">Recommendations</h4>
                <ul className="space-y-2 text-sm text-indigo-700">
                  {data.sleepHours < 7 && <li>• Aim for 7-9 hours of quality sleep</li>}
                  {data.stressLevel === 'high' && <li>• Practice stress management techniques</li>}
                  {data.activityLevel < 1.55 && <li>• Increase daily physical activity</li>}
                  <li>• Consider intermittent fasting</li>
                  <li>• Include both cardio and resistance training</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'composition':
        const leanMass = data.bodyFat ? Math.round(data.weight * (1 - data.bodyFat / 100)) : Math.round(data.weight * 0.85);
        const fatMass = data.weight - leanMass;
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <Scale className="h-6 w-6" />
                  <span className="font-semibold">Total Weight</span>
                </div>
                <div className="text-3xl font-bold">{data.weight} kg</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <Activity className="h-6 w-6" />
                  <span className="font-semibold">Lean Mass</span>
                </div>
                <div className="text-3xl font-bold">{leanMass} kg</div>
                <div className="text-sm opacity-90">{Math.round((leanMass / data.weight) * 100)}%</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-3">
                  <Target className="h-6 w-6" />
                  <span className="font-semibold">Fat Mass</span>
                </div>
                <div className="text-3xl font-bold">{fatMass} kg</div>
                <div className="text-sm opacity-90">{data.bodyFat || Math.round((fatMass / data.weight) * 100)}%</div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-4">Body Composition Analysis</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Lean Mass</span>
                    <span>{Math.round((leanMass / data.weight) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(leanMass / data.weight) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Fat Mass</span>
                    <span>{Math.round((fatMass / data.weight) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(fatMass / data.weight) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'timing':
        const mealPlan = generateMealTiming();
        
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Optimized Meal Schedule</h4>
              <div className="space-y-4">
                {mealPlan.map((meal, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-blue-100">
                    <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-semibold">
                      {meal.time.split(':')[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800">{meal.meal}</div>
                      <div className="text-sm text-gray-600">{meal.time}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-blue-600">{meal.calories} cal</div>
                      <div className="text-xs text-gray-500">{meal.focus}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'cycling':
        const carbPlan = generateCarbCycling();
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">High Carb Days</h4>
                <div className="text-2xl font-bold mb-2">{carbPlan.highDays.carbs}g</div>
                <div className="text-sm opacity-90 mb-3">{carbPlan.highDays.purpose}</div>
                <div className="space-y-1">
                  {carbPlan.highDays.days.map((day, index) => (
                    <div key={index} className="text-xs bg-white/20 rounded px-2 py-1 inline-block mr-1">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">Moderate Carb Days</h4>
                <div className="text-2xl font-bold mb-2">{carbPlan.moderateDays.carbs}g</div>
                <div className="text-sm opacity-90 mb-3">{carbPlan.moderateDays.purpose}</div>
                <div className="space-y-1">
                  {carbPlan.moderateDays.days.map((day, index) => (
                    <div key={index} className="text-xs bg-white/20 rounded px-2 py-1 inline-block mr-1">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                <h4 className="font-semibold mb-2">Low Carb Days</h4>
                <div className="text-2xl font-bold mb-2">{carbPlan.lowDays.carbs}g</div>
                <div className="text-sm opacity-90 mb-3">{carbPlan.lowDays.purpose}</div>
                <div className="space-y-1">
                  {carbPlan.lowDays.days.map((day, index) => (
                    <div key={index} className="text-xs bg-white/20 rounded px-2 py-1 inline-block mr-1">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-3">Implementation Tips</h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Start with moderate cycling (20% variance) before extreme approaches</li>
                <li>• Time high-carb days with your most intense training sessions</li>
                <li>• Maintain consistent protein and fat intake across all days</li>
                <li>• Monitor energy levels and adjust as needed</li>
                <li>• Consider a 2-week adaptation period before evaluating results</li>
              </ul>
            </div>
          </div>
        );

      case 'supplements':
        const supplementStack = generateSupplementStack();
        
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {supplementStack.map((supplement, index) => (
                <div key={index} className={`p-4 rounded-xl border-2 ${
                  supplement.priority === 'Essential' ? 'bg-red-50 border-red-200' :
                  supplement.priority === 'Important' ? 'bg-orange-50 border-orange-200' :
                  'bg-blue-50 border-blue-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          supplement.priority === 'Essential' ? 'bg-red-500 text-white' :
                          supplement.priority === 'Important' ? 'bg-orange-500 text-white' :
                          'bg-blue-500 text-white'
                        }`}>
                          {supplement.priority}
                        </div>
                        <h4 className="font-semibold text-gray-800">{supplement.name}</h4>
                      </div>
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Dosage:</span> {supplement.dosage} | 
                        <span className="font-medium"> Timing:</span> {supplement.timing}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3">Important Notes</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Consult with healthcare professionals before starting any supplement regimen</li>
                <li>• Start with essential supplements and gradually add others</li>
                <li>• Quality matters - choose third-party tested products</li>
                <li>• Monitor for any adverse reactions or interactions</li>
                <li>• Supplements complement, not replace, a balanced diet</li>
              </ul>
            </div>
          </div>
        );

      default:
        return <div>Select a tool to view details</div>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <div className="flex items-center space-x-3">
          <div className="bg-white/20 rounded-xl p-3">
            <Calculator className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Advanced Analysis Tools</h3>
            <p className="text-blue-100">Professional-grade metabolic insights and optimization tools</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
          {Object.entries(tools).map(([category, categoryTools]) => (
            <button
              key={category}
              onClick={() => {
                setActiveTab(category);
                setSelectedTool(categoryTools[0].id);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === category
                  ? 'bg-white text-blue-600 shadow-md'
                  : 'text-gray-600 hover:text-blue-600'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tool Selection */}
          <div className="lg:col-span-1">
            <h4 className="font-semibold text-gray-800 mb-4">Available Tools</h4>
            <div className="space-y-2">
              {tools[activeTab as keyof typeof tools].map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                      selectedTool === tool.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`bg-gradient-to-r ${tool.color} rounded-lg p-2`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{tool.name}</div>
                        <div className="text-xs text-gray-600 mt-1">{tool.description}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tool Content */}
          <div className="lg:col-span-3">
            <div className="bg-gray-50 rounded-xl p-6 min-h-[400px]">
              {renderToolContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedTools;