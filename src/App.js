import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './App.css';
import { Typography } from '@mui/material';


const App = (props) => {
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [waist, setWaist] = useState('');
  const [givenwaist, setGivenwaist] = useState('');
  const [found, setFound] = useState(false);
  const [submitmsg, setSubmitmsg] = useState(false);
  const [disablesubmit, setDisablesubmit] = useState(false);
  const [disablefetch, setDiablefetch] = useState(false);
  const [baseurl,setBaseUrl] = useState('');

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    setDisablesubmit(false)
    setDiablefetch(false)
    setWaist('')
    setFound(false)
  };

  useEffect(()=>{
    const currentUrl = window.location.href;
    if (currentUrl.includes('https://')) {
        setBaseUrl('https://chaithanyamedasani.pythonanywhere.com/');
      } else {
        setBaseUrl('http://localhost:8000');
      }
})

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setDiablefetch(false)
    setWaist('')
    setFound(false)
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value)
    setDiablefetch(false)
    setWaist('')
    setFound(false)
  };

  const handleWaistChange = (e) => {
    setGivenwaist(e.target.value)
  };

  const updateWaist = () => {
    axios
    .post(baseurl+'/api/update-waist', {
      height: height,
      age: age,
      weight: weight,
      waist: givenwaist,
    })
    .then((response) => {
      const data = response.data;
      if (data.Status === 'SUCCESS'){
        setDisablesubmit(true)
        setSubmitmsg("Record Updated to DB successfully")
      }
    })
  };

  const fetchWaist = () => {
    setDiablefetch(true)
    setDisablesubmit(false)
    setGivenwaist('')
    setSubmitmsg('')
    axios
    .post(baseurl+'/api/fetch-waist', {
      height: height,
      age: age,
      weight: weight,
    })
    .then((response) => {
      const data = response.data;
      if (data.Status === 'SUCCESS')
      {
        setWaist(data.Waist)
        console.log(data.Waist)
      }
      else{
        setFound(true)
      }
    })
  };

 
  
  return (
    <div className='main-container'>
        <div className='inside-container'>
           <h3>Waist Fetcher</h3>
            
           <TextField 
              id="height" 
              label="Height"
              variant="standard" 
              value={height}  
              onChange={handleHeightChange} 
              required 
              className='mt-3'
            />
           <TextField 
              id="age" 
              label="Age"
              variant="standard" 
              value={age} 
              required 
              onChange={handleAgeChange}
              className='mt-3'
            />
           <TextField 
              id="weight" 
              label="Weight" 
              value={weight}  
              onChange={handleWeightChange}
              required
              variant="standard"
              className='mt-3'
            />
           <br />
           <Button variant="contained" onClick={fetchWaist} disabled={disablefetch} className='mt-3'>FETCH</Button>
           {waist ? (<Typography className='mt-3 text-secondary'>The waist is {waist} </Typography>):null}
           {found ? (
           <div className='mt-2'>
            <h6>Waist Not Found Would you like to update?</h6>
            <TextField 
              id="givenwaist" 
              label="Give Your Waist" 
              value={givenwaist}  
              onChange={handleWaistChange}
              disabled={disablesubmit}
              required
              variant="standard"
            />
             <Button variant="contained" onClick={updateWaist} disabled={disablesubmit} className='mt-3'>SUBMIT</Button>
             {submitmsg ? (<Typography className='text-success'>{submitmsg}</Typography>):null}
            </div>
            ):null}
           
        </div>
        
   
    </div>
  );
};

export default App;