import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer.tsx';
import Header from './components/Header/Header.tsx';
import ScrollToTop from './components/ScrollOnTop/ScrollOnTop.tsx';
import './index.css';
import App from './pages/App/App.tsx';
import Auth from './pages/Auth/Auth.tsx';
import Breed from './pages/Breed/Breed.tsx';
import Breeds from './pages/Breeds/Breeds.tsx';
import Favorites from './pages/Favorites/Favorites.tsx';
import NotFound from './pages/NotFound/NotFound.tsx';
import { ROUTES } from './utils/routes.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename="/frontend-challenge/">
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path={`${ROUTES.HOME}`} element={<App />}></Route>
        <Route path={`${ROUTES.BREEDS}`} element={<Breeds />}></Route>
        <Route path={`${ROUTES.BREED}`} element={<Breed />}></Route>
        <Route path={`${ROUTES.FAVORITES}`} element={<Favorites />}></Route>
        <Route path={`${ROUTES.AUTH}`} element={<Auth />}></Route>
        <Route path={`${ROUTES.NOT_FOUND}`} element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </Router>
  </StrictMode>,
);
