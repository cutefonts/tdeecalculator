import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { Calculator as CalculatorIcon, Target, TrendingUp, Users, ChevronDown, Menu, X, Activity, Brain, Heart, Zap } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Calculator from './components/Calculator';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import SEOHead from './components/SEOHead';

// Lazy load non-critical pages with better error boundaries
const AboutUs = lazy(() => import('./components/AboutUs').catch(() => ({ default: () => <div>Error loading About Us</div> })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').catch(() => ({ default: () => <div>Error loading Privacy Policy</div> })));
const TermsOfService = lazy(() => import('./components/TermsOfService').catch(() => ({ default: () => <div>Error loading Terms of Service</div> })));
const Contact = lazy(() => import('./components/Contact').catch(() => ({ default: () => <div>Error loading Contact</div> })));

// Optimized loading component
const LoadingFallback = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-20 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
      <div className="text-white text-lg">Loading...</div>
    </div>
  </div>
);

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState('home');

  // Memoize page change handler
  const handlePageChange = useCallback((page: string) => {
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    // Handle URL routing
    const path = window.location.pathname;
    const page = path.substring(1) || 'home';
    setCurrentPage(page);

    // Update URL when page changes
    const handlePopState = () => {
      const newPath = window.location.pathname;
      const newPage = newPath.substring(1) || 'home';
      setCurrentPage(newPage);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // Update URL without page reload
    const url = currentPage === 'home' ? '/' : `/${currentPage}`;
    if (window.location.pathname !== url) {
      window.history.pushState({}, '', url);
    }
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (currentPage !== 'home') return;
      
      const sections = ['hero', 'calculator', 'features', 'how-it-works', 'faq'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    // Optimized scroll handler with passive listener
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [currentPage]);

  const getSEOData = useCallback(() => {
    const baseUrl = 'https://calculatortdee.app';
    
    switch (currentPage) {
      case 'about-us':
        return {
          title: 'About TDEE Calculator Pro | Expert Team & Scientific Approach to Metabolic Analysis',
          description: 'Meet the expert team behind TDEE Calculator Pro. Learn about our scientific approach to metabolic analysis, AI-powered algorithms, and our mission to revolutionize fitness nutrition with precision calculations.',
          canonical: `${baseUrl}/about-us`,
          keywords: 'TDEE calculator team, nutrition experts, metabolic research, fitness professionals, AI health technology, scientific approach, exercise physiology, nutrition science',
          ogTitle: 'About TDEE Calculator Pro - Expert Team & Scientific Approach',
          ogDescription: 'Discover the expert team and scientific methodology behind the most advanced TDEE calculator available. Learn about our mission to revolutionize metabolic analysis.',
          ogImage: `${baseUrl}/images/about-og.jpg`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About TDEE Calculator Pro",
            "description": "Learn about the expert team and scientific approach behind TDEE Calculator Pro",
            "url": `${baseUrl}/about-us`,
            "mainEntity": {
              "@type": "Organization",
              "name": "TDEE Calculator Pro",
              "description": "Advanced AI-powered TDEE calculator for accurate metabolic analysis",
              "url": baseUrl,
              "foundingDate": "2020",
              "founder": [
                {
                  "@type": "Person",
                  "name": "Dr. Sarah Chen",
                  "jobTitle": "Lead Nutritionist & Co-Founder"
                },
                {
                  "@type": "Person", 
                  "name": "Mark Rodriguez",
                  "jobTitle": "AI Engineer & Co-Founder"
                }
              ]
            }
          }
        };
      case 'privacy-policy':
        return {
          title: 'Privacy Policy | TDEE Calculator Pro - Data Protection & Security Commitment',
          description: 'Learn how TDEE Calculator Pro protects your personal information. Comprehensive privacy policy covering data collection, usage, security measures, and your rights under GDPR and privacy laws.',
          canonical: `${baseUrl}/privacy-policy`,
          keywords: 'privacy policy, data protection, GDPR compliance, health data security, personal information, data privacy, user rights',
          noindex: false,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Privacy policy for TDEE Calculator Pro",
            "url": `${baseUrl}/privacy-policy`
          }
        };
      case 'terms-of-service':
        return {
          title: 'Terms of Service | TDEE Calculator Pro - Legal Agreement & Usage Terms',
          description: 'Read the terms of service for TDEE Calculator Pro. Legal agreement covering usage rights, responsibilities, service limitations, and user obligations for our TDEE calculator platform.',
          canonical: `${baseUrl}/terms-of-service`,
          keywords: 'terms of service, legal agreement, usage terms, service conditions, user agreement, terms and conditions',
          noindex: false,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Terms of Service",
            "description": "Terms of service for TDEE Calculator Pro",
            "url": `${baseUrl}/terms-of-service`
          }
        };
      case 'contact':
        return {
          title: 'Contact TDEE Calculator Pro | Expert Support & Professional Services',
          description: 'Get in touch with TDEE Calculator Pro experts. Professional support, partnership opportunities, specialized services for health professionals, and comprehensive customer assistance.',
          canonical: `${baseUrl}/contact`,
          keywords: 'contact TDEE calculator, customer support, professional services, health professional partnerships, technical support, expert consultation',
          ogTitle: 'Contact TDEE Calculator Pro - Expert Support Available',
          ogDescription: 'Connect with our team of nutrition and fitness experts for support, partnerships, and professional services.',
          ogImage: `${baseUrl}/images/contact-og.jpg`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "name": "Contact TDEE Calculator Pro",
            "description": "Contact information and support for TDEE Calculator Pro",
            "url": `${baseUrl}/contact`,
            "mainEntity": {
              "@type": "Organization",
              "name": "TDEE Calculator Pro",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "support@tdee-pro.com",
                "availableLanguage": "English"
              }
            }
          }
        };
      default:
        return {
          title: 'TDEE Calculator - Calculate Your Total Daily Energy Expenditure',
          description: 'Use our free TDEE Calculator to find out how many calories you burn daily based on your activity level, age, weight, and more. Achieve your fitness goals faster!',
          canonical: baseUrl,
          keywords: 'TDEE calculator, calorie calculator, BMR calculator, metabolic rate, daily calories, macro calculator, fitness calculator, weight loss calculator, nutrition calculator, AI fitness, metabolic analysis',
          ogTitle: 'TDEE Calculator Pro - Advanced AI-Powered Metabolic Analysis',
          ogDescription: 'Calculate your Total Daily Energy Expenditure (TDEE) with our advanced AI-powered calculator. Get personalized calorie recommendations and comprehensive metabolic analysis.',
          ogImage: `${baseUrl}/images/home-og.jpg`,
          structuredData: {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "TDEE Calculator Pro",
            "description": "Advanced AI-powered TDEE calculator for accurate metabolic analysis and personalized nutrition recommendations",
            "url": baseUrl,
            "applicationCategory": "HealthApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "creator": {
              "@type": "Organization",
              "name": "TDEE Pro",
              "url": baseUrl
            },
            "featureList": [
              "TDEE Calculation",
              "BMR Analysis", 
              "Macro Distribution",
              "Lifestyle Factor Integration",
              "AI-Powered Recommendations",
              "Comprehensive Health Metrics"
            ]
          }
        };
    }
  }, [currentPage]);

  const renderPage = useCallback(() => {
    switch (currentPage) {
      case 'about-us':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <AboutUs />
          </Suspense>
        );
      case 'privacy-policy':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPolicy />
          </Suspense>
        );
      case 'terms-of-service':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TermsOfService />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Contact />
          </Suspense>
        );
      default:
        return (
          <>
            <Hero />
            <Calculator />
            <Features />
            <HowItWorks />
            <FAQ />
          </>
        );
    }
  }, [currentPage]);

  const seoData = getSEOData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <SEOHead {...seoData} />
      <Header activeSection={activeSection} currentPage={currentPage} setCurrentPage={handlePageChange} />
      {renderPage()}
      <Footer currentPage={currentPage} setCurrentPage={handlePageChange} />
      <BackToTop />
    </div>
  );
}

export default App;