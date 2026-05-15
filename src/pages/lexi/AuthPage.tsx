import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApp } from '@/context/AppContext';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { login, signup, isAuthenticated, profile, selectedAvatar } = useApp();

  const [isSignup, setIsSignup] = useState(params.get('mode') === 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (!profile) navigate('/onboarding');
      else if (!selectedAvatar) navigate('/avatar');
      else navigate('/dashboard');
    }
  }, [isAuthenticated, profile, selectedAvatar, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = isSignup ? signup(email, password) : login(email, password);
    if (!ok) setError('Something went wrong. Please try again.');
    setLoading(false);
  };

  const handleDemo = () => {
    login('demo@lexi.app', 'demo1234');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex flex-col">
      {/* Top bar */}
      <div className="p-6 flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-500 hover:text-purple-600 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xs">L</span>
          </div>
          <span className="text-purple-700 font-bold">Lexi</span>
        </div>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-xl border border-purple-100 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4 text-3xl">
                🧠
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                {isSignup
                  ? 'Start getting homework help in minutes'
                  : 'Log in to continue learning with Lexi'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <Label htmlFor="email" className="text-gray-700 font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mt-1.5 h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-gray-700 font-medium">Password</Label>
                <div className="relative mt-1.5">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-gray-200 focus:border-purple-400 focus:ring-purple-400 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">{error}</p>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-base"
              >
                {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Log In'}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">or</div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 rounded-xl border-purple-200 text-purple-700 hover:bg-purple-50 font-medium"
              onClick={handleDemo}
            >
              Continue with Demo Account
            </Button>

            <p className="text-center text-sm text-gray-500 mt-6">
              {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                className="text-purple-600 font-semibold hover:underline"
                onClick={() => { setIsSignup(!isSignup); setError(''); }}
              >
                {isSignup ? 'Log in' : 'Sign up'}
              </button>
            </p>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing you agree to our Terms of Service and Privacy Policy.
            Lexi is designed to be safe for students of all ages.
          </p>
        </div>
      </div>
    </div>
  );
}
