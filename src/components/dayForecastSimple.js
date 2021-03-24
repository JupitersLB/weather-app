const DayForecastSimple = props => {
  const { forecast } = props;
  const images = require.context('./../assets/images', true);
  const loadImage = imageName => (images(`./${imageName}`).default);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dateObject = new Date(forecast.Date)
  const day = days[dateObject.getDay()]
  return (
    <>
      <div className="simple-weather-card rounded-2xl hover:bg-indigo-100 hover:bg-opacity-5 w-3/6 px-2">
        <div className="card-header pb-2">
          <p className="text-lg font-bold">{day}</p>
          <div className="max-min flex justify-center">
            <p>{forecast.Temperature.Maximum.Value}<span>&#176;</span>c</p>
            <p className="pl-1 hidden md:block">| {forecast.Temperature.Minimum.Value}<span>&#176;</span>c</p>
          </div>
        </div>
        <div className="card-body flex justify-center">
          <div className="sm:w-1/2">
            <p className="font-bold pb-2">Day</p>
            <div className="weather-icon h-20">
              <img className="mx-auto h-full object-cover" src={loadImage(`${forecast.Day.Icon}.png`)} alt="weather-icon"/>
            </div>
            <p>{forecast.Day.IconPhrase}</p>
          </div>
          <div className="hidden md:block md:w-1/2">
            <p className="font-bold pb-2">Night</p>
            <div className="weather-icon h-20">
              <img className="mx-auto h-full object-cover" src={loadImage(`${forecast.Night.Icon}.png`)} alt="weather-icon"/>
            </div>
            <p>{forecast.Night.IconPhrase}</p>
          </div>
        </div>
      </div>
    </>
    )
}

export default DayForecastSimple;
