import React from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  MdAdminPanelSettings,
  MdCall,
  MdDriveEta,
  MdMeetingRoom,
  MdPhoneInTalk,
} from "react-icons/md";

const AppointmentButton = ({ animation }) => {
  let buttonStyles = {
    variant: "solid",
    bg: "blue.900",
    color: "white",
    w: "full",
    _hover: {
      bg: "yellow.400",
    },
  };

  if (animation) {
    buttonStyles = {
      ...buttonStyles,
      css: {
        animation: "ringing 1s infinite",
        "@keyframes ringing": {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(10deg)" },
          "50%": { transform: "rotate(-10deg)" },
          "75%": { transform: "rotate(5deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
    };
  }

  return (
    <Menu>
      {/* <MenuButton as={Button} {...buttonStyles}>
        Book an Appointment
      </MenuButton>
      <MenuList>
        <MenuItem as="a" href="tel:6476949562">
          <MdCall /> <Box ml={4}>Call</Box>
        </MenuItem>
        <MenuItem as={Link} to="/five-minutes-appointment">
          <MdPhoneInTalk /> <Box ml={4}>5 minutes</Box>
        </MenuItem>
        <MenuItem as={Link} to="/physical-appointment">
          <MdDriveEta /> <Box ml={4}>Physical Meet-up</Box>
        </MenuItem>
      </MenuList> */}
    </Menu>
  );
};

export default AppointmentButton;
