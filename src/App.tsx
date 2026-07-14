import { Routes, Route } from "react-router-dom";
import { LandingLayout } from "@/layout/LandingLayout";
import HomePage from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={
        <LandingLayout>
          <HomePage />
        </LandingLayout>
      } />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
