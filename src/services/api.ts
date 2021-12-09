import axios from 'axios';
import showMessage from '../helpers/showMessage';

const http = axios.create({
    baseURL: 'https://api.openweathermap.org'
});

const api = {
    getWeatherInfo: async (city: string) => {
        try {
            const res = await http.get(`/data/2.5/weather?units=metric&lang=pt_br&appid=1ab436dd24aa2653bda5814f3390002a&q=${encodeURI(city)}`);
            return res.data;
        } catch(e) {
            console.log('error', e);
        }
    }
}

export default api;