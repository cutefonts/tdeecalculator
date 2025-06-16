import React from 'react';
import { Calculator, Target, TrendingUp, Brain, Heart, Activity, Zap, Users, Shield, Clock, Award, BarChart3, Sparkles, Eye, Scale } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Multiple Calculation Methods',
      description: 'Choose from Harris-Benedict, Mifflin-St Jeor, and Katch-McArdle formulas with AI-powered accuracy optimization.',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Brain,
      title: 'AI Lifestyle Analysis',
      description: 'Advanced algorithms analyze sleep, stress, and workout intensity to provide personalized metabolic insights.',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Heart,
      title: 'Comprehensive Health Metrics',
      description: 'Track BMI, metabolic age, ideal weight, and body composition with detailed health assessments.',
      color: 'red',
      gradient: 'from-red-500 to-rose-600'
    },
    {
      icon: Target,
      title: 'Goal-Optimized Nutrition',
      description: 'Dynamic macro calculations that adapt based on your specific goals, activity level, and body composition.',
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Activity,
      title: 'Advanced Activity Assessment',
      description: 'Detailed workout intensity analysis with sport-specific multipliers and recovery considerations.',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600'
    },
    {
      icon: TrendingUp,
      title: 'Predictive Analytics',
      description: 'Forecast weight changes, metabolic adaptations, and timeline projections for your fitness goals.',
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Zap,
      title: 'Real-Time Optimization',
      description: 'Instant calculations with dynamic updates and immediate feedback as you adjust your parameters.',
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Scientific Validation',
      description: 'All calculations based on peer-reviewed research with accuracy validation and error checking.',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600'
    },
    {
      icon: Clock,
      title: 'Circadian Rhythm Analysis',
      description: 'Sleep pattern analysis with metabolic impact assessment and optimization recommendations.',
      color: 'violet',
      gradient: 'from-violet-500 to-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Reporting',
      description: 'Comprehensive PDF reports with charts, trends, and professional-grade analysis for tracking progress.',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600'
    },
    {
      icon: Award,
      title: 'Personalized Recommendations',
      description: 'AI-generated suggestions for nutrition, training, and lifestyle modifications based on your unique profile.',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Users,
      title: 'Professional Integration',
      description: 'Export and share results with trainers, nutritionists, and healthcare providers with detailed documentation.',
      color: 'slate',
      gradient: 'from-slate-500 to-gray-600'
    }
  ];

  const advancedTools = [
    {
      icon: Scale,
      title: 'Body Composition Analyzer',
      description: 'Detailed analysis of lean mass, fat mass, and muscle distribution',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      icon: Brain,
      title: 'Metabolic Flexibility Score',
      description: 'Assess your body\'s ability to switch between fuel sources efficiently',
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Clock,
      title: 'Nutrition Timing Optimizer',
      description: 'Optimize meal timing based on your workout schedule and goals',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Progress Predictor',
      description: 'AI-powered forecasting of your fitness journey and milestones',
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-blue-700 font-medium">Next-Generation Technology</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Advanced Features for
            <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Precision Results
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Our professional-grade TDEE calculator combines cutting-edge algorithms with comprehensive 
            lifestyle analysis to deliver the most accurate metabolic insights available.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div 
                key={index}
                className="group bg-white border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-blue-50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-lg hover:shadow-2xl hover:border-blue-300"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.gradient} mb-3 sm:mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}>
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Advanced Tools Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Professional Analysis Tools
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Access advanced tools that provide deeper insights into your metabolic health and optimization strategies.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advancedTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <div className={`bg-gradient-to-r ${tool.color} rounded-xl p-3 w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {tool.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Why Choose Our Professional Calculator?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Unlike basic calculators, our advanced system provides comprehensive analysis with 
              scientific accuracy and personalized insights for optimal results.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">5+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Calculation Methods</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">15+</div>
              <div className="text-gray-600 text-xs sm:text-sm">Health Metrics</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">100%</div>
              <div className="text-gray-600 text-xs sm:text-sm">Science-Based</div>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-3 sm:mb-4 mx-auto w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 sm:mb-2 group-hover:scale-110 transition-transform duration-300">95%</div>
              <div className="text-gray-600 text-xs sm:text-sm">Accuracy Rate</div>
            </div>
          </div>
        </div>

        {/* Technology Showcase */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 shadow-lg">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-2 sm:p-3 flex-shrink-0">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">AI-Powered Analysis</h3>
            </div>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Our advanced machine learning algorithms analyze thousands of data points to provide 
              personalized recommendations that adapt to your unique physiology and lifestyle.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span>Metabolic rate optimization</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full flex-shrink-0"></div>
                <span>Lifestyle factor integration</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full flex-shrink-0"></div>
                <span>Predictive health modeling</span>
              </li>
            </ul>
          </div>
          
          <div className="bg-white border border-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:shadow-xl transition-all duration-500 shadow-lg">
            <div className="flex items-center space-x-3 mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-2 sm:p-3 flex-shrink-0">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">Clinical Accuracy</h3>
            </div>
            <p className="text-gray-600 mb-3 sm:mb-4 text-sm sm:text-base">
              Validated against clinical studies and continuously updated with the latest research 
              in metabolism, nutrition science, and exercise physiology.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-500">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Peer-reviewed formulas</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full flex-shrink-0"></div>
                <span>Medical-grade precision</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                <span>Continuous validation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;