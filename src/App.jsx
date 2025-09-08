import * as React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { Particles } from "./components/ui/shadcn-io/particles";
import { RetroGrid } from "./components/ui/shadcn-io/retro-grid";

function App() {
  return (
    <>
    <div className="flex flex-col min-h-screen bg-[#07102c] z-10 overflow-hidden">
      <Header/>
      <main className="flex-grow z-20">
        <Outlet/>
      </main>
      <Footer />
    </div>
    <Particles className="fixed inset-0 flex items-center justify-center text-white===== z-10"/>
    <RetroGrid className="fixed inset-0 flex items-center justify-center z-10"/>
    </>
  )
}

export default App