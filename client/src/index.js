import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import App from './App';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Product from './pages/Product';
import ShoppingCart from './pages/ShoppingCart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route exact path='/' element={<App />}>
          <Route index path='/' element={<><Home/></>} />
          <Route index path='/product/detail/:slug' element={<><ProductDetail/></>} />
          <Route index path='/product/:collection' element={<><Product/></>} />
          <Route index path='/cart' element={<><ShoppingCart/></>} />
          <Route index path='/checkouts/success/:orderCode' element={<OrderSuccess/>} />
          <Route index path='/checkouts' element={<Checkout/>} />
          
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

