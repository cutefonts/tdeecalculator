import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Lightbulb, AlertTriangle, CheckCircle2 } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: HelpCircle,
      color: 'from-blue-500 to-cyan-600',
      faqs: [
        {
          question: 'What is TDEE and why is it important?',
          answer: 'TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, including your basal metabolic rate, physical activity, and the thermic effect of food. It\'s crucial for weight management because it tells you exactly how many calories you need to maintain, lose, or gain weight. Our advanced calculator considers lifestyle factors like sleep, stress, and workout intensity for unprecedented accuracy.'
        },
        {
          question: 'How accurate are these calculations?',
          answer: 'Our calculations are based on scientifically proven formulas and are accurate within 5-10% for most people when all lifestyle factors are included. Our AI-powered analysis improves accuracy by considering sleep patterns, stress levels, and workout intensity - factors that traditional calculators ignore. Individual variations in metabolism, genetics, and other factors can affect accuracy, so use results as a starting point and adjust based on real-world results.'
        }
      ]
    },
    {
      title: 'Advanced Features',
      icon: Lightbulb,
      color: 'from-purple-500 to-pink-600',
      faqs: [
        {
          question: 'Which calculation formula should I choose?',
          answer: 'The Mifflin-St Jeor equation is generally the most accurate for most people and is our default recommendation. Use Harris-Benedict if you prefer the traditional method. Choose Katch-McArdle if you know your body fat percentage, as it\'s most accurate for lean individuals and athletes. Our AI optimization can further enhance accuracy by analyzing your lifestyle factors.'
        },
        {
          question: 'How does lifestyle analysis improve accuracy?',
          answer: 'Our advanced system analyzes sleep quality (7-9 hours optimal), stress levels (high stress can increase metabolism by 5-10%), workout intensity, and hydration needs. Poor sleep can reduce metabolism by 5%, while high stress increases it. These factors are often overlooked but significantly impact your actual caloric needs, making our calculator up to 15% more accurate than basic versions.'
        },
        {
          question: 'What does metabolic age mean and how is it calculated?',
          answer: 'Metabolic age compares your BMR to the average BMR of people in different age groups. A lower metabolic age suggests a more efficient metabolism. We calculate it by comparing your BMR to population averages, then factor in lifestyle elements like sleep quality, stress levels, and activity patterns. It\'s an indicator of overall metabolic health and can guide optimization strategies.'
        }
      ]
    },
    {
      title: 'Usage & Optimization',
      icon: CheckCircle2,
      color: 'from-green-500 to-emerald-600',
      faqs: [
        {
          question: 'How often should I recalculate my TDEE?',
          answer: 'Recalculate your TDEE every 2-4 weeks or whenever you experience significant changes in weight (3+ pounds), activity level, sleep patterns, or stress levels. As you lose or gain weight, your metabolic needs change. Our system tracks these changes and can predict when recalculation is needed for optimal accuracy.'
        },
        {
          question: 'How do I choose the right activity level and workout intensity?',
          answer: 'Be honest and conservative. Activity level includes planned exercise only, not daily activities. Workout intensity considers the type and difficulty of your training. Low intensity: walking, light yoga. Moderate: jogging, weight training. High: HIIT, heavy lifting. Extreme: professional athlete level. Most people overestimate both, which leads to overeating.'
        },
        {
          question: 'Are the macro recommendations suitable for everyone?',
          answer: 'Our macro recommendations adapt based on your goal: weight loss (35% protein, 35% carbs, 30% fat), maintenance (25% protein, 45% carbs, 30% fat), or muscle gain (25% protein, 50% carbs, 25% fat). These are evidence-based starting points. Athletes, people with medical conditions, or those following specific diets may need adjustments. Our AI provides personalized recommendations based on your profile.'
        }
      ]
    },
    {
      title: 'Health & Safety',
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-600',
      faqs: [
        {
          question: 'What if I have a medical condition?',
          answer: 'If you have thyroid disorders, diabetes, PCOS, or other medical conditions that affect metabolism, consult with your healthcare provider before using these calculations. Some conditions can significantly impact your metabolic rate by 10-40%. Our calculator includes warnings and recommendations for when to seek professional medical advice.'
        },
        {
          question: 'Can I use this calculator if I\'m pregnant or breastfeeding?',
          answer: 'This calculator is not designed for pregnant or breastfeeding women, as their caloric needs are significantly different and highly individual. Pregnancy increases caloric needs by 300-500 calories in later trimesters, while breastfeeding can increase needs by 500-700 calories. Please consult with your healthcare provider or a registered dietitian for appropriate recommendations during these periods.'
        },
        {
          question: 'How do sleep and stress affect my metabolism?',
          answer: 'Sleep and stress have profound effects on metabolism. Poor sleep (less than 7 hours) can reduce metabolic rate by 5-8% and increase hunger hormones. High stress elevates cortisol, which can increase metabolism by 5-10% short-term but may lead to metabolic dysfunction long-term. Our calculator factors these into your TDEE for more accurate results and provides recommendations for optimization.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const globalIndex = categoryIndex * 100 + faqIndex;
    setOpenIndex(openIndex === globalIndex ? null : globalIndex);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-pink-900/20"></div>
      <div className="absolute top-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <HelpCircle className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
            <span className="text-xs sm:text-sm text-purple-300 font-medium">Expert Knowledge Base</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Everything you need to know about advanced TDEE calculations, lifestyle factors, 
            and how to optimize your metabolic health for better results.
          </p>
        </div>

        <div className="space-y-6 sm:space-y-8">
          {faqCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
                <div className="flex items-center space-x-3 mb-4 sm:mb-6">
                  <div className={`bg-gradient-to-r ${category.color} rounded-xl sm:rounded-2xl p-2 sm:p-3`}>
                    <CategoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 100 + faqIndex;
                    const isOpen = openIndex === globalIndex;
                    
                    return (
                      <div 
                        key={faqIndex}
                        className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-300"
                      >
                        <button
                          onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                          className="w-full px-4 sm:px-6 py-4 sm:py-5 text-left flex justify-between items-center group"
                        >
                          <h4 className="text-base sm:text-lg font-semibold text-white pr-4 group-hover:text-blue-300 transition-colors duration-300">
                            {faq.question}
                          </h4>
                          <ChevronDown 
                            className={`h-5 w-5 sm:h-6 sm:w-6 text-gray-400 transition-all duration-300 flex-shrink-0 group-hover:text-blue-400 ${
                              isOpen ? 'transform rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        {isOpen && (
                          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                            <div className="border-t border-white/10 pt-3 sm:pt-4">
                              <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Section */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-blue-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center backdrop-blur-xl">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Still Have Questions?</h3>
            <p className="text-gray-300 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base px-4">
              Can't find the answer you're looking for? Our TDEE calculator is designed to be comprehensive, 
              but individual needs can vary significantly. Get personalized support from our team of nutrition 
              and fitness experts.
            </p>
            <div className="flex justify-center">
              <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl sm:rounded-2xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 text-sm sm:text-base">
                Contact Expert Support
              </button>
            </div>
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { icon: '💡', title: 'Pro Tip', text: 'Track your results for 2-3 weeks and adjust calories by ±100-200 based on actual progress.' },
            { icon: '⚡', title: 'Quick Start', text: 'Begin with our recommended settings and fine-tune based on your body\'s response.' },
            { icon: '🎯', title: 'Accuracy', text: 'Include body fat percentage and lifestyle factors for the most precise calculations.' },
            { icon: '📊', title: 'Tracking', text: 'Export your results and monitor changes in metabolic health over time.' }
          ].map((tip, index) => (
            <div key={index} className="bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-lg border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center hover:bg-white/10 transition-all duration-300">
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{tip.icon}</div>
              <h4 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{tip.title}</h4>
              <p className="text-gray-400 text-xs sm:text-sm">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;