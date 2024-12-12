import { useState, useEffect } from 'react';
import './App.css';

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

function App() {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const [apiData, setApiData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const debouncedCity = useDebounce(city, 500);

  const fetchWeatherData = async (cityName) => {
    if (!cityName) return;
    setLoading(true);
    setError(null);
    try {
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        throw new Error("City not found");
      }

      const { lat, lon } = geoData[0];
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      setApiData(weatherData);
    } catch (err) {
      setError(err.message || "Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedCity) {
      fetchWeatherData(debouncedCity);
    } 
    // return () => {
    //   setCity("")
    // }
  }, [debouncedCity]);

  return (
    <div className="container">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter City"
      />
      
      {loading && <p>Loading...</p>}
      
      {error && <p className="error">{error}</p>}
      
      {apiData && !loading && !error && (
        <div className="weather-container">
          <h2>{apiData.name}</h2>
          <p>Temperature: {apiData.main.temp}°C</p>
          <p>Humidity: {apiData.main.humidity}%</p>
          <p>Weather: {apiData.weather[0].description}</p>
        </div>
      )}
      
      {apiData === null && !loading && !error && (
        <p>No data available. Please enter a city.</p>
      )}
    </div>
  );
}

export default App;
