import axios from "axios"
import { reactive, ref } from "vue"

export default function useWeather() {

  const weatherKelvin = ref(0) 
  const weatherCelsius = ref(0) 
  const weatherFahrenheit = ref(0) 
  const error = ref('')
  const locationInfo = reactive({
    country: '',
    city:''
  })

  const getWeather = async ({country, city}) => {
    const key = import.meta.env.VITE_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${key}`
    
    try {
      const {data} = await axios.get(url)
      locationInfo.country = data.sys.country
      locationInfo.city = data.name
      weatherKelvin.value = data.main.feels_like
      kelvinToCelsius()
      kelvinToFahrenheit()
    } catch  {
      error.value = 'Ciudad no encontrada'
    }
  }

  const kelvinToCelsius = () => {
    weatherCelsius.value = Number((weatherKelvin.value - 273.15).toFixed(1))
  }

  const kelvinToFahrenheit = () => {
    weatherFahrenheit.value = Number(((weatherKelvin.value - 273.15) * 9/5 + 32).toFixed(1))
  }
  
  const parseWeather = () => {

  }

  return {
    getWeather,
    weatherKelvin,
    weatherFahrenheit,
    weatherCelsius,
    locationInfo,
    error
  }
}