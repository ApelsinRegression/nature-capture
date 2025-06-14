
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AuthScreenProps {
  onAuth: (email: string, password: string, isSignup: boolean) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert('Please fill in all fields');
      return;
    }
    console.log('Auth form submitted:', { email, isSignup });
    onAuth(email, password, isSignup);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-green via-bright-green to-light-green flex flex-col">
      {/* Header with nature imagery */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="relative mb-8">
          <img 
            src="/lovable-uploads/f1457e39-8dd6-4e91-9962-d1b090e9bee1.png" 
            alt="Trees" 
            className="w-24 h-24 mx-auto animate-bounce-in"
          />
          <div className="absolute -bottom-2 -right-2">
            <img 
              src="/lovable-uploads/2ff263a7-e0a6-4359-bc0e-9819bf842ba2.png" 
              alt="Leaf" 
              className="w-12 h-12 animate-pulse-green"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-nunito font-bold text-white mb-3">
            🌿 NatureCapture
          </h1>
          <p className="text-xl text-light-green font-semibold">
            Connect with Nature, Track Your Journey
          </p>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-yellow-accent">
            <div className="flex mb-6">
              <button
                onClick={() => setIsSignup(false)}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-lg transition-all ${
                  !isSignup 
                    ? 'bg-forest-green text-white shadow-lg' 
                    : 'bg-light-green text-bright-green'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsSignup(true)}
                className={`flex-1 py-3 px-4 rounded-2xl font-bold text-lg transition-all ml-2 ${
                  isSignup 
                    ? 'bg-forest-green text-white shadow-lg' 
                    : 'bg-light-green text-bright-green'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="🌱 Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 rounded-2xl border-3 border-light-green focus:border-forest-green outline-none text-lg font-semibold"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="🔒 Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 rounded-2xl border-3 border-light-green focus:border-forest-green outline-none text-lg font-semibold"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-forest-green to-bright-green text-white font-bold py-4 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {isSignup ? '🌟 Join Nature!' : '🚀 Let\'s Explore!'}
              </Button>
            </form>

            {/* Quick test accounts info */}
            <div className="mt-4 text-center text-sm text-gray-600">
              <p className="font-semibold">Quick test:</p>
              <p>Email: test@test.com</p>
              <p>Password: test123</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="flex justify-center items-end space-x-4 pb-8">
        <img 
          src="/lovable-uploads/55626c2e-ff58-47bb-bdcb-ea80a1c497bc.png" 
          alt="Footprints" 
          className="w-16 h-16 opacity-80"
        />
        <img 
          src="/lovable-uploads/e735c5d5-87ac-488e-8ec4-835f6a0293cb.png" 
          alt="Flower" 
          className="w-14 h-14 opacity-80"
        />
      </div>
    </div>
  );
};

export default AuthScreen;
