
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

  useEffect(() => {
    // Check if user is logged in
    const currentUser = userManager.getCurrentUser();
    setIsAuthenticated(!!currentUser);
    setIsLoading(false);
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Try to login first, if no user exists, register
    let user = userManager.loginUser(email, password);
    if (!user) {
      user = userManager.registerUser(email, password);
    }
    
    if (user) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
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
