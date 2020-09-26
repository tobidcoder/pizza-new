import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { HelmetProvider } from 'react-helmet-async';
import ProductsContextProvider from './contexts/ProductsContext';
import CartContextProvider from './contexts/CartContext';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
} 

ReactDOM.render(
  // <React.StrictMode>
    
  // </React.StrictMode>,
  // <HelmetProvider>
  // <SnackbarProvider >
  <AlertProvider template={AlertTemplate} {...options}>
  <ProductsContextProvider>
    <CartContextProvider>
    <App />
    </CartContextProvider>
  </ProductsContextProvider>,
  </AlertProvider>,
  // </SnackbarProvider>,
// </HelmetProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
