import React from 'react';
import { Shield, Eye, Lock, Database, Users, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Personal Information',
          items: [
            'Basic demographic data (age, gender, height, weight)',
            'Health and fitness metrics (body fat percentage, activity level)',
            'Lifestyle information (sleep patterns, stress levels)',
            'Goal preferences and dietary requirements'
          ]
        },
        {
          subtitle: 'Usage Data',
          items: [
            'Calculator usage patterns and preferences',
            'Feature interactions and user behavior',
            'Device information and browser type',
            'IP address and general location data'
          ]
        },
        {
          subtitle: 'Optional Data',
          items: [
            'Email address for report delivery',
            'Account creation information',
            'Feedback and support communications',
            'Newsletter subscription preferences'
          ]
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Primary Uses',
          items: [
            'Calculate accurate TDEE and metabolic metrics',
            'Provide personalized nutrition recommendations',
            'Generate comprehensive health reports',
            'Improve algorithm accuracy and performance'
          ]
        },
        {
          subtitle: 'Secondary Uses',
          items: [
            'Analyze usage patterns to enhance user experience',
            'Conduct research for product improvements',
            'Provide customer support and technical assistance',
            'Send important updates and notifications'
          ]
        }
      ]
    },
    {
      title: 'Data Protection & Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Security Measures',
          items: [
            'End-to-end encryption for all data transmission',
            'Secure cloud storage with enterprise-grade protection',
            'Regular security audits and vulnerability assessments',
            'Multi-factor authentication for administrative access'
          ]
        },
        {
          subtitle: 'Data Minimization',
          items: [
            'We collect only necessary information for calculations',
            'Personal data is anonymized whenever possible',
            'Automatic deletion of temporary calculation data',
            'Regular purging of inactive user data'
          ]
        }
      ]
    },
    {
      title: 'Your Rights & Controls',
      icon: Users,
      content: [
        {
          subtitle: 'Access Rights',
          items: [
            'View all personal data we have collected',
            'Download your data in a portable format',
            'Request corrections to inaccurate information',
            'Obtain details about our data processing activities'
          ]
        },
        {
          subtitle: 'Control Options',
          items: [
            'Delete your account and all associated data',
            'Opt-out of non-essential data collection',
            'Manage communication preferences',
            'Withdraw consent for data processing'
          ]
        }
      ]
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'Privacy considerations are built into every feature from the ground up.'
    },
    {
      icon: Lock,
      title: 'Data Minimization',
      description: 'We collect only the minimum data necessary to provide our services.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'Clear communication about what data we collect and how we use it.'
    },
    {
      icon: CheckCircle,
      title: 'User Control',
      description: 'You maintain full control over your personal information at all times.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Your Privacy Matters</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Privacy Policy
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            We are committed to protecting your privacy and ensuring the security of your personal information. 
            This policy explains how we collect, use, and safeguard your data.
          </p>
          
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 backdrop-blur-xl">
            <div className="flex items-center justify-center space-x-2 text-yellow-300">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Our Privacy Principles</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These core principles guide how we handle your personal information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                  <p className="text-gray-300 text-sm">{principle.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                </div>
                
                <div className="space-y-6">
                  {section.content.map((subsection, subIndex) => (
                    <div key={subIndex}>
                      <h3 className="text-lg font-semibold text-blue-300 mb-3">{subsection.subtitle}</h3>
                      <ul className="space-y-2">
                        {subsection.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start space-x-3 text-gray-300">
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Data Retention */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Data Retention</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-300 mb-3">Retention Periods</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Calculation data: Immediately after processing</li>
                  <li>• Usage analytics: 24 months maximum</li>
                  <li>• Account data: Until account deletion</li>
                  <li>• Support communications: 3 years</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-orange-300 mb-3">Automatic Deletion</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>• Inactive accounts after 2 years</li>
                  <li>• Temporary files after 24 hours</li>
                  <li>• Error logs after 30 days</li>
                  <li>• Backup data after 90 days</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Third-Party Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6">Third-Party Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Analytics</h3>
                <p className="text-gray-300 text-sm mb-4">
                  We use privacy-focused analytics to understand how users interact with our calculator.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• No personal identification</li>
                  <li>• Aggregated data only</li>
                  <li>• GDPR compliant</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-purple-300 mb-3">Cloud Infrastructure</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Our services are hosted on secure, enterprise-grade cloud infrastructure.
                </p>
                <ul className="space-y-1 text-gray-400 text-xs">
                  <li>• SOC 2 Type II certified</li>
                  <li>• ISO 27001 compliant</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About Your Privacy?</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              If you have any questions about this privacy policy or how we handle your data, 
              please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Privacy Team
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-xl">
                Download Your Data
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;