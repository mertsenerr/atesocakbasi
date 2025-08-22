import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StartersPage from './pages/StartersPage';
import MainsPage from './pages/MainsPage';
import DrinksPage from './pages/DrinksPage';
import DessertsPage from './pages/DessertsPage';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />;
      case 'starters':
        return <StartersPage />;
      case 'mains':
        return <MainsPage />;
      case 'drinks':
        return <DrinksPage />;
      case 'desserts':
        return <DessertsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="App">
      <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="main-content">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;