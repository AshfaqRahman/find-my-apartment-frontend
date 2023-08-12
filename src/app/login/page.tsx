'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Image from 'next/image'
import { LoginApi } from './apis';

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

export default function Login() {
  var [email, setEmail] = React.useState("")
  var [password, setPassword] = React.useState("")

  let loginSubmit = async () => {
    const data = {
      email: email,
      password: password,
    }
    console.log(data);
    const response = await LoginApi(data)
    if(response.success){
      // redirect("/advance-search");
    }
  };

  return (
    <>
      <Grid container style={{backgroundColor: "#E6E6E6", height: "96.5vh"}}>
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
              <Box sx={{marginTop: 10, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <Grid style={{fontFamily:"Tahoma", fontSize:"40px"}}>
                  <p>Find My Apartment</p>
                </Grid>

                <Image src="/login-icon.png" width={80} height={80} alt="Login"/>
                
                <Box>
                  <TextField margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(event:any) => setEmail(event.target.value)}
                    autoComplete="email"
                    autoFocus
                  />
                  <TextField margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event:any) => setPassword(event.target.value)}
                    autoComplete="current-password"
                  />
                  <Button
                    type="submit"
                    onClick={loginSubmit}
                    fullWidth
                    variant="contained"
                    sx={{mt: 2, mb: 2 }}
                  >
                    Login
                  </Button>

                  <Grid container>
                    <Grid item xs>
                      <Link href="/recover"  style={{display:"flex", fontSize:"14px"}}>
                        Forgot password?
                      </Link>
                    </Grid>
                    <Grid item>
                      <Link href="/register" style={{display:"flex", fontSize:"14px"}}>
                        Don't have an account? Register
                      </Link>
                    </Grid>
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