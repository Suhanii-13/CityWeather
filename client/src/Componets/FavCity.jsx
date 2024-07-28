import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../features/weather/weatherSlice';
import FlashMessage from 'react-flash-message'; // Import if needed
import axios from 'axios';
import "./FavCity.css";

export default function Favcity() {
  const [city, setCity] = useState("");
  const [cities, setCities] = useState([]);
  const [fetchedCities, setFetchedCities] = useState([]);
  const [flashMessage, setFlashMessage] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('http://localhost:8080/cities', { withCredentials: true })
      .then(response => setCities(response.data))
      .catch(err => console.error('Error fetching cities:', err));
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleAdd = () => {
    if (city.trim() !== "" && !cities.includes(city)) {
        axios.post('http://localhost:8080/addcity', { city }, { withCredentials: true })
          .then(response => {
            setCities([...cities, city]);
            setCity("");
          })
          .catch(err=>{
            console.log(err)
            setFlashMessage({ type: 'error', text: 'plese sing in' });
          });
      }
    }

  const handleCityClick = (city) => {
    if (!fetchedCities.includes(city)) {
      dispatch(fetchData(city));
      setFetchedCities([...fetchedCities, city]);
    }
  };

  
    const deleteAll = () => {
      axios.post('http://localhost:8080/deleteallcities', {}, { withCredentials: true })
        .then(response => {
          setCities([]);
          setFetchedCities([]);
          setFlashMessage({ type: 'success', text: 'All cities deleted successfully' });
        })
        .catch(err => {
          console.error('Error deleting cities:', err);
          setFlashMessage({ type: 'error', text: 'Failed to delete cities' });
        });
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
      {flashMessage && (
        <FlashMessage duration={2000} persistOnHover={true}>
          <div
            className={`flash-message ${
              flashMessage.type === 'success' ? 'flash-success' : 'flash-error'
            }`}
          >
            {flashMessage.text}
          </div>
        </FlashMessage>
      )}
    </div>
  );
}
