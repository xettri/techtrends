import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ArticlePage from "./pages/Article";
import Trending from "./pages/Trending";
import Categories from "./pages/Categories";
import Latest from "./pages/Latest";
import About from "./pages/About";
import './index.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="article/:id" element={<ArticlePage />} />
          <Route path="trending" element={<Trending />} />
          <Route path="categories" element={<Categories />} />
          <Route path="latest" element={<Latest />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<div className="text-center py-20">404 Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
