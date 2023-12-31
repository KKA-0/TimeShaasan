import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css';
import {store} from './store/store'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter } from "react-router-dom";
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="714026040429-ah8ji0rvj42m8hhdtuf4uqgoimg7dgld.apps.googleusercontent.com">
          <BrowserRouter>
          <DndProvider backend={HTML5Backend}>
            <Dashboard />
          </DndProvider>
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>
  </React.StrictMode>
);
