import { useState, useEffect ,useDispatch ,fetchData,FlashMessage,axios} from './import';
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
    if (city.trim() === "" || cities.includes(city)) return;
  
    const newCities = [...cities, city];
    setCities(newCities);
    setCity("");
  
    axios.post('http://localhost:8080/addcity', { city }, { withCredentials: true })
      .catch(err => {
        console.error(err);
        alert("Please register to use this feature.")
        setCities(cities);
      });
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
        className='inputField'
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
