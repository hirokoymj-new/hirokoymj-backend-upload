module.exports = {
  Query: {
    currentWeatherByCity: (_, { city, unit = "metric" }, { dataSources }) =>
      dataSources.weatherAPI.getCurrentWeatherByCity(city, unit),
    dailyForecast: (_, { city, unit = "metric" }, { dataSources }) =>
      dataSources.weatherAPI.getDailyForecast(city, unit),
  },
};
