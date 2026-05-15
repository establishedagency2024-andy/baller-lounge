import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, MessageCircle, Upload, Volume2, Zap, Shield, Star } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">L</span>
            </div>
            <span className="text-xl font-bold text-purple-700">Lexi</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-gray-600" onClick={() => navigate('/auth')}>
              Log in
            </Button>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6"
              onClick={() => navigate('/auth?mode=signup')}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-20 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-indigo-400 blur-3xl" />
          <div className="absolute top-40 right-1/3 w-40 h-40 rounded-full bg-pink-400 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 text-sm border border-white/20">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span>AI-Powered Homework Help</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Homework Help,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Made Simple.
              </span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed max-w-2xl">
              Lexi is your personal AI tutor. Upload a photo of your homework, choose your tutor avatar,
              and get friendly step-by-step explanations made for your school year.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 rounded-full px-8 py-6 text-lg font-semibold shadow-xl"
                onClick={() => navigate('/auth?mode=signup')}
              >
                Start Learning Free
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-6 text-lg"
                onClick={() => navigate('/auth')}
              >
                Try Demo
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-6 text-purple-200 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Safe for kids</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-300" />
                <span>All school years</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>All subjects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example demo strip */}
      <section className="bg-purple-50 py-12 border-y border-purple-100">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm mb-8 uppercase tracking-wide font-medium">
            How Lexi Helps
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
                <span className="text-xl">📸</span>
              </div>
              <p className="font-semibold text-gray-800 mb-1">Mia uploads her maths homework</p>
              <p className="text-sm text-gray-500">"Solve: 3x + 5 = 20"</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mb-4">
                <span className="text-xl">🤖</span>
              </div>
              <p className="font-semibold text-gray-800 mb-1">Lexi reads and understands it</p>
              <p className="text-sm text-gray-500">"This is an algebra equation. Let's solve for x together."</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center mb-4">
                <span className="text-xl">✅</span>
              </div>
              <p className="font-semibold text-gray-800 mb-1">Step-by-step explanation</p>
              <p className="text-sm text-gray-500">"Step 1: Subtract 5 → 3x = 15. Step 2: Divide by 3 → x = 5"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything a student needs
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Lexi is built to make homework less stressful and learning more rewarding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Upload,
                color: 'bg-purple-100 text-purple-600',
                title: 'Upload Any Homework',
                desc: 'Take a photo or upload an image of your homework. Lexi reads it instantly.',
              },
              {
                icon: Brain,
                color: 'bg-blue-100 text-blue-600',
                title: 'Smart AI Understanding',
                desc: 'Lexi identifies the subject, understands the question, and tailors the explanation to your year level.',
              },
              {
                icon: BookOpen,
                color: 'bg-green-100 text-green-600',
                title: 'Step-by-Step Guidance',
                desc: 'Never just an answer. Lexi walks through the full process so you actually learn.',
              },
              {
                icon: MessageCircle,
                color: 'bg-orange-100 text-orange-600',
                title: 'Ask Follow-Up Questions',
                desc: '"Can you make it simpler?" or "Show me another example" — Lexi keeps helping.',
              },
              {
                icon: Volume2,
                color: 'bg-pink-100 text-pink-600',
                title: 'Voice Explanations',
                desc: 'Prefer to listen? Press play and hear Lexi explain the answer out loud.',
              },
              {
                icon: Star,
                color: 'bg-yellow-100 text-yellow-600',
                title: 'Choose Your Avatar',
                desc: 'Pick your personal tutor character. Lexi adapts to your style and makes learning fun.',
              },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="group p-6 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-gray-500 text-lg">From login to learning in under a minute.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Enter your name, year level, and the subject you need help with.', emoji: '📝' },
              { step: '02', title: 'Choose Your Avatar', desc: 'Pick the tutor character that feels right for you.', emoji: '🎭' },
              { step: '03', title: 'Upload Homework', desc: 'Take a photo or upload an image of your homework question.', emoji: '📸' },
              { step: '04', title: 'Learn With Lexi', desc: 'Get a friendly, step-by-step explanation and keep asking questions.', emoji: '🧠' },
            ].map(({ step, title, desc, emoji }) => (
              <div key={step} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-purple-600 text-white flex items-center justify-center mx-auto mb-4 shadow-lg text-2xl">
                  {emoji}
                </div>
                <div className="text-xs font-bold text-purple-400 mb-2 tracking-widest">STEP {step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-indigo-700 text-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to understand your homework?</h2>
          <p className="text-purple-200 text-lg mb-8">
            Join students who learn better with Lexi. It's free to try.
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-700 hover:bg-purple-50 rounded-full px-10 py-6 text-lg font-semibold shadow-xl"
            onClick={() => navigate('/auth?mode=signup')}
          >
            Start Learning Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">L</span>
            </div>
            <span className="text-purple-700 font-bold">Lexi</span>
          </div>
          <p className="text-gray-400 text-sm">© 2025 Lexi. AI homework help for every student.</p>
          <p className="text-gray-400 text-sm flex items-center gap-1">
            <Shield className="w-3 h-3" /> Safe & child-friendly
          </p>
        </div>
      </footer>
    </div>
  );
}
