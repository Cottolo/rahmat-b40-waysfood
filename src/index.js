import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from "react-query"
import { UserContextProvider } from './context/userContext';
import { BrowserRouter as Router} from "react-router-dom";
import { ProfileContextProvider } from './context/ProfileContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
const client = new QueryClient();
root.render(
  <React.StrictMode>
    <UserContextProvider>
    <ProfileContextProvider>
      <QueryClientProvider client={client}>
        <Router>
        <App />
        </Router>
      </QueryClientProvider>
    </ProfileContextProvider>
    </UserContextProvider >
  </React.StrictMode>
);


