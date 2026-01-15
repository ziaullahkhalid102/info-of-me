import { User, Calendar, History, MapPin } from 'lucide-react';
import { Language, ToolDefinition, ToolType } from './types';

export const LANGUAGES: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'ur', name: 'Urdu', flag: '🇵🇰', nativeName: 'اردو' },
  { code: 'bn', name: 'Bengali', flag: '🇧🇩', nativeName: 'বাংলা' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' },
  { code: 'az', name: 'Azerbaijani', flag: '🇦🇿', nativeName: 'Azərbaycan' },
  { code: 'ps', name: 'Pashto', flag: '🇦🇫', nativeName: 'پښتو' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'fa', name: 'Persian', flag: '🇮🇷', nativeName: 'فارسی' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'id', name: 'Indonesian', flag: '🇮🇩', nativeName: 'Indonesia' },
];

export const TOOLS: ToolDefinition[] = [
  {
    id: ToolType.NAME_MEANING,
    title: 'Name Meaning',
    description: 'Discover the origin, significance, and hidden traits behind your name.',
    icon: User,
    path: '/name',
  },
  {
    id: ToolType.DOB_FACTS,
    title: 'Date of Birth Insights',
    description: 'Astrology, numerology, and unique facts about the day you were born.',
    icon: Calendar,
    path: '/dob',
  },
  {
    id: ToolType.HISTORY,
    title: 'This Day in History',
    description: 'Explore major historical events that happened on this specific date.',
    icon: History,
    path: '/history',
  },
  {
    id: ToolType.DAY_GRADE,
    title: 'City & Country Insights',
    description: 'Explore the history, culture, land, and people of any city in the world.',
    icon: MapPin,
    path: '/more', 
  },
];

// Helper for common labels
const BASE_LABELS = {
  welcome: "Welcome to Info Of Me",
  subtitle: "Discover hidden insights about yourself and the world.",
  getStarted: "Get Started",
  tools: "Information Tools",
  enterName: "Enter your full name",
  enterDate: "Enter date",
  analyze: "Analyze",
  loading: "Generating insights...",
  result: "Your Result",
  share: "Share Result",
  copied: "Copied!",
  shareFooter: "Discover more on Info Of Me",
  cityTool: {
    title: "City Explorer",
    desc: "Discover the soul, history, and people of any place.",
    countryPlaceholder: "Country (e.g. Pakistan)",
    cityPlaceholder: "City (e.g. Lahore)",
    btn: "Explore City",
    card_history: "History & Heritage",
    card_geography: "Land & Geography",
    card_people: "People & Culture",
    card_nostalgia: "Nostalgia & Old Vibes"
  },
  nav: { home: "Home", name: "Name", dob: "DOB", history: "History", more: "City" }
};

