import React, { useState, useEffect } from 'react';
import DayForecastSimple from './dayForecastSimple';
import HourlyForecastSimple from './hourlyForecastSimple';

const ForecastList = props => {
  const { forecast, type } = props;

  const [ arr, setArr ] = useState([]);
  const [ activeArr, updateActiveArr ] = useState([]);

  useEffect(() => {
    setArr(forecast);
    updateActiveArr(forecast.slice(0,3))
  }, [forecast])

  const handleClick = event => {
    if (event.currentTarget.classList.contains('left-arrow')) {
      handleLeft(event)
    } else {
      handleRight(event)
    }
  }

  const handleLeft = event => {
    const temp = [...activeArr]
    temp.pop()
    let idx = arr.indexOf([...temp].shift())
    temp.unshift(arr[idx - 1])
    updateActiveArr(temp)
  }

  const handleRight = event => {
    const temp = [...activeArr]
    temp.shift()
    let idx = arr.indexOf([...temp].pop())
    temp.push(arr[idx + 1])
    updateActiveArr(temp)
  }

  const leftArrowClass = activeArr[0] === arr[0] ? 'left-arrow h-8 w-8 invisible' : 'left-arrow h-8 w-8 cursor-pointer'
  const rightArrowClass = activeArr[activeArr.length - 1] === arr[arr.length - 1] ? 'right-arrow h-8 w-8 invisible' : 'right-arrow h-8 w-8 cursor-pointer'

  return (
    <>
      <div className="weather-forecast text-purple-500 pt-3 bg-opacity-50 w-5/6 md:w-4/6 lg:w-1/2 bg-indigo-300 mx-auto rounded-2xl">
        <div className="weather-forecast-header flex justify-between px-3">
          <div className={leftArrowClass} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="font-bold text-xl">A look into the next few {type}...</p>
          <div className={rightArrowClass} onClick={handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="forecast-cards flex py-2 px-3">
          { activeArr.map( (el, idx ) => type === 'days' ? <DayForecastSimple forecast={el} key={idx}/> : <HourlyForecastSimple forecast={el} key={idx}/>  ) }
        </div>
      </div>
    </>
    )

}

export default ForecastList;
