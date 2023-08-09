"use client";
import { Inter, Rochester, Satisfy } from "next/font/google";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ApartmentIcon from "@mui/icons-material/Apartment";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import { _appBarHeight, _secondaryColor } from "@/static/constants";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// const pages = ["Add Apartment", "Advance Search", "Room Finder", "Recommended"];
const pages = [
  {
    name: "Add Apartment",
    link: "/add-apartment",
  },
  {
    name: "Advance Search",
    link: "/advance-search",
  },
  {
    name: "Room Finder",
    link: "/room-finder",
  },
  {
    name: "Recommendation",
    link: "/recommendation",
  },
];
const settings = [
  "Profile",
  "My Apartments",
  "My Wishlist",
  "Saved Searches",
  "My Preferences",
  "Logout",
];

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily: rochester.style.fontFamily,
  },
});

export default function AppBarComponent() {
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

  let height = _appBarHeight;

  return (
    <>
      <Box margin={0} maxHeight={{ height }} minHeight={{ height }}>
        <AppBar position="fixed" sx={{ backgroundColor: _secondaryColor }}>
          <Container maxWidth={false}>
            <Toolbar disableGutters>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "inline" } }}>
                <ApartmentIcon sx={{ mr: 1 }} />
                <ThemeProvider theme={theme}>
                  <Typography
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                      mr: 2,
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
                ></Menu>
              </Box>
              <ApartmentIcon
                sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
              />
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <Button
                    key={page.name}
                    href={page.link}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Tooltip title="Notifications">
                  <NotificationsActiveOutlinedIcon sx={{ color: "white" }} />
                </Tooltip>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "52px", mr: "0px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  );
}
