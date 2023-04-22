import React, { useState } from 'react';
import axios from 'axios';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const styles = (theme) => ({
  // container: {
  //   display: 'flex',
  //   flexWrap: 'wrap',
  // },
  card: {
    width: 300,
    postion: 'center'
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 200,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
});


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
    .post('http://chaithanyamedasani.pythonanywhere.com/api/update-waist', {
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

  }

  const fetchWaist = () => {
    setDiablefetch(true)
    axios
    .post('http://chaithanyamedasani.pythonanywhere.com/api/fetch-waist', {
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
    });
  };

 
  

  

  return (
    <div style={{ 
      backgroundImage: `url("https://www.ecotravelschristchurch.co.nz/wp-content/uploads/2022/01/bg-1.jpg")`, height:'617px'}}>
      <Grid item xs={12}>
        <Grid container className={styles.demo} justify='center'>
          <div style={{maxWidth: '500px',width: '100%',marginTop: '5rem'}}>
            <Card className={styles.card} style={{maxWidth: '500px',width: '100%'  }}>
              <CardContent>
                <h5 style={{ margin: 0, fontWeight: 500, fontSize: '1.7rem', textAlign:'center' }}>WAIST FETCHER</h5>
                <form className={styles.container} noValidate autoComplete='off' style={{ paddingLeft: '10px' }}>
                  <FormControl style={{width:'100%', marginBottom:'8px'}}>
                    <InputLabel htmlFor="standard-adornment-password">Height</InputLabel>
                    <Input
                       id='Height'
                       label='Height'
                       className={styles.textField}
                       value={height}
                       onChange={handleHeightChange}
                       margin='normal'
                       style={{ width: '100%' }}
                    />
                  </FormControl>
                  <FormControl style={{width:'100%', marginBottom:'8px'}}>
                    <InputLabel htmlFor="standard-adornment-password">Age</InputLabel>
                    <Input
                      id='Age'
                      className={styles.textField}
                      value={age}
                      onChange={handleAgeChange}
                      margin='normal'
                      style={{ width: '100%' }}
                    />
                  </FormControl>
                  
                  <FormControl style={{width:'100%', marginBottom:'8px'}}>
                    <InputLabel htmlFor="standard-adornment-password">Weight</InputLabel>
                    <Input
                      id='Weight'
                      className={styles.textField}
                      value={weight}
                      onChange={handleWeightChange}
                      margin='normal'
                      style={{ width: '100%' }}
                    />
                  </FormControl>
                  <div style={{marginTop: '1rem', textAlign:'center'}}>
                    <Button size='large' variant='contained' color='primary' onClick={fetchWaist} disabled={disablefetch}>
                      Fetch
                    </Button>
                  </div>
                </form>
                {waist ?(<div><h5 style={{color:'green', textAlign:'center'}}>waist measurements range from the data is {waist}</h5></div>):
                found ? (
                        <div>
                         <h5>The match waist Not Found in the Database.Please Enter waist to Update</h5>
                         <FormControl style={{width:'100%', marginBottom:'8px'}}>
                          <InputLabel htmlFor="standard-adornment-password">Waist</InputLabel>
                          <Input
                            id='Waist'
                            className={styles.textField}
                            value={givenwaist}
                            onChange={handleWaistChange}
                            margin='normal'
                            style={{ width: '100%' }}
                          />
                        </FormControl>
                        <div style={{textAlign:'center'}}>
                          <Button size='large' variant='contained' color='primary' onClick={updateWaist} disabled={disablesubmit}>
                            Submit
                          </Button>
                        </div>
                        {submitmsg ? (<h4 style={{color:'green',textAlign:'center'}}>{submitmsg}</h4>):null}
                        </div>
                        ):null}
                    
              </CardContent>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;