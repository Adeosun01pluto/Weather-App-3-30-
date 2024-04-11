import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios';

function App() {
  const [cityName, setCityName] = useState("")
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const inputRef = useRef(null); // Create a ref for the input element

  // Function to handle the Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        fetchData(cityName);
        setCityName("")
        inputRef.current.blur()
    }
  };
  const clearInput = () => {
    setCityName('');
    inputRef.current.blur(); // Set focus on the input field
  };
  const fetchData = async (cityName) => {
    try{
      setLoading(true)
      // Your WeatherAPI key
      const apiKey = '48e592a712984eb8b2d183816232008';
      // Base URL for WeatherAPI
      const baseURL = 'http://api.weatherapi.com/v1';
      // Endpoint to fetch weather data by city name
      const endpoint = '/current.json';
      // construct the full URL
      const url = `${baseURL}${endpoint}?key=${apiKey}&q=${cityName}`

      // make a get request to fetch weather data
      const response  = await axios.get(url)

      setData(response?.data)
      setLoading(false)
    }catch (error){
      console.log(error)
      setLoading(false); // Reset loading state in case of error
      throw error;
    }
  }
  console.log(data)
  console.log(data?.current?.condition?.icon)
  useEffect(()=>{
    fetchData("lagos")
  }, [])
  return (
    <div className='w-100 h-[100vh]  bg-gradient-to-r from-[#414d91] via-[#4f5eb3] to-[#7b86c2]'>
      {/* Header */}
      <header className='text-4xl p-4 text-white '>🌦️</header>

      {/* Body */}
      <div className='w-full md:p-0 pt-12 min-h-96 flex flex-col justify-center items-center gap-8'>
        
        {/* search Box */}
        <div className='searchBox relative'>
          <input
            ref={inputRef} // Attach the ref to the input element
            type='text'
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            className='border-none w-64 rounded-md p-2 text-gray-700 outline-none'
            placeholder='Enter city name'
            onKeyPress={handleKeyPress}
          />
          {cityName && (
            <button onClick={clearInput} className='top-[12px] right-[-5px]  absolute px-2 focus:outline-none'>
              <svg className='w-4 h-4 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
              </svg>
            </button>
          )}
        </div>
        {loading ? (
          <div className='flex justify-center items-center w-96 h-96'>
            <div className='animate-bounce rounded-full h-32 w-32 border-t-2 border-b-2 border-white'></div>
          </div>
        ) : (
          <div className='flex justify-between md:flex-row flex-col items-center w-[430px]'>
            <div className=''>
              <img className='w-[200px] h-[200px] object-cover' src={data?.current?.condition?.icon} alt='Weather Icon' />
            </div>
            <div className='text-white flex flex-col items-center'>
              <h2 className='text-6xl'>{data?.current?.temp_c}&#176;C</h2>
              <span className='text-sm font-light text-center p-2'>{data?.current?.condition?.text}</span>
              <div className='text-center'>
                {data?.location?.name}, <span className='font-bold'>{data?.location?.country}</span>
              </div>
              <div className='flex gap-2'>
                <div className='flex items-center pt-2'>
                  <span className='text-3xl'>💦</span>
                  <div className='flex flex-col text-sm'>
                    <span className='font-bold text-lg'>{data?.current?.humidity}%</span>
                    <span>Humidity</span>
                  </div>
                </div>
                <div className='flex items-center pt-2'>
                  <span className='text-3xl'>💨</span>
                  <div className='flex flex-col text-sm'>
                    <span className='font-bold text-lg'>{data?.current?.wind_kph}Km/h</span>
                    <span>Wind Speed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default App
