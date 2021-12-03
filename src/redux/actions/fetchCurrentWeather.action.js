const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

const fetchCurrentWeather = (query) => async (dispatch) => {
  dispatch(requestCurrentWeather());
  try {
    const response = await fetch(
      `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${query}`
    );
    const Data = await response.json();
    dispatch({ type: "FETCH_CURRENT_WEATHER_SUCCESS", payload: Data });
  } catch (error) {
    dispatch({ type: "FETCH_CURRENT_WEATHER_FAILURE", payload: error });
  }
};

const requestCurrentWeather = () => {
  return {
    type: "FETCH_CURRENT_WEATHER",
  };
};

export default fetchCurrentWeather;
