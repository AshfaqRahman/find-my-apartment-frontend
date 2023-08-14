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
import { _appBarHeight, _color } from "@/static/constants";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ButtonComponent from "@/mui-components/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faCircleStop,
  faBell,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "./api/app-bar";
import { deleteCookie } from "cookies-next";
import ToastComponent from "@/mui-components/toast";

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

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const rochester = Rochester({ weight: "400", subsets: ["latin"] });
const theme = createTheme({
  typography: {
    fontFamily: rochester.style.fontFamily,
  },
});

export default function AppBarComponent() {
  let [openToast, setOpenToast] = React.useState(false);
  let [message, setMessage] = React.useState("");
  let [severity, setSeverity] = React.useState("success");

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

  const settings = [
    {
      name: "Profile",
      link: "/profile",
      onClick: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "My Apartments",
      link: "/my-apartments",
      onClick: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "My Wishlist",
      link: "/my-wishlist",
      onClick: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "Saved Searches",
      link: "/saved-searches",
      onClick: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "My Preferences",
      link: "/my-preferences",
      onClick: () => {
        handleCloseUserMenu();
      },
    },
    {
      name: "Logout",
      link: "/logout",
      onClick: () => {
        handleCloseUserMenu();
        logout().then((res) => {
          deleteCookie("token");

          if (res.success) {
            setSeverity("success");
            setMessage(res.message);
            setOpenToast(true);
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          } 
          else {
            
            setSeverity("error");
            setMessage(res.data.message);
            setOpenToast(true);
            setTimeout(() => {
              window.location.href = "/";
            }, 1000);
          }
        });
      },
    },
  ];

  let height = _appBarHeight;

  return (
    <>
      <Box margin={0} maxHeight={{ height }} minHeight={{ height }}>
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
                ></Menu>
              </Box>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <ButtonComponent
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    variant="contained"
                    style="secondary"
                    link={page.link}
                  >
                    {page.name}
                  </ButtonComponent>
                ))}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Tooltip title="Notifications">
                  {/* <FontAwesomeIcon icon={"fa-solid fa-bell"} beat size="lg" /> */}
                  <FontAwesomeIcon icon={faBell} beat />
                  {/* <CircleNotificationsIcon
                    sx={{ color: _color.primary, cursor: "pointer" }}
                    fontSize="large"
                  /> */}
                </Tooltip>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      // src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "50px", mr: "0px" }}
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
                    <MenuItem key={setting.name} onClick={setting.onClick}>
                      <Typography textAlign="center">{setting.name}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      <ToastComponent
        message={message}
        open={openToast}
        onClose={setOpenToast}
        onCross={setOpenToast}
        severity={severity}
      />
    </>
  );
}
