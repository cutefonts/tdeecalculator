import React, { useState } from 'react';
import { Scale, Target, TrendingUp, Activity, Eye, Info } from 'lucide-react';

interface BodyCompositionProps {
  data: any;
  results: any;
}

const BodyCompositionAnalyzer: React.FC<BodyCompositionProps> = ({ data, results }) => {
  const [selectedMethod, setSelectedMethod] = useState('visual');

  const bodyFatMethods = [
    {
      id: 'visual',
      name: 'Visual Estimation',
      accuracy: '±3-5%',
      description: 'Compare with reference images'
    },
    {
      id: 'measurements',
      name: 'Body Measurements',
      accuracy: '±2-4%',
      description: 'Navy method using circumferences'
    },
    {
      id: 'bioelectrical',
      name: 'BIA Scale',
      accuracy: '±3-5%',
      description: 'Bioelectrical impedance analysis'
    },
    {
      id: 'dexa',
      name: 'DEXA Scan',
      accuracy: '±1-2%',
      description: 'Gold standard measurement'
    }
  ];

  const getBodyFatRanges = (gender: string) => {
    if (gender === 'male') {
      return [
        { range: '3-5%', category: 'Essential Fat', color: 'bg-red-500', description: 'Minimum for survival' },
        { range: '6-13%', category: 'Athletic', color: 'bg-blue-500', description: 'Very lean, visible abs' },
        { range: '14-17%', category: 'Fitness', color: 'bg-green-500', description: 'Lean, some ab definition' },
        { range: '18-24%', category: 'Average', color: 'bg-yellow-500', description: 'Typical for men' },
        { range: '25%+', category: 'Obese', color: 'bg-red-600', description: 'Health risks increase' }
      ];
    } else {
      return [
        { range: '10-13%', category: 'Essential Fat', color: 'bg-red-500', description: 'Minimum for survival' },
        { range: '14-20%', category: 'Athletic', color: 'bg-blue-500', description: 'Very lean, athletic' },
        { range: '21-24%', category: 'Fitness', color: 'bg-green-500', description: 'Lean, toned appearance' },
        { range: '25-31%', category: 'Average', color: 'bg-yellow-500', description: 'Typical for women' },
        { range: '32%+', category: 'Obese', color: 'bg-red-600', description: 'Health risks increase' }
      ];
    }
  };

  const calculateLeanMass = () => {
    if (data.bodyFat) {
      return Math.round(data.weight * (1 - data.bodyFat / 100));
    }
    // Estimate based on gender and activity level
    const estimatedBF = data.gender === 'male' ? 15 : 25;
    return Math.round(data.weight * (1 - estimatedBF / 100));
  };

  const calculateFatMass = () => {
    if (data.bodyFat) {
      return Math.round(data.weight * (data.bodyFat / 100));
    }
    const estimatedBF = data.gender === 'male' ? 15 : 25;
    return Math.round(data.weight * (estimatedBF / 100));
  };

  const getBodyFatCategory = () => {
    const ranges = getBodyFatRanges(data.gender);
    const bf = data.bodyFat || (data.gender === 'male' ? 15 : 25);
    
    if (data.gender === 'male') {
      if (bf <= 5) return ranges[0];
      if (bf <= 13) return ranges[1];
      if (bf <= 17) return ranges[2];
      if (bf <= 24) return ranges[3];
      return ranges[4];
    } else {
      if (bf <= 13) return ranges[0];
      if (bf <= 20) return ranges[1];
      if (bf <= 24) return ranges[2];
      if (bf <= 31) return ranges[3];
      return ranges[4];
    }
  };

  const calculateMuscleMassIndex = () => {
    const leanMass = calculateLeanMass();
    const heightM = data.height / 100;
    return Math.round((leanMass / (heightM * heightM)) * 10) / 10;
  };

  const getIdealBodyFat = () => {
    if (data.goal === 'lose') {
      return data.gender === 'male' ? '10-15%' : '16-24%';
    } else if (data.goal === 'gain') {
      return data.gender === 'male' ? '12-18%' : '18-28%';
    }
    return data.gender === 'male' ? '10-18%' : '16-28%';
  };

  return (
    <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 sm:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-3">
          <Scale className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Body Composition Analysis</h3>
      </div>

      {/* Current Composition */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Scale className="h-4 w-4 text-blue-400" />
            <span className="text-sm text-gray-300">Total Weight</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">{data.weight} kg</div>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Activity className="h-4 w-4 text-green-400" />
            <span className="text-sm text-gray-300">Lean Mass</span>
          </div>
          <div className="text-2xl font-bold text-green-400">{calculateLeanMass()} kg</div>
          <div className="text-xs text-gray-400">MMI: {calculateMuscleMassIndex()}</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="h-4 w-4 text-orange-400" />
            <span className="text-sm text-gray-300">Fat Mass</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">{calculateFatMass()} kg</div>
          <div className="text-xs text-gray-400">
            {data.bodyFat ? `${data.bodyFat}%` : 'Estimated'}
          </div>
        </div>
      </div>

      {/* Body Fat Category */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Body Fat Category</h4>
        <div className="bg-white/5 rounded-xl p-4">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-4 h-4 rounded-full ${getBodyFatCategory().color}`}></div>
            <span className="text-white font-medium">{getBodyFatCategory().category}</span>
            <span className="text-gray-400 text-sm">({getBodyFatCategory().range})</span>
          </div>
          <p className="text-gray-300 text-sm">{getBodyFatCategory().description}</p>
        </div>
      </div>

      {/* Body Fat Ranges Chart */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Body Fat Ranges ({data.gender})</h4>
        <div className="space-y-2">
          {getBodyFatRanges(data.gender).map((range, index) => (
            <div key={index} className="flex items-center space-x-3 p-2 rounded-lg bg-white/5">
              <div className={`w-3 h-3 rounded-full ${range.color}`}></div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm font-medium">{range.category}</span>
                  <span className="text-gray-400 text-sm">{range.range}</span>
                </div>
                <p className="text-gray-400 text-xs">{range.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Measurement Methods */}
      <div className="mb-6">
        <h4 className="text-white font-semibold mb-3">Body Fat Measurement Methods</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {bodyFatMethods.map((method) => (
            <div
              key={method.id}
              className={`p-3 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedMethod === method.id
                  ? 'bg-blue-500/20 border-blue-500/50'
                  : 'bg-white/5 border-white/10 hover:bg-white/10'
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <div className="flex justify-between items-start mb-1">
                <span className="text-white text-sm font-medium">{method.name}</span>
                <span className="text-blue-400 text-xs">{method.accuracy}</span>
              </div>
              <p className="text-gray-400 text-xs">{method.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-4">
        <h4 className="text-white font-semibold mb-3 flex items-center space-x-2">
          <Target className="h-4 w-4 text-purple-400" />
          <span>Composition Goals</span>
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-300">Ideal Body Fat Range:</span>
            <span className="text-purple-400 font-medium">{getIdealBodyFat()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-300">Target Lean Mass:</span>
            <span className="text-purple-400 font-medium">
              {Math.round(data.weight * 0.85)} - {Math.round(data.weight * 0.90)} kg
            </span>
          </div>
          <p className="text-gray-400 text-xs mt-3">
            Focus on preserving lean mass while achieving your body composition goals through 
            proper nutrition timing and resistance training.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BodyCompositionAnalyzer;