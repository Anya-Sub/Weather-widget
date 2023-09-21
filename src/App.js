
import { useState } from 'react';
import './index.css';
import axios from 'axios';
import Loader from './img/loading.gif'

function App() {
  const [city, setCity] = useState('London');
  const [type, setType] = useState('Sunny');
  const [weatherIcon, setweatherIcon] = useState('');
  const [gradus, setGradus] = useState(22);
  const [feelgradus, setFeelGradus] = useState(22);
  const [inputItem, setInputItem] = useState('');
  const [isLoading, setLoading] = useState(false);



  async function GetWeather() {

    setLoading(true)
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputItem}&appid=aec213058af3596a38a337c6e2f26d41&units=metric`)
      console.log(res.data)
      setCity(res.data.name)
      setType(res.data.weather[0].main)
      setGradus(Math.round(res.data.main.temp))
      setFeelGradus(Math.round(res.data.main.feels_like))
      setweatherIcon(res.data.weather[0].icon)
      setInputItem('')
      setLoading(false)
    } catch (error) {
      alert('Wrong request')
      setLoading(false)
    }

  }


  return (
    <div className="App">
      <h2>Weater today</h2>
      {
        isLoading === true ? (
          <img className='loading-gif' src={Loader} alt='loading' />
        ) : (
          <div className='weather-block'>
            
            <div className='weather-block__item'>
               <span className='result'>{city}</span> <div className='weather-block__img'>
              {
                weatherIcon === '' ? '' : <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt='weather-img' />
              }

            </div>
            </div>
            <div className='weather-block__item'>
              Type: <span className='result'>{type}</span>
            </div>
            <div className='weather-block__item'>
              Gradus: <span className='result'>{gradus}°</span>

            </div>
            <div className='weather-block__item'>
              Feeling : <span className='result'>{feelgradus}°</span>
            </div>
          </div>
        )
      }



      <input value={inputItem} onChange={(e) => setInputItem(e.target.value)} className='input-town' placeholder='Enter city' required />
      <button className='inf-btn' onClick={GetWeather} type='button'>
        Get Weather
      </button>

    </div>
  );
}

export default App;
