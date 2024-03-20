import React from 'react';
import './App.css';
import { AppProvider } from './AppContext';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <AppProvider>
        <Header />
        <Body />
        <Footer />
      </AppProvider>
    </div>
  );
}

export default App;