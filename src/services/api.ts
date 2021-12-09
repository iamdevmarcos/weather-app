import axios from 'axios';

const http = axios.create({
    baseURL: 'https://api.openweathermap.org'
});

const api = {
    getWeatherInfo: async (city: string) => {
        const res = await http.get(`/data/2.5/weather?units=metric&lang=pt_br&appid=1ab436dd24aa2653bda5814f3390002a&q=${encodeURI(city)}`);
        console.log(res.data);
    }
}

export default api;