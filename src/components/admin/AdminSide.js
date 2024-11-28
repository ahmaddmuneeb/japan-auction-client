"use client";

import { Heading, Text, Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button, FormLabel, Input, VStack } from "@chakra-ui/react";
import axios from "axios";

const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
const headers = {
  "api-key": apiSecretKey,
};

export default function AdminSide() {
  const [cName, setCName] = useState("");
  const [cSecret, setCSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUpdateData = async () => {
    if (!cName || !cSecret) {
      alert("Please enter all required fields");
      return;
    } else if (cSecret !== "gpQoJKUipI") {
      alert("Invalid secret key provided");
      return;
    } else if (cName !== "makar") {
      alert("Invalid admin name provided");
      return;
    }

    setLoading(true);
    try {
      axios.get(
        "https://makarauto-server.vercel.app/api/v1/cron-routes/scrape-data",
        headers
      );

      setTimeout(() => {
        alert("Scrapper has been completed successfully");
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.log("Error updating data:: ", error?.message);
      alert(error?.message);
      setLoading(false);
    }
  };

  return (
    <Stack rounded={"xl"} m={{ base: 4, md: 8 }} h={"60vh"}>
      <Stack>
        <Heading
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          textAlign={"center"}
          mt={{ base: 4, md: 8 }}
        >
          <Text as={"span"} position={"relative"} color={"blue.900"}>
            Admin Panel
          </Text>
        </Heading>
      </Stack>
      <VStack
        spacing={4}
        align="stretch"
        w={"30%"}
        mx={{ md: 20 }}
        alignSelf={"center"}
      >
        <FormLabel>Admin Name</FormLabel>
        <Input
          type="text"
          placeholder="Enter secret name"
          w={"100%"}
          value={cName}
          onChange={(e) => setCName(e.target.value)}
        />

        <FormLabel>Admin Secret Key</FormLabel>
        <Input
          type="text"
          placeholder="Enter api secret key"
          value={cSecret}
          onChange={(e) => setCSecret(e.target.value)}
        />
        <Button
          size={"lg"}
          px={6}
          py={4}
          colorScheme={"#f9cd00"}
          bg={"#1a365d"}
          _hover={{ bg: "yellow.400" }}
          onClick={() => handleUpdateData()}
          disabled={loading}
          cursor={loading ? "not-allowed" : "pointer"}
        >
          {loading ? "Loading..." : "Run Scraper"}
        </Button>
      </VStack>
    </Stack>
  );
}
