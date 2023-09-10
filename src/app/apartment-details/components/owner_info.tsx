import { _color, _divRadius } from "@/static/constants";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../apis";
import { useRouter } from "next/navigation";

interface IUser{
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_no: string;
  gender: string;
}


export default function OwnerInfo(props: any) {
  const { push } = useRouter();
  
  // owner id state and setter
  let [owner, setOwner] = useState<IUser>();

    useEffect(() => {
        console.log("OwnerInfo props: ", props);

        // call get owner info api
        (async () => {
            const res = await getUser(props.owner);
            console.log("OwnerInfo res: ", res);
            if(res.success){
              setOwner(res.data);
            }else{
              console.log("OwnerInfo error: ", res.message);
            }
        })();
    }, []);

    // owner message button on click
    const handleOwnerMessage = () => {
      console.log("OwnerInfo handleOwnerMessage"); 
      // nagigate to route chat/:user_id
      push("/chat?receiver_id=" + owner?.user_id);
    }

    return (
      <Box
        sx={{
          borderRadius: _divRadius,
          bgcolor: _color.background_right,
          border: "1px solid " + _color.divider,
          boxShadow: 1,
          padding: "1rem",
        }}
      >
        <Typography variant="h5" gutterBottom>
          <b>Owner info</b>
        </Typography>

        <Grid container style={{margin:"5px"}}>
            <Grid item md={6}>Name: <b>{owner?.first_name + " " + owner?.last_name}</b></Grid>
            <Grid item md={4}>Email: <b>{owner?.email}</b></Grid>
        </Grid>

        <Grid container style={{margin:"5px"}}>
            <Grid item md={6}>Phone No.: <b>{owner?.phone_no}</b></Grid>
            <Button variant="contained" 
            onClick={handleOwnerMessage}
            color="primary"  
            style={{margin:"5px"}}>Message</Button>
        </Grid>

      </Box>
    );
  }