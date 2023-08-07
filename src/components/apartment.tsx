import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import { apartmentTypeMapping } from "@/static/constants";

export default function Apartment(props: any) {

  let handleClick = async() => {
    props.onClick();
  }

  return (
    <>
      <Card sx={{ margin: 1 }}>
        <CardMedia
          sx={{ height: 250 }}
          image="/apartment.jpg"
          title="green iguana"
          key={1}
          onClick={handleClick}
        />
        <CardContent>
          <Typography key={2} gutterBottom variant="h5" component="div">
            BDT. {props.data.price} 
          </Typography>
          <Typography  key={3} gutterBottom variant="h6" component="div">
            {apartmentTypeMapping[props.data.type]}
          </Typography>
          <Typography  key={4} variant="h6" color="text.secondary">
            <HotelRoundedIcon />     {props.data.bedrooms} <BathtubOutlinedIcon/> {props.data.washrooms}, {props.data.area_sqft} sqft
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
