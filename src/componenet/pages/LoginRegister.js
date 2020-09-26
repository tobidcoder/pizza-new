import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField, Container,Button } from '@material-ui/core';
import NewNav from '../NewNav';
import { Typography } from '@material-ui/core';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAlert } from 'react-alert';
import { useForm, Controller } from "react-hook-form";
import { TokenService, SetUser } from '../../services/storage.service';
import Config from '../../services/api.config';
import { useHistory } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function LoginReg() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false)

  const history = useHistory();
  const {  control, register, handleSubmit, watch, errors } = useForm();
  const [login, setLogin] = useState(false)
  const alert = useAlert()
  const onSubmit = data => {
    setLoading(true);
    console.log(data);
    {
      data.name ?
    axios.post(`${Config.baseUrl}/register`, {
      data,
    }, Headers)
      .then((response) => {

            SetUser.saveUser(response.data.data);
            TokenService.saveToken(response.data.data.token)
            TokenService.saveUserId(response.data.data.user_id)
            TokenService.saveUserEmail(response.data.data.email)
            history.push("/orders");
            window.location.reload(false)
            alert.success('Great, Register successful!');

      }, (error) => {
        console.log(error);
        alert.error('Oh, Email alredy been taken!');
      })
      .finally(function () {
        setLoading(false);
      })
       :      
      axios.post(`${Config.baseUrl}/login`, {
        data,
      }, Headers)
        .then((response) => {
            SetUser.saveUser(response.data.data);
            TokenService.saveToken(response.data.data.token)
            TokenService.saveUserId(response.data.data.user_id)
            TokenService.saveUserEmail(response.data.data.email)
            history.push("/orders");
            window.location.reload(false)
            alert.success('Great, Login successful!');
  
        }, (error) => {
          console.log(error);
          alert.error('Oh, Incorrect Email or Password!');
        })
        .finally(function () {
          setLoading(false);
        })
    }

  };

  return (
    <div style={{marginTop: 95, textAlign: 'center'}}>
    <NewNav />
    <Typography container="h4" variant="h6">
      {login? 'Login': 'Register'}
    </Typography>
    <div style={{textAlign: 'center'}}>
    <Container maxWidth="sm">
    <form className={classes.root}  onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      {login ? null : (
        <Controller
        as={TextField}
        id="standard-basic" 
        label="Name" 
        type="text"
        defaultValue=""
        control={control}
        name="name" inputRef={register({ required: true })}
        />
      )}
       
      {login ? null : (
         <Controller
        as={TextField}
        id="standard-basic"
          label="Phone" 
          type="number"
          defaultValue=""
          control={control}
          name="phone_number" inputRef={register({ required: true })}
          />
      )}
      {!login ? null : (
         <Controller
        as={TextField}
        id="standard-basic" 
          label="Email" 
          type="email"
          defaultValue=""
          control={control}
          name="email" inputRef={register({
            required: "Enter your e-mail",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            },
          })}
          />
      )}
      {!login ? null : (
        <Controller
        as={TextField}
        id="standard-basic" 
          label="Password"
          type="text"
          defaultValue=""
          control={control}
          name="password" inputRef={register({ 
            // required: true,
            required: 'Minimum of 6 characters',
            minLength: 6,
           })}
           />
      )}
      {login ? null : (
         <Controller
        as={TextField}
        id="standard-basic" 
          label="Email" 
          type="email"
          defaultValue=""
          control={control}
          name="email" inputRef={register({
            required: "Enter your e-mail",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Enter a valid e-mail address",
            },
          })}
          />
      )}
      {login ? null : (
        <Controller
        as={TextField}
        id="standard-basic" 
          label="Password" 
          type="text"
          defaultValue=""
          control={control}
          name="password" inputRef={register({ 
            required: true,
            required: 'Minimum of 6 characters',
            minLength: 6,
           })}
          />
      )}
      {/* {login ? null : (
        <Controller
        as={TextField}
        id="standard-basic" 
          label="Comfirm Password" 
          type="text"
          defaultValue=""
          control={control}
          name="c_password" inputRef={register({ required: true })}
          />
      )} */}
      {login ? null : (
        <Controller
        as={TextField}
        id="standard-basic"
           label="Address"
           type="text"
            defaultValue=""
            control={control}
            name="address" inputRef={register({ required: true })}
            />
      )}
      {errors.name && <p style={{color: 'red'}}>Name field is required</p>}
      {errors.phone_number && <p style={{color: 'red'}}>Phone number field is required</p>}
      {errors.email && <p style={{color: 'red'}}>Email field is required</p>}
      {errors.password && <p style={{color: 'red'}}>Password field is required</p>}
      {errors.c_password && <p style={{color: 'red'}}>Comfirm Password field is required</p>}
      {errors.address && <p style={{color: 'red'}}>Address field is required</p>}

      {/* <Button variant="contained"  color="secondary">
      Login Register
    </Button> */}
    <div style={{textAlign: 'center', padding: 30}}>
      {login?
      !loading ? 
      <Button type="submit" variant="contained" color="secondary">Login</Button>
        : (
          <Button variant="contained" color="secondary" disabled>
        <CircularProgress color="secondary"></CircularProgress>Loading...
        </Button> 
        ):
        !loading ? 
            <Button type="submit" variant="contained" color="secondary">Register</Button>
        : (
          <Button variant="contained" color="secondary" disabled>
        <CircularProgress color="secondary"></CircularProgress>Loading...
        </Button> 
        )}

       {/* <div style={{textAlign: 'center', paddingLeft: 35}}> */}
      {login? (
        <Typography container="h6" onClick={() => setLogin(false)} variant="p" style={{cursor: 'pointer', fontSize: 10}} >
        Do not have account
      </Typography>
      ):
      (
        <Typography onClick={() => setLogin(true)} container="h6" variant="p" style={{cursor: 'pointer', fontSize: 10}}>
        Already have account.
      </Typography>
      )
      }
      </div>
      {/* </div> */}
    </form>
    </Container>
    </div>
    </div>
  );
}
