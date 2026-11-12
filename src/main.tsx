import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Explore from './pages/Explore'
import LessonDetail from './pages/LessonDetail'
import About from './pages/About'
import Resources from './pages/Resources'
import Community from './pages/Community'
import PetaPikR from './pages/PetaPikR'
import EnglishYourWay from './pages/EnglishYourWay'
import PublicSpeaking from './pages/PublicSpeaking'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<App />} />

        {/* Peta PIK-R dedicated route */}
        <Route path="/peta-pik-r" element={<PetaPikR />} />

        {/* Profil AKAR CERI */}
        <Route path="/profil" element={<About />} />
        <Route path="/about" element={<About />} />

        {/* Eksplorasi Kurikulum */}
        <Route path="/eksplorasi" element={<Explore />} />
        <Route path="/explore" element={<Explore />} />

        {/* Pilar Jalur Belajar: Public Speaking & Communication */}
        <Route path="/pelajaran/public-speaking" element={<PublicSpeaking />} />
        <Route path="/lessons/public-speaking" element={<PublicSpeaking />} />
        <Route path="/pelajaran/speak-confidence" element={<PublicSpeaking />} />
        <Route path="/lessons/speak-confidence" element={<PublicSpeaking />} />

        {/* Pilar Jalur Belajar: English Your Way */}
        <Route path="/pelajaran/english-your-way" element={<EnglishYourWay />} />
        <Route path="/lessons/english-your-way" element={<EnglishYourWay />} />

        {/* Detail Pelajaran */}
        <Route path="/pelajaran/:slug" element={<LessonDetail />} />
        <Route path="/lessons/:slug" element={<LessonDetail />} />

        {/* Sumber Belajar */}
        <Route path="/sumber-belajar" element={<Resources />} />
        <Route path="/resources" element={<Resources />} />

        {/* Komunitas */}
        <Route path="/komunitas" element={<Community />} />
        <Route path="/community" element={<Community />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
