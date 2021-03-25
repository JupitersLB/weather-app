import Swal from 'sweetalert2'

const apiKey = process.env.REACT_APP_ACCU_API_KEY
const baseUrl = 'https://dataservice.accuweather.com/'

export const sweetError = err => {
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: err,
    customClass: {
      htmlContainer: 'text-green-800',
      title: 'text-green-800',
      confirmButton: 'bg-transparent hover:bg-green-600 text-green-800 font-semibold hover:text-gray py-2 px-4 w-3/12 border-2 border-green-600 hover:border-transparent rounded'
    },
    background: 'rgba(166,181,251, 0.8)',
    buttonsStyling: false
  })
}

export const searchLocation = location => {
  const queryParams = `apikey=${apiKey}&q=${location}&offset=5`
  const url = `${baseUrl}locations/v1/cities/search?${queryParams}`;
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => {
                      if (r.ok) {
                        console.log(r.url);
                        return r.json();
                      }
                    })
                    .catch(error => {
                      console.error(`Error: ${error}`);
                      sweetError(error);
                    })
  return { promise }
}

export const searchGeoLocation = (lat, lon) => {
  const queryParams = `apikey=${apiKey}&q=${lat},${lon}&toplevel=true`
  const url = `${baseUrl}locations/v1/cities/geoposition/search?${queryParams}`;
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => {
                      if (r.ok) {
                        console.log(r);
                        return r.json();
                      }
                    })
                    .catch(error => {
                      console.error(`Error: ${error}`);
                      sweetError(error);
                    })
  return { promise }
}


export const fetchFiveDayForecast = locationId => {
  const queryParams = `apikey=${apiKey}&metric=true`
  const url = `${baseUrl}forecasts/v1/daily/5day/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => {
                      if(r.ok) {
                        console.log(r);
                        return r.json();
                      }
                    })
                    .catch(error => {
                      console.error(`Error: ${error}`);
                      sweetError(error);
                    })
  return { promise }
}

export const fetchCurrentConditions = locationId => {
  const queryParams = `apikey=${apiKey}&details=true`
  const url = `${baseUrl}currentconditions/v1/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => {
                      if (r.ok) {
                        console.log(r);
                        return r.json();
                      }
                    })
                    .catch(error => {
                      console.error(`Error: ${error}`);
                      sweetError(error);
                    })
  return { promise }
}

export const fetchTopFifty = () => {
  const queryParams = `apikey=${apiKey}&details=true`
  const url = `${baseUrl}locations/v1/topcities/50?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => {
                      if (r.ok) {
                      console.log(r);
                      return r.json();
                      }
                    })
                    .catch(error => {
                      console.error(`Error: ${error}`);
                      sweetError(error);
                    })
  return { promise }
}

export const fetchHourlyForecast = locationId => {
  const queryParams = `apikey=${apiKey}&details=true&metric=true`
  const url = `${baseUrl}forecasts/v1/hourly/12hour/${locationId}?${queryParams}`
  const promise = fetch(url, { credentials: "same-origin"})
                    .then(r => {
                      if (r.ok) {
                        console.log(r);
                        return r.json();
                      }
                    })
                    .catch(error => {
                      console.error(`Error: ${error}`);
                      sweetError(error);
                    })
  return { promise }
}
