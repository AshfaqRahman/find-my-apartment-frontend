import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import Link from '@mui/material/Link';
import { _cardRadius, _divRadius } from "@/static/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBed, faShower } from "@fortawesome/free-solid-svg-icons";


export default function Post(props: any) {
    let contactOwner = () => {
        
        // needs work
    };

  return (
    <>
      <Card sx={{ margin: 2, borderRadius: _cardRadius }}>
        <CardContent>
            <Grid container>
                <Grid item md={7}>
                    <Typography key={2} gutterBottom variant="h5" component="div" fontWeight={400}>
                        <b>{props.data.title}</b>
                    </Typography>
                </Grid>

                <Grid item md={2} display={"flex"} alignItems={"center"} justifyContent={"left"}>
                    {props.data.type}
                </Grid>
                <Grid item md={3} display={"flex"} alignItems={"center"} fontSize={"20px"}  justifyContent={"right"}>
                    <b>BDT. {props.data.price}</b> 
                </Grid>
            </Grid>

            <Grid style={{marginTop:"5px", marginBottom:"10px"}}>
                {props.data.textBody}
            </Grid>
            
            <Grid container>
                <Grid item md={2}>
                    {props.data.area_sqft} sqft 
                </Grid>

                <Grid item md={2}>
                    <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />{" "} <b>{props.data.bedrooms}</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Grid>

                <Grid item md={2}>
                    <FontAwesomeIcon icon={faBed} style={{ margin: 3 }} />{" "} <b>{props.data.baths}</b> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                </Grid>
            </Grid>

            <Grid>
                <b>Facilities:</b> {props.data.facilities} 
            </Grid>

            <Grid>
                <b>Starpoints:</b> {props.data.star_points} 
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
