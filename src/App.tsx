import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import Library from "./pages/Library";
import Collection from "./pages/Collection";
import StudySetup from "./pages/StudySetup";
import StudySession from "./pages/StudySession";
import Settings from "./pages/Settings";
import Insights from "./pages/Insights";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/collection/:collectionId" element={<Collection />} />
          <Route path="/setup/:verseId" element={<StudySetup />} />
          <Route path="/study/:verseId" element={<StudySession />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
