import React, { useEffect, useRef } from 'react';
import { Download, Monitor, Smartphone, Tablet } from 'lucide-react';

interface PreviewPaneProps {
  htmlContent: string;
  loading: boolean;
}

const PreviewPane: React.FC<PreviewPaneProps> = ({ htmlContent, loading }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDownload = () => {
    if (!htmlContent) return;
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'landing-page-gs-lp.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 border-l border-gray-200">
      {/* Toolbar */}
      <div className="bg-white p-3 border-b border-gray-200 flex justify-between items-center shadow-sm">
        <div className="flex space-x-2 text-gray-500 text-sm font-medium items-center">
            <span className="uppercase tracking-wide text-xs">Preview</span>
        </div>
        <button
          onClick={handleDownload}
          disabled={!htmlContent || loading}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          <Download size={16} />
          <span>Baixar HTML</span>
        </button>
      </div>

      {/* Iframe Area */}
      <div className="flex-1 relative overflow-hidden bg-gray-200 p-4 flex justify-center items-center">
        {loading ? (
          <div className="flex flex-col items-center animate-pulse text-purple-600">
            <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
            <p className="font-semibold">Gerando sua Landing Page com IA...</p>
            <p className="text-sm text-gray-500 mt-2">Criando layout, escrevendo copy e aplicando efeitos.</p>
          </div>
        ) : htmlContent ? (
          <iframe
            ref={iframeRef}
            srcDoc={htmlContent}
            title="Preview"
            className="w-full h-full bg-white rounded-lg shadow-lg border border-gray-300"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="text-center text-gray-400">
            <Monitor size={64} className="mx-auto mb-4 opacity-50" />
            <p>Sua landing page aparecerá aqui.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreviewPane;
