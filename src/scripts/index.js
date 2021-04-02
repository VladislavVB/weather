const apiService = new ApiService();
const helperService = new HelperService();
const temperatureViewCount = document.querySelector('.weather-demonstration-info p');
const windViewCount = document.querySelector('#wind');
const pressureViewCount = document.querySelector('#pressure');
const humidityViewCount = document.querySelector('#humidity');
const probabilityPrecipitation = document.querySelector('#probabilityPrecipitation');
const weatherDemonstrationInfoDescription = document.querySelector('.weather-demonstration-info-description');
let weather;
const weatherDemonstrationInfoImgImg = document.querySelector('.weather-demonstration-info-img img');
const searchCity = document.querySelector('#searchCity');
const weatherHeaderCityChoiceSelectedWraper = document.querySelector('.weather-header-city-choice-selected-wraper');
const weatherHeaderCityChoiceSelectedWraperInput = document.querySelector('.weather-header-city-choice-selected-wraper input');
const weatherHeaderCityChoiceSelectedHide = document.querySelectorAll('.weather-header-city-choice-selected-hide');
const weatherHeaderSwitchWraper = document.querySelector('.weather-header-switch-wraper');
const weatherHeaderCityChoice = document.querySelector('.weather-header-city-choice');
const weatherBackGround = document.querySelector('.weather');
const weatherHeaderCityChoiceSelectedWraperButton = document.querySelector('.weather-header-city-choice-selected-wraper button');
const weatherHeaderCityName = document.querySelector('.weather-header-city-name');
const weatherHeaderSwitchItem = document.querySelectorAll('.weather-header-switch-item');




apiService.getCurrentWeather('ижевск').then(async res => {
  weather = await res.json();
  const temperature = weather.main.temp;
  weatherDemonstrationInfoDescription.innerHTML = `${weather.weather[0].description}`;
  updateTemperature(Math.floor(helperService.converKelvineToCelsius(weather.main.temp)));
  updateWindInfo(weather.wind);
  updatePressureInfo(weather.wind.deg);
  updateHumidityInfo(weather.main.humidity);
  updateWeatherIcon(weather.weather[0].main)
});

const updateWeatherIcon = (weatherInfo) => {
  switch (weatherInfo.toUpperCase()) {
    case 'RAIN':
      weatherDemonstrationInfoImgImg.src = '../src/img/weather/rain.png';
      weatherBackGround.classList.add('weather-rain');
      break;
    case 'CLEAR':
      weatherDemonstrationInfoImgImg.src = '../src/img/weather/sun.png'
      break;
    case 'CLOUDS':
      weatherDemonstrationInfoImgImg.src = '../src/img/weather/cloudy.png'
      break;
    case 'STORM':
      weatherDemonstrationInfoImgImg.src = '../src/img/weather/storm.png'
      break;
    case 'CLOUD':
      weatherDemonstrationInfoImgImg.src = '../src/img/weather/cloud.png'
      break;
  }
};

const updateWindInfo = (windInfo) => {
  windViewCount.innerHTML = `${windInfo.speed} м/с`; //не нашел где брать значения западного, восточного,... ветров
};

const updatePressureInfo = (pressureInfo) => {
  pressureViewCount.innerHTML = `${pressureInfo} мм рт. ст.`;
};

const updateHumidityInfo = (humidityInfo) => {
  humidityViewCount.innerHTML = `${humidityInfo} %`;
};

const updateTemperature = (temperature) => {
  temperatureViewCount.innerHTML = temperature;

};


//
const swithTemperatureSystem = (systemNum) => {
  switch (systemNum) {
    case 0:
      updateTemperature(Math.floor(helperService.converKelvineToCelsius(weather.main.temp)));
      weatherHeaderSwitchItem[0].classList.add('weather-header-switch-item-active');
      weatherHeaderSwitchItem[1].classList.remove('weather-header-switch-item-active');
      break;
    case 1:
      updateTemperature(Math.floor(helperService.convertKelvineToFahrenheit(weather.main.temp)));
      weatherHeaderSwitchItem[0].classList.remove('weather-header-switch-item-active');
      weatherHeaderSwitchItem[1].classList.add('weather-header-switch-item-active');
      break;
  }
};

//выезжающие города в списке
weatherHeaderCityChoiceSelectedWraperInput.addEventListener('mousedown', () => {
  weatherHeaderCityChoiceSelectedHide.forEach(e => {
    e.classList.add('weather-header-city-choice-selected-hide-active');
  });
});

weatherHeaderCityChoiceSelectedWraperInput.addEventListener('mouseup', () => {
  weatherHeaderCityChoiceSelectedHide.forEach(e => {
    e.classList.remove('weather-header-city-choice-selected-hide-active');
  });
});

//

const searchCitySelected = () => {
  weatherHeaderCityChoiceSelectedWraper.classList.add('weather-header-city-choice-selected-wraper-active');
  weatherHeaderSwitchWraper.classList.add('opacity-zero');
  weatherHeaderCityChoice.classList.add('opacity-zero');
};

const closeSearhCity = () => {
  weatherHeaderCityChoiceSelectedWraper.classList.remove('weather-header-city-choice-selected-wraper-active');
  weatherHeaderSwitchWraper.classList.remove('opacity-zero');
  weatherHeaderCityChoice.classList.remove('opacity-zero');
};

weatherHeaderCityChoiceSelectedWraper.addEventListener('click', (e) => {
  if (e.target === weatherHeaderCityChoiceSelectedWraper) {
    closeSearhCity();
  }
});

weatherHeaderCityChoiceSelectedWraperButton.addEventListener('click', () => {
  closeSearhCity();
});

//динамическое название города 
const inputValueCityNameFunction = () => {
  let inputValueCityName = weatherHeaderCityChoiceSelectedWraperInput.value;
  weatherHeaderCityName.innerHTML = inputValueCityName;
};
// inputValueCityNameFunction();

































// document.querySelector('body').addEventListener('click', (event) => {
//   if(event.target !== weatherHeaderCityChoiceSelectedWraper && weatherHeaderCityChoiceSelectedWraper.classList.value.indexOf('weather-header-city-choice-selected-wraper-active') !== -1){
//     weatherHeaderCityChoiceSelectedWraper.classList.remove('weather-header-city-choice-selected-wraper-active');
//     console.log(12);
//   }
//   console.log(event.target);
// });


// weatherHeaderCityChoiceSelectedWraper.addEventListener('click', (e) => {
//   if (e.target === weatherHeaderCityChoiceSelectedWraper) {
//     weatherHeaderCityChoiceSelectedWraper.classList.remove('weather-header-city-choice-selected-wraper-active');
//   }
// }) 

