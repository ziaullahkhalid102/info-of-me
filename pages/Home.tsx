import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, HelpCircle, Info } from 'lucide-react';
import { TOOLS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-10 animate-fade-in pb-8">
      <SEO 
        title="Home" 
        description="Welcome to Info Of Me. Discover insights about names, dates of birth, history, and cities." 
      />
      
      {/* Hero Section */}
      <section className="space-y-4 pt-4 text-center">
        <div className="inline-block p-3 rounded-full bg-indigo-50 dark:bg-indigo-900/20 mb-2 border border-indigo-100 dark:border-indigo-800">
            <Star className="w-6 h-6 text-indigo-600 dark:text-indigo-400 fill-indigo-600 dark:fill-indigo-400" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          {t('welcome')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed max-w-xs mx-auto">
          {t('subtitle')}
        </p>
      </section>

      {/* Quick Access Grid (Pill Style) */}
      <section>
        <div className="flex items-center gap-4 mb-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{t('tools')}</span>
            <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
            {TOOLS.map((tool) => (
            <Link 
                key={tool.id}
                to={tool.path}
                className="bg-gradient-to-br from-indigo-50/50 via-white to-indigo-50/80 dark:from-slate-800 dark:via-slate-800 dark:to-slate-700/50 hover:to-indigo-100 dark:hover:to-slate-700 p-4 rounded-2xl transition-all active:scale-95 flex flex-col items-center text-center gap-2 group border border-indigo-100 dark:border-slate-700 shadow-sm hover:shadow-md"
            >
                <tool.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400 transition-transform group-hover:scale-110" />
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{tool.title}</span>
            </Link>
            ))}
        </div>
      </section>

      {/* Detailed Insights Section (Google-like Cards) */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">In-Depth Features</span>
            <div className="h-px bg-slate-100 dark:bg-slate-800 flex-1"></div>
        </div>

        {TOOLS.map((tool, index) => (
          <div key={tool.id} className="bg-gradient-to-br from-white via-slate-50/50 to-indigo-50/40 dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 rounded-3xl p-6 border border-indigo-50 dark:border-slate-700 shadow-lg shadow-slate-200/40 dark:shadow-none hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-2xl border border-black/5 dark:border-white/5 ${
                    index === 0 ? 'bg-blue-100/50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    index === 1 ? 'bg-purple-100/50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                    index === 2 ? 'bg-amber-100/50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                    'bg-emerald-100/50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                }`}>
                    <tool.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{tool.title}</h3>
            </div>
            
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed mb-6">
              {tool.description} 
              <span className="block mt-2 opacity-80 text-sm">
                 Use this tool to generate detailed reports, uncover hidden meanings, and share interesting facts with your friends and family.
              </span>
            </p>

            <Link 
              to={tool.path}
              className="w-full py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-slate-300/50 dark:shadow-none"
            >
              <span>Try {tool.title}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </section>

      {/* Footer / Legal Section */}
      <footer className="pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="grid grid-cols-2 gap-4 mb-8">
            <Link to="/about" className="text-slate-500 dark:text-slate-400 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                <Info className="w-3 h-3" /> About Us
            </Link>
            <Link to="/privacy" className="text-slate-500 dark:text-slate-400 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                <Shield className="w-3 h-3" /> Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-500 dark:text-slate-400 text-sm hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1">
                <HelpCircle className="w-3 h-3" /> Terms of Service
            </Link>
        </div>
        
        <div className="text-center space-y-2">
            <p className="text-slate-400 dark:text-slate-600 text-xs">
                © {new Date().getFullYear()} Info Of Me. All rights reserved.
            </p>
            <p className="text-slate-300 dark:text-slate-700 text-[10px]">
                Powered by Gemini AI • Designed for You
            </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;