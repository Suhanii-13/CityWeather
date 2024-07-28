// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
// import { useState } from 'react';
// import './comman.css';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from "axios";

// export default function SignUp() {
//     const [formData, setFormData] = useState({ username: "", password: "" });

//     const navigate = useNavigate();
//     const handleChange = (event) => {
//         setFormData((currData) => ({
//             ...currData,
//             [event.target.name]: event.target.value
//         }));
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(formData);
//         setFormData({ username: "", password: "" });
    
//         axios.post("http://localhost:8080/signup", formData)
//             .then(result => {
//                 console.log(result);
//                 navigate("/"); // Navigate on success
//             })
//             .catch(err => {
//                 console.error(err);
//                 navigate("/signup"); // Navigate on error
//             });
//     };
    

//     return (
//         <div className="SignForm">
//             <form onSubmit={handleSubmit}>
//                 <div className='Title'>
//                     <h4>Sign Up</h4>
//                 </div>
//                 <TextField
//                     id="username"
//                     label="Enter username"
//                     variant="filled"
//                     className='textFlied'
//                     value={formData.username}
//                     name="username"
//                     onChange={handleChange}
//                 />
//                 <TextField
//                     id="password"
//                     label="Enter password"
//                     variant="filled"
//                     type='password'
//                     className='textFlied'
//                     value={formData.password}
//                     name="password"
//                     onChange={handleChange}
//                 />
//                    <Button 
//                    variant="contained" 
//                    className='Submitbutton'
//                    type="submit">
//                    SignUp</Button>
//             </form>
//             {/* <h3>Already signed up?</h3>
//                 <Link to='/login'>
//                     <Button
//                         variant="contained"
//                         className='btn2'>
//                         Login
//                     </Button>
//                 </Link> */}
//         </div>
//     );
// }


import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import axios from 'axios';
import './comman.css';

export default function SignUp() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [flashMessage, setFlashMessage] = useState(""); // State for flash messages
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

        axios.post("http://localhost:8080/signup", formData , { withCredentials: true })
        .then(result => {
            console.log(result);
            setFlashMessage("You are signed up!"); // Correct message for signup
            setFormData({ username: "", password: "" }); // Clear form data after successful signup
            setTimeout(() => {
                setFlashMessage(""); // Clear message after some time
                navigate("/"); // Redirect after a successful signup
            }, 2000); // Adjust duration as needed
        })
        .catch(err => {
            console.error(err);
            setFlashMessage("Signup failed. Please try again."); // Set flash message for errors
            navigate("/signup"); // Navigate on error
        });
    };

    return (
        <div className="SignForm">
            <form onSubmit={handleSubmit}>
            {flashMessage && <div className="flash-message">{flashMessage}</div>} {/* Display flash message */}
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

