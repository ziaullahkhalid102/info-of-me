import React from 'react';
import { Shield, FileText, Info, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegalLayout = ({ title, icon: Icon, children }: { title: string, icon: any, children?: React.ReactNode }) => (
  <div className="space-y-6 animate-fade-in">
    <div className="flex items-center gap-3 mb-6">
      <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
        <ArrowLeft className="w-6 h-6" />
      </Link>
      <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        {title}
      </h1>
    </div>
    <div className="prose prose-slate dark:prose-invert prose-sm max-w-none pb-8">
      {children}
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalLayout title="Privacy Policy" icon={Shield}>
    <p>Last updated: {new Date().toLocaleDateString()}</p>
    <h3>1. Introduction</h3>
    <p>Welcome to <strong>Info Of Me</strong>. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website.</p>
    
    <h3>2. Data We Collect</h3>
    <p>We do not store personal data like names or dates of birth on our servers. All processing is done in real-time to generate insights and is then discarded or stored only locally on your device where applicable.</p>
    
    <h3>3. Third-Party Services</h3>
    <p>We use third-party services like Google Analytics and Google AdSense which may collect anonymous data to improve user experience and serve relevant advertisements.</p>
    
    <h3>4. Cookies</h3>
    <p>We use cookies to maintain your language preferences and theme settings. You can control cookies through your browser settings.</p>
  </LegalLayout>
);

export const TermsOfService = () => (
  <LegalLayout title="Terms of Service" icon={FileText}>
    <h3>1. Acceptance of Terms</h3>
    <p>By accessing and using <strong>Info Of Me</strong>, you accept and agree to be bound by the terms and provision of this agreement.</p>
    
    <h3>2. Use License</h3>
    <p>Permission is granted to temporarily download one copy of the materials (information or software) on Info Of Me's website for personal, non-commercial transitory viewing only.</p>
    
    <h3>3. Disclaimer</h3>
    <p>The materials on Info Of Me's website are provided on an 'as is' basis. The AI-generated insights are for entertainment and informational purposes only and should not be considered professional advice.</p>
  </LegalLayout>
);

export const AboutUs = () => (
  <LegalLayout title="About Us" icon={Info}>
    <h3>Who We Are</h3>
    <p><strong>Info Of Me</strong> is a cutting-edge personal information utility designed to help you discover hidden insights about yourself and the world around you.</p>
    
    <h3>Our Mission</h3>
    <p>Our mission is to make information accessible, fun, and insightful. By leveraging advanced AI technology, we provide detailed breakdowns of names, dates, historical events, and geographical data in seconds.</p>
    
    <h3>Contact Us</h3>
    <p>If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site, please contact us.</p>
  </LegalLayout>
);