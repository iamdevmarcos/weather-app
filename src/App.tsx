import { useState, useEffect, FormEvent } from 'react';
import api from './services/api';

const App = () => {
  const [cityName, setCityName] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if(cityName !== '') {
      const result = await api.getWeatherInfo(cityName);
      
      if(result.cod === 200) {
        console.log('achou', result);
      }

    } else {
      alert('Typing something!');
    }
  }

  return(
    <div>
      <h1>Clima</h1>

      <form className="busca" onSubmit={handleSubmit}>
          <input
            type="search"
            id="searchInput"
            value={cityName}
            onChange={e=>setCityName(e.target.value)}
          />
          <button>Search</button>
      </form>

      <div className="resultado">
          <div className="titulo">--</div>

          <div className="info">
              <div className="temp">
                  <div className="tempTitulo">Temperatura</div>
                  <div className="tempInfo">-- <sup>ºC</sup></div>
                  <img src="http://openweathermap.org/img/wn/10d@2x.png" />
              </div>
              <div className="vento">
                  <div className="ventoTitulo">Vento</div>
                  <div className="ventoInfo">-- <span>km/h</span></div>
                  <div className="ventoArea">
                      <div className="ventoPonto"></div>
                  </div>
              </div>
          </div>
      </div>

      <div className="aviso"></div>

      <footer>
        Made with 🤍 by <a href="https://github.com/iamdevmarcos" target="_blank">Marcos Andre</a>
      </footer>
    </div>
  );
}

export default App;