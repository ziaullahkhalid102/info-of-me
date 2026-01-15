import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import NameTool from './pages/NameTool';
import DobTool from './pages/DobTool';
import HistoryTool from './pages/HistoryTool';
import MoreTools from './pages/MoreTools';
import { PrivacyPolicy, TermsOfService, AboutUs } from './pages/Legal';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/name" element={<NameTool />} />
              <Route path="/dob" element={<DobTool />} />
              <Route path="/history" element={<HistoryTool />} />
              <Route path="/more" element={<MoreTools />} />
              
              {/* Legal Pages for AdSense / Trust */}
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/about" element={<AboutUs />} />
              
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;