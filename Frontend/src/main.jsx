import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <GoogleOAuthProvider clientId="24998920135-ngg7luvtfe3a1am8idm74uoct13f9q1r.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>;
    
  </React.StrictMode>,
);
