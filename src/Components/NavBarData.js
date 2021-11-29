import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LuggageIcon from "@mui/icons-material/Luggage";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import EmailIcon from "@mui/icons-material/Email";

export const NavBarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/userDashboard",
  },
  {
    title: "Properties",
    icon: <ApartmentIcon />,
    link: "/userDashboard/properties",
  },
  {
    title: "Owners",
    icon: <PeopleAltIcon />,
    link: "/userDashboard/owners",
  },
  {
    title: "Bookings",
    icon: <LuggageIcon />,
    link: "/userDashboard/bookings",
  },
  {
    title: "Messages",
    icon: <EmailIcon />,
    link: "/userDashboard/messages",
  },
  {
    title: "Logout",
    icon: <LogoutIcon />,
    link: "/login",
  },
];