export const UI_LABELS: Record<string, any> = {
  en: BASE_LABELS,
  ur: {
    welcome: "انفو آف می میں خوش آمدید",
    subtitle: "اپنے اور دنیا کے بارے میں پوشیدہ معلومات دریافت کریں۔",
    getStarted: "شروع کریں",
    tools: "معلوماتی ٹولز",
    enterName: "اپنا پورا نام درج کریں",
    enterDate: "تاریخ درج کریں",
    analyze: "تجزیہ کریں",
    loading: "تیاری جاری ہے...",
    result: "آپ کا نتیجہ",
    share: "شیئر کریں",
    copied: "کاپی ہو گیا!",
    shareFooter: "مزید معلومات کے لیے Info Of Me وزٹ کریں",
    cityTool: {
      title: "شہر اور ملک کی معلومات",
      desc: "کسی بھی شہر کی تاریخ، ثقافت اور لوگوں کے بارے میں جانیں۔",
      countryPlaceholder: "ملک (مثلاً پاکستان)",
      cityPlaceholder: "شہر (مثلاً لاہور)",
      btn: "معلومات حاصل کریں",
      card_history: "تاریخ اور ورثہ",
      card_geography: "سرزمین اور جغرافیہ",
      card_people: "لوگ اور ثقافت",
      card_nostalgia: "پرانی یادیں اور ماحول"
    },
    nav: { home: "ہوم", name: "نام", dob: "تاریخ پیدائش", history: "تاریخ", more: "شہر" }
  },
  bn: {
    welcome: "ইনফো অফ মি - তে স্বাগতম",
    subtitle: "আপনার নিজের এবং বিশ্ব সম্পর্কে অজানা তথ্য আবিষ্কার করুন।",
    getStarted: "শুরু করুন",
    tools: "তথ্য সরঞ্জাম",
    enterName: "আপনার পুরো নাম লিখুন",
    enterDate: "তারিখ লিখুন",
    analyze: "বিশ্লেষণ করুন",
    loading: "তৈরি হচ্ছে...",
    result: "আপনার ফলাফল",
    share: "শেয়ার করুন",
    copied: "কপি হয়েছে!",
    shareFooter: "আরও জানতে Info Of Me দেখুন",
    cityTool: {
      title: "শহর এবং দেশ পরিচিতি",
      desc: "যেকোনো জায়গার ইতিহাস, মানুষ এবং সংস্কৃতি সম্পর্কে জানুন।",
      countryPlaceholder: "দেশ (যেমন বাংলাদেশ)",
      cityPlaceholder: "শহর (যেমন ঢাকা)",
      btn: "অনুসন্ধান করুন",
      card_history: "ইতিহাস ও ঐতিহ্য",
      card_geography: "ভূমি ও ভূগোল",
      card_people: "মানুষ ও সংস্কৃতি",
      card_nostalgia: "স্মৃতি ও পুরনো দিন"
    },
    nav: { home: "হোম", name: "নাম", dob: "জন্মতারিখ", history: "ইতিহাস", more: "শহর" }
  },
  tr: {
    welcome: "Info Of Me'ye Hoşgeldiniz",
    subtitle: "Kendiniz ve dünya hakkında gizli bilgileri keşfedin.",
    getStarted: "Başla",
    tools: "Bilgi Araçları",
    enterName: "Tam adınızı girin",
    enterDate: "Tarih girin",
    analyze: "Analiz Et",
    loading: "Oluşturuluyor...",
    result: "Sonucunuz",
    share: "Paylaş",
    copied: "Kopyalandı!",
    shareFooter: "Daha fazlası için Info Of Me'yi ziyaret edin",
    cityTool: {
      title: "Şehir Keşfi",
      desc: "Herhangi bir yerin ruhunu ve tarihini keşfedin.",
      countryPlaceholder: "Ülke (örn. Türkiye)",
      cityPlaceholder: "Şehir (örn. İstanbul)",
      btn: "Keşfet",
      card_history: "Tarih ve Miras",
      card_geography: "Coğrafya ve Toprak",
      card_people: "İnsanlar ve Kültür",
      card_nostalgia: "Nostalji ve Eski Günler"
    },
    nav: { home: "Ana Sayfa", name: "İsim", dob: "Doğum", history: "Tarih", more: "Şehir" }
  },
  // Default fallbacks for other languages to prevent crashes
  es: BASE_LABELS,
  fr: BASE_LABELS,
  de: BASE_LABELS,
  hi: BASE_LABELS,
  ar: BASE_LABELS,
  fa: BASE_LABELS,
  zh: BASE_LABELS,
  ja: BASE_LABELS,
  ru: BASE_LABELS,
  pt: BASE_LABELS,
  id: BASE_LABELS,
  az: BASE_LABELS,
  ps: BASE_LABELS,
};

export const getLabel = (langCode: string, key: string, subKey?: string) => {
  const lang = UI_LABELS[langCode] || UI_LABELS['en'];
  const fallback = UI_LABELS['en'];

  if (subKey) {
    return lang[key]?.[subKey] || fallback[key]?.[subKey] || subKey;
  }
  return lang[key] || fallback[key] || key;
};