import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import './App.css'

function App() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
    </Routes>
  );
}

export default App;