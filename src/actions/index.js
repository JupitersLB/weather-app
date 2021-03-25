import sweetError from '../components/sweetError';

const apiKey = process.env.REACT_APP_ACCU_API_KEY
const baseUrl = 'https://dataservice.accuweather.com/'

const handleErrors = response => {
  if (!response.ok) {
    console.log(response)
    throw Error(response.statusText);
  }
  return response.json();
}

export const searchLocation = location => {
  const queryParams = `apikey=${apiKey}&q=${location}&offset=5`
  const url = `${baseUrl}locations/v1/cities/search?${queryParams}`;
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(handleErrors)
                    .catch(error => sweetError(error))
  return { promise }
}

export const searchGeoLocation = (lat, lon) => {
  const queryParams = `apikey=${apiKey}&q=${lat},${lon}&toplevel=true`
  const url = `${baseUrl}locations/v1/cities/geoposition/search?${queryParams}`;
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(handleErrors)
                    .catch(error => sweetError(error))
  return { promise }
}

export const fetchFiveDayForecast = locationId => {
  const queryParams = `apikey=${apiKey}&metric=true`
  const url = `${baseUrl}forecasts/v1/daily/5day/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(handleErrors)
                    .catch(error => sweetError(error))
  return { promise }
}

export const fetchCurrentConditions = locationId => {
  const queryParams = `apikey=${apiKey}&details=true`
  const url = `${baseUrl}currentconditions/v1/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(handleErrors)
                    .catch(error => sweetError(error))
  return { promise }
}

export const fetchTopFifty = () => {
  const queryParams = `apikey=${apiKey}&details=true`
  const url = `${baseUrl}locations/v1/topcities/50?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(handleErrors)
                    .catch(error => sweetError(error))
  return { promise }
}

export const fetchHourlyForecast = locationId => {
  const queryParams = `apikey=${apiKey}&details=true&metric=true`
  const url = `${baseUrl}forecasts/v1/hourly/12hour/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(handleErrors)
                    .catch(error => sweetError(error))
  return { promise }
}
