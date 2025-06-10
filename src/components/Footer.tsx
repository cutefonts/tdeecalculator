import React from 'react';
import { Calculator, Heart, Github, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ currentPage, setCurrentPage }) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Calculator', href: 'calculator', isPage: false, slug: 'calculator' },
      { name: 'Features', href: 'features', isPage: false, slug: 'features' },
      { name: 'How It Works', href: 'how-it-works', isPage: false, slug: 'how-it-works' },
      { name: 'FAQ', href: 'faq', isPage: false, slug: 'faq' }
    ],
    resources: [
      { name: 'BMR vs TDEE Guide', href: '#', isPage: false, slug: 'bmr-vs-tdee-guide' },
      { name: 'Macro Nutrition Basics', href: '#', isPage: false, slug: 'macro-nutrition-basics' },
      { name: 'Activity Level Guide', href: '#', isPage: false, slug: 'activity-level-guide' },
      { name: 'Health & Fitness Tips', href: '#', isPage: false, slug: 'health-fitness-tips' }
    ],
    company: [
      { name: 'About Us', href: 'about-us', isPage: true, slug: 'about-us' },
      { name: 'Privacy Policy', href: 'privacy-policy', isPage: true, slug: 'privacy-policy' },
      { name: 'Terms of Service', href: 'terms-of-service', isPage: true, slug: 'terms-of-service' },
      { name: 'Contact', href: 'contact', isPage: true, slug: 'contact' }
    ]
  };

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/tdee-pro' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/TDEEPro' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@calculatortdee.app' }
  ];

  const handleLinkClick = (link: any) => {
    if (link.isPage) {
      setCurrentPage(link.href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (link.href.startsWith('#')) {
      // External link or placeholder
      return;
    } else {
      // Section link
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          scrollToSection(link.href);
        }, 100);
      } else {
        scrollToSection(link.href);
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black/20 backdrop-blur-lg border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <button
              onClick={() => {
                setCurrentPage('home');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center space-x-2 mb-3 sm:mb-4 group"
            >
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <Calculator className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">TDEE Pro</span>
            </button>
            <p className="text-gray-300 mb-4 sm:mb-6 max-w-md text-sm sm:text-base">
              The most advanced TDEE calculator available. Get precise calorie recommendations, 
              macro breakdowns, and health insights to reach your fitness goals.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/10 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left"
                    disabled={link.href === '#'}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-300 hover:text-white transition-colors text-xs sm:text-sm text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-300 text-xs sm:text-sm text-center md:text-left">
              © {currentYear} TDEE Pro. All rights reserved.
            </div>
            <div className="flex items-center space-x-1 text-gray-300 text-xs sm:text-sm">
              <span>Made with</span>
              <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-400" />
              <span>for fitness enthusiasts worldwide</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
          <p className="text-yellow-200 text-xs text-center">
            <strong>Disclaimer:</strong> This calculator provides estimates based on scientific formulas. 
            Individual results may vary. Always consult with healthcare professionals before making 
            significant dietary or exercise changes, especially if you have medical conditions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;