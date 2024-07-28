import SearchBar from './SearchBar.jsx';
import { useSelector } from 'react-redux';
import InfoBox from './InfoBox.jsx';
import "./WeatherApp.css"
import Navbar from './Navbar.jsx';
import FavCity from './FavCity.jsx';

export default function WeatherApp() {
  const weatherInfo = useSelector((state) => state.weatherApp.weatherInfo);
  const status = useSelector((state) => state.weatherApp.status);

  const statusStyles = {
    loading: { color: 'blue' },
    failed: { color: 'red' },
    succeeded: { color: 'green' },
  };

  const statusMessages = {
    loading: "Your data is coming...",
    failed: "Oops! Something went wrong. Please try again.",
    succeeded: "Data successfully loaded!",
  };

  return (
    <>
      <Navbar/>
      <SearchBar />
      <div className="status">
      <h3 style={statusStyles[status] || {}}>{statusMessages[status] || "Welcome!"}</h3>
      </div>
      <FavCity/>      
      <InfoBox weatherData={weatherInfo} />
    </>
  );
}
