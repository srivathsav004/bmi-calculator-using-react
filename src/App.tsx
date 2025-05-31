import React from 'react';
import Background from './components/Background';
import Calculator from './components/Calculator';
import Footer from './components/Footer';
import Header from './components/Header';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <div className="min-h-screen relative font-sans">
      <Background />
      <div className="container mx-auto px-4 py-8">
        <Header />
        <Calculator />
        <Footer />
      </div>
    </div>
  );
}

export default App;