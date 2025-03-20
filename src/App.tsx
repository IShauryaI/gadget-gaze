
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '@/pages/HomePage';
import PhoneDetailsPage from '@/pages/PhoneDetailsPage';
import ComparePage from '@/pages/ComparePage';
import Search from '@/pages/Search';
import NotFound from '@/pages/NotFound';
import WebCrawler from '@/components/webCrawler/WebCrawler';
import WebCrawlerBackendInfo from '@/components/webCrawler/WebCrawlerBackendInfo';
import { Toaster } from "@/components/ui/toaster";

// App component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/phone/:id" element={<PhoneDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/crawler" element={<WebCrawler />} />
        <Route path="/crawler/backend-info" element={<WebCrawlerBackendInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
