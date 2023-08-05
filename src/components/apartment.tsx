import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import HotelRoundedIcon from '@mui/icons-material/HotelRounded';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';

export default function Apartment(props: any) {
  return (
    <>
      <Card sx={{ margin: 2 }}>
        <CardMedia
          sx={{ height: 250 }}
          image="/apartment.jpg"
          title="green iguana"
          key={1}
        />
        <CardContent>
          <Typography key={2} gutterBottom variant="h5" component="div">
            BDT. {props.data.price} taka
          </Typography>
          <Typography  key={3} gutterBottom variant="h6" component="div">
            {props.data.type}
          </Typography>
          <Typography  key={4} variant="h6" color="text.secondary">
            <HotelRoundedIcon />     {props.data.baths} <BathtubOutlinedIcon/> {props.data.bedrooms}, {props.data.area_sqft} sqft
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
