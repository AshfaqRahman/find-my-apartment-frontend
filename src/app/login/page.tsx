'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from 'next/image'
import { LoginApi } from './apis';

function Copyright(props:any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Find My Apartment
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

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
    <Grid container style={{backgroundColor: "#D8D8D8"}}>
        <Grid item xs>
            <div style={{display: "flex", justifyContent: "right", padding: 0, margin: 0}}>
              <h1>Find My Apartment</h1>
              <style jsx>
              {`
                h1 {
                  margin-top: 75px;
                  font-size: 50px;
                  font-family: Lexend;
                  padding: 0px;
                }
              `}
              </style>
            </div>
            <div style={{display: "flex", justifyContent: "right", padding: 10}}>
                <Image 
                  src="/apartment.svg" 
                  width={475} height={300} 
                  alt="Apartment"/>
            </div>
        </Grid>
        
        <Grid item xs>
            <div style={{display: "flex", justifyContent: "left"}}>
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box>
                            <TextField
                            margin="normal"
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
                            <TextField
                            margin="normal"
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
                            sx={{ mt: 3, mb: 2 }}
                            >
                            Login
                            </Button>
                            <Grid container>
                            <Grid item xs>
                                <Link href="/recover" variant="body2">
                                Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                            </Grid>
                        </Box>
                        </Box>
                        <Copyright sx={{ mt: 8, mb: 4 }} />
                    </Container>
                </ThemeProvider>
            </div>
        </Grid>
    </Grid>
    
  );
}