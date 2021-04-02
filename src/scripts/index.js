const viewControls = new ViewControls();

const weatherHeaderCityChoiceSelectedWraperInput = viewControls.weatherHeaderCityChoiceSelectedWraperInput;
const weatherHeaderCityChoiceSelectedWraper = viewControls.weatherHeaderCityChoiceSelectedWraper;

const onInit = () => {
  viewControls.fillData(defaultCity);
  viewControls.fillCitiesList(citysList);
}

const searchCitySelected = () => {
  viewControls.openSearhCity();
}

const swithTemperatureSystem = (systemNum) => {
  viewControls.swithTemperatureSystem(systemNum);
}

const onCitySelected = (city) => {
  viewControls.onCitySelected(city);
};

const onCitySearch = () => {
  viewControls.onCitySearch();
}

document.querySelector('body').addEventListener('click', (e) => {
  if (
    e.target !== searchCity &&
    !weatherHeaderCityChoiceSelectedWraper.contains(e.target) &&
    weatherHeaderCityChoiceSelectedWraper.classList.value.indexOf('weather-header-city-choice-selected-wraper-active')
  ) {
    viewControls.closeSearhCity();
  }
});

weatherHeaderCityChoiceSelectedWraperInput.addEventListener('keydown', () => {
  const inputValue = weatherHeaderCityChoiceSelectedWraperInput.value;
  const resCitys = [];
  citysList.forEach((el) => {
    if (el.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1) {
      resCitys.push(el);
    }
  });
  viewControls.fillCitiesList(resCitys);
});

onInit();