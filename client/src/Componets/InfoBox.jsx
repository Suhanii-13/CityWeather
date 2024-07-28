import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Card, CardContent } from '@mui/material';
import "./InfoBox.css";

const lowTempIcon = <i className="fa-solid fa-temperature-low icons"></i>;
const highTempIcon = <i className="fa-solid fa-temperature-high icons"></i>;
const midTempIcon = <i className="fa-solid fa-temperature-half icons"></i>;

export default function InfoBox({ weatherData }) {
  return (
    <Grid container spacing={{ xs:3, sm:12, md:40,lg:-30}}>
      {weatherData.map((weather, index) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className="InfoCard">
            <CardContent className="Info">
              <Typography variant="h4" component="div" sx={{ fontSize: '2rem' }}>
                {weather.city}
                {weather.temp < 15 && <span>{lowTempIcon}</span>}
                {weather.temp >= 15 && weather.temp <= 25 && <span>{midTempIcon}</span>}
                {weather.temp > 25 && <span>{highTempIcon}</span>}
              </Typography><br />
              <Typography variant="body1" color="text.secondary" className="font-size">
                Temperature: {weather.temp}°C
              </Typography>
              <Typography variant="body1" color="text.secondary" className="font-size">
                Feels Like: {weather.feelsLike}°C
              </Typography>
              <Typography variant="body1" color="text.secondary" className="font-size">
                Min Temp: {weather.tempMin}°C
              </Typography>
              <Typography variant="body1" color="text.secondary" className="font-size">
                Max Temp: {weather.tempMax}°C
              </Typography>
              <Typography variant="body1" color="text.secondary" className="font-size">
                Weather: {weather.weather}
              </Typography>        
              <button id="button">delete</button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
