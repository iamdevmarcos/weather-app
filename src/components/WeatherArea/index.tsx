import { useState, FormEvent } from 'react';
import api from '../../services/api';

declare global {
    interface Window {
        SpeechRecognition:any;
        webkitSpeechRecognition:any;
    }
}

export const WeatherArea = () => {

    let recognition: any = null;

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if(SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
        recognition.lang = 'pt-BR';
    }

    const [listening, setListening] = useState(true);

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

                setInfoAreaVisible(true);
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

    const handleMicSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if(recognition !== null) {
            recognition.onstart = () => {
                setListening(true);
            }
            recognition.onend = () => {
                setListening(false);
            }
            recognition.onresult = async (e: any) => {
                setCitySearch(e.results[0][0].transcript);

                if(citySearch !== '') {
                    setErrorMessage('');
                    const result = await api.getWeatherInfo(citySearch);
                
                    if(result) {
                        setCityName(`${result.name}, ${result.sys.country}`);
                        setCityTemp(result.main.temp);
                        setCityTempIcon(`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`);
                        setCityWindSpeed(result.wind.speed);
                        setCityWindAngle(+result.wind.deg-90);
        
                        setInfoAreaVisible(true);
                    } else {
                        setInfoAreaVisible(false);
                        setErrorMessage(`City ${citySearch} not found...`);
                        setCitySearch('');
                    }
        
                } else {
                    setInfoAreaVisible(false);
                }
            }

            recognition.start();
        } else {
            alert('Voice search not available for this browser.');
        }
    }

    return (
        <div>
            <h1>⛅️ Weather App</h1>

            <form className="search" onSubmit={handleSubmit}>
                <input
                    type="search"
                    id="searchInput"
                    value={citySearch}
                    onChange={e=>setCitySearch(e.target.value)}
                    placeholder="search for a city"
                />
                {citySearch !== '' &&
                    <button>Search</button>
                }
                {citySearch === '' &&
                    <button
                        onClick={handleMicSubmit}
                        style={{backgroundColor: listening ? '#126ECE' : ''}}    
                    >
                    🎙️
                    </button>
                }
            </form>

            {infoAreaVisible &&
                <div className="result">
                    <div className="title">{cityName}</div>

                    <div className="info">
                        <div className="temp">
                            <div className="tempTitle">Temperature</div>
                            <div className="tempInfo">{cityTemp} <sup>ºC</sup></div>
                            <img src={cityTempIcon} />
                        </div>
                        <div className="wind">
                            <div className="windTitle">Wind</div>
                            <div className="windInfo">{cityWindSpeed} <span>km/h</span></div>
                            <div className="windArea">
                                <div className="windPonto" style={{transform: `rotate(${cityWindAngle}deg)`}}></div>
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