import React, { useState, useEffect } from 'react';
import { Brain, Heart, Zap, Target, TrendingUp, Activity, Scale, Clock, Thermometer, Droplets } from 'lucide-react';

interface AdvancedMetricsProps {
  data: any;
  results: any;
}

const AdvancedMetrics: React.FC<AdvancedMetricsProps> = ({ data, results }) => {
  const [activeMetric, setActiveMetric] = useState(0);

  const advancedMetrics = [
    {
      title: 'Metabolic Flexibility Score',
      value: calculateMetabolicFlexibility(data),
      unit: '/100',
      icon: Brain,
      color: 'from-purple-500 to-pink-600',
      description: 'Your body\'s ability to switch between fuel sources efficiently',
      interpretation: getMetabolicFlexibilityInterpretation(calculateMetabolicFlexibility(data))
    },
    {
      title: 'Thermal Effect of Food',
      value: Math.round(results?.tdee * 0.1) || 0,
      unit: 'cal/day',
      icon: Thermometer,
      color: 'from-orange-500 to-red-600',
      description: 'Calories burned through digestion and metabolism of food',
      interpretation: 'Represents ~10% of your total daily energy expenditure'
    },
    {
      title: 'Non-Exercise Activity',
      value: Math.round((results?.tdee - results?.bmr) * 0.3) || 0,
      unit: 'cal/day',
      icon: Activity,
      color: 'from-green-500 to-emerald-600',
      description: 'Calories burned through daily activities (NEAT)',
      interpretation: 'Fidgeting, posture maintenance, and spontaneous muscle contraction'
    },
    {
      title: 'Recovery Metabolic Rate',
      value: Math.round(results?.bmr * getRecoveryMultiplier(data)) || 0,
      unit: 'cal/day',
      icon: Heart,
      color: 'from-blue-500 to-cyan-600',
      description: 'Elevated metabolism during recovery periods',
      interpretation: 'Post-exercise oxygen consumption and tissue repair'
    },
    {
      title: 'Adaptive Thermogenesis',
      value: calculateAdaptiveThermogenesis(data),
      unit: '%',
      icon: Scale,
      color: 'from-indigo-500 to-purple-600',
      description: 'Metabolic adaptation to caloric restriction',
      interpretation: getThermogenesisInterpretation(calculateAdaptiveThermogenesis(data))
    },
    {
      title: 'Circadian Metabolic Rhythm',
      value: getCircadianScore(data),
      unit: '/100',
      icon: Clock,
      color: 'from-yellow-500 to-orange-600',
      description: 'How well your metabolism aligns with natural rhythms',
      interpretation: getCircadianInterpretation(getCircadianScore(data))
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMetric((prev) => (prev + 1) % advancedMetrics.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3">
          <Brain className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Advanced Metabolic Insights</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {advancedMetrics.map((metric, index) => {
          const Icon = metric.icon;
          const isActive = activeMetric === index;
          
          return (
            <div
              key={index}
              className={`relative p-4 rounded-xl transition-all duration-500 cursor-pointer ${
                isActive 
                  ? `bg-gradient-to-br ${metric.color} shadow-2xl scale-105 ring-2 ring-white/30` 
                  : 'bg-white/5 hover:bg-white/10 hover:scale-105'
              }`}
              onClick={() => setActiveMetric(index)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <span className={`text-sm font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>
                  {metric.title}
                </span>
              </div>
              <div className={`text-2xl font-bold ${isActive ? 'text-white' : 'text-gray-200'}`}>
                {metric.value}{metric.unit}
              </div>
              {isActive && (
                <div className="mt-3 space-y-2 animate-fadeIn">
                  <p className="text-white/90 text-xs">{metric.description}</p>
                  <p className="text-white/80 text-xs italic">{metric.interpretation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
          <Zap className="h-4 w-4 text-blue-400" />
          <span>AI Metabolic Analysis</span>
        </h4>
        <p className="text-gray-300 text-sm">
          These advanced metrics use cutting-edge research to provide deeper insights into your metabolic health. 
          Our AI analyzes patterns in your lifestyle data to predict metabolic adaptations and optimize your nutrition strategy.
        </p>
      </div>
    </div>
  );
};

// Helper functions for calculations
function calculateMetabolicFlexibility(data: any): number {
  let score = 70; // Base score
  
  // Sleep quality impact
  if (data.sleepHours >= 7 && data.sleepHours <= 9) score += 10;
  else if (data.sleepHours < 6) score -= 15;
  
  // Stress level impact
  if (data.stressLevel === 'low') score += 10;
  else if (data.stressLevel === 'high') score -= 10;
  
  // Activity level impact
  if (data.activityLevel >= 1.55) score += 10;
  else if (data.activityLevel < 1.375) score -= 5;
  
  // Workout intensity impact
  if (data.workoutIntensity === 'high' || data.workoutIntensity === 'extreme') score += 5;
  
  return Math.max(0, Math.min(100, score));
}

function getMetabolicFlexibilityInterpretation(score: number): string {
  if (score >= 85) return 'Excellent - Your body efficiently switches between fuel sources';
  if (score >= 70) return 'Good - Some room for improvement in metabolic efficiency';
  if (score >= 55) return 'Fair - Consider optimizing sleep and stress management';
  return 'Poor - Focus on lifestyle factors to improve metabolic health';
}

function getRecoveryMultiplier(data: any): number {
  let multiplier = 1.0;
  
  if (data.workoutIntensity === 'extreme') multiplier = 1.15;
  else if (data.workoutIntensity === 'high') multiplier = 1.10;
  else if (data.workoutIntensity === 'moderate') multiplier = 1.05;
  
  if (data.sleepHours < 7) multiplier *= 0.95;
  if (data.stressLevel === 'high') multiplier *= 0.98;
  
  return multiplier;
}

function calculateAdaptiveThermogenesis(data: any): number {
  if (data.goal === 'lose') {
    // Estimate metabolic adaptation for weight loss
    let adaptation = 5; // Base 5% reduction
    
    if (data.activityLevel < 1.375) adaptation += 3;
    if (data.stressLevel === 'high') adaptation += 2;
    if (data.sleepHours < 7) adaptation += 2;
    
    return Math.min(15, adaptation);
  }
  return 0;
}

function getThermogenesisInterpretation(value: number): string {
  if (value === 0) return 'No significant metabolic adaptation expected';
  if (value <= 5) return 'Minimal metabolic slowdown - easily manageable';
  if (value <= 10) return 'Moderate adaptation - consider diet breaks';
  return 'Significant adaptation - implement strategic refeeds';
}

function getCircadianScore(data: any): number {
  let score = 50; // Base score
  
  // Sleep timing and duration
  if (data.sleepHours >= 7 && data.sleepHours <= 9) score += 25;
  else if (data.sleepHours >= 6) score += 15;
  else score -= 10;
  
  // Stress impact on circadian rhythm
  if (data.stressLevel === 'low') score += 15;
  else if (data.stressLevel === 'high') score -= 15;
  
  // Activity level and timing
  if (data.activityLevel >= 1.55) score += 10;
  
  return Math.max(0, Math.min(100, score));
}

function getCircadianInterpretation(score: number): string {
  if (score >= 80) return 'Excellent circadian alignment - optimal metabolic timing';
  if (score >= 60) return 'Good rhythm - minor optimizations possible';
  if (score >= 40) return 'Moderate misalignment - focus on sleep consistency';
  return 'Poor alignment - prioritize sleep hygiene and light exposure';
}

export default AdvancedMetrics;