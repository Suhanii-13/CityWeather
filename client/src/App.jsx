import React from 'react';
import WeatherApp from './Componets/WeatherApp';
import SignUp from "./Componets/SignUp"
import Login from "./Componets/Login"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <>
    <BrowserRouter>
       <Routes>
         <Route path ="/" element={<WeatherApp/>}></Route>
         <Route path="/signup" element={<SignUp/>} ></Route>
         <Route path="/login" element={<Login/>}></Route>
       </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;



