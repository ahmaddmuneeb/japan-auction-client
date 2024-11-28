"use client";
import {
  Box,
  Flex,
  Text,
  IconButton,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";
import LOGO from "../assets/makar-logo-official.png";
import AppointmentButton from "./AppointmentButton";
import Headline from "./Headline";
import { MdMenu } from "react-icons/md";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isOpen, onToggle } = useDisclosure();

  const isLinkActive = (linkHref) => {
    if (linkHref === "/") {
      return location.pathname === "/";
    } else {
      return location.pathname === linkHref.split("#")[1];
    }
  };

  return (
    <Box>
      <Headline />
      <Flex
        bg={"white"}
        minH={"80px"}
        py={{ base: 2 }}
        px={{ base: 4, md: 20 }}
        align={"center"}
        boxShadow={"xl"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <IoMdCloseCircleOutline size={"24px"} color={"white"} />
              ) : (
                <MdMenu size={"24px"} color={"white"} />
              )
            }
            ml={4}
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
            backgroundColor={"blue.900"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "space-between", sm: "space-between" }}
          alignItems={"center"}
          py={4}
        >
          <Box display={"flex"} ml={-10} flexDirection={"column"}>
            <Box
              pl={{ base: 0, md: 8 }}
              mr={{ base: 0, md: 10 }}
              ml={{ base: -14, md: 7 }}
              display={"flex"}
              alignItems={"center"}
              cursor={"pointer"}
              onClick={() => navigate("/")}
            >
              <Image
                objectFit="cover"
                src={LOGO}
                alt="Logo"
                ml={{ base: 10 }}
                w={{ md: "40%", base: "40%" }}
              />
            </Box>
            <Text
              onClick={() => navigate("/inventory")}
              ml={{ base: -3, md: 10 }}
              mt={2}
              fontWeight={"bold"}
              fontSize={"xl"}
              display={{ md: "none" }}
              _hover={{
                color: "#fc1",
              }}
              borderBottom={
                isLinkActive("/inventory") ? `4px solid ${"#1A365D"}` : 0
              }
            >
              Inventory 🚗
            </Text>
          </Box>
          <Flex display={{ base: "none", md: "flex" }} mr={8}>
            <DesktopNav isLinkActive={isLinkActive} />
          </Flex>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = ({ isLinkActive }) => {
  const popoverContentBgColor = "#fc1";

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={8} mr={8}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"lg"}
                fontWeight={"bold"}
                color={isLinkActive(navItem.href) ? "blue.900" : "blue.900"}
                _hover={{
                  textDecoration: "none",
                  color: "yellow.400",
                }}
                borderBottom={
                  isLinkActive(navItem.href) ? `4px solid ${"#1A365D"}` : 0
                }
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
      <AppointmentButton onPress={() => {}} animation={true} />
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "red.400") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white")}
      px={4}
      py={8}
      borderBottomStartRadius={20}
      borderBottomEndRadius={20}
      display={{ md: "none" }}
      borderBottomWidth={2}
      borderBottomColor={"blue.900"}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Box
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
        mt={2}
      >
        <AppointmentButton onPress={() => {}} />
      </Box>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Box
          _hover={{
            bg: "yellow.400",
          }}
          bg="blue.900"
          color="white"
          w="full"
          py={2}
          textAlign={"center"}
          borderRadius={"md"}
        >
          <Text fontWeight={"bold"} color={"white"}>
            {label}
          </Text>
        </Box>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={8}
            h={8}
            color={"blue.900"}
          />
        )}
      </Box>
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack mt={2} pl={4} borderLeft={1} align={"start"}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Inventory",
    href: "/#/inventory",
  },
];
