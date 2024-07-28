import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import axios from "axios"
import FlashMessage from 'react-flash-message';
import "./flash.css"
import './comman.css';


export default function SignUp() {
    const [formData, setFormData] = useState({ username: "", password: "" });
     const [flashMessage , setflashMessage] = useState(null);
     const navigate = useNavigate();

    const handleChange = (event) => {
        setFormData((currData) => ({
            ...currData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
         axios.post("http://localhost:8080/signup" , formData , {withCredentials:true})
           .then(result =>{
            console.log(result);
            setflashMessage({type:"success" , text:"SignUp successfull"});
            setTimeout(()=> navigate("/login"),2000);
           })
           .catch(err =>{
            console.log(err);
            setflashMessage({type:"error" , text:"Username alredy exists"});
           });
        
        // setFormData({ username: "", password: "" });
    };

    return (
        <div className="SignForm">
            <form onSubmit={handleSubmit}>
            {flashMessage && (
                <FlashMessage duration={2000} persistOnHover={true}>
                    <div className={`flash-message ${
                        flashMessage.type == "success" ? "flash-success" : "flash-error"
                    }`}>
                        {flashMessage.text}
                    </div>

                </FlashMessage>
            )}
                <div className='Title'>
                    <h4>Sign Up</h4>
                </div>
                <TextField
                    id="username"
                    label="Enter username"
                    variant="filled"
                    className='textFlied'
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                />
                <TextField
                    id="password"
                    label="Enter password"
                    variant="filled"
                    type='password'
                    className='textFlied'
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                />
                <Button 
                    variant="contained" 
                    className='Submitbutton'
                    type="submit">
                    Sign Up
                </Button>
                    <h3>Already signed up?</h3>
                    <Link to='/login'>
                     <Button
                         variant="contained"
                         className='btn2'>
                         Login
                    </Button>
                </Link> 
            </form>
        </div>
    );
}

