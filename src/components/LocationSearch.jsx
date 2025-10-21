import { useState, useEffect } from "react";
import axios from "axios";

export default function LocationSearch({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (!query || selected) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(() => {
      fetchLocations(query);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query, selected]);

  const fetchLocations = async (keyword) => {
    setLoading(true);
    try {
      const token = "";
      const response = await axios.get(
        "https://test.api.amadeus.com/v1/reference-data/locations",
        {
          params: {
            subType: "CITY,AIRPORT",
            keyword,
            "page[limit]": 10,
            view: "LIGHT",
          },
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.amadeus+json",
          },
        }
      );
      setResults(response.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (item) => {
    setSelected(item);
    onSelect(item);
    setQuery(`${item.name} (${item.iataCode})`);
    setResults([]);
  };

  const showDropdown = query && (loading || results.length > 0);

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        placeholder="Введите город или аэропорт"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
        }}
      />
      {showDropdown && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-y-auto shadow-lg">
          {loading && (
            <li className="px-3 py-2 text-gray-500">Загрузка...</li>
          )}
          {!loading && results.length === 0 && (
            <li className="px-3 py-2 text-gray-500">Ничего не найдено</li>
          )}
          {!loading &&
            results.map((item) => (
              <li
                key={item.id}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => handleSelect(item)}
              >
                <span className="font-semibold">{item.iataCode}</span> — {item.name} ({item.subType})
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}
