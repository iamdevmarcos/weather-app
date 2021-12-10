import { useState, FormEvent } from 'react';
import api from '../../services/api';
import showMessage from '../../helpers/showMessage';

export const WeatherArea = () => {
    const [cityName, setCityName] = useState('');
    const [infoAreaVisible, setInfoAreaVisible] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if(cityName !== '') {
            setInfoAreaVisible(true)
            const result = await api.getWeatherInfo(cityName);
        
            if(result) {
                console.log('achou', result);
            } else {
                setInfoAreaVisible(false);
                showMessage(`City ${cityName} not found...`);
                setCityName('');
            }

        } else {
            setInfoAreaVisible(false);
            showMessage('Field cannot be empty');
        }
    }

    return (
        <div>
            <h1>⛅️ Weather App</h1>

            <form className="busca" onSubmit={handleSubmit}>
                <input
                    type="search"
                    id="searchInput"
                    value={cityName}
                    onChange={e=>setCityName(e.target.value)}
                    placeholder="search for a city"
                />
                <button>Search</button>
            </form>

            {infoAreaVisible &&
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
            }

            <footer>
                Made with 🤍 by <a href="https://github.com/iamdevmarcos" target="_blank">Marcos Andre</a>
            </footer>
        </div>
    );
}