import React from 'react';
import { HistoryItem } from '../types';
import { Trash2, Clock, FileCode } from 'lucide-react';

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  selectedId?: string;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({
  history,
  onSelect,
  onDelete,
  onClearAll,
  selectedId,
}) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-sm text-center p-4">
        <Clock size={32} className="mb-2 opacity-50" />
        <p>Nenhum histórico ainda.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <h3 className="font-semibold text-gray-700">Versões Anteriores</h3>
        <button
          onClick={onClearAll}
          className="text-xs text-red-500 hover:text-red-700 hover:underline"
        >
          Limpar Tudo
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {history.map((item) => (
          <div
            key={item.id}
            className={`group flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-all ${
              selectedId === item.id
                ? 'bg-purple-50 border-purple-200 shadow-sm'
                : 'bg-white border-gray-100 hover:border-purple-200 hover:bg-gray-50'
            }`}
            onClick={() => onSelect(item)}
          >
            <div className="flex items-start space-x-3 overflow-hidden">
              <div className={`mt-1 p-1.5 rounded-md ${selectedId === item.id ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                <FileCode size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${selectedId === item.id ? 'text-purple-700' : 'text-gray-700'}`}>
                  {item.prompt}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(item.timestamp).toLocaleString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
              title="Remover"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySidebar;
