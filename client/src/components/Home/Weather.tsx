import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import CloudIcon from "@mui/icons-material/Cloud";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import GrainIcon from "@mui/icons-material/Grain";
import WeatherLoading from "../Shimmers/WeatherLoading";

const api = {
  key: "9f3d7de90e858a9b3aec2c282802878f",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  async function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoordinates(latitude, longitude);
        },
        (error) => {
          console.error(error);
        },
      );
    } else {
      console.error("Geolocation is not available.");
    }
  }

  async function fetchWeatherByCoordinates(latitude, longitude) {
    try {
      const res = await axios.get(
        `${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}&units=metric`,
      );
      console.log(res)
      if (res.status === 200) {
        setWeather(res.data);
        fetchLocationName(latitude, longitude);
      }
    } catch (error) {
      console.error("Weather fetch error:", error);
    }
  }

  async function fetchLocationName(latitude, longitude) {
    try {
      const res = await axios.get(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
      );
      if (res.status === 200) {
        setLocationData(res.data);
      }
    } catch (error) {
      console.error("Location fetch error:", error);
    }
  }

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Clear":
        return <WbSunnyIcon style={{ fontSize: 32 }} />;
      case "Clouds":
        return <CloudIcon style={{ fontSize: 32 }} />;
      case "Snow":
        return <AcUnitIcon style={{ fontSize: 32 }} />;
      case "Rain":
      case "Drizzle":
      case "Thunderstorm":
        return <GrainIcon style={{ fontSize: 32 }} />;
      default:
        return <WbSunnyIcon style={{ fontSize: 32 }} />;
    }
  };
  const getCurrentDateTime = () => {
    const date = new Date();
    const options = {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedDateTime = date.toLocaleString("en-US", options);
    return formattedDateTime;
  };
  return (
    <Container className="rounded-2xl shadow-grey-800 m-6 ">
      <header className="App-header">
        {typeof weather.main !== "undefined" ? (
          <Card>
            <CardContent>
                <h1 className="font-semibold underline">{getCurrentDateTime() }</h1>
              <Grid >
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    component="div"
                    style={{ fontWeight: "bold" }}
                  >
                    {locationData ? locationData.city : weather.name}
                  </Typography>
                  <Typography
                    variant="h6"
                    component="div"
                    style={{ fontSize: "1.5rem" }}
                  >
                    {weather.main.temp.toFixed(1)}°C
                  </Typography>
                  <Typography variant="" style={{ fontWeight: "bold" }}>
                    {weather.weather[0].main}{" "}
                    {getWeatherIcon(weather.weather[0].main)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <Typography variant="body1">
            <WeatherLoading/>
          </Typography>
        )}
      </header>
    </Container>
  );
};

export default Weather;

