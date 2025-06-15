import React, { useState } from 'react';
import { Trophy, Star, Zap, Target, Brain, Shield, Award, CheckCircle, X } from 'lucide-react';

const CompetitorComparison: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState('accuracy');

  const features = [
    {
      id: 'accuracy',
      name: 'Calculation Accuracy',
      icon: Target,
      description: 'Precision of metabolic calculations'
    },
    {
      id: 'features',
      name: 'Advanced Features',
      icon: Zap,
      description: 'Comprehensive analysis tools'
    },
    {
      id: 'ai',
      name: 'AI Integration',
      icon: Brain,
      description: 'Machine learning insights'
    },
    {
      id: 'personalization',
      name: 'Personalization',
      icon: Star,
      description: 'Tailored recommendations'
    },
    {
      id: 'reporting',
      name: 'Professional Reports',
      icon: Award,
      description: 'Export and sharing capabilities'
    }
  ];

  const competitors = [
    {
      name: 'TDEE Pro (Us)',
      logo: '🏆',
      features: {
        accuracy: { score: 95, details: '5+ formulas, lifestyle factors, AI optimization' },
        features: { score: 98, details: 'Body composition, nutrition timing, progress tracking' },
        ai: { score: 95, details: 'Advanced ML algorithms, predictive analytics' },
        personalization: { score: 92, details: 'Goal-based optimization, experience level adaptation' },
        reporting: { score: 90, details: 'PDF, JPG, JSON exports with professional design' }
      },
      pricing: 'Free',
      highlight: true
    },
    {
      name: 'MyFitnessPal',
      logo: '📱',
      features: {
        accuracy: { score: 70, details: 'Basic calculations, limited lifestyle factors' },
        features: { score: 60, details: 'Food tracking focus, basic TDEE' },
        ai: { score: 40, details: 'Limited AI features' },
        personalization: { score: 65, details: 'Basic goal setting' },
        reporting: { score: 50, details: 'Basic food logs only' }
      },
      pricing: '$19.99/month'
    },
    {
      name: 'Cronometer',
      logo: '📊',
      features: {
        accuracy: { score: 75, details: 'Good nutrient tracking, basic TDEE' },
        features: { score: 70, details: 'Detailed nutrition analysis' },
        ai: { score: 30, details: 'No AI features' },
        personalization: { score: 60, details: 'Limited customization' },
        reporting: { score: 65, details: 'Nutrition reports only' }
      },
      pricing: '$9.99/month'
    },
    {
      name: 'Lose It!',
      logo: '⚖️',
      features: {
        accuracy: { score: 65, details: 'Basic TDEE calculations' },
        features: { score: 55, details: 'Weight loss focused' },
        ai: { score: 35, details: 'Basic recommendations' },
        personalization: { score: 55, details: 'Simple goal tracking' },
        reporting: { score: 45, details: 'Weight charts only' }
      },
      pricing: '$39.99/year'
    },
    {
      name: 'Fitbit Premium',
      logo: '⌚',
      features: {
        accuracy: { score: 68, details: 'Device-based estimates' },
        features: { score: 65, details: 'Activity tracking focus' },
        ai: { score: 45, details: 'Basic insights' },
        personalization: { score: 70, details: 'Activity-based recommendations' },
        reporting: { score: 60, details: 'Fitness reports' }
      },
      pricing: '$9.99/month'
    }
  ];

  const uniqueFeatures = [
    {
      title: 'AI-Powered Metabolic Flexibility Analysis',
      description: 'Advanced algorithms analyze your body\'s ability to switch between fuel sources',
      icon: Brain,
      exclusive: true
    },
    {
      title: 'Precision Nutrition Timing',
      description: 'Meal timing optimization based on circadian rhythms and workout schedule',
      icon: Target,
      exclusive: true
    },
    {
      title: 'Adaptive Thermogenesis Prediction',
      description: 'Predict and prevent metabolic slowdown during weight loss phases',
      icon: Zap,
      exclusive: true
    },
    {
      title: 'Body Composition Trajectory Modeling',
      description: 'AI-powered predictions of body composition changes over time',
      icon: Trophy,
      exclusive: true
    },
    {
      title: 'Professional-Grade Reporting',
      description: 'Export comprehensive reports in multiple formats for healthcare providers',
      icon: Award,
      exclusive: false
    },
    {
      title: 'Real-Time Metabolic Insights',
      description: 'Dynamic recommendations that adapt as your body changes',
      icon: Star,
      exclusive: true
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 75) return 'text-yellow-400';
    if (score >= 60) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreBar = (score: number, highlight: boolean = false) => (
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div
        className={`h-2 rounded-full transition-all duration-500 ${
          highlight 
            ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
            : score >= 90 
              ? 'bg-green-500' 
              : score >= 75 
                ? 'bg-yellow-500' 
                : score >= 60 
                  ? 'bg-orange-500' 
                  : 'bg-red-500'
        }`}
        style={{ width: `${score}%` }}
      ></div>
    </div>
  );

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-8">
            <Trophy className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-yellow-300 font-medium">Industry Comparison</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6">
            Why TDEE Pro Leads the Market
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            See how our advanced AI-powered calculator compares to other popular fitness apps and tools
          </p>
        </div>

        {/* Feature Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => setSelectedFeature(feature.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  selectedFeature === feature.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium">{feature.name}</span>
              </button>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-12 overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-6 gap-4 mb-6">
              <div className="text-white font-semibold">Platform</div>
              <div className="text-white font-semibold">Score</div>
              <div className="text-white font-semibold">Progress</div>
              <div className="text-white font-semibold">Details</div>
              <div className="text-white font-semibold">Pricing</div>
              <div className="text-white font-semibold">Value</div>
            </div>
            
            {competitors.map((competitor, index) => {
              const feature = competitor.features[selectedFeature as keyof typeof competitor.features];
              return (
                <div
                  key={index}
                  className={`grid grid-cols-6 gap-4 py-4 border-t border-white/10 ${
                    competitor.highlight ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg px-4' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{competitor.logo}</span>
                    <div>
                      <div className={`font-semibold ${competitor.highlight ? 'text-blue-300' : 'text-white'}`}>
                        {competitor.name}
                      </div>
                      {competitor.highlight && (
                        <div className="text-xs text-blue-400">⭐ Recommended</div>
                      )}
                    </div>
                  </div>
                  
                  <div className={`text-2xl font-bold ${getScoreColor(feature.score)}`}>
                    {feature.score}%
                  </div>
                  
                  <div className="flex items-center">
                    {getScoreBar(feature.score, competitor.highlight)}
                  </div>
                  
                  <div className="text-gray-300 text-sm">
                    {feature.details}
                  </div>
                  
                  <div className={`font-semibold ${competitor.highlight ? 'text-green-400' : 'text-gray-300'}`}>
                    {competitor.pricing}
                  </div>
                  
                  <div className="flex items-center">
                    {competitor.highlight ? (
                      <div className="flex items-center space-x-1 text-green-400">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-semibold">Best</span>
                      </div>
                    ) : (
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(feature.score / 20) ? 'text-yellow-400 fill-current' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Unique Features */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Exclusive Features You Won't Find Anywhere Else
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uniqueFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 hover:scale-105 transition-all duration-300">
                  <div className="flex items-start space-x-3 mb-4">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-2">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {feature.exclusive && (
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-600 text-black text-xs font-bold px-2 py-1 rounded-full">
                        EXCLUSIVE
                      </div>
                    )}
                  </div>
                  <h4 className="text-white font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Comparison Matrix */}
        <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-12">
          <h3 className="text-xl font-bold text-white mb-6 text-center">Complete Feature Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left text-white font-semibold py-3">Feature</th>
                  <th className="text-center text-blue-300 font-semibold py-3">TDEE Pro</th>
                  <th className="text-center text-gray-300 font-semibold py-3">MyFitnessPal</th>
                  <th className="text-center text-gray-300 font-semibold py-3">Cronometer</th>
                  <th className="text-center text-gray-300 font-semibold py-3">Others</th>
                </tr>
              </thead>
              <tbody>
                {[
                  'Multiple TDEE Formulas',
                  'AI-Powered Analysis',
                  'Body Composition Tracking',
                  'Nutrition Timing',
                  'Progress Projections',
                  'Metabolic Flexibility Score',
                  'Professional Reports',
                  'Lifestyle Factor Integration',
                  'Adaptive Recommendations',
                  'Free to Use'
                ].map((feature, index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="text-gray-300 py-3">{feature}</td>
                    <td className="text-center py-3">
                      <CheckCircle className="h-5 w-5 text-green-400 mx-auto" />
                    </td>
                    <td className="text-center py-3">
                      {index < 3 ? (
                        <CheckCircle className="h-5 w-5 text-yellow-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3">
                      {index < 2 ? (
                        <CheckCircle className="h-5 w-5 text-yellow-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-3">
                      {index < 1 ? (
                        <CheckCircle className="h-5 w-5 text-yellow-400 mx-auto" />
                      ) : (
                        <X className="h-5 w-5 text-red-400 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">
            Experience the Most Advanced TDEE Calculator
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have discovered the power of AI-driven metabolic analysis. 
            Get started with our professional-grade calculator today - completely free.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                const element = document.getElementById('calculator');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Try TDEE Pro Now
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300">
              View All Features
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompetitorComparison;