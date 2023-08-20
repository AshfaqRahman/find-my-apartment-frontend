"use client";
import styles from "./page.module.css";
// import gstyles from ""

import {
  Inter,
  Noto_Sans,
  Sacramento,
  Rochester,
  Satisfy,
} from "next/font/google";
import { Lexend } from "next/font/google";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";

import { ThemeProvider, createTheme } from "@mui/material";
import ButtonComponent from "@/mui-components/buttons";
import { _appBarHeight, _color } from "@/static/constants";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };
const notoSans = Noto_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const secram = Sacramento({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });

const theme = createTheme({
  typography: {
    fontFamily: rochester.style.fontFamily,
  },
});

const pages = ["Trends", "Help"];
const settings = [
  "Profile",
  "My Apartments",
  "My Wishlist",
  "Saved Searches",
  "My Preferences",
  "Logout",
];

export default function AppBarHomeComponent(props: any) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <Box
        margin={0}
        maxHeight={{ _appBarHeight }}
        minHeight={{ _appBarHeight }}
      >
        <AppBar position="fixed" sx={{ backgroundColor: _color.secondary }}>
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Box sx={{ mr: 1, mt: 1 }}>
                  <FontAwesomeIcon icon={faBuilding} size="xl" />
                </Box>
                <Box>
                  <ThemeProvider theme={theme}>
                    <Typography
                      noWrap
                      component="a"
                      href="/"
                      sx={{
                        ml: 1,
                        fontSize: "1.75rem",
                        fontWeight: 600,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      Find My Apartment
                    </Typography>
                  </ThemeProvider>
                </Box>
              </Box>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Find My Apartment
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <ButtonComponent
                    key={page}
                    onClick={handleCloseNavMenu}
                    variant="contained"
                    style="secondary"
                  >
                    {page}
                  </ButtonComponent>
                ))}
              </Box>

              <Grid></Grid>

              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
                <ButtonComponent
                  key={"Register"}
                  onClick={handleCloseNavMenu}
                  variant="contained"
                  link="/register"
                  style="secondary"
                >
                  Register
                </ButtonComponent>
                <ButtonComponent
                  key={"Login"}
                  link="/login"
                  onClick={handleCloseNavMenu}
                  variant="contained"
                  style="secondary"
                >
                  Login
                </ButtonComponent>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
