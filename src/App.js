import React, { useState } from 'react';
import axios from 'axios';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography  from '@mui/material/Typography';
import './App.css';


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

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
    setDiablefetch(false)
    setWaist('')
    setFound(false)
  };

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
    .post('https://chaithanyamedasani.pythonanywhere.com/api/update-waist', {
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
    axios
    .post('https://chaithanyamedasani.pythonanywhere.com/api/fetch-waist', {
      height: height,
      age: age,
      weight: weight,
    })
    .then((response) => {
      const data = response.data;
      if (data.Status === 'SUCCESS')
      {
        setWaist(data.Waist)
      }
      else{
        setFound(true)
      }
    })
  };

 
  
  return (
    <div>
      <Grid item xs={12}>
        <Grid >
            <Card  style={{maxWidth: '500px',width: '100%',marginTop: '5rem' ,marginLeft:'25rem' }}>
              <CardContent>
                <Typography>WAIST FETCHER</Typography>
                <form  noValidate autoComplete='off' style={{ paddingLeft: '10px' }}>
                  <FormControl style={{width:'100%', marginBottom:'8px'}}>
                    <InputLabel>Height</InputLabel>
                    <Input
                       id='Height'
                       value={height}
                       onChange={handleHeightChange}
                       margin='normal'
                    />
                  </FormControl>
                  <FormControl style={{width:'100%', marginBottom:'8px'}}>
                    <InputLabel>Age</InputLabel>
                    <Input
                      id='Age'
                      value={age}
                      onChange={handleAgeChange}
                      margin='normal'
                    />
                  </FormControl>
                  <FormControl style={{width:'100%', marginBottom:'8px'}}>
                    <InputLabel>Weight</InputLabel>
                    <Input
                      id='Weight'
                      value={weight}
                      onChange={handleWeightChange}
                      margin='normal'
                    />
                  </FormControl>
                  <div className='button'>
                    <Button size='large' variant='contained' color='primary' onClick={fetchWaist} disabled={disablefetch}>
                      Fetch
                    </Button>
                  </div>
                </form>
                {waist ?(<div><Typography>waist measurements range from the data is {waist}</Typography></div>):
                found ? (
                        <div>
                         <Typography>The match waist Not Found in the Database.Please Enter waist to Update</Typography>
                         <FormControl style={{width:'100%', marginBottom:'8px'}}>
                          <InputLabel>Waist</InputLabel>
                          <Input
                            id='Waist'
                            value={givenwaist}
                            onChange={handleWaistChange}
                            margin='normal'
                          />
                        </FormControl>
                        <div className='button'>
                          <Button size='large' variant='contained' color='primary' onClick={updateWaist} disabled={disablesubmit}>
                            Submit
                          </Button>
                        </div>
                        {submitmsg ? (<Typography>{submitmsg}</Typography>):null}
                        </div>
                        ):null}
              </CardContent>
            </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;