import React, { useState, useEffect } from 'react';
import { Calendar, Sparkles, Clock, CalendarDays, Globe, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateDobAnalysis, DobAnalysisResult } from '../services/geminiService';
import DateInput from '../components/ui/DateInput';
import ShareButton from '../components/ui/ShareButton';
import SEO from '../components/SEO';
import { DateValue } from '../types';

interface LiveAge {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
}

const DobTool: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [date, setDate] = useState<DateValue>({ day: '', month: '', year: '' });
  const [result, setResult] = useState<DobAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [liveAge, setLiveAge] = useState<LiveAge | null>(null);

  const isValidDate = () => {
    return date.day.length > 0 && date.month.length > 0 && date.year.length === 4;
  };

  // Live Timer Logic
  useEffect(() => {
    if (!isValidDate()) return;

    const calculateAge = () => {
      const birthDate = new Date(`${date.year}-${date.month}-${date.day}`);
      if (isNaN(birthDate.getTime())) return;

      const now = new Date();
      const diff = now.getTime() - birthDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
      
      // Approximate breakdown
      let remaining = diff;
      const yrs = Math.floor(remaining / (1000 * 60 * 60 * 24 * 365.25));
      remaining -= yrs * (1000 * 60 * 60 * 24 * 365.25);
      
      const mths = Math.floor(remaining / (1000 * 60 * 60 * 24 * 30.44));
      remaining -= mths * (1000 * 60 * 60 * 24 * 30.44);

      const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(totalDays / 7);

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setLiveAge({
        years: yrs,
        months: mths,
        weeks: weeks,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        totalDays: totalDays
      });
    };

    const interval = setInterval(calculateAge, 1000);
    calculateAge(); // Initial call

    return () => clearInterval(interval);
  }, [date]);

  const getNextBirthday = () => {
    if (!isValidDate()) return null;
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBday = new Date(`${currentYear}-${date.month}-${date.day}`);
    
    if (nextBday < today) {
      nextBday = new Date(`${currentYear + 1}-${date.month}-${date.day}`);
    }
    
    return nextBday.toLocaleDateString(currentLanguage.code, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const handleAnalyze = async () => {
    if (!isValidDate()) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await generateDobAnalysis(date.day, date.month, date.year, currentLanguage);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const StatBox = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
    <div className={`p-3 rounded-2xl border ${color} dark:border-slate-700 bg-gradient-to-br from-white via-indigo-50/20 to-indigo-100/30 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 shadow-sm dark:shadow-none flex flex-col items-center justify-center text-center`}>
      <span className="text-2xl font-extrabold text-slate-900 dark:text-white">{value}</span>
      <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</span>
    </div>
  );

  const getShareText = (r: DobAnalysisResult) => {
    return `DOB Insights (${date.day}/${date.month}/${date.year})\n\nBorn on: ${r.dayBorn}\nZodiac: ${r.zodiac}\nNumerology: ${r.numerology}\nIslamic Date: ${r.islamicDate}\nQuote: "${r.quote}"`;
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Date of Birth Facts & Age Calculator" 
        description="Discover astrology, numerology, and facts about your birth date. Calculate your exact age in seconds." 
      />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <Calendar className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          {t('nav', 'dob')} Insights
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
          Live age tracking and astrological breakdown.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white via-indigo-50/20 to-indigo-100/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-6 rounded-3xl border border-indigo-50/50 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none space-y-6">
        <DateInput value={date} onChange={setDate} />
        
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
              <Sparkles className="w-5 h-5" />
              {t('analyze')}
            </>
          )}
        </button>
      </div>

      {/* Live Age Grid */}
      {liveAge && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
           <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-3 text-center">Your Journey So Far</h3>
           <div className="grid grid-cols-3 gap-2 mb-2">
              <StatBox label="Years" value={liveAge.years} color="border-blue-200" />
              <StatBox label="Months" value={liveAge.months} color="border-blue-200" />
              <StatBox label="Weeks" value={liveAge.weeks} color="border-blue-200" />
           </div>
           <div className="grid grid-cols-4 gap-2">
              <StatBox label="Days" value={liveAge.days} color="border-slate-200" />
              <StatBox label="Hours" value={liveAge.hours} color="border-slate-200" />
              <StatBox label="Mins" value={liveAge.minutes} color="border-slate-200" />
              <StatBox label="Secs" value={liveAge.seconds} color="border-red-200" />
           </div>
           
           <div className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-4 text-white shadow-lg flex items-center justify-between">
              <div>
                <p className="text-xs font-medium opacity-80 uppercase">Next Birthday</p>
                <p className="font-bold text-lg">{getNextBirthday()}</p>
              </div>
              <CalendarDays className="w-8 h-8 opacity-80" />
           </div>
        </div>
      )}

      {result && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-8">
          
           {/* Day Born Card */}
           <div className="bg-gradient-to-br from-white via-amber-50/50 to-amber-100/30 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-amber-100/50 dark:border-slate-700 border-l-4 border-l-amber-500 overflow-hidden">
              <div className="p-5 flex items-center justify-between">
                 <div>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">You were born on a</h3>
                    <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-500">{result.dayBorn}</p>
                 </div>
                 <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-amber-500" />
                 </div>
              </div>
           </div>

           {/* Calendars Card */}
           <div className="bg-gradient-to-br from-white via-emerald-50/50 to-emerald-100/30 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-emerald-100/50 dark:border-slate-700 border-l-4 border-l-emerald-500 overflow-hidden">
              <div className="bg-emerald-50/50 dark:bg-emerald-900/20 px-5 py-3 border-b border-emerald-100 dark:border-emerald-800/50 flex items-center gap-2">
                 <Globe className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                 <h3 className="font-bold text-emerald-800 dark:text-emerald-300 text-sm uppercase">Multi-Calendar Dates</h3>
              </div>
              <div className="p-5 space-y-4">
                 <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Islamic</span>
                    <span className="text-slate-900 dark:text-white font-bold text-right">{result.islamicDate}</span>
                 </div>
                 <div className="flex justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Gregorian</span>
                    <span className="text-slate-900 dark:text-white font-bold text-right">{result.gregorianDate}</span>
                 </div>
                 <div className="flex justify-between pt-1">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Traditional</span>
                    <span className="text-slate-900 dark:text-white font-bold text-right">{result.otherCalendar}</span>
                 </div>
              </div>
           </div>

           {/* Details Card */}
           <div className="bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/30 dark:from-slate-800 dark:to-slate-900 rounded-3xl shadow-lg shadow-slate-200/50 dark:shadow-none border border-indigo-100/50 dark:border-slate-800 p-6 space-y-5">
              <div>
                <h4 className="font-bold text-indigo-700 dark:text-indigo-400 uppercase text-xs mb-1">Zodiac</h4>
                <p className="text-slate-800 dark:text-slate-200 font-medium">{result.zodiac}</p>
              </div>
              <div>
                <h4 className="font-bold text-indigo-700 dark:text-indigo-400 uppercase text-xs mb-1">Numerology</h4>
                <p className="text-slate-800 dark:text-slate-200 font-medium">{result.numerology}</p>
              </div>
              <div className="bg-white/50 dark:bg-slate-950/50 p-4 rounded-2xl border border-indigo-50 dark:border-slate-700 italic text-slate-600 dark:text-slate-400 text-center shadow-sm">
                "{result.quote}"
              </div>
           </div>

           <ShareButton title={`My Birth Date Insights`} text={getShareText(result)} />
        </div>
      )}
    </div>
  );
};

export default DobTool;