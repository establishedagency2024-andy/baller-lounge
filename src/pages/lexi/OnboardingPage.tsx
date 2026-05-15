import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp, StudentProfile } from '@/context/AppContext';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const YEAR_LEVELS = [
  'Kindergarten', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6',
  'Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12',
];

const SUBJECTS = [
  { id: 'maths', label: 'Maths', emoji: '📐' },
  { id: 'english', label: 'English', emoji: '📚' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'history', label: 'History', emoji: '🏛️' },
  { id: 'geography', label: 'Geography', emoji: '🌏' },
  { id: 'reading', label: 'Reading', emoji: '📖' },
  { id: 'writing', label: 'Writing', emoji: '✏️' },
  { id: 'general', label: 'General Help', emoji: '💡' },
];

const LEARNING_STYLES = [
  { id: 'text', label: 'Explain with text', emoji: '📝' },
  { id: 'voice', label: 'Explain with voice', emoji: '🔊' },
  { id: 'visuals', label: 'Explain with visuals', emoji: '🖼️' },
  { id: 'steps', label: 'Step by step', emoji: '🪜' },
];

const LOCATIONS = ['Australia', 'United Kingdom', 'United States', 'Canada', 'New Zealand', 'Ireland', 'Other'];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { saveProfile, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<StudentProfile>({
    name: '',
    age: '',
    location: 'Australia',
    school: '',
    yearLevel: '',
    subject: '',
    learningStyle: 'steps',
  });
  const [errors, setErrors] = useState<Partial<StudentProfile>>({});

  const set = (key: keyof StudentProfile, value: string) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const validateStep = () => {
    const errs: Partial<StudentProfile> = {};
    if (step === 1) {
      if (!form.name.trim()) errs.name = 'Please enter your name';
      if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 5 || Number(form.age) > 20)
        errs.age = 'Please enter a valid age (5–20)';
    }
    if (step === 2) {
      if (!form.yearLevel) errs.yearLevel = 'Please select your year level';
      if (!form.subject) errs.subject = 'Please select a subject';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleSubmit = () => {
    if (!validateStep()) return;
    saveProfile(form);
    navigate('/avatar');
  };

  const progressPct = ((step - 1) / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">L</span>
          </div>
          <span className="text-purple-700 font-bold">Lexi</span>
        </div>
        <span className="text-sm text-gray-400">Step {step} of 3</span>
      </div>

      {/* Progress bar */}
      <div className="px-6">
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden max-w-md mx-auto">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${progressPct + 33}%` }}
          />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Let's get to know you</h2>
                <p className="text-gray-500 mt-1">Tell Lexi a bit about yourself.</p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-700 font-medium">Your first name</Label>
                  <Input
                    placeholder="e.g. Mia"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    className="mt-1.5 h-12 rounded-xl"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Your age</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 14"
                    value={form.age}
                    onChange={e => set('age', e.target.value)}
                    className="mt-1.5 h-12 rounded-xl"
                    min={5}
                    max={20}
                  />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Where are you located?</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {LOCATIONS.map(loc => (
                      <button
                        key={loc}
                        onClick={() => set('location', loc)}
                        className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                          form.location === loc
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">School name (optional)</Label>
                  <Input
                    placeholder="e.g. Riverside High School"
                    value={form.school}
                    onChange={e => set('school', e.target.value)}
                    className="mt-1.5 h-12 rounded-xl"
                  />
                </div>
              </div>
              <Button
                className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                onClick={next}
              >
                Continue <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  What are you studying, {form.name}?
                </h2>
                <p className="text-gray-500 mt-1">This helps Lexi explain things at your level.</p>
              </div>
              <div className="space-y-5">
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">Your year level</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {YEAR_LEVELS.map(yr => (
                      <button
                        key={yr}
                        onClick={() => set('yearLevel', yr)}
                        className={`py-2 px-3 rounded-xl text-sm font-medium border transition-all ${
                          form.yearLevel === yr
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        {yr}
                      </button>
                    ))}
                  </div>
                  {errors.yearLevel && <p className="text-red-500 text-xs mt-1">{errors.yearLevel}</p>}
                </div>
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">Subject you need help with</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {SUBJECTS.map(({ id, label, emoji }) => (
                      <button
                        key={id}
                        onClick={() => set('subject', label)}
                        className={`flex items-center gap-2 py-3 px-4 rounded-xl text-sm font-medium border transition-all text-left ${
                          form.subject === label
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <span>{emoji}</span>
                        {label}
                      </button>
                    ))}
                  </div>
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-xl"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                  onClick={next}
                >
                  Continue <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">How do you like to learn?</h2>
                <p className="text-gray-500 mt-1">Lexi will match your preferred style.</p>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {LEARNING_STYLES.map(({ id, label, emoji }) => (
                  <button
                    key={id}
                    onClick={() => set('learningStyle', label)}
                    className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.learningStyle === label
                        ? 'bg-purple-50 border-purple-500'
                        : 'bg-white border-gray-100 hover:border-purple-200'
                    }`}
                  >
                    <span className="text-2xl">{emoji}</span>
                    <div>
                      <p className={`font-semibold ${form.learningStyle === label ? 'text-purple-700' : 'text-gray-800'}`}>
                        {label}
                      </p>
                    </div>
                    {form.learningStyle === label && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 h-12 rounded-xl" onClick={() => setStep(2)}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back
                </Button>
                <Button
                  className="flex-1 h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold"
                  onClick={handleSubmit}
                >
                  Choose My Avatar <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
