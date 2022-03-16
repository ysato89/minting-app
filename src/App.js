import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/navigation';
import { Footer } from './components/footer';
import { Dashboard } from './pages/Dashboard';
import { Sales } from './pages/Sales';
import SmoothScroll from 'smooth-scroll';
import './App.css';
import { Rinkeby, DAppProvider } from '@usedapp/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const config = {
  readOnlyChainId: Rinkeby.chainId,
  readOnlyUrls: {
    [Rinkeby.chainId]: 'https://rinkeby.infura.io/v3/a884776a9c0e4fdeb31b654651ed780d'
  }
};

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true
});

const App = () => {
  return (
    <BrowserRouter>
      <DAppProvider config={config}>
        <div>
          <Navigation />
          <Routes>
            <Route path="/mint" element={<Sales />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
          <Footer />
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </DAppProvider>
    </BrowserRouter>
  );
};

export default App;
