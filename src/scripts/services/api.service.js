class ApiService {  
  constructor() { }

  getCurrentWeather(city){
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiConfig.key}&lang=${apiConfig.lang}`);
  };

};