import * as React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import './index.css'
import App from './App.jsx'
import Home from './routes/Home';
import Info from './routes/Info';
import ThankYou from './routes/ThankYou';
import Gdpr from './routes/Gdpr';

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Wrapper>
      <Routes>
        <Route element={<App />}>
          <Route path="rejestracja" element={<Info />} />
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="gdpr" element={<Gdpr />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route> 
      </Routes>
    </Wrapper>
  </BrowserRouter>
);