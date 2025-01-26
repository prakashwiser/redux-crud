import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/Store';
import ProductList from './Components/ProductList';
import AddProduct from './Components/AddProduct';

// Main App Component
const App = () => (
  <Provider store={store}>
    <AddProduct />
    <ProductList />
  </Provider>
);

// Mount the App component using React 18's new API
ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
