import { useEffect, useState } from "react";
import { getCoords } from "./utils";

const API_KEY = "078c05dabd0b3d537d154bf4ba0354fc";

function Weather() {
  const [currentWeather, setCurrentWeather] = useState([]);
  const [fiveDayForecast, setFiveDayForecast] = useState([]);

  const separateForecast = (forecast) => {
    const separatedForecast = [];

    // Iterate through the list of forecast entries
    forecast.forEach((entry) => {
      // Extract the date from the timestamp (assuming timestamps are in seconds)
      const timestamp = new Date(entry.dt * 1000);
      const date = timestamp.toDateString();

      // Check if there's an array for the current date in 'separatedForecast'
      let dailyForecast = separatedForecast.find((item) => item.date === date);

      // If an array doesn't exist for the current date, create one
      if (!dailyForecast) {
        dailyForecast = {
          date: date,
          forecast: [],
        };
        separatedForecast.push(dailyForecast);
      }

      // Add the current forecast entry to the array for the current date
      dailyForecast.forecast.push({
        time: timestamp.toLocaleTimeString(),
        temperature: entry.main.temp,
        weather: entry.weather[0].description,
      });
    });
    return separatedForecast;
  };

  useEffect(() => {
    getCoords();
    const coords = JSON.parse(localStorage.getItem("coords")) || {};
    const getWeather = async () => {
      const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${coords?.lat}&lon=${coords?.lng}&appid=${API_KEY}&units=metric`;
      try {
        const response = await fetch(forecastURL);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        const currentDay = data.list.filter((item) => {
          const timestamp = new Date(item.dt * 1000);
          const today = new Date();
          return timestamp.getDate() === today.getDate();
        });
        console.log({ forecast: data, currentDay });
        setCurrentWeather(currentDay);

        setFiveDayForecast(separateForecast(data.list));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getWeather();
  }, []);

  console.log({ fiveDayForecast });

  return (
    <div className='w-full flex-1 flex flex-col gap-4 py-4'>
      <h1 className='text-xl font-semibold px-4'>Today&lsquo;s weather</h1>
      <div className='flex w-screen whitespace-nowrap overflow-x-auto'>
        <div className='px-4 flex gap-2'>
          {currentWeather?.map((weather) => (
            <div key={weather.dt}>
              <p>{weather.dt_txt.split(" ")[1]}</p>
              <p>temp: {weather.main.temp}c</p>
            </div>
          ))}
        </div>
      </div>
      <h1 className='text-xl font-semibold px-4'>5 day weather forecast</h1>
      <div className='flex w-screen whitespace-nowrap overflow-x-auto'>
        <div className='px-4 flex gap-2'>
          {fiveDayForecast?.map((day) => (
            <div key={day.date} className='flex flex-col gap-4'>
              <p>{day.date}</p>
              {day.forecast?.map((weather) => (
                <div key={weather.dt}>
                  <p>{weather.time}</p>
                  <p>{weather.weather}</p>
                  <p>temp: {weather.temperature}c</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Weather;
