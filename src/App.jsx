import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
// import { HexagonBackground } from "./components/ui/shadcn-io/hexagon-background";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* <HexagonBackground  className="fixed inset-0 flex items-center justify-center rounded-xl"/> */}
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App