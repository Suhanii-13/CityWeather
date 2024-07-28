import './SearchBar.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { useDispatch} from 'react-redux';
import {fetchData} from '../features/weather/weatherSlice'

export default  function SearchBar ()
{
    let[city , setcity] = useState("");
    let dispatch = useDispatch();

   let submitHandler = (evt) =>{
       evt.preventDefault();
       dispatch(fetchData(city));
       setcity("");
   }

   let changeHandler = (evt) =>{
       setcity(evt.target.value);
   }
    return(
        <div className="searchBar">
             <form onSubmit={submitHandler}>
            <TextField 
            id="filled-basic" 
            label="Enter city" 
            variant="filled" 
            value={city}
            className='SearchCity'
            onChange={changeHandler}/>
            <Button 
            variant="contained" 
            className='Searchbutton'
            type="submit">
            Search</Button>
            </form>
        </div>
    )
}