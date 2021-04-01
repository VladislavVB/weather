class HelperService {
  converKelvineToCelsius(t) {
    return t - 273.15
  };
  convertKelvineToFahrenheit(t) {
    return 9 * (t - 273.15) / 5 + 32
  }
};