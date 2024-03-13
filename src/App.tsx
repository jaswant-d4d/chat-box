import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/auth/Login';
import Signup from './screens/auth/Signup';
import SingleChat from './screens/chat-box/SingleChat';
import ProtectedRoute from './routes/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/chat" element={<ProtectedRoute><SingleChat /></ProtectedRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
