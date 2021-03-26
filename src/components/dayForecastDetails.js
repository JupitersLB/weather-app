import bundleLoader from './bundle-loader'

const DayForecastDetails = props => {
  const { forecastQuery, RelativeHumidity, WeatherIcon, WeatherText, PrecipitationSummary, Wind, UVIndex, RealFeelTemperature, Temperature, Day, Night  } = props;

  console.log(props);

  const images = bundleLoader.importFiles()
  const image = bundleLoader.loadImage(images, `${WeatherIcon}.png`);
  const nightImage = bundleLoader.loadImage(images, `${Night.Icon}.png`);
  const dayImage = bundleLoader.loadImage(images, `${Day.Icon}.png`);
  // console.log(images);
  // const loadImage = imageName => (images(`./${imageName}`).default);

  return (
    <>
      <div className="weather-card text-purple-500 flex py-3 px-1 rounded-2xl justify-center mx-auto w-5/6  md:w-4/6 lg:w-1/2 bg-opacity-50 bg-indigo-300">
        <div className="current-weather w-full md:w-4/6">
          <p className="font-bold text-xl">Now in <span className="capitalize">{forecastQuery}</span></p>
          <div className="weather-icon h-20">
            <img className="mx-auto h-full object-cover" src={image} alt="weather-icon"/>
          </div>
          <p>{WeatherText}</p>
          <div className="details pt-1 flex">
            <div className="left w-5/12 md:w-1/2">
              <p className="pt-1"><b>Temp:</b> {Temperature.Metric.Value}<span>&#176;</span>c</p>
              <p className="pt-1"><b>Feels:</b> {RealFeelTemperature.Metric.Value}<span>&#176;</span>c</p>
              <p className="pt-1"><b>UV Index:</b> {UVIndex}</p>
            </div>
            <div className="right w-7/12 md:w-1/2">
              <p className="pt-1"><b>Humidty:</b> {RelativeHumidity}%</p>
              <p className="pt-1"><b>Wind Speed:</b> {Wind.Speed.Metric.Value} km/h</p>
              <p className="pt-1"><b>Precipitation:</b> {PrecipitationSummary.Precipitation.Metric.Value} mm</p>
            </div>
          </div>
        </div>
        <div className="forecast hidden md:block md:w-2/6">
          <div className="day flex flex-col justify-end pb-1 h-1/2">
            <p className="font-bold">Day</p>
            <img className="mx-auto" src={dayImage} alt="weather-icon"/>
            <p>{Day.IconPhrase}</p>
          </div>
          <div className="night pt-1 h-1/2">
            <p className="font-bold">Night</p>
            <img className="mx-auto" src={nightImage} alt="weather-icon"/>
            <p>{Night.IconPhrase}</p>
          </div>
        </div>
      </div>
    </>
    )
}

export default DayForecastDetails;
