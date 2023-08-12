"use client";
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import SelectComponent from '@/mui-components/select';
import { RegisterApi } from './apis';
import Image from 'next/image';

function Copyright(props:any) {
  return (
    <Grid align="center" style={{backgroundColor:"E6E6E6", fontSize:"14px"}} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Find My Apartment
      </Link>{' '}
      {new Date().getFullYear()}
    </Grid>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme()

export default function SignUp() {
  var [firstName, setFirstName] = React.useState("")
  var [lastName, setLastName] = React.useState("")
  var [email, setEmail] = React.useState("")
  var [password, setPassword] = React.useState("")
  var [phone_no, setPhoneNo] = React.useState("")
  var [gender, setGender] = React.useState("")

  let registerSubmit = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      phone_no: phone_no,
      gender: gender
    }
    console.log(data);
    const response = await RegisterApi(data)
    if(response.success){
      // redirect
      
    }
  }

  return (
    <>
      <Grid container style={{backgroundColor: "#E6E6E6", height:"96.5vh"}}>
        <Grid item xs>
          <Grid style={{display: "flex", justifyContent: "right", padding: 10}}>
            <Image 
              src="/skyline.jpg" 
              width={600} height={600} 
              alt="Skyline"/>
          </Grid>
        </Grid>
          
        <Grid item xs style={{display:"flex", justifyContent:"center"}}>
          <Grid style={{width:"30vw"}}>
            <Box sx={{marginTop: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>

              <Image src="/register.png" width={150} height={150} alt="Register"/>

              <Box>
                <Grid container spacing={2}>
                  <Grid item md={6}>
                    <TextField
                      autoComplete="given-name"
                      name="firstName"
                      required
                      fullWidth
                      id="firstName"
                      label="First Name"
                      value={firstName}
                      onChange={(event:any) => setFirstName(event.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item md={6}>
                    <TextField
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      value={lastName}
                      onChange={(event:any) => setLastName(event.target.value)}
                      autoComplete="family-name"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      value={email}
                      onChange={(event:any) => setEmail(event.target.value)}
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={password}
                      onChange={(event:any) => setPassword(event.target.value)}
                      autoComplete="new-password"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      required
                      fullWidth
                      name="phone_no"
                      label="Phone No."
                      type="tel"
                      id="phone_no"
                      value={phone_no}
                      onChange={(event:any) => setPhoneNo(event.target.value)}
                      placeholder="01XXX-XXX-XXX"
                    />
                  </Grid>
                  <Grid item md={6}>
                    <SelectComponent value={gender} elements={['Male', 'Female']} title={'Gender'} handleChange={setGender}/>
                  </Grid>
                </Grid>            
                <Button
                  type="submit"
                  onClick={registerSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Register
                </Button>
                
                <Grid item>
                  <Link href="/login" style={{fontSize:"14px", display:"flex", justifyContent:"right"}}>
                    Already have an account? Login
                  </Link>
                </Grid>
              </Box>
            </Box>  
          </Grid>        
        </Grid>
      </Grid>

      <Copyright/>
    </>
    
  );
}