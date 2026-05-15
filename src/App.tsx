import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider, useApp } from "@/context/AppContext";
import HomePage from "@/pages/lexi/HomePage";
import AuthPage from "@/pages/lexi/AuthPage";
import OnboardingPage from "@/pages/lexi/OnboardingPage";
import AvatarPage from "@/pages/lexi/AvatarPage";
import DashboardPage from "@/pages/lexi/DashboardPage";
import TutorPage from "@/pages/lexi/TutorPage";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, profile, selectedAvatar } = useApp();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/onboarding"
        element={isAuthenticated ? <OnboardingPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/avatar"
        element={isAuthenticated && profile ? <AvatarPage /> : <Navigate to={!isAuthenticated ? "/auth" : "/onboarding"} />}
      />
      <Route
        path="/dashboard"
        element={isAuthenticated && profile && selectedAvatar ? <DashboardPage /> : <Navigate to="/" />}
      />
      <Route
        path="/tutor"
        element={isAuthenticated && profile && selectedAvatar ? <TutorPage /> : <Navigate to="/" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
