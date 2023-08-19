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

function Copyright(props: any) {
  return (
    <Grid align="center" style={{backgroundColor:"E6E6E6", fontSize:"14px"}} {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Find My Apartment
      </Link>{" "}
      {new Date().getFullYear()}
    </Grid>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

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
      gender: gender,
    };
    const response = await RegisterApi(data);
    
    if (response.success) {
      // redirect
      
    }
  };

  return (
    <Grid container style={{backgroundColor: "#D8D8D8", display:"flex", justifyContent:"center"}}>
      <Grid item maxWidth={"30vw"}>
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
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
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Grid>
    </Grid>
    
  );
}
