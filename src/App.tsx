import { Routes, Route } from "react-router-dom";
import { LandingLayout } from "@/layout/LandingLayout";
import HomePage from "@/pages/Landing";

export default function App() {
  return (
    <LandingLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </LandingLayout>
  );
}
