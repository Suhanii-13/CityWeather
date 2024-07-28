import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchData} from '../features/weather/weatherSlice'
import "./FavCity.css";

export default function Favcity() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [fetchedCities, setFetchedCities] = useState([]); 
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state.weatherApp.weatherInfo);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleAdd = () => {
    if (city.trim() !== "" && !cities.includes(city)) {
      setCities([...cities, city]);
      setCity(""); 
    }
  };

  const handleCityClick = (city) => {
    if (!fetchedCities.includes(city)) {
      dispatch(fetchData(city));
      setFetchedCities([...fetchedCities, city]); 
    }
  };

  const deleteAll = () => {
    setCities([]);
    setFetchedCities([]); 
  };

  return (
    <div className="box">
      <input 
        placeholder="Add your city" 
        className='inputFiled'
        value={city} 
        onChange={handleChange}
      />
      <button onClick={handleAdd} className='addbtn' type="button">Add</button>
      <div className="cityList">
        {cities.map((e, index) => (
          <button 
            key={index} 
            className='cityBtn'
            onClick={() => handleCityClick(e)}
          >
            {e}
          </button>
        ))}
        <button onClick={deleteAll} className='deletebtn'>
            <i className="fa-solid fa-trash-can"></i>
         </button>
      </div>
    </div>
  );
}
