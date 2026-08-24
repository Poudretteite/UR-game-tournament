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
import Plan from './routes/Plan';
import Gallery from './routes/Gallery';
import Form from './routes/Form';
import Form_alt from './routes/Form_alt';
import Contact from './routes/Contact';

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
          <Route path="info" element={<Info />} />
          <Route path="rejestracja" element={<Form />} />
          {/*<Route path="form" element={<Form_alt />} />*/}
          {/*<Route path="plan" element={<Plan />} />*/}
          <Route path="thankyou" element={<ThankYou />} />
          <Route path="contact" element={<Contact />} />
          <Route path="gdpr" element={<Gdpr />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route> 
      </Routes>
    </Wrapper>
  </BrowserRouter>
);