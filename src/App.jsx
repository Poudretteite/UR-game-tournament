import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Page from '../app.js';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Page>
          <Outlet />
        </Page>
      </main>
      <Footer />
    </div>
  )
}

export default App