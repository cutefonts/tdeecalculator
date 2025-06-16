import React, { useState, useCallback, useMemo } from 'react';
import { Calculator, Menu, X, Sparkles } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeSection, currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = useMemo(() => [
    { id: 'home', label: 'Home', isPage: true, slug: '' },
    { id: 'calculator', label: 'Calculator', isPage: false, slug: 'calculator' },
    { id: 'features', label: 'Features', isPage: false, slug: 'features' },
    { id: 'comparison', label: 'Compare', isPage: false, slug: 'comparison' },
    { id: 'about-us', label: 'About Us', isPage: true, slug: 'about-us' },
    { id: 'contact', label: 'Contact', isPage: true, slug: 'contact' }
  ], []);

  const handleNavClick = useCallback((item: any) => {
    if (item.isPage) {
      const newPage = item.id === 'home' ? 'home' : item.id;
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          scrollToSection(item.id);
        }, 100);
      } else {
        scrollToSection(item.id);
      }
    }
    setIsMenuOpen(false);
  }, [currentPage, setCurrentPage]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const isActive = useCallback((item: any) => {
    if (item.isPage) {
      return currentPage === (item.id === 'home' ? 'home' : item.id);
    } else {
      return currentPage === 'home' && activeSection === item.id;
    }
  }, [currentPage, activeSection]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo Section */}
          <button
            onClick={() => handleNavClick({ id: 'home', isPage: true })}
            className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0 group transition-all duration-300 hover:scale-105 will-change-transform"
            aria-label="TDEE Pro Calculator - Go to homepage"
          >
            <div className="relative p-3 sm:p-3.5 bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl shadow-xl ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-300 group-hover:scale-105 will-change-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl sm:rounded-2xl blur-lg opacity-50 -z-10 group-hover:opacity-70 transition-opacity duration-300"></div>
              
              <Calculator 
                className="h-5 w-5 sm:h-6 sm:w-6 text-white drop-shadow-lg filter brightness-110" 
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5)) brightness(1.2)'
                }} 
              />
            </div>
            <div className="flex items-center space-x-2">
              <span 
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 drop-shadow-sm group-hover:text-blue-600 transition-colors duration-300" 
              >
                TDEE Pro
              </span>
              <div className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-blue-100 to-indigo-100 px-2 py-1 rounded-full">
                <Sparkles className="h-3 w-3 text-blue-600" />
                <span className="text-xs font-medium text-blue-700">AI</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4" role="navigation" aria-label="Main navigation">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`relative px-3 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl hover:scale-105 will-change-transform ${
                  isActive(item)
                    ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl ring-2 ring-blue-200'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-md'
                }`}
                aria-current={isActive(item) ? 'page' : undefined}
              >
                {item.label}
                {isActive(item) && (
                  <>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 rounded-xl -z-10 blur-sm"></div>
                  </>
                )}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden relative p-3 sm:p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl sm:rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-200 hover:scale-110 shadow-lg will-change-transform"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <div className="relative w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center">
              {isMenuOpen ? (
                <X 
                  className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700 transform transition-all duration-300 rotate-90 scale-110" 
                />
              ) : (
                <Menu 
                  className="h-6 w-6 sm:h-7 sm:w-7 text-gray-700 transform transition-all duration-300" 
                />
              )}
            </div>
            
            <div className={`absolute inset-0 rounded-xl sm:rounded-2xl transition-all duration-300 ${
              isMenuOpen 
                ? 'bg-gradient-to-r from-blue-100 to-indigo-100 scale-110 shadow-xl' 
                : 'bg-transparent scale-100'
            }`}></div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 pb-4' 
              : 'max-h-0 opacity-0 pb-0'
          }`}
          style={{ willChange: isMenuOpen ? 'max-height, opacity' : 'auto' }}
        >
          <div className="pt-4 border-t border-gray-200 bg-white/95 backdrop-blur-xl rounded-b-2xl mx-2 sm:mx-4 shadow-xl">
            <nav className="flex flex-col space-y-2 px-4 sm:px-6 pb-4 sm:pb-6" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center justify-between px-5 py-4 sm:py-5 text-sm sm:text-base font-semibold transition-all duration-300 rounded-xl sm:rounded-2xl hover:scale-105 will-change-transform ${
                    isActive(item)
                      ? 'text-white bg-gradient-to-r from-blue-500 to-indigo-600 shadow-xl ring-2 ring-blue-200'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50 hover:shadow-lg'
                  }`}
                  aria-current={isActive(item) ? 'page' : undefined}
                >
                  <span>{item.label}</span>
                  {isActive(item) && (
                    <div 
                      className="w-3 h-3 bg-white rounded-full animate-pulse shadow-lg" 
                      style={{
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
                      }}
                    ></div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;