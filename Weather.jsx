import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import cloud from "../assets/cloud.png"
import drizzle from "../assets/drizzle.png"
import rain from "../assets/rain.png"
import snow from "../assets/snow.png"
import temperature from "../assets/temperature.png"
import wind from "../assets/wind.png"
import search from "../assets/search.svg"
import sun2 from "../assets/sun3.jpg"
import humidity from "../assets/humidity.jpg"
import moon from "../assets/moon.jpg"
import broken from "../assets/broken.jpg"
import thor from "../assets/thor.png"
export const Weather = () => {
    const WeatherDetails=({icon,temp,city,country,lat,log,humiditys,winds})=>
    {
        return(
        <>
        <div className='image'>
            <img src={icon} alt='image'/>
        </div>
        <div className='temp'>{temp}°C</div>
        <div className='location'>{city}</div>
        <div className='country'>{country}</div>
        <div className='cord'>
            <div>
                <span className='lat'>latitude </span>
                <span>{lat}</span>
            </div>
            <div>
                <span className='log'>longitude </span>
                <span>{log}</span>
            </div>
        </div>
        <div className='data-container'>
            <div className='element'>
                <img src={humidity} alt='humidity' className='icon'/>
                <div className='data'>
                    <div className='humidity-percentage'>{humiditys}%</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>
             <div className='element'>
                <img src={wind} alt='humidity' className='icon'/>
                <div className='data'>
                    <div className='wind-percentage'>{winds}</div>
                    <div className='text'>Wind Speed</div>
                </div>
            </div>
        </div>
        </>)
    }
    WeatherDetails.propTypes={
        icon:PropTypes.string.isRequired,
        temp:PropTypes.number.isRequired,
        city:PropTypes.string.isRequired,
        country:PropTypes.string.isRequired,
        lat:PropTypes.number.isRequired,
        log:PropTypes.number.isRequired,
        humiditys:PropTypes.number.isRequired,
        winds:PropTypes.string.isRequired,
    }
    let api_key="fb981a949eb845774810c853358b4b73"
    const[text,setText]=useState("london");
    const [icon,seticon]=useState(sun2)
    const [temp,settemp]=useState(0)
    const[city,setcity]=useState("")
    const[country,setcountry]=useState("")
    const[lat,setlat]=useState(0)
    const[log,setlog]=useState(0)
    const[humiditys,sethumidity]=useState(86)
    const[winds,setwind]=useState("6 km/hr")
    const [cityNotFound,setCityNotFound]=useState(false);
    const[loading,setLoading]=useState(false);
    const[Error,setError]=useState(null)
    const weatherIconMap={
        "01d":sun2,
        "01n":moon,
        "03d":cloud,
        "04d":broken,
        "09d":rain,
        "10d":rain,
        "10n":rain,
        "11d":thor,
        "11n":thor,
        "13d":snow,
        "13n":snow,
        "50d":humidity,
        "50n":humidity 
    };
     const searchs =async()=>
    {
        setLoading(true)
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
        try{
            let res= await fetch(url)
            let data=await res.json();
            if(data.cod==="404"){
                console.error("city not found!")
                setCityNotFound(true);
                setLoading(false);
                return;
            }
            sethumidity(data.main.humidity);
            setwind(data.wind.speed);
            setlat(data.coord.lat);
            setlog(data.coord.lon);
            setcountry(data.sys.country);
            setcity(data.name);
            settemp(Math.floor(data.main.temp));
            const weatherIconCode=data.weather[0].icon;
            seticon(weatherIconMap[weatherIconCode] || clearIcon); 
            setCityNotFound(false);
        }
        catch(error)
        {
            console.error("An error is occured:",error.message);
        }
        finally{
            setLoading(false)
        }
    };
    const handelcity=(e)=>
    {
        setText(e.target.value)
    }
    const handlekeydown=(e)=>
    {
        if(e.key =="Enter")
        {
            searchs();
        }
    }
    useEffect(function(){
        searchs();
    },[]);
  return (
    <>
    <div className='container'>
        <div className='input-container'>
            <input type='text' className='cityInput'  value={text}placeholder='Search City' onChange={handelcity} onKeyDown={handlekeydown}/>
            <div className='search-icon'>
                <img src={search} alt='Search' onClick={()=>searchs()}/>
            </div>
        </div>
         {/* <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humiditys={humiditys} winds={winds}/> */}
         {loading&&<div className='loading-message'>loading....!</div>}
         {Error && <p className='errormessage'>{Error}</p>}
         {cityNotFound &&<p className='ciyt-not-found'>city not found</p>}

         {!loading && !cityNotFound &&
         <WeatherDetails icon={icon} temp={temp} city={city} country={country} lat={lat} log={log} humiditys={humiditys} winds={winds}/>}
        <p className='copyright'>Designed By Gowtham</p>
    </div>
    </>
  )
}
