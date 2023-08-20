import { _color, _divRadius } from "@/static/constants";
import { Box, Button, Grid, Typography } from "@mui/material";



export default function FacStar(props: any) {
    return (
      <Grid container>
        <Grid item md={12} lg={12}>
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
              <b>{props.type}</b>
            </Typography>
          
            <Grid item md={10} lg={10}>
              {props.list.map((x: any, idx: number) => {
                return (
                  <Button
                    key={idx}
                    variant="contained"
                    color="info"
                    sx={{
                      borderRadius: "50px",
                      height: "25px",
                      mr: 1,
                      fontSize: "16px",
                      margin: "5px"
                    }}
                  >
                    {x}
                  </Button>
                );
              })}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      
    );
  }