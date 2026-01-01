export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  prompt: string;
  html: string;
}

export interface LandingPageConfig {
  prompt: string;
}
