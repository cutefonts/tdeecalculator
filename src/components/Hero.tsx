import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Calculator, TrendingUp, Target, Zap, ArrowRight, Play, Star, Users, Award, Sparkles, Brain, Heart } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const stats = useMemo(() => [
    { number: '50K+', label: 'Active Users', icon: Users, color: 'from-blue-500 to-blue-600' },
    { number: '95%', label: 'Accuracy Rate', icon: Target, color: 'from-green-500 to-green-600' },
    { number: '4.9★', label: 'User Rating', icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { number: '15+', label: 'Health Metrics', icon: Award, color: 'from-purple-500 to-purple-600' }
  ], []);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsVisible(true);
    });
    
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [stats.length]);

  const scrollToCalculator = useCallback(() => {
    const element = document.getElementById('calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const scrollToFeatures = useCallback(() => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section id="hero" className="pt-20 pb-16 sm:pb-24 lg:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-white/50 to-indigo-100/30"></div>
      <div 
        className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl opacity-60" 
        style={{ 
          animation: 'pulse 4s ease-in-out infinite',
          transform: 'translate3d(0, 0, 0)'
        }}
      ></div>
      <div 
        className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-500/10 rounded-full blur-3xl opacity-60" 
        style={{ 
          animation: 'pulse 4s ease-in-out infinite 1s',
          transform: 'translate3d(0, 0, 0)'
        }}
      ></div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center">
          {/* Badge */}
          <div className={`mb-6 sm:mb-8 transform transition-all duration-700 will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 backdrop-blur-xl">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 flex-shrink-0" />
              </div>
              <span className="text-xs sm:text-sm text-blue-700 font-medium">AI-Powered Professional Calculator</span>
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                NEW
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <div className={`mb-6 sm:mb-8 transform transition-all duration-700 delay-150 will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Calculate Your Perfect
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Daily Calories
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Discover your Total Daily Energy Expenditure with our AI-powered calculator. Get personalized 
              macro recommendations, lifestyle analysis, and achieve your fitness goals with scientific precision.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16 px-4 transform transition-all duration-700 delay-300 will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <button
              onClick={scrollToCalculator}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center space-x-2 will-change-transform"
              aria-label="Start free TDEE analysis"
            >
              <Calculator className="h-4 w-4 flex-shrink-0" />
              <span>Start Free Analysis</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300 flex-shrink-0" />
            </button>
            <button
              onClick={scrollToFeatures}
              className="group w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 backdrop-blur-xl flex items-center justify-center space-x-2"
              aria-label="View calculator features"
            >
              <Play className="h-4 w-4 flex-shrink-0" />
              <span>See Features</span>
            </button>
          </div>

          {/* Enhanced Animated Stats */}
          <div className={`mb-12 sm:mb-16 px-4 transform transition-all duration-700 delay-450 will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/80 backdrop-blur-2xl border border-gray-200 rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  const isActive = currentStat === index;
                  
                  return (
                    <div
                      key={index}
                      className={`relative flex flex-col items-center space-y-3 sm:space-y-4 p-4 sm:p-6 rounded-2xl transition-all duration-500 transform will-change-transform ${
                        isActive 
                          ? `scale-110 bg-gradient-to-br ${stat.color} shadow-2xl ring-2 ring-white/40` 
                          : 'scale-95 bg-gray-50 hover:bg-gray-100 hover:scale-105'
                      }`}
                      style={{ transform: 'translate3d(0, 0, 0)' }}
                    >
                      <div className={`relative p-1.5 sm:p-2 rounded-lg transition-all duration-500 ${
                        isActive 
                          ? 'bg-white/20 shadow-2xl ring-2 ring-white/50' 
                          : 'bg-white/60 hover:bg-white/80'
                      }`}>
                        {isActive && (
                          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-lg blur-lg opacity-60 -z-10 animate-pulse`}></div>
                        )}
                        
                        <Icon 
                          className={`h-3 w-3 sm:h-4 sm:w-4 transition-all duration-500 ${
                            isActive ? 'text-white scale-110' : 'text-gray-600 hover:text-gray-800'
                          }`}
                          style={{
                            filter: isActive 
                              ? 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.8)) brightness(1.3)' 
                              : 'drop-shadow(0 0 6px rgba(0, 0, 0, 0.1)) brightness(1.1)',
                            strokeWidth: '2.5px'
                          }}
                        />
                      </div>
                      
                      <div className={`text-xl sm:text-2xl lg:text-3xl font-bold transition-all duration-500 ${
                        isActive ? 'text-white scale-110' : 'text-gray-800'
                      }`}
                      style={{
                        textShadow: isActive 
                          ? '0 0 20px rgba(255, 255, 255, 0.6), 0 2px 4px rgba(0, 0, 0, 0.3)' 
                          : '0 2px 4px rgba(0, 0, 0, 0.1)'
                      }}>
                        {stat.number}
                      </div>
                      
                      <div className={`text-xs sm:text-sm font-medium text-center transition-all duration-500 ${
                        isActive ? 'text-white/95' : 'text-gray-600'
                      }`}
                      style={{
                        textShadow: isActive 
                          ? '0 1px 3px rgba(0, 0, 0, 0.3)' 
                          : '0 1px 2px rgba(0, 0, 0, 0.1)'
                      }}>
                        {stat.label}
                      </div>
                      
                      {isActive && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"
                               style={{ boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)' }}></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-center mt-6 space-x-2">
                {stats.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-500 ${
                      currentStat === index 
                        ? 'bg-blue-600 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 transform transition-all duration-700 delay-600 will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 sm:p-8 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 will-change-transform shadow-lg hover:shadow-2xl">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors duration-300">
                5+ Calculation Methods
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Choose from Harris-Benedict, Mifflin-St Jeor, Katch-McArdle, and advanced AI-optimized formulas
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 sm:p-8 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 will-change-transform shadow-lg hover:shadow-2xl">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                AI-Powered Personalization
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Advanced algorithms analyze lifestyle factors for personalized recommendations and goal optimization
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-6 sm:p-8 hover:bg-white/90 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 md:col-span-1 md:mx-auto md:max-w-sm lg:max-w-none lg:mx-0 will-change-transform shadow-lg hover:shadow-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-3 sm:p-4 w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3 group-hover:text-green-600 transition-colors duration-300">
                Comprehensive Analytics
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                Track 15+ health metrics including metabolic age, BMI, hydration needs, and lifestyle impact analysis
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-12 sm:mt-16 px-4 transform transition-all duration-700 delay-750 will-change-transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-500 text-sm mb-4">Trusted by fitness professionals and health enthusiasts worldwide</p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 opacity-60">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Award className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-500 text-sm">Clinically Validated</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <Star className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-500 text-sm">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Users className="h-3 w-3 text-white" />
                </div>
                <span className="text-gray-500 text-sm">50K+ Users</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;