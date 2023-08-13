import { _color, _divRadius } from "@/static/constants";
import { Box, Typography } from "@mui/material";

export default function StarPoints(props: any) {
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
          StarPoints
        </Typography>
        <Typography variant="body1" gutterBottom>
          description
        </Typography>
      </Box>
    );
  }