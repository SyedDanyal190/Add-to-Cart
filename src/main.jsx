import React from 'react';                   // <-- ADD THIS
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import { Provider } from 'react-redux';
import { store } from './redux';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);





  // <StrictMode>
  //   <App />
  // </StrictMode>,
