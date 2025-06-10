import React from 'react';
import { FileText, Scale, Shield, AlertTriangle, CheckCircle, Users, Gavel, Info } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const lastUpdated = 'December 15, 2024';

  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: `By accessing and using the TDEE Pro Calculator ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. These terms apply to all visitors, users, and others who access or use the service.`
    },
    {
      title: 'Description of Service',
      icon: Info,
      content: `TDEE Pro provides an advanced Total Daily Energy Expenditure calculator that uses scientific formulas and AI-powered analysis to estimate caloric needs and provide nutritional recommendations. Our service includes metabolic analysis, macro calculations, lifestyle factor integration, and comprehensive health reporting.`
    },
    {
      title: 'User Responsibilities',
      icon: Users,
      content: `Users are responsible for providing accurate information for calculations. You must be at least 13 years old to use this service. You agree not to use the service for any unlawful purpose or in any way that could damage, disable, or impair the service. You are responsible for maintaining the confidentiality of any account information.`
    },
    {
      title: 'Medical Disclaimer',
      icon: AlertTriangle,
      content: `This service provides estimates based on scientific formulas and should not replace professional medical advice. The calculations are for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.`
    },
    {
      title: 'Intellectual Property',
      icon: Shield,
      content: `The service and its original content, features, and functionality are and will remain the exclusive property of TDEE Pro and its licensors. The service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.`
    },
    {
      title: 'Limitation of Liability',
      icon: Scale,
      content: `In no event shall TDEE Pro, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the service.`
    }
  ];

  const prohibitedUses = [
    'Using the service for any unlawful purpose or to solicit others to perform unlawful acts',
    'Violating any international, federal, provincial, or state regulations, rules, laws, or local ordinances',
    'Infringing upon or violating our intellectual property rights or the intellectual property rights of others',
    'Harassing, abusing, insulting, harming, defaming, slandering, disparaging, intimidating, or discriminating',
    'Submitting false or misleading information',
    'Uploading or transmitting viruses or any other type of malicious code',
    'Collecting or tracking the personal information of others',
    'Spamming, phishing, pharming, pretext, spider, crawl, or scrape',
    'Using the service for any obscene or immoral purpose',
    'Interfering with or circumventing the security features of the service'
  ];

  const userRights = [
    'Access to all free features of the calculator',
    'Accurate calculations based on provided information',
    'Privacy protection as outlined in our Privacy Policy',
    'Customer support for technical issues',
    'The right to delete your account and data at any time',
    'Notification of any material changes to these terms'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Legal Agreement</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Terms of Service
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
            Please read these terms of service carefully before using our TDEE calculator. 
            By using our service, you agree to be bound by these terms.
          </p>
          
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl p-4 backdrop-blur-xl">
            <div className="flex items-center justify-center space-x-2 text-yellow-300">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-medium">Last Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Terms Sections */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
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
                <p className="text-gray-300 leading-relaxed">{section.content}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Prohibited Uses */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-red-500/10 to-pink-500/10 border border-red-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-xl p-3">
                <Gavel className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Prohibited Uses</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              You may not use our service for any of the following prohibited activities:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prohibitedUses.map((use, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <AlertTriangle className="h-4 w-4 text-red-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm leading-relaxed">{use}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* User Rights */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Your Rights</h2>
            </div>
            
            <p className="text-gray-300 mb-6">
              As a user of our service, you have the following rights:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userRights.map((right, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-300 text-sm leading-relaxed">{right}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Changes to Terms */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-3">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Changes to Terms</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new 
                terms taking effect.
              </p>
              <p>
                What constitutes a material change will be determined at our sole discretion. By continuing 
                to access or use our service after those revisions become effective, you agree to be bound 
                by the revised terms.
              </p>
              <p>
                If you do not agree to the new terms, please stop using the service. We will always post 
                the most current version of our terms on this page.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Governing Law */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <div className="flex items-center space-x-3 mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl p-3">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Governing Law & Dispute Resolution</h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                TDEE Pro operates, without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from these terms or your use of the service will be resolved through 
                binding arbitration in accordance with the rules of the applicable arbitration association.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a 
                waiver of those rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-4">Questions About These Terms?</h2>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              If you have any questions about these Terms of Service, please contact our legal team. 
              We're here to help clarify any concerns you may have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Contact Legal Team
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-xl">
                View Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;