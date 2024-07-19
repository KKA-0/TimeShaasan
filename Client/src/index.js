import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import { store } from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home/home';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      document.documentElement.style.overflow = 'scroll';
    } else {
      document.documentElement.style.overflow = 'hidden';
    }
  }, [location.pathname]);

  return (
    <>
      {location.pathname === '/' ? (
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      ) : (
        <Dashboard />
      )}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GoogleOAuth}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
