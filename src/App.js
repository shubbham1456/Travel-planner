import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [trips, setTrips] = useState([]);

  const API_KEY = "29129bd98856987c678b3e4a83ecbc2e";

  const getWeather = async () => {
    if (!city) return;

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = await res.json();

    if (data.cod === 200) {
      setWeather(data);
    } else {
      alert("City not found");
    }
  };

  const addTrip = () => {
    if (!weather) {
      alert("Search weather first");
      return;
    }

    const newTrip = {
      id: Date.now(),
      city: weather.name,
      temp: weather.main.temp,
      condition: weather.weather[0].main,
    };

    setTrips([...trips, newTrip]);
    setWeather(null);
    setCity("");
  };

  const deleteTrip = (id) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <div className="container">
      <h1>Travel Planner 🌍</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-box">
          <h2>{weather.name}</h2>
          <p>🌡 Temp: {weather.main.temp} °C</p>
          <p>☁ Condition: {weather.weather[0].main}</p>

          <button onClick={addTrip}>Add Trip</button>
        </div>
      )}

      <h2>Your Trips</h2>

      {trips.map((trip) => (
        <div key={trip.id} className="trip-card">
          <h3>{trip.city}</h3>
          <p>{trip.temp} °C</p>
          <p>{trip.condition}</p>
          <button onClick={() => deleteTrip(trip.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;