import { _color, _divRadius } from "@/static/constants";
import { Box, Typography } from "@mui/material";



export default function Pricing(props: any) {
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
          Pricing
        </Typography>
        <Typography variant="body1" gutterBottom>
          description
        </Typography>
      </Box>
    );
  }