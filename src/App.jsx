import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import './App.css'
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Booking from "./pages/Booking.jsx";
import Register from "./pages/Register.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/booking" element={<Booking />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
