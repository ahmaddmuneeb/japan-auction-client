import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, Image, useColorMode } from "@chakra-ui/react";
import sedan from "../../assets/sedan.jpeg";
import SUVCAR from "../../assets/suv.jpeg";
import Truck from "../../assets/ram.jpeg";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSearchBy,
  setSearchBy,
  clearSearchBy,
} from "../../redux/slices/counterSlice";

const VehicleType = () => {
  const { colorMode } = useColorMode();
  const shadowColor = "rgba(26,54,93,0.4)";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCarType = useSelector(selectSearchBy);
  const imageSize = {
    base: `100%`,
    sm: `calc(50% - 5px)`,
    md: `calc(25% - 20px)`,
    lg: `calc(33% - 200px)`,
  };

  // console.log("selectSearch", selectedCarType)

  const handleCarType = (carType) => {
    dispatch(setSearchBy(carType));
    navigate("/inventory");
  };

  return (
    <Box textAlign="center" py={16} w={{ md: "88%" }} mx={"auto"}>
      <Text
        as="h1"
        fontWeight={700}
        color={"#1a365d"}
        fontSize={{ base: "3xl", md: "4xl" }}
      >
        WHAT TYPE OF VEHICLES CAN I BUY?
      </Text>
      <Text
        fontSize="md"
        marginTop="4"
        maxWidth={{ base: "100%", md: "30%" }}
        m="auto"
        fontWeight={500}
        color={colorMode === "light" ? "gray.700" : "gray.300"}
        py={6}
        px={{ base: 4 }}
      >
        Once you've gum speed, you can esplom over 400 cans, trucks, anut SUV's
        our ensure you find the night venicle that suits your needs and the
        within your budget. We are here to help!
      </Text>
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection={{ base: "column", md: "row" }}
        m={5}
      >
        <CenteredBox
          // width={imageSize}
          width={{ md: "20%" }}
          mediaQueries={{ sm: "column", md: "row" }}
        >
          <Image
            src={sedan}
            alt="Sedan"
            // height={"300px"}
            rounded={"2xl"}
            boxShadow={`0 10px 20px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
            cursor={"pointer"}
            onClick={() => handleCarType("Sedan")}
          />
          <Text
            textAlign="center"
            marginTop="2"
            fontWeight={"bold"}
            color={"blue.900"}
            fontSize={"3xl"}
            py={{ base: "4" }}
            // bg={"red.500"}
          >
            SEDANS
          </Text>
        </CenteredBox>
        <CenteredBox
          // width={imageSize}
          width={{ md: "20%" }}
          mediaQueries={{ sm: "column", md: "row" }}
        >
          <Image
            src={SUVCAR}
            alt="SUV"
            height={"300x"}
            rounded={"2xl"}
            boxShadow={`0 10px 20px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
            cursor={"pointer"}
            onClick={() => handleCarType("SUV")}
          />
          <Text
            textAlign="center"
            marginTop="2"
            fontWeight={"bold"}
            color={"blue.900"}
            fontSize={"3xl"}
            py={{ base: "4" }}
          >
            SUV
          </Text>
        </CenteredBox>
        <CenteredBox
          // width={imageSize}
          width={{ md: "20%" }}
          mediaQueries={{ sm: "column", md: "row" }}
        >
          <Image
            src={Truck}
            alt="Truck"
            // height={"300px"}
            rounded={"2xl"}
            boxShadow={`0 10px 20px -1px ${shadowColor}, 0 2px 4px -1px ${shadowColor}`}
            cursor={"pointer"}
            onClick={() => handleCarType("Crew Cab")}
          />
          <Text
            textAlign="center"
            marginTop="2"
            fontWeight={"bold"}
            color={"blue.900"}
            fontSize={"3xl"}
            py={{ base: "4" }}
          >
            TRUCKS
          </Text>
        </CenteredBox>
      </Box>
    </Box>
  );
};

// New wrapper component for centering
const CenteredBox = ({ children, width, mediaQueries }) => (
  <Box
    width={width}
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    {...mediaQueries}
  >
    {children}
  </Box>
);

export default VehicleType;
