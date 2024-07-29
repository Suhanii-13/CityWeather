import { TextField, Button, useState, Link, useNavigate, axios, FlashMessage } from './import';
import './flash.css'; 

export default function Login() {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [flashMessage, setFlashMessage] = useState(null);
    const navigate = useNavigate();
    const handleChange = (event) => {
        setFormData((currData) => ({
            ...currData,
            [event.target.name]: event.target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setflashMessage(null);
        axios.post("http://localhost:8080/login", formData, { withCredentials: true })
        .then(result => {
          setFlashMessage({ type: 'success', text: 'Login successful' });
          setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
        })
        .catch(err => {
          console.log(err);
          setFlashMessage({ type: 'error', text: 'Incorrect username or password' });
        });
    };

    return (
        <div className="SignForm">
            <form onSubmit={handleSubmit}>
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
