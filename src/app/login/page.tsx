'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image'
import { LoginApi } from './apis';

import { useRouter } from "next/navigation";
import { _color, _pageHeight, _pageMargin } from "@/static/constants";
import LoaderComponent from "@/components/loader";
import ToastComponent from "@/mui-components/toast";
import { setCookie } from "cookies-next";

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
  const { push } = useRouter();

  var [email, setEmail] = React.useState("")
  var [password, setPassword] = React.useState("")

  let [loggingLoader, setLoggingLoader] = React.useState(false);
  let [openError, setOpenError] = React.useState(false);
  let [openSuccess, setOpenSuccess] = React.useState(false);
  let [message, setMessage] = React.useState("");


  let loginSubmit = async () => {
    setLoggingLoader(true);
    const data = {
      email: email,
      password: password,
    }
    // console.log(data);
    const response : any = await LoginApi(data)
    if(response.success){
      // console.log(response);
      setMessage("Login Successful");
      setOpenSuccess(true);
      setTimeout(() => {
        setLoggingLoader(false);
        setCookie("token", response.data.token, {
          maxAge: 1 * 8 * 60 * 60, // 8 hours
        })
        push("/home");
      }, 0);
    } else {
      setLoggingLoader(false);
      setMessage(response.message);
      setOpenError(true);
    }
  };

  return (
    <>
      <Grid container style={{backgroundColor: "#E6E6E6", height: "96.5vh"}}>
        <LoaderComponent loading={loggingLoader} />
        
        <Grid item xs>
          <Grid style={{display: "flex", justifyContent: "right", padding: 10}}>
            <Image 
              src="/skyline.jpg" 
              width={500} height={500} 
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
      
      <ToastComponent
        message={message}
        open={openError}
        onClose={setOpenError}
        onCross={setOpenError}
        severity="error"
      />
      <ToastComponent
        message={message}
        open={openSuccess}
        onClose={setOpenSuccess}
        onCross={setOpenSuccess}
        severity="success"
      />
      <Copyright/>
    </>
  );
}