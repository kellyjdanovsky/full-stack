import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import AIChatbot from './components/AIChatbot';
import HomePage from './pages/HomePage';
import JavaScriptPage from './pages/JavaScriptPage';
import PythonPage from './pages/PythonPage';
import SQLPage from './pages/SQLPage';
import BashPage from './pages/BashPage';
import GoPage from './pages/GoPage';
import OtherLanguagesPage from './pages/OtherLanguagesPage';
import ProjectStructurePage from './pages/ProjectStructurePage';
import ReactPage from './pages/ReactPage';
import NodePage from './pages/NodePage';
import HTMLCSSPage from './pages/HTMLCSSPage';
import GitPage from './pages/GitPage';
import CleanCodePage from './pages/CleanCodePage';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// ScrollToTop component to fix scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative bg-[#07040A] min-h-screen text-[#F4F2F7] font-sans selection:bg-[#7B2D8E] selection:text-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/javascript" element={<JavaScriptPage />} />
          <Route path="/python" element={<PythonPage />} />
          <Route path="/sql" element={<SQLPage />} />
          <Route path="/bash" element={<BashPage />} />
          <Route path="/go" element={<GoPage />} />
          <Route path="/other-languages" element={<OtherLanguagesPage />} />
          <Route path="/project-structure" element={<ProjectStructurePage />} />
          <Route path="/react" element={<ReactPage />} />
          <Route path="/node" element={<NodePage />} />
          <Route path="/html-css" element={<HTMLCSSPage />} />
          <Route path="/git" element={<GitPage />} />
          <Route path="/clean-code" element={<CleanCodePage />} />
        </Routes>
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
