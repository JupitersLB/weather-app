const DayForecastDetails = props => {
  const { forecast, query, current } = props;

  const images = require.context('./../assets/images', true);
  const loadImage = imageName => (images(`./${imageName}`).default);

  return (
    <>
      <div className="weather-card text-purple-500 flex py-3 px-1 rounded-2xl justify-center mx-auto w-5/6  md:w-4/6 lg:w-1/2 bg-opacity-50 bg-indigo-300">
        <div className="current-weather w-full md:w-4/6">
          <p className="font-bold text-xl">Now in <span className="capitalize">{query}</span></p>
          <div className="weather-icon h-20">
            <img className="mx-auto h-full object-cover" src={loadImage(`${current.WeatherIcon}.png`)} alt="weather-icon"/>
          </div>
          <p>{current.WeatherText}</p>
          <div className="details pt-1 flex">
            <div className="left w-5/12 md:w-1/2">
              <p className="pt-1"><b>Temp:</b> {current.Temperature.Metric.Value}<span>&#176;</span>c</p>
              <p className="pt-1"><b>Feels:</b> {current.RealFeelTemperature.Metric.Value}<span>&#176;</span>c</p>
              <p className="pt-1"><b>UV Index:</b> {current.UVIndex}</p>
            </div>
            <div className="right w-7/12 md:w-1/2">
              <p className="pt-1"><b>Humidty:</b> {current.RelativeHumidity}%</p>
              <p className="pt-1"><b>Wind Speed:</b> {current.Wind.Speed.Metric.Value} km/h</p>
              <p className="pt-1"><b>Precipitation:</b> {current.PrecipitationSummary.Precipitation.Metric.Value} mm</p>
            </div>
          </div>
        </div>
        <div className="forecast hidden md:block md:w-2/6">
          <div className="day flex flex-col justify-end pb-1 h-1/2">
            <p className="font-bold">Day</p>
            <img className="mx-auto" src={loadImage(`${forecast.Day.Icon}.png`)} alt="weather-icon"/>
            <p>{forecast.Day.IconPhrase}</p>
          </div>
          <div className="night pt-1 h-1/2">
            <p className="font-bold">Night</p>
            <img className="mx-auto" src={loadImage(`${forecast.Night.Icon}.png`)} alt="weather-icon"/>
            <p>{forecast.Night.IconPhrase}</p>
          </div>
        </div>
      </div>
    </>
    )
}

export default DayForecastDetails;
