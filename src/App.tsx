
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

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in (simulate checking localStorage)
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simulate login
    localStorage.setItem('userToken', 'fake-token');
    localStorage.setItem('userName', email.split('@')[0]);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
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
