import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { analyzeHomework, chatWithTutor, speakText, stopSpeaking, TutorMessage } from '@/lib/openai';
import {
  ArrowLeft, Upload, Camera, Send, Volume2, VolumeX, Loader2,
  RefreshCw, Settings, X, ImageIcon, ChevronDown,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  isImage?: boolean;
  imageUrl?: string;
  isLoading?: boolean;
}

const DEMO_RESPONSE = `Hi there! Great job uploading your homework. Let's work through this together! 😊

This looks like an algebra equation where we need to find the value of x.

**Step 1:** Start with the equation
3x + 5 = 20

**Step 2:** Subtract 5 from both sides to isolate the term with x
3x + 5 - 5 = 20 - 5
3x = 15

**Step 3:** Divide both sides by 3 to find x
3x ÷ 3 = 15 ÷ 3
x = 5

So the answer is **x = 5** ✅

Let's check our work: if x = 5, then 3(5) + 5 = 15 + 5 = 20 ✓

You're doing great! Would you like me to show you another example like this, or is there anything you'd like me to explain again? 🌟`;

function renderMessageContent(content: string) {
  const lines = content.split('\n');
  return (
    <div className="space-y-2 leading-relaxed">
      {lines.map((line, i) => {
        if (line.trim() === '') return <div key={i} className="h-1" />;

        const isStep = /^\*\*Step \d+/i.test(line) || /^Step \d+:/i.test(line);
        const isEquation = /^\d*[a-zA-Z][\s=+\-÷×*/^]+\d/.test(line.trim()) && !line.includes('**');

        let rendered = line
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>');

        if (isStep) {
          return (
            <div key={i} className="bg-purple-50 border-l-4 border-purple-400 rounded-r-xl px-4 py-2.5 my-1">
              <span className="font-semibold text-purple-800" dangerouslySetInnerHTML={{ __html: rendered }} />
            </div>
          );
        }
        if (isEquation) {
          return (
            <div key={i} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 font-mono text-sm text-gray-800 my-1">
              {line.trim()}
            </div>
          );
        }
        return (
          <p key={i} dangerouslySetInnerHTML={{ __html: rendered }} />
        );
      })}
    </div>
  );
}

