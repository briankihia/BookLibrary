import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // md covers tablet + phone

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("session"));
    if (session?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${session.token}`;
      setUser(session.user);
    } else {
      alert("You must be logged in to view this page");
      window.location.href = "/login";
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("session");
    navigate("/");
  };

  const isAdmin = user?.role?.toLowerCase() === "admin";

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const menuLinks = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Crew", path: "/crew" },
    { label: "Ports", path: "/ports" },
    { label: "Ships", path: "/ships" },
    { label: "Cargo", path: "/cargo" },
    { label: "Shipments", path: "/shipments" },
    { label: "Clients", path: "/clients" }
  ];

  const adminLinks = [
    { label: "Admin Dashboard", path: "/admin-dashboard" },
    { label: "Manage Users", path: "/users" }
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Book Library System
        </Typography>

        {isMobile ? (
          <>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menuLinks.map((link) => (
                <MenuItem
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    handleMenuClose();
                  }}
                >
                  {link.label}
                </MenuItem>
              ))}
              {isAdmin &&
                adminLinks.map((link) => (
                  <MenuItem
                    key={link.path}
                    onClick={() => {
                      navigate(link.path);
                      handleMenuClose();
                    }}
                  >
                    {link.label}
                  </MenuItem>
                ))}
              <MenuItem
                onClick={() => {
                  logout();
                  handleMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            {menuLinks.map((link) => (
              <Button
                key={link.path}
                color="inherit"
                onClick={() => navigate(link.path)}
              >
                {link.label}
              </Button>
            ))}
            {isAdmin &&
              adminLinks.map((link) => (
                <Button
                  key={link.path}
                  color="inherit"
                  onClick={() => navigate(link.path)}
                >
                  {link.label}
                </Button>
              ))}
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
