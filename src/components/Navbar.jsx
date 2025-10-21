import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-blue-600 text-white px-6 py-3">
      <Link to="/" className="font-bold text-lg">✈️ FlightFinder</Link>
      <div className="space-x-4">
        <Link to="/booking" className="hover:underline">Бронь</Link>
        <Link to="/login" className="hover:underline">Войти</Link>
      </div>
    </nav>
  );
}