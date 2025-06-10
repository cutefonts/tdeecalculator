import React from 'react';
import { Users, Target, Award, Heart, Zap, Brain, Shield, TrendingUp } from 'lucide-react';

const AboutUs: React.FC = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Lead Nutritionist & Co-Founder',
      description: 'PhD in Nutritional Science with 15+ years of experience in metabolic research and clinical nutrition.',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Metabolic Research', 'Clinical Nutrition', 'Sports Nutrition']
    },
    {
      name: 'Mark Rodriguez',
      role: 'AI Engineer & Co-Founder',
      description: 'Former Google AI researcher specializing in machine learning applications for health and fitness optimization.',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Machine Learning', 'Health AI', 'Data Science']
    },
    {
      name: 'Dr. James Wilson',
      role: 'Exercise Physiologist',
      description: 'Exercise science expert with extensive research in energy expenditure and metabolic adaptation.',
      image: 'https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400',
      expertise: ['Exercise Physiology', 'Metabolic Testing', 'Performance Optimization']
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Scientific Accuracy',
      description: 'Every calculation is based on peer-reviewed research and validated scientific formulas.',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Heart,
      title: 'User-Centered Design',
      description: 'We prioritize user experience and accessibility in every feature we develop.',
      color: 'from-red-500 to-pink-600'
    },
    {
      icon: Brain,
      title: 'Continuous Innovation',
      description: 'We constantly integrate the latest research and AI advancements into our platform.',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      icon: Users,
      title: 'Community Focus',
      description: 'Building tools that empower individuals and health professionals worldwide.',
      color: 'from-green-500 to-emerald-600'
    }
  ];

  const milestones = [
    { year: '2020', event: 'Company Founded', description: 'Started with a mission to democratize advanced metabolic analysis' },
    { year: '2021', event: 'First AI Algorithm', description: 'Launched our first machine learning model for lifestyle factor integration' },
    { year: '2022', event: '10K Users', description: 'Reached our first major user milestone with 95% accuracy validation' },
    { year: '2023', event: 'Professional Integration', description: 'Partnered with healthcare providers and fitness professionals' },
    { year: '2024', event: '50K+ Users', description: 'Expanded globally with multi-language support and advanced features' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20">
      {/* Hero Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8">
            <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400" />
            <span className="text-xs sm:text-sm text-blue-300 font-medium">Our Story</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Revolutionizing Metabolic Analysis
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Through Science & Innovation
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We're a team of scientists, engineers, and health professionals dedicated to making 
            advanced metabolic analysis accessible to everyone. Our mission is to empower individuals 
            with precise, personalized insights for optimal health and fitness.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To democratize access to professional-grade metabolic analysis by combining 
                cutting-edge AI technology with validated scientific research. We believe 
                everyone deserves accurate, personalized insights to achieve their health 
                and fitness goals.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white">Our Vision</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                To become the global standard for metabolic analysis, empowering millions 
                of individuals and thousands of health professionals with the most accurate, 
                comprehensive, and user-friendly tools for metabolic health optimization.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Meet Our Expert Team</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Our diverse team combines decades of experience in nutrition science, 
              AI research, and exercise physiology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <img 
                    src={member.image} 
                    alt={`${member.name} - ${member.role}`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white/20"
                  />
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 font-medium">{member.role}</p>
                </div>
                
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {member.description}
                </p>
                
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Expertise</p>
                  <div className="flex flex-wrap gap-2">
                    {member.expertise.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              These principles guide everything we do, from product development to customer support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`bg-gradient-to-r ${value.color} rounded-xl p-3`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{value.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Our Journey</h2>
            <p className="text-lg text-gray-300">
              Key milestones in our mission to revolutionize metabolic analysis.
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-600"></div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start space-x-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-white/20">
                    <span className="text-white font-bold text-sm">{milestone.year}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-xl p-6 flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{milestone.event}</h3>
                    <p className="text-gray-300">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Join Our Mission</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a fitness enthusiast, health professional, or researcher, 
              we invite you to be part of the metabolic health revolution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Try Our Calculator
              </button>
              <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-xl">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;