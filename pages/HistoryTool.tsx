import React, { useState } from 'react';
import { History, Search, Newspaper, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateHistoryEvents } from '../services/geminiService';
import DateInput from '../components/ui/DateInput';
import ShareButton from '../components/ui/ShareButton';
import SEO from '../components/SEO';
import { DateValue } from '../types';

const HistoryTool: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [date, setDate] = useState<DateValue>({ day: '', month: '', year: '' });
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // Require Year for the new "News on your birthday" feature
  const isValidDate = () => {
    return date.day.length > 0 && date.month.length > 0 && date.year.length === 4;
  };

  const handleAnalyze = async () => {
    if (!isValidDate()) return;
    setLoading(true);
    setResult('');
    
    try {
      const data = await generateHistoryEvents(date.day, date.month, date.year, currentLanguage);
      setResult(data);
    } catch (err) {
      // quiet fail
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="This Day in History" 
        description="See what happened on your birthday in history. Major events, headlines, and historical facts." 
      />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <History className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          {t('nav', 'history')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
          See the headlines and events from the day you were born.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white via-indigo-50/20 to-indigo-100/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-6 rounded-3xl border border-indigo-50/50 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none space-y-6">
        {/* Year is now required and shown */}
        <DateInput value={date} onChange={setDate} hideYear={false} />
        
        <button
          onClick={handleAnalyze}
          disabled={loading || !isValidDate()}
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-4 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-300/40 dark:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('loading')}</span>
            </>
          ) : (
            <>
              <Newspaper className="w-5 h-5" />
              {t('analyze')}
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-gradient-to-br from-white via-slate-50/50 to-slate-100/50 dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-indigo-100/50 dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none overflow-hidden mb-6">
            <div className="bg-indigo-50/50 dark:bg-indigo-900/20 px-5 py-4 border-b border-indigo-100 dark:border-indigo-800/30 flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-indigo-700 dark:text-indigo-400" />
              <h2 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm uppercase tracking-wide">{t('result')}</h2>
            </div>
            <div className="p-6 prose prose-indigo dark:prose-invert prose-sm max-w-none text-slate-800 dark:text-slate-300 leading-relaxed whitespace-pre-line font-medium">
              {result}
            </div>
          </div>
          <ShareButton title={`History on ${date.day}/${date.month}/${date.year}`} text={result} />
        </div>
      )}
    </div>
  );
};

export default HistoryTool;