"use client";

import { Box, Divider, Text, Stack } from "@chakra-ui/react";

const PackageTier = ({ title, typePlan }) => {
  return (
    <Stack
      p={3}
      py={1}
      justifyContent={{
        base: "flex-start",
        md: "space-between",
      }}
      direction={{
        base: "column",
        md: "row",
      }}
      alignItems={{ md: "center" }}
    >
      <Text size={"sm"} fontWeight={"bold"} color={"blue.900"}>
        {title}
      </Text>

      <Text fontWeight={"normal"} color={"blue.900"} size={"sm"}>
        {typePlan}
      </Text>
    </Stack>
  );
};
const DetailsTable = ({ details }) => {
  const DetailsArray = [
    { key: "Drivetrain", value: details?.vehicle_drive_train },
    { key: "Engine", value: details?.vehicle_engine },
    { key: "Exterior Color", value: details?.vehicle_exterior_color },
    { key: "Interior Color", value: details?.vehicle_interior_color },
    { key: "Make", value: details?.vehicle_make },
    {
      key: "Mileage",
      value: `${details?.vehicle_milage_value} ${"KM"}`,
    },
    { key: "Model", value: details?.vehicle_model },
    { key: "Transmission", value: details?.vehicle_transmission },
    { key: "Year", value: details?.vehicle_year },
  ];

  return (
    <Box py={6} px={5} width="full">
      <Stack spacing={4} width={"100%"} direction={"column"}>
        {DetailsArray.map((detail) => {
          return (
            <div key={detail.key}>
              <PackageTier title={detail?.key} typePlan={detail?.value} />
              <Divider />
            </div>
          );
        })}
      </Stack>
    </Box>
  );
};

export default DetailsTable;
