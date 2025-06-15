import React, { useState } from 'react';
import { Clock, Sunrise, Sun, Sunset, Moon, Zap, Target, Activity } from 'lucide-react';

interface NutritionTimingProps {
  data: any;
  results: any;
}

const NutritionTiming: React.FC<NutritionTimingProps> = ({ data, results }) => {
  const [selectedDay, setSelectedDay] = useState('workout');

  const getMealTiming = () => {
    const totalCalories = results?.goalCalories || 2000;
    const protein = results?.protein || 150;
    const carbs = results?.carbs || 200;
    const fat = results?.fat || 70;

    if (selectedDay === 'workout') {
      return [
        {
          time: '6:00 AM',
          meal: 'Pre-Workout',
          icon: Sunrise,
          calories: Math.round(totalCalories * 0.15),
          protein: Math.round(protein * 0.15),
          carbs: Math.round(carbs * 0.25),
          fat: Math.round(fat * 0.05),
          color: 'from-yellow-500 to-orange-600',
          focus: 'Quick energy and muscle protection',
          foods: ['Banana', 'Coffee', 'Small protein shake']
        },
        {
          time: '8:00 AM',
          meal: 'Post-Workout',
          icon: Zap,
          calories: Math.round(totalCalories * 0.25),
          protein: Math.round(protein * 0.35),
          carbs: Math.round(carbs * 0.35),
          fat: Math.round(fat * 0.10),
          color: 'from-green-500 to-emerald-600',
          focus: 'Muscle recovery and glycogen replenishment',
          foods: ['Protein shake', 'Oats', 'Berries', 'Greek yogurt']
        },
        {
          time: '12:00 PM',
          meal: 'Lunch',
          icon: Sun,
          calories: Math.round(totalCalories * 0.30),
          protein: Math.round(protein * 0.25),
          carbs: Math.round(carbs * 0.25),
          fat: Math.round(fat * 0.35),
          color: 'from-blue-500 to-cyan-600',
          focus: 'Sustained energy and satiety',
          foods: ['Lean meat', 'Rice/quinoa', 'Vegetables', 'Avocado']
        },
        {
          time: '3:00 PM',
          meal: 'Snack',
          icon: Target,
          calories: Math.round(totalCalories * 0.10),
          protein: Math.round(protein * 0.10),
          carbs: Math.round(carbs * 0.10),
          fat: Math.round(fat * 0.15),
          color: 'from-purple-500 to-pink-600',
          focus: 'Maintain energy levels',
          foods: ['Nuts', 'Apple', 'Protein bar']
        },
        {
          time: '7:00 PM',
          meal: 'Dinner',
          icon: Sunset,
          calories: Math.round(totalCalories * 0.20),
          protein: Math.round(protein * 0.15),
          carbs: Math.round(carbs * 0.05),
          fat: Math.round(fat * 0.35),
          color: 'from-indigo-500 to-purple-600',
          focus: 'Recovery and overnight muscle synthesis',
          foods: ['Fish/chicken', 'Vegetables', 'Sweet potato', 'Olive oil']
        }
      ];
    } else {
      return [
        {
          time: '7:00 AM',
          meal: 'Breakfast',
          icon: Sunrise,
          calories: Math.round(totalCalories * 0.25),
          protein: Math.round(protein * 0.25),
          carbs: Math.round(carbs * 0.30),
          fat: Math.round(fat * 0.25),
          color: 'from-yellow-500 to-orange-600',
          focus: 'Kickstart metabolism',
          foods: ['Eggs', 'Oatmeal', 'Berries', 'Nuts']
        },
        {
          time: '12:00 PM',
          meal: 'Lunch',
          icon: Sun,
          calories: Math.round(totalCalories * 0.35),
          protein: Math.round(protein * 0.35),
          carbs: Math.round(carbs * 0.35),
          fat: Math.round(fat * 0.30),
          color: 'from-blue-500 to-cyan-600',
          focus: 'Peak energy and productivity',
          foods: ['Lean protein', 'Complex carbs', 'Vegetables', 'Healthy fats']
        },
        {
          time: '3:00 PM',
          meal: 'Snack',
          icon: Target,
          calories: Math.round(totalCalories * 0.15),
          protein: Math.round(protein * 0.15),
          carbs: Math.round(carbs * 0.15),
          fat: Math.round(fat * 0.20),
          color: 'from-purple-500 to-pink-600',
          focus: 'Sustained afternoon energy',
          foods: ['Greek yogurt', 'Nuts', 'Fruit']
        },
        {
          time: '7:00 PM',
          meal: 'Dinner',
          icon: Sunset,
          calories: Math.round(totalCalories * 0.25),
          protein: Math.round(protein * 0.25),
          carbs: Math.round(carbs * 0.20),
          fat: Math.round(fat * 0.25),
          color: 'from-indigo-500 to-purple-600',
          focus: 'Recovery and satiety',
          foods: ['Protein', 'Vegetables', 'Moderate carbs', 'Healthy fats']
        }
      ];
    }
  };

  const getHydrationSchedule = () => {
    const totalWater = results?.hydrationNeeds || 2.5;
    const perHour = totalWater / 16; // Spread over 16 waking hours
    
    return [
      { time: '6:00 AM', amount: Math.round(perHour * 2 * 100) / 100, note: 'Rehydrate after sleep' },
      { time: '8:00 AM', amount: Math.round(perHour * 1.5 * 100) / 100, note: 'Pre/post workout' },
      { time: '10:00 AM', amount: Math.round(perHour * 100) / 100, note: 'Steady intake' },
      { time: '12:00 PM', amount: Math.round(perHour * 1.2 * 100) / 100, note: 'With lunch' },
      { time: '2:00 PM', amount: Math.round(perHour * 100) / 100, note: 'Afternoon boost' },
      { time: '4:00 PM', amount: Math.round(perHour * 100) / 100, note: 'Pre-dinner' },
      { time: '6:00 PM', amount: Math.round(perHour * 1.2 * 100) / 100, note: 'With dinner' },
      { time: '8:00 PM', amount: Math.round(perHour * 0.8 * 100) / 100, note: 'Wind down' }
    ];
  };

  const getSupplementTiming = () => {
    const supplements = [];
    
    if (data.goal === 'lose') {
      supplements.push(
        { name: 'L-Carnitine', time: 'Pre-workout', benefit: 'Enhanced fat oxidation' },
        { name: 'Green Tea Extract', time: 'Between meals', benefit: 'Metabolic boost' },
        { name: 'Omega-3', time: 'With dinner', benefit: 'Anti-inflammatory' }
      );
    } else if (data.goal === 'gain') {
      supplements.push(
        { name: 'Creatine', time: 'Post-workout', benefit: 'Muscle growth & strength' },
        { name: 'Whey Protein', time: 'Post-workout', benefit: 'Muscle protein synthesis' },
        { name: 'Vitamin D3', time: 'With breakfast', benefit: 'Hormone optimization' }
      );
    }
    
    // Universal supplements
    supplements.push(
      { name: 'Magnesium', time: 'Before bed', benefit: 'Sleep quality & recovery' },
      { name: 'Multivitamin', time: 'With breakfast', benefit: 'Micronutrient insurance' }
    );
    
    return supplements;
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3">
          <Clock className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Precision Nutrition Timing</h3>
      </div>

      {/* Day Type Selector */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setSelectedDay('workout')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedDay === 'workout'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Activity className="h-4 w-4 inline mr-2" />
          Workout Day
        </button>
        <button
          onClick={() => setSelectedDay('rest')}
          className={`px-4 py-2 rounded-lg transition-all duration-300 ${
            selectedDay === 'rest'
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
              : 'bg-white/10 text-gray-300 hover:bg-white/20'
          }`}
        >
          <Moon className="h-4 w-4 inline mr-2" />
          Rest Day
        </button>
      </div>

      {/* Meal Timeline */}
      <div className="mb-8">
        <h4 className="text-white font-semibold mb-4">Optimized Meal Schedule</h4>
        <div className="space-y-4">
          {getMealTiming().map((meal, index) => {
            const Icon = meal.icon;
            return (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < getMealTiming().length - 1 && (
                  <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-white/30 to-transparent"></div>
                )}
                
                <div className="flex items-start space-x-4">
                  <div className={`bg-gradient-to-r ${meal.color} rounded-full p-3 flex-shrink-0`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  
                  <div className="flex-1 bg-white/5 rounded-xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="text-white font-semibold">{meal.meal}</h5>
                        <p className="text-gray-400 text-sm">{meal.time}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-bold">{meal.calories} cal</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-red-400 font-semibold">{meal.protein}g</div>
                        <div className="text-xs text-gray-400">Protein</div>
                      </div>
                      <div className="text-center">
                        <div className="text-yellow-400 font-semibold">{meal.carbs}g</div>
                        <div className="text-xs text-gray-400">Carbs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-green-400 font-semibold">{meal.fat}g</div>
                        <div className="text-xs text-gray-400">Fat</div>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 text-sm mb-2">{meal.focus}</p>
                    <div className="flex flex-wrap gap-1">
                      {meal.foods.map((food, foodIndex) => (
                        <span key={foodIndex} className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                          {food}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Hydration Schedule */}
      <div className="mb-8">
        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
          <span>Hydration Timeline</span>
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {getHydrationSchedule().map((hydration, index) => (
            <div key={index} className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
              <div className="text-blue-400 font-semibold text-sm">{hydration.time}</div>
              <div className="text-white font-bold">{hydration.amount}L</div>
              <div className="text-gray-400 text-xs">{hydration.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Supplement Timing */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-3">Strategic Supplement Timing</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {getSupplementTiming().map((supplement, index) => (
            <div key={index} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between items-start mb-1">
                <span className="text-white font-medium text-sm">{supplement.name}</span>
                <span className="text-purple-400 text-xs">{supplement.time}</span>
              </div>
              <p className="text-gray-400 text-xs">{supplement.benefit}</p>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-xs mt-3">
          * Consult with healthcare professionals before starting any supplement regimen
        </p>
      </div>
    </div>
  );
};

export default NutritionTiming;