export default function TutorPage() {
  const navigate = useNavigate();
  const { isAuthenticated, profile, selectedAvatar, apiKey, addSession } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageName, setImageName] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMsgId, setSpeakingMsgId] = useState<string | null>(null);
  const [showApiInput, setShowApiInput] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { setApiKey } = useApp();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isAuthenticated || !profile || !selectedAvatar) {
    navigate('/auth');
    return null;
  }

  const addMessage = (msg: Omit<ChatMessage, 'id'>) => {
    const id = Date.now().toString() + Math.random();
    const newMsg = { ...msg, id };
    setMessages(prev => [...prev, newMsg]);
    return id;
  };

  const updateMessage = (id: string, update: Partial<ChatMessage>) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, ...update } : m));
  };

  const processImage = async (dataUrl: string) => {
    setIsProcessing(true);

    addMessage({ role: 'user', content: 'Here is my homework question:', isImage: true, imageUrl: dataUrl });

    const loadingId = addMessage({ role: 'assistant', content: '', isLoading: true });

    try {
      const effectiveKey = apiKey || tempApiKey;
      let response: string;

      if (!effectiveKey || effectiveKey.trim() === '') {
        await new Promise(r => setTimeout(r, 2000));
        response = DEMO_RESPONSE;
      } else {
        response = await analyzeHomework(dataUrl, {
          name: profile.name,
          age: profile.age,
          yearLevel: profile.yearLevel,
          subject: profile.subject,
          learningStyle: profile.learningStyle,
          avatarPersonality: selectedAvatar.personality,
        }, effectiveKey);
      }

      updateMessage(loadingId, { content: response, isLoading: false });

      addSession({
        id: Date.now().toString(),
        date: new Date().toISOString(),
        subject: profile.subject,
        question: `Homework uploaded - ${profile.subject} session`,
      });

    } catch (err: any) {
      updateMessage(loadingId, {
        content: `I had trouble reading that. ${err.message || 'Please check your API key in Settings.'} \n\nIn the meantime, here's a demo of how I'd normally help:\n\n${DEMO_RESPONSE}`,
        isLoading: false,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/') && file.type !== 'application/pdf') return;
    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = e => {
      const result = e.target?.result as string;
      setImagePreview(result);
      processImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [apiKey, profile, selectedAvatar]);

  const sendMessage = async () => {
    if (!input.trim() || isProcessing) return;
    const userText = input.trim();
    setInput('');

    addMessage({ role: 'user', content: userText });

    const loadingId = addMessage({ role: 'assistant', content: '', isLoading: true });
    setIsProcessing(true);

    try {
      const effectiveKey = apiKey || tempApiKey;

      const systemPrompt = `You are Lexi, a friendly AI homework tutor. You are helping ${profile.name}, who is ${profile.age} years old in ${profile.yearLevel} studying ${profile.subject}. Your personality is ${selectedAvatar.personality}. Be warm, encouraging, and explain clearly using steps. Never just give answers — teach the process.`;

      const history: TutorMessage[] = [
        { role: 'system', content: systemPrompt },
        ...messages
          .filter(m => !m.isLoading && !m.isImage && m.content)
          .slice(-10)
          .map(m => ({ role: m.role, content: m.content })),
        { role: 'user', content: userText },
      ];

      let response: string;
      if (!effectiveKey || effectiveKey.trim() === '') {
        await new Promise(r => setTimeout(r, 1200));
        response = `Of course, ${profile.name}! Let me explain that differently.\n\nWhen we're working through a problem like this, the key is to take it one step at a time. Don't worry if it feels tricky at first — that's totally normal!\n\n**Let me break it down even more simply:**\n\nThink of the equation like a balance scale. Whatever you do to one side, you must do to the other side to keep it balanced.\n\n**Step 1:** Remove any numbers that are added or subtracted first\n**Step 2:** Then deal with multiplication or division\n**Step 3:** Check your answer by putting it back in\n\nDoes that make more sense? Would you like me to walk through a fresh example? 😊`;
      } else {
        response = await chatWithTutor(history, effectiveKey);
      }

      updateMessage(loadingId, { content: response, isLoading: false });
    } catch (err: any) {
      updateMessage(loadingId, {
        content: `Sorry, I had a hiccup there. ${err.message || 'Please try again.'}`,
        isLoading: false,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleSpeak = (msg: ChatMessage) => {
    if (isSpeaking && speakingMsgId === msg.id) {
      stopSpeaking();
      setIsSpeaking(false);
      setSpeakingMsgId(null);
    } else {
      const plainText = msg.content.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
      speakText(plainText);
      setIsSpeaking(true);
      setSpeakingMsgId(msg.id);
      const wordCount = plainText.split(' ').length;
      setTimeout(() => { setIsSpeaking(false); setSpeakingMsgId(null); }, wordCount * 400 + 2000);
    }
  };

  const quickPrompts = [
    'Can you explain that again?',
    'Make it simpler please',
    'Show me another example',
    'Read it out loud',
    'Test me with a similar question',
  ];

  const hasMessages = messages.length > 0;

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* API Key Modal */}
      {showApiInput && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-gray-900 mb-1">OpenAI API Key</h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter your key to enable real AI responses. Get yours at platform.openai.com
            </p>
            <div>
              <Label>API Key</Label>
              <Input
                type="password"
                placeholder="sk-..."
                value={tempApiKey}
                onChange={e => setTempApiKey(e.target.value)}
                className="mt-1.5 h-11 rounded-xl font-mono text-sm"
              />
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-4 text-xs text-amber-700">
              Without a key, Lexi runs in demo mode with sample responses.
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowApiInput(false)}>
                Cancel
              </Button>
              <Button
                className="flex-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => { setApiKey(tempApiKey); setShowApiInput(false); }}
              >
                Save Key
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Left sidebar */}
      <div className="w-72 flex-shrink-0 bg-white border-r border-gray-100 flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setShowApiInput(true)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* Avatar display */}
        <div className="p-6 flex flex-col items-center text-center">
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl mb-3 shadow-inner"
            style={{ backgroundColor: selectedAvatar.bgColor }}
          >
            {selectedAvatar.emoji}
          </div>
          <h2 className="font-bold text-gray-900 text-lg">{selectedAvatar.name}</h2>
          <p className="text-xs text-gray-400 mt-0.5">Your {selectedAvatar.description}</p>
          <div
            className="mt-3 px-3 py-1.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: selectedAvatar.bgColor, color: selectedAvatar.color }}
          >
            {selectedAvatar.personality}
          </div>
        </div>

        {/* Student info */}
        <div className="px-6 pb-4">
          <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Student</span>
              <span className="text-gray-700 font-medium">{profile.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Year</span>
              <span className="text-gray-700 font-medium">{profile.yearLevel}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subject</span>
              <span className="text-gray-700 font-medium">{profile.subject}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Location</span>
              <span className="text-gray-700 font-medium">{profile.location}</span>
            </div>
          </div>
        </div>

        {/* Upload area (sidebar) */}
        {!hasMessages && (
          <div className="px-6 pb-6 flex-1">
            <div
              className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                dragOver ? 'border-purple-400 bg-purple-50' : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50/50'
              }`}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-8 h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-500">Upload homework</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG or drop here</p>
            </div>
            <Button
              variant="outline"
              className="w-full mt-2 border-gray-200 text-gray-500 hover:border-purple-300 rounded-xl text-sm"
              onClick={() => cameraRef.current?.click()}
            >
              <Camera className="w-4 h-4 mr-2" /> Take Photo
            </Button>
          </div>
        )}

        {hasMessages && (
          <div className="px-6 pb-6 mt-auto">
            <Button
              variant="outline"
              className="w-full border-gray-200 text-gray-500 hover:border-purple-300 rounded-xl text-sm"
              onClick={() => { setMessages([]); setImagePreview(null); }}
            >
              <RefreshCw className="w-4 h-4 mr-2" /> New Session
            </Button>
          </div>
        )}
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="font-bold text-gray-900">{profile.subject} Help</h1>
            <p className="text-xs text-gray-400">
              {hasMessages
                ? `${messages.filter(m => m.role === 'assistant' && !m.isLoading).length} explanations given`
                : 'Upload your homework to get started'}
            </p>
          </div>
          {!apiKey && (
            <button
              className="flex items-center gap-1.5 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 hover:bg-amber-100 transition-colors"
              onClick={() => setShowApiInput(true)}
            >
              <Settings className="w-3 h-3" />
              Demo Mode — Add API Key
            </button>
          )}
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          {/* Empty state */}
          {!hasMessages && (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div
                className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl mb-4"
                style={{ backgroundColor: selectedAvatar.bgColor }}
              >
                {selectedAvatar.emoji}
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Hi {profile.name}! I'm {selectedAvatar.name} 👋
              </h2>
              <p className="text-gray-500 mt-2 max-w-md">
                I'm here to help you with {profile.subject}. Upload a photo of your homework and I'll explain it step by step — just for {profile.yearLevel}!
              </p>

              {/* Upload buttons in center */}
              <div className="flex gap-3 mt-8">
                <button
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl px-6 py-3 font-medium transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                  Upload Homework Photo
                </button>
                <button
                  className="flex items-center gap-2 bg-white border border-gray-200 hover:border-purple-300 text-gray-600 rounded-2xl px-6 py-3 font-medium transition-colors"
                  onClick={() => cameraRef.current?.click()}
                >
                  <Camera className="w-4 h-4" />
                  Take Photo
                </button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 justify-center max-w-md">
                {['Try a sample question', 'What subjects can you help with?', 'How does this work?'].map(q => (
                  <button
                    key={q}
                    className="text-sm text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full px-4 py-1.5 transition-colors"
                    onClick={() => { setInput(q); textareaRef.current?.focus(); }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map(msg => (
            <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              {msg.role === 'assistant' && (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-xl flex-shrink-0 mt-1"
                  style={{ backgroundColor: selectedAvatar.bgColor }}
                >
                  {selectedAvatar.emoji}
                </div>
              )}
              {msg.role === 'user' && (
                <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-1">
                  {profile.name[0].toUpperCase()}
                </div>
              )}

              <div className={`max-w-2xl flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                {/* Image message */}
                {msg.isImage && msg.imageUrl && (
                  <div className="bg-white border border-gray-200 rounded-2xl p-3 shadow-sm">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <ImageIcon className="w-4 h-4" />
                      Homework uploaded
                    </div>
                    <img
                      src={msg.imageUrl}
                      alt="Homework"
                      className="rounded-xl max-h-48 max-w-xs object-contain border border-gray-100"
                    />
                  </div>
                )}

                {/* Text message */}
                {msg.content && !msg.isImage && (
                  <div
                    className={`rounded-2xl px-5 py-4 text-sm shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-purple-600 text-white rounded-tr-sm'
                        : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                    }`}
                  >
                    {msg.isLoading ? (
                      <div className="flex items-center gap-3 py-1">
                        <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                        <span className="text-gray-400">
                          {selectedAvatar.name} is reading your homework...
                        </span>
                      </div>
                    ) : msg.role === 'assistant' ? (
                      renderMessageContent(msg.content)
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                )}

                {/* Voice button for AI messages */}
                {msg.role === 'assistant' && !msg.isLoading && msg.content && (
                  <button
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${
                      speakingMsgId === msg.id && isSpeaking
                        ? 'bg-purple-100 text-purple-700 border border-purple-300'
                        : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                    }`}
                    onClick={() => handleSpeak(msg)}
                  >
                    {speakingMsgId === msg.id && isSpeaking ? (
                      <><VolumeX className="w-3 h-3" /> Stop</>
                    ) : (
                      <><Volume2 className="w-3 h-3" /> Read aloud</>
                    )}
                  </button>
                )}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Quick prompts (when has messages) */}
        {hasMessages && (
          <div className="px-6 pb-2 flex gap-2 overflow-x-auto flex-shrink-0 scrollbar-hide">
            {quickPrompts.map(p => (
              <button
                key={p}
                className="flex-shrink-0 text-xs text-purple-600 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-full px-3 py-1.5 transition-colors"
                onClick={() => { setInput(p); textareaRef.current?.focus(); }}
                disabled={isProcessing}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input area */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 flex-shrink-0">
          <div className="flex gap-3 items-end">
            {/* Upload button */}
            <button
              className="p-3 rounded-xl border border-gray-200 text-gray-400 hover:border-purple-300 hover:text-purple-600 transition-colors flex-shrink-0"
              onClick={() => fileInputRef.current?.click()}
              title="Upload homework image"
            >
              <Upload className="w-5 h-5" />
            </button>

            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                placeholder={`Ask ${selectedAvatar.name} anything…`}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                className="resize-none rounded-2xl border-gray-200 focus:border-purple-400 pr-12 py-3 min-h-[48px] max-h-32"
                style={{ fieldSizing: 'content' } as React.CSSProperties}
                disabled={isProcessing}
              />
            </div>

            <Button
              disabled={!input.trim() || isProcessing}
              onClick={sendMessage}
              className="p-3 h-12 w-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex-shrink-0 disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </Button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-2">
            Press Enter to send · Shift+Enter for new line
          </p>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
      />
    </div>
  );
}
