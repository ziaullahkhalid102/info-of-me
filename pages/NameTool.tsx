import React, { useState } from 'react';
import { User, Sparkles, BookOpen, Fingerprint, Users, Lightbulb, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateNameAnalysis, NameAnalysisResult } from '../services/geminiService';
import ShareButton from '../components/ui/ShareButton';
import SEO from '../components/SEO';

const NameTool: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [name, setName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [result, setResult] = useState<NameAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!name.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    
    try {
      const data = await generateNameAnalysis(name, fatherName, currentLanguage);
      setResult(data);
    } catch (err) {
      setError("Unable to analyze. Please check your internet and try again.");
    } finally {
      setLoading(false);
    }
  };

  const ResultCard = ({ title, content, icon: Icon, color }: { title: string, content: string, icon: any, color: string }) => (
    <div className={`bg-gradient-to-br from-white via-slate-50/50 to-slate-100/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 border-l-4 ${color} mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="px-5 py-4 bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
        <Icon className={`w-5 h-5 ${color.replace('border-', 'text-')}`} />
        <h3 className="font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide text-sm">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-slate-800 dark:text-slate-300 text-lg font-medium leading-relaxed">{content}</p>
      </div>
    </div>
  );

  const getShareText = (r: NameAnalysisResult) => {
    return `Name Analysis for: ${name}\n\nMeaning: ${r.meaning}\nOrigin: ${r.origin}\nPersonality: ${r.personality}\nFun Fact: ${r.funFact}`;
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="Name Meaning & Analysis" 
        description="Analyze the hidden meaning, origin, and personality traits of your name with AI." 
      />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <User className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          {t('nav', 'name')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
          Detailed breakdown of your name's power and meaning.
        </p>
      </div>

      <div className="bg-gradient-to-br from-white via-indigo-50/20 to-indigo-100/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-6 rounded-3xl border border-indigo-50/50 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 text-lg font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-950 border border-indigo-100 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-2xl outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
            placeholder="e.g. Ali Khan"
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Father's Name (Optional)</label>
          <input
            type="text"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            className="w-full p-4 text-lg font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-950 border border-indigo-100 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-2xl outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
            placeholder="e.g. Ahmed Khan"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !name.trim()}
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

      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 font-semibold rounded-2xl text-center border border-red-100 dark:border-red-800/30">
          {error}
        </div>
      )}

      {result && (
        <div className="space-y-4 pt-4 pb-8">
           <div className="flex items-center gap-4 mb-2">
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Analysis Results</span>
            <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          </div>
          
          <ResultCard 
            title="Core Meaning" 
            content={result.meaning} 
            icon={BookOpen} 
            color="border-indigo-500" 
          />
          
          <ResultCard 
            title="Origin & History" 
            content={result.origin} 
            icon={Fingerprint} 
            color="border-blue-500" 
          />
          
          <ResultCard 
            title="Personality Traits" 
            content={result.personality} 
            icon={User} 
            color="border-purple-500" 
          />
          
          <ResultCard 
            title={fatherName ? "Father Name Synergy" : "Success Tip"} 
            content={result.fatherSynergy} 
            icon={Users} 
            color="border-emerald-500" 
          />
          
          <ResultCard 
            title="Did You Know?" 
            content={result.funFact} 
            icon={Lightbulb} 
            color="border-amber-500" 
          />

          <ShareButton title={`Name Meaning: ${name}`} text={getShareText(result)} />
        </div>
      )}
    </div>
  );
};

export default NameTool;