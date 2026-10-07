import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import FloatingDock from "./components/FloatingDock";
import PageTranslator from "./components/PageTranslator";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import Booking from "./pages/Booking";
import Quote from "./pages/Quote";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";
import { LanguageProvider } from "./i18n";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <HashRouter>
        <ScrollToTop />
        <ScrollProgress />
        <div className="noise-layer" aria-hidden />
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tjanster/:slug" element={<ServicePage />} />
            <Route path="/bokning" element={<Booking />} />
            <Route path="/offert" element={<Quote />} />
            <Route path="/om-oss" element={<About />} />
            <Route path="/blogg" element={<Blog />} />
            <Route path="/blogg/:slug" element={<BlogPost />} />
            <Route path="/kontakt" element={<Contact />} />
            <Route path="/integritetspolicy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <PageTranslator />
        <Footer />
        <FloatingDock />
      </HashRouter>
    </LanguageProvider>
  );
}
