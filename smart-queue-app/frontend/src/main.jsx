import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';
import CartScreen from './screens/CartScreen.jsx';
import HomeScreen from './screens/Homescreen.jsx'; // <--- Make sure this import is correct
import ProductScreen from './screens/ProductScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import ShippingScreen from './screens/ShippingScreen.jsx';
import PaymentScreen from './screens/PaymentScreen.jsx';
import PlaceOrderScreen from './screens/PlaceOrderScreen.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      {/* The Question Mark (?) is VERY important! */}
      <Route path='/cart/:id?' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/shipping' element={<ShippingScreen />} />
      <Route path='/payment' element={<PaymentScreen />} />
      <Route path='/placeorder' element={<PlaceOrderScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);