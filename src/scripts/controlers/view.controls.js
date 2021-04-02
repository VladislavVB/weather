const apiService = new ApiService();
const helperService = new HelperService();

class ViewControls {
  constructor() { }

  weather;
  temperatureViewCount = document.querySelector('.weather-demonstration-info p');
  windViewCount = document.querySelector('#wind');
  pressureViewCount = document.querySelector('#pressure');
  humidityViewCount = document.querySelector('#humidity');
  probabilityPrecipitation = document.querySelector('#probabilityPrecipitation');
  weatherDemonstrationInfoDescription = document.querySelector('.weather-demonstration-info-description');
  weatherDemonstrationInfoImgImg = document.querySelector('.weather-demonstration-info-img img');
  searchCity = document.querySelector('#searchCity');
  weatherHeaderCityChoiceSelectedWraper = document.querySelector('.weather-header-city-choice-selected-wraper');
  weatherHeaderCityChoiceSelectedWraperInput = document.querySelector('.weather-header-city-choice-selected-wraper input');
  weatherHeaderCityChoiceSelectedHide = document.querySelectorAll('.weather-header-city-choice-selected-hide');
  weatherHeaderSwitchWraper = document.querySelector('.weather-header-switch-wraper');
  weatherHeaderCityChoice = document.querySelector('.weather-header-city-choice');
  weatherBackGround = document.querySelector('.weather');
  weatherHeaderCityChoiceSelectedWraperButton = document.querySelector('.weather-header-city-choice-selected-wraper button');
  weatherHeaderCityName = document.querySelector('.weather-header-city-name');
  weatherHeaderSwitchItem = document.querySelectorAll('.weather-header-switch-item');
  weatherHeaderCityChoiceSelectedHideWraper = document.querySelector('.weather-header-city-choice-selected-hide-wraper');

  fillData(city) {
    apiService.getCurrentWeather(city).then(async (res) => {
      this.weather = await res.json();
      this.weatherDemonstrationInfoDescription.innerHTML = `${this.weather.weather[0].description}`;
      this.updateTemperature(Math.floor(helperService.converKelvineToCelsius(this.weather.main.temp)));
      this.updateWindInfo(this.weather.wind);
      this.updatePressureInfo(this.weather.wind.deg);
      this.updateHumidityInfo(this.weather.main.humidity);
      this.updateWeatherIcon(this.weather.weather[0].main);
      this.updateCityTitle(city);
    });
  };

  updateCityTitle = (city) => {
    this.weatherHeaderCityName.innerHTML = city;
  };
  
  updateWeatherIcon = (weatherInfo) => {
    switch (weatherInfo.toUpperCase()) {
      case 'RAIN':
        this.weatherDemonstrationInfoImgImg.src = '../src/img/weather/rain.png';
        this.weatherBackGround.classList.add('weather-rain');
        break;
      case 'CLEAR':
        this.weatherDemonstrationInfoImgImg.src = '../src/img/weather/sun.png';
        this.weatherBackGround.classList.add('weather-clear');
        break;
      case 'CLOUDS':
        this.weatherDemonstrationInfoImgImg.src = '../src/img/weather/cloudy.png';
        this.weatherBackGround.classList.add('weather-clear');
        break;
      case 'STORM':
        this.weatherDemonstrationInfoImgImg.src = '../src/img/weather/storm.png';
        this.weatherBackGround.classList.add('weather-rain');
        break;
      case 'CLOUD':
        this.weatherDemonstrationInfoImgImg.src = '../src/img/weather/cloud.png';
        this.weatherBackGround.classList.add('weather-clear');
        break;
    }
  };
  
  updateWindInfo = (windInfo) => {
    this.windViewCount.innerHTML = `${windInfo.speed} м/с`;
  };
  
  updatePressureInfo = (pressureInfo) => {
    this.pressureViewCount.innerHTML = `${pressureInfo} мм рт. ст.`;
  };
  
  updateHumidityInfo = (humidityInfo) => {
    this.humidityViewCount.innerHTML = `${humidityInfo} %`;
  };
  
  updateTemperature = (temperature) => {
    this.temperatureViewCount.innerHTML = temperature;
  };
  
  swithTemperatureSystem = (systemNum) => {
    switch (systemNum) {
      case 0:
        this.updateTemperature(Math.floor(helperService.converKelvineToCelsius(this.weather.main.temp)));
        this.weatherHeaderSwitchItem[0].classList.add('weather-header-switch-item-active');
        this.weatherHeaderSwitchItem[1].classList.remove('weather-header-switch-item-active');
        break;
      case 1:
        this.updateTemperature(Math.floor(helperService.convertKelvineToFahrenheit(this.weather.main.temp)));
        this.weatherHeaderSwitchItem[0].classList.remove('weather-header-switch-item-active');
        this.weatherHeaderSwitchItem[1].classList.add('weather-header-switch-item-active');
        break;
    }
  };

  openSearhCity() {
    this.weatherHeaderCityChoiceSelectedWraper.classList.add('weather-header-city-choice-selected-wraper-active');
    this.weatherHeaderSwitchWraper.classList.add('opacity-zero');
    this.weatherHeaderCityChoice.classList.add('opacity-zero');
  };

  onCitySelected(city) {
    this.weatherHeaderCityChoiceSelectedWraperInput.value = city;
  };

  fillCitiesList(list) {
    let citiesTemplate = '';
    list.forEach((e) => {
      citiesTemplate += `<p onclick="onCitySelected('${e}')" class="weather-header-city-choice-selected weather-header-city-choice-selected-hide">${e}</p>`;
    });
    this.weatherHeaderCityChoiceSelectedHideWraper.innerHTML = citiesTemplate;
  };

  closeSearhCity() {
    this.weatherHeaderCityChoiceSelectedWraper.classList.remove('weather-header-city-choice-selected-wraper-active');
    this.weatherHeaderSwitchWraper.classList.remove('opacity-zero');
    this.weatherHeaderCityChoice.classList.remove('opacity-zero');
  };

  onCitySearch() {
    const selectedCity = this.weatherHeaderCityChoiceSelectedWraperInput.value.trim();
    if (selectedCity) {
      this.fillData(selectedCity);
    }
    this.closeSearhCity();
  }

}