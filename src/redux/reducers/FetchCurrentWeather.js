const initialState = {
  Data: {},
  loading: false,
  error: null,
};

const FetchCurrentWeather = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CURRENT_WEATHER":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_CURRENT_WEATHER_SUCCESS":
      return {
        ...state,
        loading: false,
        Data: action.payload,
      };
    case "FETCH_CURRENT_WEATHER_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default FetchCurrentWeather;
