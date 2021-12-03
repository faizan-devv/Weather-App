import React, { useState, useEffect } from "react";
import styles from "./WeatherCard.module.css";
import { useSelector, useDispatch } from "react-redux";
import allActions from "../../redux/actions";

function WeatherCard() {
  const storeData = useSelector((state) => state);
  const weatherData = useSelector((state) => state.FetchCurrentWeather.Data);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [def, setDef] = useState(true);
  const [coords, setCoords] = useState("");

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const timeBuilder = (d) => {
    let Hours = [
      "12 ",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
    ];
    let hours = Hours[d.getHours()];
    let temp = d.getMinutes();
    let mins = 0;
    if (temp < 10) {
      mins = `0${temp}`;
    } else {
      mins = temp;
    }

    let units = "";
    if (d.getHours() >= 0 && d.getHours() <= 11) {
      units = "AM";
    } else {
      units = "PM";
    }

    return `${hours}: ${mins} ${units}`;
  };

  const search = (e) => {
    if (e.key === "Enter") {
      dispatch(allActions.FetchCurrentWeatherAction(query));
      setDef(false);
    }
  };
  function fetchWeather() {
    var temp;
    navigator.geolocation.getCurrentPosition(
      function (position) {
        temp = position.coords.latitude + "," + position.coords.longitude;
        setCoords(temp);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
    if (coords.length !== 0) {
      dispatch(allActions.FetchCurrentWeatherAction(coords));
    }
  }
  useEffect(() => {
    if (def) {
      fetchWeather();
    }
  }, [coords]);
  return (
    <div
      className={
        weatherData.current?.temperature > 18
          ? ` ${styles.app} ${styles.appWarm}`
          : ` ${styles.app} ${styles.appCold}`
      }
    >
      <main>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search..."
            onKeyPress={search}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div>
          <div>
            <div className={styles.WeatherImage}>
              <img
                src={weatherData.current?.weather_icons[0]}
                alt="Weather Img"
              />
            </div>
          </div>
          <div className={styles.locationBox}>
            <div className={styles.location}>
              {weatherData.location?.name}, {weatherData.location?.country}
            </div>
            <div className={styles.date}>
              {dateBuilder(new Date(weatherData.location?.localtime))}
            </div>
            <div className={styles.date}>
              {timeBuilder(new Date(weatherData.location?.localtime))}
            </div>
          </div>
          <div className={styles.weatherBox}>
            <div className={styles.temp}>
              {weatherData.current?.temperature}°c
            </div>
            <div className={styles.weather}>
              {weatherData.current?.weather_descriptions[0]}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default WeatherCard;
