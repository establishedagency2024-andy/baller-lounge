import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useApp, AVATARS, AvatarOption } from '@/context/AppContext';
import { ChevronLeft, CheckCircle } from 'lucide-react';

export default function AvatarPage() {
  const navigate = useNavigate();
  const { selectAvatar, isAuthenticated, profile, selectedAvatar: existing } = useApp();

  if (!isAuthenticated || !profile) {
    navigate(!isAuthenticated ? '/auth' : '/onboarding');
    return null;
  }

  const [chosen, setChosen] = useState<AvatarOption | null>(existing);

  const handleConfirm = () => {
    if (!chosen) return;
    selectAvatar(chosen);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/onboarding')}
          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors text-sm"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">L</span>
          </div>
          <span className="text-purple-700 font-bold">Lexi</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              Choose your tutor, {profile.name}
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Pick the avatar that feels right for you. They'll guide you through every homework session.
            </p>
          </div>

          {/* Avatar grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {AVATARS.map(avatar => {
              const isSelected = chosen?.id === avatar.id;
              return (
                <button
                  key={avatar.id}
                  onClick={() => setChosen(avatar)}
                  className={`relative group p-6 rounded-3xl border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 shadow-lg shadow-purple-100'
                      : 'border-gray-100 bg-white hover:border-purple-200 hover:shadow-md'
                  }`}
                >
                  {isSelected && (
                    <CheckCircle
                      className="absolute top-3 right-3 w-5 h-5 text-purple-600"
                      fill="currentColor"
                    />
                  )}
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-3 transition-transform group-hover:scale-110 duration-200"
                    style={{ backgroundColor: avatar.bgColor }}
                  >
                    {avatar.emoji}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg">{avatar.name}</h3>
                  <p className="text-sm text-gray-500 mt-0.5">{avatar.description}</p>
                  <div
                    className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium"
                    style={{ backgroundColor: avatar.bgColor, color: avatar.color }}
                  >
                    {avatar.personality}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Preview selected */}
          {chosen && (
            <div
              className="rounded-2xl p-6 mb-6 flex items-center gap-5 border-2 transition-all"
              style={{ borderColor: chosen.color + '40', backgroundColor: chosen.bgColor + '80' }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                style={{ backgroundColor: chosen.bgColor }}
              >
                {chosen.emoji}
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">You chose {chosen.name}!</p>
                <p className="text-gray-600 text-sm mt-0.5">
                  {chosen.name} will be your personal tutor — {chosen.personality} and always ready to help.
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  "Hi {profile.name}! I'm {chosen.name}. I can't wait to help you with {profile.subject}. Let's get started!"
                </p>
              </div>
            </div>
          )}

          <Button
            disabled={!chosen}
            onClick={handleConfirm}
            className="w-full h-14 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg disabled:opacity-50"
          >
            {chosen ? `Start Learning with ${chosen.name}` : 'Select an avatar first'}
          </Button>
        </div>
      </div>
    </div>
  );
}
