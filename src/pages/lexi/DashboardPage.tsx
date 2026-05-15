import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp } from '@/context/AppContext';
import { Plus, Clock, BookOpen, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { isAuthenticated, profile, selectedAvatar, sessions, logout, apiKey, setApiKey } = useApp();
  const [showSettings, setShowSettings] = useState(false);
  const [keyInput, setKeyInput] = useState(apiKey);

  if (!isAuthenticated) { navigate('/auth'); return null; }
  if (!profile) { navigate('/onboarding'); return null; }
  if (!selectedAvatar) { navigate('/avatar'); return null; }

  const handleSaveKey = () => {
    setApiKey(keyInput);
    setShowSettings(false);
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-100 flex flex-col z-40 shadow-sm">
        {/* Brand */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-purple-700 font-bold text-lg">Lexi</span>
          </div>
        </div>

        {/* Avatar card */}
        <div className="p-4">
          <div
            className="rounded-2xl p-4 flex items-center gap-3"
            style={{ backgroundColor: selectedAvatar.bgColor }}
          >
            <div className="text-3xl">{selectedAvatar.emoji}</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{selectedAvatar.name}</p>
              <p className="text-xs" style={{ color: selectedAvatar.color }}>Your tutor</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-purple-50 text-purple-700 font-medium text-sm">
            <BookOpen className="w-4 h-4" />
            Dashboard
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors"
            onClick={() => navigate('/tutor')}
          >
            <Plus className="w-4 h-4" />
            New Homework Session
          </button>
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          <div className="px-2">
            <p className="text-xs text-gray-500">{profile.name}</p>
            <p className="text-xs text-gray-400">{profile.yearLevel} · {profile.subject}</p>
          </div>
          <button
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500 font-medium text-sm transition-colors"
            onClick={logout}
          >
            <LogOut className="w-4 h-4" />
            Log out
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="ml-64 p-8">
        {/* Settings panel */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6" onClick={() => setShowSettings(false)}>
            <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold text-gray-900 mb-1">Settings</h2>
              <p className="text-gray-500 text-sm mb-6">Configure your Lexi experience</p>

              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-medium">OpenAI API Key</Label>
                  <p className="text-xs text-gray-400 mb-2">Required for AI homework analysis. Get yours at platform.openai.com</p>
                  <Input
                    type="password"
                    placeholder="sk-..."
                    value={keyInput}
                    onChange={e => setKeyInput(e.target.value)}
                    className="h-11 rounded-xl font-mono text-sm"
                  />
                </div>
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800">
                  <strong>Demo mode:</strong> Without an API key, Lexi will show a sample response so you can explore the interface.
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowSettings(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white" onClick={handleSaveKey}>
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Hi, {profile.name}! 👋
          </h1>
          <p className="text-gray-500 mt-1">Ready to tackle some homework? {selectedAvatar.name} is here to help.</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-400 mb-1">Year Level</p>
            <p className="text-2xl font-bold text-gray-900">{profile.yearLevel}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-400 mb-1">Subject</p>
            <p className="text-2xl font-bold text-gray-900">{profile.subject}</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-400 mb-1">Sessions Completed</p>
            <p className="text-2xl font-bold text-gray-900">{sessions.length}</p>
          </div>
        </div>

        {/* Start new session CTA */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
              style={{ backgroundColor: selectedAvatar.bgColor }}
            >
              {selectedAvatar.emoji}
            </div>
            <div>
              <h2 className="text-xl font-bold">Start a new homework session</h2>
              <p className="text-purple-200 mt-0.5">
                {selectedAvatar.name} will read your homework and explain it step by step.
              </p>
            </div>
          </div>
          <Button
            size="lg"
            className="bg-white text-purple-700 hover:bg-purple-50 rounded-2xl px-8 font-semibold flex-shrink-0"
            onClick={() => navigate('/tutor')}
          >
            Upload Homework <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Recent sessions */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Sessions</h2>
          {sessions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <div className="text-4xl mb-3">📚</div>
              <p className="text-gray-500 font-medium">No sessions yet</p>
              <p className="text-gray-400 text-sm mt-1">Upload your first homework and start learning!</p>
              <Button
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                onClick={() => navigate('/tutor')}
              >
                Start First Session
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {sessions.map(session => (
                <div
                  key={session.id}
                  className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center justify-between hover:border-purple-200 hover:shadow-sm transition-all cursor-pointer"
                  onClick={() => navigate('/tutor')}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{session.subject}</p>
                      <p className="text-sm text-gray-500 mt-0.5 max-w-sm truncate">{session.question}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{formatDate(session.date)}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
