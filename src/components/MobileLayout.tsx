
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Trophy, BookOpen, User, Music } from 'lucide-react';

interface MobileLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Main', emoji: '🏠' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard', emoji: '🏆' },
    { path: '/music', icon: Music, label: 'Music', emoji: '🎵' },
    { path: '/article', icon: BookOpen, label: 'Article', emoji: '📚' },
    { path: '/profile', icon: User, label: 'Profile', emoji: '👤' },
  ];

  return (
    <div className="min-h-screen bg-off-white flex flex-col max-w-md mx-auto relative">
      {/* Main content */}
      <div className="flex-1 pb-20 overflow-y-auto">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-white to-light-green border-t-4 border-forest-green shadow-2xl z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center py-2 px-2 rounded-3xl transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-br from-forest-green to-bright-green text-white shadow-2xl scale-110'
                    : 'text-forest-green hover:bg-light-green hover:scale-105'
                }`}
              >
                <span className="text-2xl mb-1">
                  {item.emoji}
                </span>
                <span className="text-xs font-black">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
