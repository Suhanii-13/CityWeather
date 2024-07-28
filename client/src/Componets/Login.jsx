import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import './comman.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export default function SignUp() {
    const [formData, setFormData] = useState({ username: "", password: "" });

    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData((currData) => ({
            ...currData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({ username: "", password: "" });
    
        axios.post("http://localhost:8080/login", formData, { withCredentials: true })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.error(err);
                navigate("/login");
            });
    };

    return (
        <div className="SignForm">
            <form onSubmit={handleSubmit}>
                
                <div className='Title'>
                    <h4>Log In</h4>
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
                   LogIn</Button>
                   <h3>Dont have accout?</h3>
                    <Link to='/signup'>
                     <Button
                         variant="contained"
                         className='btn2'>
                         SignUp
                    </Button>
                </Link> 
            </form>
            
        </div>
    );
}
