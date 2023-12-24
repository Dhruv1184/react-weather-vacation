
import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [location, setLocation] = useState('')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [date,setDate] = useState(null)
  function handleLocation(e) {
    setLocation(e.target.value)
  }

  useEffect(() => {
    if (location !== '') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=1342f8dd595eda677ca40143519800de`)
        .then(res => {
          setData(res.data)
          setDate(new Date(res.data.dt *1000))
          setError(null)
        })
        .catch(err => {
          setError('Location not found')
          setData(null)
        })
    } else {
      setData(null)
      setError(null)
    }
  }, [location])

  useEffect(() => {
    console.log(data)
  }, [data])
  
  return (
    <>
    <div className='body'>

      <input type="text" onChange={(e) => handleLocation(e)} placeholder='Search your location'/>
      <p>{error}</p>
      {data && (
        <div>
          <p>Location : {data.name}, {data.sys.country}</p>
          <p>Weather : {data.weather[0].main}</p>
          <p>Current Temp : {(data.main.temp - 273.15).toFixed(2)}&deg;C</p>
          <p>Min/Max temp : {(data.main.temp_min - 273.15).toFixed(2)}&deg;C / {(data.main.temp_max - 273.15).toFixed(2)}&deg;C</p>
          <p>Date: {date.toDateString()}</p>
          <p>Sunrise at : {date && new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</p>
          <p>Sunset at : {date && new Date(data.sys.sunset*1000).toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}</p>
        </div>
        
      )}
    </div>
    </>
  )
}

export default App

