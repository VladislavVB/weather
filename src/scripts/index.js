const apiService = new ApiService();
const helperService = new HelperService();
const temperatureViewCount = document.querySelector(
  ".weather-demonstration-info p"
);
const windViewCount = document.querySelector("#wind");
const pressureViewCount = document.querySelector("#pressure");
const humidityViewCount = document.querySelector("#humidity");
const probabilityPrecipitation = document.querySelector(
  "#probabilityPrecipitation"
);
const weatherDemonstrationInfoDescription = document.querySelector(
  ".weather-demonstration-info-description"
);
let weather;
const weatherDemonstrationInfoImgImg = document.querySelector(
  ".weather-demonstration-info-img img"
);
const searchCity = document.querySelector("#searchCity");
const weatherHeaderCityChoiceSelectedWraper = document.querySelector(
  ".weather-header-city-choice-selected-wraper"
);
const weatherHeaderCityChoiceSelectedWraperInput = document.querySelector(
  ".weather-header-city-choice-selected-wraper input"
);
const weatherHeaderCityChoiceSelectedHide = document.querySelectorAll(
  ".weather-header-city-choice-selected-hide"
);
const weatherHeaderSwitchWraper = document.querySelector(
  ".weather-header-switch-wraper"
);
const weatherHeaderCityChoice = document.querySelector(
  ".weather-header-city-choice"
);
const weatherBackGround = document.querySelector(".weather");
const weatherHeaderCityChoiceSelectedWraperButton = document.querySelector(
  ".weather-header-city-choice-selected-wraper button"
);
const weatherHeaderCityName = document.querySelector(
  ".weather-header-city-name"
);
const weatherHeaderSwitchItem = document.querySelectorAll(
  ".weather-header-switch-item"
);
const weatherHeaderCityChoiceSelectedHideWraper = document.querySelector('.weather-header-city-choice-selected-hide-wraper');


const fillData = (city) => {
  apiService.getCurrentWeather(city).then(async (res) => {
    weather = await res.json();
    const temperature = weather.main.temp;
    weatherDemonstrationInfoDescription.innerHTML = `${weather.weather[0].description}`;
    updateTemperature(
      Math.floor(helperService.converKelvineToCelsius(weather.main.temp))
    );
    updateWindInfo(weather.wind);
    updatePressureInfo(weather.wind.deg);
    updateHumidityInfo(weather.main.humidity);
    updateWeatherIcon(weather.weather[0].main);
    updateCityTitle(city) 
  });
};

fillData('Краснодар');

const updateCityTitle = (city) => {
  weatherHeaderCityName.innerHTML = city;
};

const updateWeatherIcon = (weatherInfo) => {
  switch (weatherInfo.toUpperCase()) {
    case "RAIN":
      weatherDemonstrationInfoImgImg.src = "../src/img/weather/rain.png";
      weatherBackGround.classList.add("weather-rain");
      break;
    case "CLEAR":
      weatherDemonstrationInfoImgImg.src = "../src/img/weather/sun.png";
      weatherBackGround.classList.add("weather-clear");
      break;
    case "CLOUDS":
      weatherDemonstrationInfoImgImg.src = "../src/img/weather/cloudy.png";
      weatherBackGround.classList.add("weather-clear");
      break;
    case "STORM":
      weatherDemonstrationInfoImgImg.src = "../src/img/weather/storm.png";
      weatherBackGround.classList.add("weather-rain");
      break;
    case "CLOUD":
      weatherDemonstrationInfoImgImg.src = "../src/img/weather/cloud.png";
      weatherBackGround.classList.add("weather-clear");
      break;
  }
};

const updateWindInfo = (windInfo) => {
  windViewCount.innerHTML = `${windInfo.speed} м/с`; 
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

const swithTemperatureSystem = (systemNum) => {
  switch (systemNum) {
    case 0:
      updateTemperature(
        Math.floor(helperService.converKelvineToCelsius(weather.main.temp))
      );
      weatherHeaderSwitchItem[0].classList.add(
        "weather-header-switch-item-active"
      );
      weatherHeaderSwitchItem[1].classList.remove(
        "weather-header-switch-item-active"
      );
      break;
    case 1:
      updateTemperature(
        Math.floor(helperService.convertKelvineToFahrenheit(weather.main.temp))
      );
      weatherHeaderSwitchItem[0].classList.remove(
        "weather-header-switch-item-active"
      );
      weatherHeaderSwitchItem[1].classList.add(
        "weather-header-switch-item-active"
      );
      break;
  }
};

weatherHeaderCityChoiceSelectedWraperInput.addEventListener("click", () => {
  weatherHeaderCityChoiceSelectedHide.forEach((e) => {
    e.classList.add("weather-header-city-choice-selected-hide-active");
  });
});

const openSearhCity = () => {
  weatherHeaderCityChoiceSelectedWraper.classList.add(
    "weather-header-city-choice-selected-wraper-active"
  );
  weatherHeaderSwitchWraper.classList.add("opacity-zero");
  weatherHeaderCityChoice.classList.add("opacity-zero");
};

const searchCitySelected = () => {
  openSearhCity();
};

const closeSearhCity = () => {
  weatherHeaderCityChoiceSelectedWraper.classList.remove(
    "weather-header-city-choice-selected-wraper-active"
  );
  weatherHeaderSwitchWraper.classList.remove("opacity-zero");
  weatherHeaderCityChoice.classList.remove("opacity-zero");
};

document.querySelector("body").addEventListener("click", (e) => {
  if (
    e.target !== searchCity &&
    !weatherHeaderCityChoiceSelectedWraper.contains(e.target) &&
    weatherHeaderCityChoiceSelectedWraper.classList.value.indexOf(
      "weather-header-city-choice-selected-wraper-active"
    )
  ) {
    closeSearhCity();
  }
});

weatherHeaderCityChoiceSelectedWraperButton.addEventListener("click", () => {
  const selectedCity = weatherHeaderCityChoiceSelectedWraperInput.value.trim();
  if(selectedCity){
    fillData(selectedCity);
  }
  closeSearhCity();
});

const fillCitiesList = (list) => {
  let citiesTemplate = '';
  list.forEach((e) => {
    citiesTemplate += `<p onclick="onCitySelected('${e}')" class="weather-header-city-choice-selected weather-header-city-choice-selected-hide">${e}</p>`;
  });
  weatherHeaderCityChoiceSelectedHideWraper.innerHTML = citiesTemplate;
  console.log(weatherHeaderCityChoiceSelectedHideWraper);
};
fillCitiesList(citysList);

weatherHeaderCityChoiceSelectedWraperInput.addEventListener('keydown', () => {
  const inputValue = weatherHeaderCityChoiceSelectedWraperInput.value;
  const resCitys = [];
  citysList.forEach((el) => {
    if (el.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1) {
      resCitys.push(el);
    }
  });
  fillCitiesList(resCitys);
});

const onCitySelected = (city) => {
  weatherHeaderCityChoiceSelectedWraperInput.value = city
};