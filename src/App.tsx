import { Routes, Route } from "react-router-dom";
import { LandingLayout } from "@/layout/LandingLayout";
import { AppLayout } from "@/layout/AppLayout";
import HomePage from "@/pages/Landing";
import ChatPage from "@/pages/Chat";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingLayout>
            <HomePage />
          </LandingLayout>
        }
      />
      <Route
        path="/chat"
        element={
          <AppLayout>
            <ChatPage />
          </AppLayout>
        }
      />
      <Route
        path="/chat/:conversationId"
        element={
          <AppLayout>
            <ChatPage />
          </AppLayout>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
