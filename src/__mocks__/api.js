module.exports = {
  // some implementation;
  getCurrent: () => {
    const currentForecast = await Promise.resolve({name: 'test current'});
    return currentForecast;
  },
  getFiveDayForecast: async () => {
    const fiveDayForecast = await Promise.resolve({name: 'test five day'});
    return fiveDayForecast;
  },
  getHourlyForecast: async () => {
    const hourlyForecast = await Promise.resolve({name: 'test hourly'});
    return hourlyForecast;
  },
  getSearchLocation: async () => {
    const searchLocation = await Promise.resolve({name: 'test search'});
    return searchLocation;
  }
};

// export const getDetailed = async () {
//   getDetailed: (url, forecast) => {
//     return Promise.resolve(forecast)
//   }
// };
