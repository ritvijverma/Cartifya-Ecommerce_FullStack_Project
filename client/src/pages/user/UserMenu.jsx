import React from "react";
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";
import { NavLink } from "react-router-dom";

// Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import CategoryIcon from "@mui/icons-material/Category";
import PaymentIcon from "@mui/icons-material/Payment";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

const UserMenu = () => {
  return (
    <Card
      sx={{
        width: 260,
        minHeight: "100%",
        borderRadius: 0,
        boxShadow: 3,
      }}
    >
      {/* Header */}
      <Typography
        variant="h6"
        sx={{ p: 2, fontWeight: "bold", textAlign: "center" }}
      >
        User Panel
      </Typography>

      <Divider />

      {/* Menu */}
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="profile"
            end
            sx={{
              "&.active": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="products"
            sx={{
              "&.active": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="categories"
            sx={{
              "&.active": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Categories" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="payments"
            sx={{
              "&.active": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItemIcon>
              <PaymentIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            component={NavLink}
            to="orders"
            sx={{
              "&.active": {
                backgroundColor: "rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItemButton>
        </ListItem>
      </List>
    </Card>
  );
};

export default UserMenu;
