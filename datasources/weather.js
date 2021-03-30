const { RESTDataSource } = require("apollo-datasource-rest");
const get = require("lodash/get");
const map = require("lodash/map");

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.openweathermap.org/";
    this.apiKey = "be2d43efb7b89c5d69256d7ec44da9b8";
  }

  async getCurrentWeatherByCity(city, unit) {
    const response = await this.get(
      `data/2.5/weather?q=${city}&units=${unit}&appid=${this.apiKey}`
    );

    const id = get(response, "id"); // City Id
    const cityInfo = {
      name: get(response, "name", ""),
      country: get(response, "sys.country", ""),
      lon: get(response, "coord.lon"),
      lat: get(response, "coord.lat"),
    };
    const weather = {
      dt: get(response, "dt"),
      condition: get(response, "weather[0].main"),
      description: get(response, "weather[0].description"),
      icon: get(response, "weather[0].icon"),
      temperature: {
        day: get(response, "main.temp"),
        min: get(response, "main.temp_min"),
        max: get(response, "main.temp_max"),
      },
      feelsLike: get(response, "main.feels_like"),
      humidity: get(response, "main.humidity"),
    };

    return {
      id,
      cityInfo,
      weather,
    };
  }

  async getDailyForecast(city, unit) {
    const days = 7;
    const response = await this.get(
      `data/2.5/forecast/daily?q=${city}&units=${unit}&cnt=${days}&appid=${this.apiKey}`
    );

    const id = get(response, "city.id");
    const cityInfo = {
      name: get(response, "city.name"),
      country: get(response, "city.country"),
      lon: get(response, "city.coord.lon", 0),
      lat: get(response, "city.coord.lat", 0),
    };
    const list = get(response, "list", []);

    const mappedData = map(list, (data) => {
      const { dt, temp, humidity, speed } = data;
      const { main, icon } = get(data, "weather[0]", []);
      const temperature = {
        day: get(temp, "day", 0),
        min: get(temp, "min", 0),
        max: get(temp, "max", 0),
      };
      const rain = get(data, "rain") == null ? 0 : get(data, "rain");

      return {
        dt,
        condition: main,
        icon,
        temperature,
        humidity,
        wind: speed,
        rain,
      };
    });

    return {
      id,
      cityInfo,
      forecastList: mappedData,
    };
  }
}
module.exports = WeatherAPI;

// TEST URL - Current Weather
// https://api.openweathermap.org/data/2.5/weather?q=tokyo&units=metric&appid=be2d43efb7b89c5d69256d7ec44da9b8

// TEST URL - DailyForecast
// https://api.openweathermap.org/data/2.5/forecast/daily?q=tokyo&units=metric&cnt=7&appid=be2d43efb7b89c5d69256d7ec44da9b8
