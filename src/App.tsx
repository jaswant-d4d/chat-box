import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import SingleChat from './screens/chat-box/SingleChat';
import ProtectedRoute from './routes/PrivateRoute';
import Layout from './layouts';
import { useEffect } from 'react';
import Success from './screens/payment/Success';
import Cancel from './screens/payment/Cancel';
import Checkout from './screens/payment/Checkout';

function App() {
  const location = useLocation()

  useEffect(() => {
    window.scroll(0, 0)
  }, [location]);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/success' element={<Success />} />
          <Route path='/cancel' element={<Cancel />} />
        </Route>
          <Route path="/chat" element={<ProtectedRoute><SingleChat /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
