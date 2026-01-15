import React, { useState } from 'react';
import { MapPin, Mountain, Users, Hourglass, Landmark, Search, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { generateCityInsights, CityAnalysisResult } from '../services/geminiService';
import ShareButton from '../components/ui/ShareButton';
import SEO from '../components/SEO';

const MoreTools: React.FC = () => {
  const { t, currentLanguage } = useLanguage();
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [result, setResult] = useState<CityAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!city.trim() || !country.trim()) return;
    setLoading(true);
    setResult(null);
    
    try {
      const data = await generateCityInsights(city, country, currentLanguage);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const InfoCard = ({ title, content, icon: Icon, color }: { title: string, content: string, icon: any, color: string }) => (
    <div className={`bg-gradient-to-br from-white via-slate-50/50 to-slate-100/50 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 rounded-3xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className={`px-5 py-4 ${color} bg-opacity-10 dark:bg-opacity-20 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3`}>
        <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm dark:shadow-none`}>
          <Icon className={`w-5 h-5 ${color.replace('bg-', 'text-')}`} />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-sm uppercase tracking-wide">{title}</h3>
      </div>
      <div className="p-6">
        <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium">{content}</p>
      </div>
    </div>
  );

  const getShareText = (r: CityAnalysisResult) => {
    return `City Insights: ${city}, ${country}\n\nHistory: ${r.history}\n\nGeography: ${r.geography}\n\nPeople: ${r.people}\n\nNostalgia: ${r.nostalgia}`;
  };

  return (
    <div className="space-y-6">
      <SEO 
        title="City Explorer & Travel Insights" 
        description="Explore the history, geography, and culture of any city or country in the world." 
      />

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3">
          <MapPin className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          {t('cityTool', 'title')}
        </h1>
        <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
          {t('cityTool', 'desc')}
        </p>
      </div>

      <div className="bg-gradient-to-br from-white via-indigo-50/20 to-indigo-100/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 p-6 rounded-3xl border border-indigo-50/50 dark:border-slate-800 shadow-xl shadow-indigo-100/50 dark:shadow-none space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full p-4 text-lg font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-950 border border-indigo-100 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-2xl outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
            placeholder={t('cityTool', 'countryPlaceholder')}
          />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full p-4 text-lg font-semibold text-slate-900 dark:text-white bg-white dark:bg-slate-950 border border-indigo-100 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400 rounded-2xl outline-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600 shadow-sm"
            placeholder={t('cityTool', 'cityPlaceholder')}
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading || !city.trim() || !country.trim()}
          className="w-full bg-indigo-600 dark:bg-indigo-500 text-white font-bold py-4 rounded-full hover:bg-indigo-700 dark:hover:bg-indigo-400 hover:shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-indigo-300/40 dark:shadow-none"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('loading')}</span>
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              {t('cityTool', 'btn')}
            </>
          )}
        </button>
      </div>

      {result && (
        <div className="space-y-4 pt-4 pb-8">
          <div className="flex items-center justify-center gap-2 pb-2 opacity-50">
            <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></div>
            <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></div>
            <div className="h-1 w-1 rounded-full bg-slate-400 dark:bg-slate-600"></div>
          </div>

          <InfoCard 
            title={t('cityTool', 'card_history')} 
            content={result.history} 
            icon={Landmark} 
            color="text-amber-600" 
          />

          <InfoCard 
            title={t('cityTool', 'card_geography')} 
            content={result.geography} 
            icon={Mountain} 
            color="text-emerald-600" 
          />

          <InfoCard 
            title={t('cityTool', 'card_people')} 
            content={result.people} 
            icon={Users} 
            color="text-blue-600" 
          />

          <InfoCard 
            title={t('cityTool', 'card_nostalgia')} 
            content={result.nostalgia} 
            icon={Hourglass} 
            color="text-purple-600" 
          />

          <ShareButton title={`City Insights: ${city}`} text={getShareText(result)} />
        </div>
      )}
    </div>
  );
};

export default MoreTools;