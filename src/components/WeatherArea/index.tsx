import { useState, FormEvent } from 'react';
import api from '../../services/api';

export const WeatherArea = () => {
    const [citySearch, setCitySearch] = useState('');
    const [infoAreaVisible, setInfoAreaVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [cityName, setCityName] = useState('');
    const [cityTemp, setCityTemp] = useState('');
    const [cityTempIcon, setCityTempIcon] = useState('');
    const [cityWindSpeed, setCityWindSpeed] = useState('');
    const [cityWindAngle, setCityWindAngle] = useState(0);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        if(citySearch !== '') {
            setErrorMessage('');
            const result = await api.getWeatherInfo(citySearch);

            if(result) {
                setCityName(`${result.name}, ${result.sys.country}`);
                setCityTemp(result.main.temp);
                setCityTempIcon(`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
                setCityWindSpeed(result.wind.speed);
                setCityWindAngle(+result.wind.deg-90);
            }

            setInfoAreaVisible(true)
        
            if(result) {
                console.log('achou', result);
            } else {
                setInfoAreaVisible(false);
                setErrorMessage(`City ${citySearch} not found...`);
                setCitySearch('');
            }

        } else {
            setInfoAreaVisible(false);
            setErrorMessage('Field cannot be empty');
        }
    }

    return (
        <div>
            <h1>⛅️ Weather App</h1>

            <form className="busca" onSubmit={handleSubmit}>
                <input
                    type="search"
                    id="searchInput"
                    value={citySearch}
                    onChange={e=>setCitySearch(e.target.value)}
                    placeholder="search for a city"
                />
                <button>Search</button>
            </form>

            {infoAreaVisible &&
                <div className="resultado">
                    <div className="titulo">{cityName}</div>

                    <div className="info">
                        <div className="temp">
                            <div className="tempTitulo">Temperatura</div>
                            <div className="tempInfo">{cityTemp} <sup>ºC</sup></div>
                            <img src={cityTempIcon} />
                        </div>
                        <div className="vento">
                            <div className="ventoTitulo">Vento</div>
                            <div className="ventoInfo">{cityWindSpeed} <span>km/h</span></div>
                            <div className="ventoArea">
                                <div className="ventoPonto" style={{transform: `rotate(${cityWindAngle}deg)`}}></div>
                            </div>
                        </div>
                    </div>
                </div>


            }

            {errorMessage !== '' &&
                <div className="warning">{errorMessage}</div>
            }

            
        </div>
    );
}