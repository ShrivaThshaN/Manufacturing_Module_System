import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import Production from "./pages/Production";
import MasterProductionSchedule from "./pages/MasterProductionSchedule";
import MaterialRequirementPlanning from "./pages/MaterialRequirementPlanning";
import Procurement from "./pages/Procurement";
import NotFoundPage from "./pages/NotFoundPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="production" element={<Production />} />
            <Route path="production/mps" element={<MasterProductionSchedule />} />
            <Route path="production/mrp" element={<MaterialRequirementPlanning />} />
            <Route path="procurement" element={<Procurement />} />
            <Route path="order-management" element={<NotFoundPage />} />
            <Route path="inventory" element={<NotFoundPage />} />
            <Route path="logistics" element={<NotFoundPage />} />
            <Route path="quality" element={<NotFoundPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
