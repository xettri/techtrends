import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";

const Layout = () => {
  const location = useLocation();
  const isArticlePage = location.pathname.startsWith('/article/');

  return (
    <div className={`min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary ${!isArticlePage ? 'pb-16 md:pb-0' : ''}`}>
      {!isArticlePage && <Navbar />}
      {/* For article pages, we remove default padding and container constraints to allow full-bleed hero images */}
      <main className={`grow w-full ${!isArticlePage ? 'pt-20 px-4 md:pt-24 md:px-6 max-w-7xl mx-auto' : ''}`}>
        <Outlet />
      </main>
      {!isArticlePage && <BottomNav />}
      <Footer />
    </div>
  );
};

export default Layout;
