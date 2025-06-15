import React, { useState, useEffect } from 'react';
import { TrendingUp, Target, Calendar, Award, Zap, Scale, Activity, Heart } from 'lucide-react';

interface ProgressTrackerProps {
  data: any;
  results: any;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ data, results }) => {
  const [timeframe, setTimeframe] = useState('4weeks');
  const [selectedMetric, setSelectedMetric] = useState('weight');

  const timeframes = [
    { id: '2weeks', label: '2 Weeks', days: 14 },
    { id: '4weeks', label: '4 Weeks', days: 28 },
    { id: '8weeks', label: '8 Weeks', days: 56 },
    { id: '12weeks', label: '12 Weeks', days: 84 }
  ];

  const metrics = [
    { id: 'weight', label: 'Weight', icon: Scale, unit: 'kg', color: 'blue' },
    { id: 'bodyfat', label: 'Body Fat', icon: Target, unit: '%', color: 'orange' },
    { id: 'muscle', label: 'Muscle Mass', icon: Activity, unit: 'kg', color: 'green' },
    { id: 'tdee', label: 'TDEE', icon: Zap, unit: 'cal', color: 'purple' }
  ];

  const generateProjections = () => {
    const selectedTimeframe = timeframes.find(t => t.id === timeframe);
    const weeks = selectedTimeframe ? selectedTimeframe.days / 7 : 4;
    
    const projections = [];
    const currentWeight = data.weight;
    const weeklyChange = results?.weeklyWeightChange || 0;
    
    for (let week = 0; week <= weeks; week++) {
      const weightChange = weeklyChange * week;
      const newWeight = currentWeight + weightChange;
      
      // Estimate body fat changes
      let bodyFatChange = 0;
      if (data.goal === 'lose' && weeklyChange < 0) {
        bodyFatChange = week * -0.3; // Lose ~0.3% body fat per week
      } else if (data.goal === 'gain' && weeklyChange > 0) {
        bodyFatChange = week * 0.1; // Minimal fat gain with proper training
      }
      
      const currentBF = data.bodyFat || (data.gender === 'male' ? 15 : 25);
      const newBodyFat = Math.max(5, currentBF + bodyFatChange);
      
      // Estimate muscle mass changes
      const currentMuscle = currentWeight * (1 - currentBF / 100);
      let muscleChange = 0;
      if (data.goal === 'gain') {
        muscleChange = week * 0.1; // ~0.1kg muscle per week for beginners
      } else if (data.goal === 'lose') {
        muscleChange = week * -0.05; // Minimal muscle loss with proper protocol
      }
      const newMuscle = Math.max(currentMuscle * 0.8, currentMuscle + muscleChange);
      
      // Estimate TDEE changes
      const metabolicAdaptation = data.goal === 'lose' ? week * -10 : 0;
      const newTDEE = results?.tdee + metabolicAdaptation;
      
      projections.push({
        week,
        date: new Date(Date.now() + week * 7 * 24 * 60 * 60 * 1000),
        weight: Math.round(newWeight * 10) / 10,
        bodyfat: Math.round(newBodyFat * 10) / 10,
        muscle: Math.round(newMuscle * 10) / 10,
        tdee: Math.round(newTDEE)
      });
    }
    
    return projections;
  };

  const getMilestones = () => {
    const projections = generateProjections();
    const milestones = [];
    
    if (data.goal === 'lose') {
      const targetWeight = data.weight * 0.9; // 10% weight loss
      const weekToTarget = projections.findIndex(p => p.weight <= targetWeight);
      if (weekToTarget > 0) {
        milestones.push({
          week: weekToTarget,
          title: '10% Weight Loss',
          description: 'Significant health improvements',
          icon: Award,
          color: 'green'
        });
      }
    } else if (data.goal === 'gain') {
      const targetWeight = data.weight * 1.1; // 10% weight gain
      const weekToTarget = projections.findIndex(p => p.weight >= targetWeight);
      if (weekToTarget > 0) {
        milestones.push({
          week: weekToTarget,
          title: '10% Weight Gain',
          description: 'Substantial muscle building',
          icon: Award,
          color: 'blue'
        });
      }
    }
    
    // Add other milestones
    milestones.push(
      {
        week: 2,
        title: 'Habit Formation',
        description: 'Nutrition routine established',
        icon: Target,
        color: 'purple'
      },
      {
        week: 4,
        title: 'Visible Changes',
        description: 'First noticeable improvements',
        icon: TrendingUp,
        color: 'orange'
      },
      {
        week: 8,
        title: 'Metabolic Adaptation',
        description: 'Body fully adapted to new routine',
        icon: Zap,
        color: 'yellow'
      }
    );
    
    return milestones.filter(m => m.week <= (timeframes.find(t => t.id === timeframe)?.days || 28) / 7);
  };

  const getSelectedMetricData = () => {
    const projections = generateProjections();
    return projections.map(p => ({
      week: p.week,
      value: p[selectedMetric as keyof typeof p] as number
    }));
  };

  const getMetricColor = (metricId: string) => {
    const metric = metrics.find(m => m.id === metricId);
    return metric?.color || 'blue';
  };

  const calculateProgress = () => {
    const projections = generateProjections();
    const start = projections[0];
    const end = projections[projections.length - 1];
    
    const weightChange = end.weight - start.weight;
    const bodyFatChange = end.bodyfat - start.bodyfat;
    const muscleChange = end.muscle - start.muscle;
    
    return {
      weightChange: Math.round(weightChange * 10) / 10,
      bodyFatChange: Math.round(bodyFatChange * 10) / 10,
      muscleChange: Math.round(muscleChange * 10) / 10,
      tdeeChange: end.tdee - start.tdee
    };
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3">
          <TrendingUp className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Progress Projections</h3>
      </div>

      {/* Timeframe Selector */}
      <div className="flex space-x-2 mb-6">
        {timeframes.map((tf) => (
          <button
            key={tf.id}
            onClick={() => setTimeframe(tf.id)}
            className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 ${
              timeframe === tf.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-white/10 text-gray-300 hover:bg-white/20'
            }`}
          >
            {tf.label}
          </button>
        ))}
      </div>

      {/* Metric Selector */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                selectedMetric === metric.id
                  ? `bg-gradient-to-r from-${metric.color}-500 to-${metric.color}-600 text-white scale-105`
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Icon className="h-5 w-5 mx-auto mb-1" />
              <div className="text-sm font-medium">{metric.label}</div>
            </button>
          );
        })}
      </div>

      {/* Progress Chart Simulation */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">
          {metrics.find(m => m.id === selectedMetric)?.label} Projection
        </h4>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-end space-x-2 h-32">
            {getSelectedMetricData().map((point, index) => {
              const maxValue = Math.max(...getSelectedMetricData().map(p => p.value));
              const minValue = Math.min(...getSelectedMetricData().map(p => p.value));
              const range = maxValue - minValue || 1;
              const height = ((point.value - minValue) / range) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full bg-gradient-to-t from-${getMetricColor(selectedMetric)}-500 to-${getMetricColor(selectedMetric)}-400 rounded-t transition-all duration-500`}
                    style={{ height: `${Math.max(height, 10)}%` }}
                  ></div>
                  <div className="text-xs text-gray-400 mt-1">W{point.week}</div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>{getSelectedMetricData()[0]?.value} {metrics.find(m => m.id === selectedMetric)?.unit}</span>
            <span>{getSelectedMetricData()[getSelectedMetricData().length - 1]?.value} {metrics.find(m => m.id === selectedMetric)?.unit}</span>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {Object.entries(calculateProgress()).map(([key, value], index) => {
          const colors = ['blue', 'orange', 'green', 'purple'];
          const labels = ['Weight', 'Body Fat', 'Muscle', 'TDEE'];
          const units = ['kg', '%', 'kg', 'cal'];
          
          return (
            <div key={key} className={`bg-${colors[index]}-500/10 border border-${colors[index]}-500/20 rounded-xl p-3`}>
              <div className="text-xs text-gray-400 mb-1">{labels[index]} Change</div>
              <div className={`text-lg font-bold text-${colors[index]}-400`}>
                {value > 0 ? '+' : ''}{value} {units[index]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Milestones */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Key Milestones</h4>
        <div className="space-y-3">
          {getMilestones().map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <div className={`bg-${milestone.color}-500 rounded-full p-2`}>
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium text-sm">{milestone.title}</span>
                    <span className="text-gray-400 text-xs">Week {milestone.week}</span>
                  </div>
                  <p className="text-gray-400 text-xs">{milestone.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Heart className="h-4 w-4 text-yellow-400" />
          <span>Success Strategies</span>
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">Track progress weekly, not daily, to avoid fluctuation stress</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">Take progress photos and measurements for comprehensive tracking</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">Adjust calories by ±100-200 if progress stalls for 2+ weeks</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-300">Celebrate milestone achievements to maintain motivation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;