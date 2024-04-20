import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import { store } from './store/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <GoogleOAuthProvider clientId="714026040429-ah8ji0rvj42m8hhdtuf4uqgoimg7dgld.apps.googleusercontent.com">
      <BrowserRouter>
        <Dashboard />
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
          theme="dark"
        />

      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>

);
