import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface StudentProfile {
  name: string;
  age: string;
  location: string;
  school: string;
  yearLevel: string;
  subject: string;
  learningStyle: string;
}

export interface AvatarOption {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  bgColor: string;
  personality: string;
}

export interface HomeworkSession {
  id: string;
  date: string;
  subject: string;
  question: string;
}

interface AppState {
  isAuthenticated: boolean;
  email: string;
  profile: StudentProfile | null;
  selectedAvatar: AvatarOption | null;
  apiKey: string;
  sessions: HomeworkSession[];
}

interface AppContextType extends AppState {
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
  saveProfile: (profile: StudentProfile) => void;
  selectAvatar: (avatar: AvatarOption) => void;
  setApiKey: (key: string) => void;
  addSession: (session: HomeworkSession) => void;
}

const AppContext = createContext<AppContextType | null>(null);

const STORAGE_KEY = 'lexi_app_state';

const defaultState: AppState = {
  isAuthenticated: false,
  email: '',
  profile: null,
  selectedAvatar: null,
  apiKey: (import.meta as any).env?.VITE_OPENAI_API_KEY || '',
  sessions: [],
};

export const AVATARS: AvatarOption[] = [
  {
    id: 'luna',
    name: 'Luna',
    emoji: '🤖',
    description: 'Friendly Robot Tutor',
    color: '#7C3AED',
    bgColor: '#EDE9FE',
    personality: 'systematic and encouraging',
  },
  {
    id: 'sage',
    name: 'Sage',
    emoji: '🦉',
    description: 'Wise Owl Teacher',
    color: '#059669',
    bgColor: '#D1FAE5',
    personality: 'patient and thorough',
  },
  {
    id: 'nova',
    name: 'Nova',
    emoji: '⚡',
    description: 'Energetic AI Assistant',
    color: '#2563EB',
    bgColor: '#DBEAFE',
    personality: 'enthusiastic and motivating',
  },
  {
    id: 'buddy',
    name: 'Buddy',
    emoji: '🐻',
    description: 'Warm Bear Helper',
    color: '#D97706',
    bgColor: '#FEF3C7',
    personality: 'warm and supportive',
  },
  {
    id: 'alex',
    name: 'Alex',
    emoji: '👩‍🏫',
    description: 'Human-Style Tutor',
    color: '#DB2777',
    bgColor: '#FCE7F3',
    personality: 'calm and relatable',
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      }
    } catch {}
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const login = (email: string, _password: string): boolean => {
    setState(prev => ({ ...prev, isAuthenticated: true, email }));
    return true;
  };

  const signup = (email: string, _password: string): boolean => {
    setState(prev => ({ ...prev, isAuthenticated: true, email, profile: null, selectedAvatar: null, sessions: [] }));
    return true;
  };

  const logout = () => setState(defaultState);

  const saveProfile = (profile: StudentProfile) =>
    setState(prev => ({ ...prev, profile }));

  const selectAvatar = (avatar: AvatarOption) =>
    setState(prev => ({ ...prev, selectedAvatar: avatar }));

  const setApiKey = (key: string) =>
    setState(prev => ({ ...prev, apiKey: key }));

  const addSession = (session: HomeworkSession) =>
    setState(prev => ({ ...prev, sessions: [session, ...prev.sessions].slice(0, 10) }));

  return (
    <AppContext.Provider value={{ ...state, login, signup, logout, saveProfile, selectAvatar, setApiKey, addSession }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
