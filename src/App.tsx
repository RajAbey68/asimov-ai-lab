import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AssessmentDashboard from "./pages/AssessmentDashboard";
import AssessmentQuiz from "./pages/Assessment";
import AssessmentInfo from "./pages/AssessmentInfo";
import Resources from "./pages/Resources";
import Framework from "./pages/Framework";
import TeamPage from "./pages/Team";
import Sectors from "./pages/Sectors";
import AdminMedia from "./pages/AdminMedia";
import AdminControlsImport from "./pages/AdminControlsImport";
import AdminConsultations from "./pages/AdminConsultations";
import AdminChatLogs from "./pages/AdminChatLogs";
import ControlsViewer from "./pages/ControlsViewer";
import DesignAudit from "./pages/DesignAudit";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/assessment" element={
              <ProtectedRoute>
                <AssessmentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/assessment/:sessionId" element={
              <ProtectedRoute>
                <AssessmentQuiz />
              </ProtectedRoute>
            } />
            <Route path="/assessment-info" element={<AssessmentInfo />} />
        <Route path="/admin/media" element={
          <ProtectedRoute>
            <AdminMedia />
          </ProtectedRoute>
        } />
        <Route path="/admin/controls-import" element={
          <ProtectedRoute>
            <AdminControlsImport />
          </ProtectedRoute>
        } />
        <Route path="/admin/consultations" element={
          <ProtectedRoute>
            <AdminConsultations />
          </ProtectedRoute>
        } />
        <Route path="/admin/chat-logs" element={
          <ProtectedRoute>
            <AdminChatLogs />
          </ProtectedRoute>
        } />
        <Route path="/admin/design-audit" element={
          <ProtectedRoute>
            <DesignAudit />
          </ProtectedRoute>
        } />
        <Route path="/controls" element={
          <ProtectedRoute>
            <ControlsViewer />
          </ProtectedRoute>
        } />
            <Route path="/framework" element={<Framework />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/team" element={<TeamPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
