import { useState } from "react";
import { searchFlights } from "../api/amadeus";
import FlightCard from "./../components/FlightCard.jsx";
import LocationSearch from "../components/LocationSearch.jsx";

export default function SearchFlights() {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState("2025-10-23");
  const [returnDate, setReturnDate] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState("ECONOMY");

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await searchFlights({
        originLocationCode: origin.iataCode,
        destinationLocationCode: destination.iataCode,
        departureDate,
        returnDate,
        adults,
        children,
        infants,
        travelClass,
      });
      setFlights(data.data || []);
    } catch (err) {
      alert("Ошибка: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Поиск авиабилетов
      </h1>

      {/* 🔍 Форма поиска */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
        <div className="">
          <label className="font-medium">Откуда:</label>
          <LocationSearch onSelect={setOrigin} />
        </div>
        <div className="">
          <label className="font-medium">Куда:</label>
          <LocationSearch onSelect={setDestination} />
        </div>
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          placeholder="Обратная дата"
          className="border p-2 rounded"
        />
      </div>

      {/* 👨‍👩‍👧 Пассажиры и класс */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Взрослые</label>
          <input
            type="number"
            min="1"
            max="9"
            value={adults}
            onChange={(e) => setAdults(+e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Дети</label>
          <input
            type="number"
            min="0"
            max="8"
            value={children}
            onChange={(e) => setChildren(+e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Младенцы</label>
          <input
            type="number"
            min="0"
            max={adults}
            value={infants}
            onChange={(e) => setInfants(+e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Класс</label>
          <select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="ECONOMY">Эконом</option>
            <option value="PREMIUM_ECONOMY">Премиум эконом</option>
            <option value="BUSINESS">Бизнес</option>
            <option value="FIRST">Первый класс</option>
          </select>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        {loading ? "Поиск..." : "Найти рейсы"}
      </button>

      <div className="mt-6 space-y-4">
        {flights.map((f) => (
          <FlightCard offer={f} />
        ))}
      </div>
    </div>
  );
}
