import React, { useState, useEffect } from 'react';
import { Calculator, Target, TrendingUp, Zap, Brain, Activity, Heart, CheckCircle, Info } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('how-it-works');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % 4);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      icon: Calculator,
      title: 'Input Your Data',
      description: 'Enter comprehensive information including basic metrics, body composition, and lifestyle factors for maximum accuracy.',
      details: [
        'Basic metrics: age, gender, weight, height',
        'Optional body fat percentage for precision',
        'Activity level and workout intensity',
        'Sleep patterns and stress levels'
      ],
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced algorithms analyze your data using multiple scientific formulas and lifestyle optimization factors.',
      details: [
        'Multiple calculation methods comparison',
        'Lifestyle factor integration',
        'Metabolic efficiency assessment',
        'Personalization algorithms'
      ],
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Target,
      title: 'Goal Optimization',
      description: 'Receive personalized calorie targets and macro distributions optimized for your specific fitness goals.',
      details: [
        'Goal-specific calorie recommendations',
        'Optimized macro ratios',
        'Timeline projections',
        'Progress tracking metrics'
      ],
      color: 'green',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'Comprehensive Results',
      description: 'Get detailed analysis including BMR, TDEE, health metrics, and personalized recommendations for optimal results.',
      details: [
        'Complete metabolic analysis',
        'Health and wellness insights',
        'Actionable recommendations',
        'Professional-grade reporting'
      ],
      color: 'orange',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  const scientificBasis = [
    {
      title: 'Basal Metabolic Rate (BMR)',
      description: 'The number of calories your body needs at rest to maintain basic physiological functions like breathing, circulation, and cellular repair.',
      formula: 'Multiple validated formulas including Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle',
      icon: Heart
    },
    {
      title: 'Activity Factor Multiplier',
      description: 'Accounts for your daily physical activity, exercise routine, and non-exercise activity thermogenesis (NEAT).',
      formula: 'Ranges from 1.2 (sedentary) to 1.9 (extremely active) with precision adjustments',
      icon: Activity
    },
    {
      title: 'Lifestyle Integration',
      description: 'Advanced factors including sleep quality, stress levels, and workout intensity that significantly impact metabolism.',
      formula: 'AI-powered analysis of lifestyle factors with metabolic impact coefficients',
      icon: Brain
    }
  ];

  const accuracyTips = [
    {
      icon: '🎯',
      title: 'Be Honest About Activity',
      description: 'Overestimating activity level is the #1 cause of inaccurate results. Choose conservatively.'
    },
    {
      icon: '📏',
      title: 'Include Body Fat if Known',
      description: 'Body fat percentage enables the most accurate Katch-McArdle formula calculation.'
    },
    {
      icon: '💤',
      title: 'Consider Sleep Quality',
      description: 'Poor sleep can reduce metabolism by 5-8%. Include your actual sleep patterns.'
    },
    {
      icon: '🧘',
      title: 'Account for Stress',
      description: 'Chronic stress affects metabolism. High stress can increase caloric needs by 5-10%.'
    },
    {
      icon: '🔄',
      title: 'Regular Updates',
      description: 'Recalculate every 2-4 weeks or when body weight changes by 3+ pounds.'
    },
    {
      icon: '📊',
      title: 'Track Real Results',
      description: 'Use calculations as starting points and adjust based on actual progress over 2-3 weeks.'
    }
  ];

  const scrollToCalculator = () => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-purple-900/30 to-blue-900/50"></div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Scientific Process</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            How Our Advanced Calculator Works
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Get accurate TDEE calculations through our scientifically-backed, AI-enhanced process 
            that considers comprehensive lifestyle factors for unprecedented precision.
          </p>
        </div>

        {/* Interactive Steps - Fixed Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === index;
            
            return (
              <div 
                key={index} 
                className={`relative transition-all duration-500 transform ${
                  isActive ? 'scale-105 -translate-y-2' : 'hover:scale-105'
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-2 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center h-full transition-all duration-500 flex flex-col ${
                  isActive ? 'border-white/30 shadow-2xl' : 'border-white/10 hover:border-white/20'
                }`}>
                  {/* Step Number - Properly Positioned */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full text-sm sm:text-base font-bold transition-all duration-500 ${
                      isActive ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg` : 'bg-white/10 text-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Icon - Centered and Properly Sized */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 mx-auto transition-all duration-500 ${
                    isActive ? `bg-gradient-to-r ${step.gradient} shadow-lg` : 'bg-white/10'
                  }`}>
                    <Icon className={`h-8 w-8 sm:h-10 sm:w-10 transition-colors duration-500 ${
                      isActive ? 'text-white' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  {/* Title - Properly Aligned */}
                  <h3 className={`text-lg sm:text-xl font-semibold mb-3 sm:mb-4 transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-gray-300'
                  }`}>
                    {step.title}
                  </h3>
                  
                  {/* Description - Properly Aligned */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 transition-colors duration-500 flex-grow ${
                    isActive ? 'text-gray-200' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>

                  {/* Details - Only show when active */}
                  {isActive && (
                    <div className="space-y-2 animate-fadeIn">
                      {step.details.map((detail, detailIndex) => (
                        <div key={detailIndex} className="flex items-start space-x-2 text-xs text-gray-300">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-left">{detail}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Scientific Foundation */}
        <div className="mb-16 sm:mb-20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8 sm:mb-12">Scientific Foundation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {scientificBasis.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mb-4 sm:mb-6 flex items-center justify-center">
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">{item.title}</h4>
                  <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base">{item.description}</p>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                    <p className="text-blue-300 text-xs sm:text-sm font-medium">{item.formula}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Accuracy Tips */}
        <div className="bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10 border border-yellow-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 mb-12 sm:mb-16">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full px-3 sm:px-4 py-1 sm:py-2 mb-3 sm:mb-4">
              <Info className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-yellow-300 font-medium">Pro Tips</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Maximize Accuracy</h3>
            <p className="text-gray-300 max-w-2xl mx-auto text-sm sm:text-base px-4">
              Follow these expert recommendations to get the most precise TDEE calculations and better results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {accuracyTips.map((tip, index) => (
              <div key={index} className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{tip.icon}</div>
                <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{tip.title}</h4>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl sm:rounded-3xl p-8 sm:p-12 backdrop-blur-xl">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">Ready to Get Started?</h3>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Experience the most advanced TDEE calculator available and discover your personalized nutrition strategy.
          </p>
          <button
            onClick={scrollToCalculator}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2 mx-auto text-sm sm:text-base"
          >
            <Calculator className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span>Start Your Analysis</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;