
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MobileLayout from "./components/layout/MobileLayout";
import PatrimonioPage from "./pages/PatrimonioPage";
import HoldingsPage from "./pages/HoldingsPage";
import CriarHoldingPage from "./pages/CriarHoldingPage";
import HoldingDetalhesPage from "./pages/HoldingDetalhesPage";
import DocumentScannerPage from "./pages/DocumentScannerPage";
import SucessorioPage from "./pages/SucessorioPage";
import DocumentosPage from "./pages/DocumentosPage";
import MetasPage from "./pages/MetasPage";
import ComunicacaoPage from "./pages/ComunicacaoPage";
import ConfiguracoesPage from "./pages/ConfiguracoesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MobileLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/patrimonio" element={<PatrimonioPage />} />
            <Route path="/holdings" element={<HoldingsPage />} />
            <Route path="/holdings/criar" element={<CriarHoldingPage />} />
            <Route path="/holdings/:id" element={<HoldingDetalhesPage />} />
            <Route path="/document-scanner" element={<DocumentScannerPage />} />
            <Route path="/sucessorio" element={<SucessorioPage />} />
            <Route path="/documentos" element={<DocumentosPage />} />
            <Route path="/metas" element={<MetasPage />} />
            <Route path="/comunicacao" element={<ComunicacaoPage />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
