import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ShareButtonProps {
  title: string;
  text: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, text }) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Append a footer signature to the shared text
    const footer = t('shareFooter') || "Discover more on Info Of Me";
    const fullText = `${text}\n\n---\n${footer}`;
    
    const shareData = {
      title: title,
      text: fullText,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.debug('Share canceled or failed', err);
      }
    } else {
      // Fallback to clipboard
      try {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-6 w-full py-3 rounded-2xl border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-400 font-bold flex items-center justify-center gap-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all active:scale-[0.98]"
    >
      {copied ? (
        <>
          <Check className="w-5 h-5" />
          <span>{t('copied')}</span>
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          <span>{t('share')}</span>
        </>
      )}
    </button>
  );
};

export default ShareButton;