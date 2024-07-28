import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_URL;
export const fetchData = createAsyncThunk(
    'weatherApp/fetchData',
    async (city) => {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        return data; 
    }
);


const initialState = {
    weatherInfo: [],
    status: null,
    error: null
}

export const weatherSlice = createSlice({
    name: "weatherApp",
    initialState,
    reducers: {
        clearWeatherData:(state)=>{
            state.weatherInfo = [];
            console.log("Weather data cleared");
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = "loading";
                console.log(state.status);
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error;
                console.log(state.status);
                console.log(state.error)
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                const data = action.payload;
                const newData = {
                    city: data.name,
                    temp: data.main.temp,
                    tempMin: data.main.temp_min,
                    tempMax: data.main.temp_max,
                    feelsLike: data.main.feels_like,
                    weather: data.weather[0].description,
                };
                state.weatherInfo.push(newData);
                state.status = "succeeded";
                console.log("updated weather info", newData);
            })
    }
})

export default weatherSlice.reducer;
export const {clearWeatherData} = weatherSlice.actions;