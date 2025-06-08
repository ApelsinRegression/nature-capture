
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
import UserDataManager from "./utils/userDataManager";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize UserDataManager (this will wipe all data)
    UserDataManager.getInstance();
    
    // Check if user is logged in
    const token = localStorage.getItem('userToken');
    const currentUserId = localStorage.getItem('currentUserId');
    
    // Only set as authenticated if both token and user exist
    setIsAuthenticated(!!token && !!currentUserId);
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login - this should create a new user account
    localStorage.setItem('userToken', 'fake-token');
    
    // Extract username from email and create user
    const username = email.split('@')[0];
    const userDataManager = UserDataManager.getInstance();
    
    // Create the first user account
    userDataManager.initializeUser(username, 'Unknown City', '🌱');
    
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    const userDataManager = UserDataManager.getInstance();
    userDataManager.logout();
    localStorage.removeItem('userToken');
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
            <AuthScreen onLogin={handleLogin} />
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
