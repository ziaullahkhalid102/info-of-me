import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, User, Calendar, History, Menu, ChevronDown, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { LANGUAGES } from '../constants';

const TopBar = () => {
  const { currentLanguage, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 h-16 flex items-center justify-between px-4 max-w-md mx-auto w-full transition-colors duration-300">
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <span className="text-white font-bold text-lg">i</span>
        </div>
        <span className="font-bold text-slate-800 dark:text-slate-100 text-lg tracking-tight">Info Of Me</span>
      </Link>

      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors border border-transparent dark:border-slate-700"
          >
            <span className="text-xl leading-none">{currentLanguage.flag}</span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200 uppercase">{currentLanguage.code}</span>
            <ChevronDown className="w-3 h-3 text-slate-500 dark:text-slate-400" />
          </button>

          {isOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden z-20 max-h-80 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors ${currentLanguage.code === lang.code ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200'}`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className="text-sm font-medium">{lang.name}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BottomNav = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const navItems = [
    { path: '/', icon: Home, label: t('nav', 'home') },
    { path: '/name', icon: User, label: t('nav', 'name') },
    { path: '/dob', icon: Calendar, label: t('nav', 'dob') },
    { path: '/history', icon: History, label: t('nav', 'history') },
    { path: '/more', icon: Menu, label: t('nav', 'more') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 h-16 sm:h-20 px-4 pb-safe max-w-md mx-auto w-full transition-colors duration-300">
      <div className="h-full flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <div className={`p-1 rounded-full ${isActive ? 'bg-indigo-50 dark:bg-indigo-900/30' : ''}`}>
                <item.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center transition-colors duration-300 font-sans">
      {/* Mobile container limit */}
      <div className="w-full max-w-md bg-white dark:bg-slate-900 min-h-screen shadow-2xl shadow-slate-200/50 dark:shadow-none relative flex flex-col transition-colors duration-300 border-x border-slate-100 dark:border-slate-800">
        <TopBar />
        <main className="flex-1 pt-20 pb-24 px-5 overflow-y-auto no-scrollbar">
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;