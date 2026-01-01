import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import PreviewPane from './components/PreviewPane';
import HistorySidebar from './components/HistorySidebar';
import { generateLandingPage } from './services/geminiService';
import { HistoryItem } from './types';
import { Rocket, History, MessageSquare, Layout } from 'lucide-react';

const STORAGE_KEY = 'gs_lp_history';

export default function App() {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeTab, setActiveTab] = useState<'chat' | 'history'>('chat');
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | undefined>(undefined);

  // Load history from local storage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  // Save history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleGenerate = async (prompt: string) => {
    setLoading(true);
    setHtmlContent(''); // Clear previous preview temporarily or keep it? Let's clear to show loading state better
    
    try {
      const generatedHtml = await generateLandingPage(prompt);
      setHtmlContent(generatedHtml);

      // Add to history
      const newItem: HistoryItem = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        prompt: prompt,
        html: generatedHtml,
      };

      setHistory((prev) => [newItem, ...prev]);
      setSelectedHistoryId(newItem.id);
    } catch (error) {
      alert("Houve um erro ao gerar a página. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectHistory = (item: HistoryItem) => {
    setHtmlContent(item.html);
    setSelectedHistoryId(item.id);
    // On mobile, maybe switch tab back to preview? For now, stays on history tab but updates preview.
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
    if (selectedHistoryId === id) {
      setHtmlContent('');
      setSelectedHistoryId(undefined);
    }
  };

  const handleClearAllHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico?")) {
      setHistory([]);
      setHtmlContent('');
      setSelectedHistoryId(undefined);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white font-sans text-gray-900 overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 justify-between flex-shrink-0 z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shadow-purple-200 shadow-lg transform hover:scale-105 transition-transform duration-200">
            <Rocket size={24} fill="currentColor" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-gray-900">GS-LP IA</h1>
            <p className="text-xs text-gray-500 font-medium tracking-wide">LANDING PAGE GENERATOR</p>
          </div>
        </div>
        <div className="hidden md:flex space-x-4">
             {/* Optional top nav items */}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Panel (Chat & History) */}
        <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col border-r border-gray-200 bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors relative ${
                activeTab === 'chat' ? 'text-purple-600 bg-purple-50/50' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <MessageSquare size={16} />
              <span>Chat</span>
              {activeTab === 'chat' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors relative ${
                activeTab === 'history' ? 'text-purple-600 bg-purple-50/50' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <History size={16} />
              <span>Histórico</span>
              {activeTab === 'history' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600"></div>}
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-hidden relative">
            {activeTab === 'chat' ? (
              <ChatInterface onGenerate={handleGenerate} loading={loading} />
            ) : (
              <HistorySidebar
                history={history}
                onSelect={handleSelectHistory}
                onDelete={handleDeleteHistory}
                onClearAll={handleClearAllHistory}
                selectedId={selectedHistoryId}
              />
            )}
          </div>
        </div>

        {/* Right Panel (Preview) */}
        <div className="flex-1 h-full overflow-hidden bg-gray-50 relative">
             <PreviewPane htmlContent={htmlContent} loading={loading} />
             {/* Simple watermark/hint if empty */}
             {!htmlContent && !loading && (
                 <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-5">
                     <Layout size={200} />
                 </div>
             )}
        </div>
      </div>
    </div>
  );
}
