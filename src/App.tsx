
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import MobileLayout from "./components/MobileLayout";
import AuthScreen from "./components/AuthScreen";
import MainPage from "./pages/MainPage";
import LeaderboardPage from "./pages/LeaderboardPage";
import ArticlePage from "./pages/ArticlePage";
import ProfilePage from "./pages/ProfilePage";
import MusicPage from "./pages/MusicPage";
import { userManager } from "./utils/userManager";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // Check if user is logged in
    const currentUser = userManager.getCurrentUser();
    console.log('Current user on app load:', currentUser);
    setIsAuthenticated(!!currentUser);
    setIsLoading(false);
  }, []);

  const handleAuth = (email: string, password: string, isSignup: boolean) => {
    console.log('handleAuth called:', { email, isSignup });
    
    let user;
    
    if (isSignup) {
      // Check if user already exists
      const existingUser = userManager.getAllUsers().find(u => u.email === email);
      if (existingUser) {
        alert('User with this email already exists. Please login instead.');
        return;
      }
      user = userManager.registerUser(email, password);
      console.log('User registered:', user);
    } else {
      user = userManager.loginUser(email, password);
      if (!user) {
        alert('Invalid email or password. Please try again or sign up.');
        return;
      }
      console.log('User logged in:', user);
    }
    
    if (user) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    console.log('Logging out user');
    userManager.logoutUser();
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-green to-bright-green flex items-center justify-center">
        <div className="animate-pulse text-white text-2xl font-nunito font-bold">🌿 NatureCapture</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="mobile-app-container">
          {!isAuthenticated ? (
            <AuthScreen onAuth={handleAuth} />
          ) : (
            <BrowserRouter>
              <MobileLayout onLogout={handleLogout}>
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  <Route path="/music" element={<MusicPage />} />
                  <Route path="/article" element={<ArticlePage />} />
                  <Route path="/profile" element={<ProfilePage onLogout={handleLogout} />} />
                </Routes>
              </MobileLayout>
            </BrowserRouter>
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
