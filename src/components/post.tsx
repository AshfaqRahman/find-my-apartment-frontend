import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import Link from '@mui/material/Link';
import { _cardRadius, _divRadius } from "@/static/constants";


export default function Apartment(props: any) {
    let contactOwner = () => {
        
        // needs work
    };

  return (
    <>
      <Card sx={{ margin: 2, borderRadius: _cardRadius }}>
        <CardContent>
            <Grid container>
                <Grid item xs>
                    <Typography key={2} gutterBottom variant="h5" component="div" fontWeight={400}>
                        <b>{props.data.title}</b>
                    </Typography>
                </Grid>

                <Grid item xs display={"flex"} justifyContent={"right"}>
                    {props.data.type}, BDT. {props.data.price} 
                </Grid>
            </Grid>

            <Grid>
                {props.data.textBody}
            </Grid>
            
            <Grid container>
                <Grid item xs>
                    {props.data.area_sqft} sqft    <HotelRoundedIcon /> {props.data.bedrooms}  <BathtubOutlinedIcon/> {props.data.baths} 
                </Grid>

                <Grid item xs>
                    <i><b>Starpoints:</b></i> {props.data.star_points} 
                </Grid>

                <Grid item xs>
                    <i><b>Facilities:</b></i> {props.data.facilities} 
                </Grid>
            </Grid>
 
            <Button
                type="submit"
                onClick={contactOwner}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Contact Owner
            </Button>
        </CardContent>
      </Card>
    </>
  );
}
