import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description }) => {
  const location = useLocation();

  useEffect(() => {
    // Update Title
    document.title = `${title} | Info Of Me`;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description || "Discover hidden insights about your name, date of birth, history, and cities with Info Of Me.");
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = description || "Discover hidden insights about your name, date of birth, history, and cities with Info Of Me.";
      document.head.appendChild(newMeta);
    }

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [title, description, location]);

  return null;
};

export default SEO;