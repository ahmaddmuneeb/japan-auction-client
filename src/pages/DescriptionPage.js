import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSlideshowVehicle } from "../redux/slices/counterSlice";
import ImageGallery from "../components/imageGallery/ImageGallery";
import Disclaimers from "../components/disclaimers/Disclaimers";
import ImageModal from "../components/ImageModal";
import Feedback from "../components/Feedback";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  CircularProgress,
  Flex,
  Heading,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";
import DetailsTable from "../components/DetailsTable";
import { formatNumberWithCommas } from "../utils/formatNumberWithCommas";

const DescriptionPage = () => {
  const [status, setStatus] = useState(true);
  const [galleryStatus, setGalleryStatus] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleImages, setVehicleImages] = useState([]);
  const apiUrl = process.env.REACT_APP_URL;
  const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [apiVehicleDetails, setApiVehicleDetails] = useState({});
  const [isError, setIsError] = useState(false);
  const { vehicleId } = useParams();
  const headers = {
    "api-key": apiSecretKey,
  };
  const vehicleDetails = useSelector(selectSlideshowVehicle);
  useEffect(() => {
    fetchVehicleDetails();

    window.scrollTo(0, 0);

    return () => {
      setVehicleImages([]);
      setGalleryStatus(false);
    };
  }, []);

  const fetchVehicleDetails = async () => {
    try {
      let processedImages = [];

      for (let page = 1; page <= 2; page++) {
        const response = await axios.get(
          `${apiUrl}/vehicles/get-vehicle/${vehicleId}?page=${page}`,
          { headers }
        );
        const pageData = response.data.data;

        setApiVehicleDetails(pageData);
        processedImages = [
          ...processedImages,
          ...pageData?.vehicle_processed_images,
        ];
      }
      setVehicleImages(processedImages);
      setStatus(false);
      setTimeout(() => {
        setGalleryStatus(true);
      }, 500);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      setIsError(true);
    }
  };

  const handleSelectImage = (index) => {
    setSelectedImageIndex(index);
  };

  const handleModalPic = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!apiVehicleDetails) {
    return <div>Loading...</div>;
  }
  // console.log("API VEHICLE DETAILS",apiVehicleDetails)
  return (
    <div>
      {isError ? (
        <>
          <Box
            display={"flex"}
            justifyContent={"center"}
            margin={"auto"}
            my={5}
            h={"60vh"}
          >
            <Text
              margin={"auto"}
              color={"blue.900"}
              fontWeight={"bold"}
              fontSize={"4xl"}
            >
              Vehicle does not exist or has been deleted
            </Text>
          </Box>
        </>
      ) : (
        <>
          {Object.keys(apiVehicleDetails).length > 0 ? (
            <>
              <Box p={{ base: 4, md: 8 }}>
                <ImageModal
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  imageData={vehicleImages}
                  selectedIndex={selectedImageIndex}
                />
                <Text
                  fontWeight={"bold"}
                  fontSize={{ base: "xl", md: "4xl" }}
                  color={"blue.900"}
                  py={{ base: 2, md: 4 }}
                  maxW={"5xl"}
                >
                  {apiVehicleDetails?.vehicle_title &&
                  apiVehicleDetails.vehicle_title.includes("null")
                    ? `${
                        apiVehicleDetails?.vehicle_year
                      } ${apiVehicleDetails?.vehicle_title
                        .replace("null", "")
                        .trim()}`
                    : apiVehicleDetails?.vehicle_title}
                </Text>
                <Flex
                  direction={{ base: "column", md: "row" }}
                  wrap="wrap"
                  justify="space-between"
                >
                  <Box w={{ base: "100%", md: "60%" }} mb={{ base: 4, md: 0 }}>
                    {!status ? (
                      <>
                        <Image
                          mb={4}
                          borderRadius={"md"}
                          w={"full"}
                          onClick={handleModalPic}
                          cursor={"pointer"}
                          src={`data:image/jpeg;base64,${vehicleImages[selectedImageIndex]}`}
                          alt="Main Featured Image"
                        />
                        {galleryStatus ? (
                          <ImageGallery
                            processedImages={vehicleImages}
                            onSelectImage={handleSelectImage}
                          />
                        ) : (
                          <Flex justifyContent="center" alignItems="center">
                            <CircularProgress
                              isIndeterminate
                              color="blue.900"
                            />
                          </Flex>
                        )}
                      </>
                    ) : (
                      <Flex
                        justifyContent="center"
                        alignItems="center"
                        h={"50vh"}
                      >
                        <CircularProgress isIndeterminate color="blue.900" />
                      </Flex>
                    )}
                  </Box>
                  <Box
                    w={{ base: "100%", md: "30%" }}
                    mx={{ base: 0, md: 8 }}
                    py={4}
                    px={{ base: 2, md: 8 }}
                    boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
                    borderRadius={"lg"}
                    mt={{ base: 4, md: 0 }}
                  >
                    <Box
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        margin="8px 0"
                        color={"blue.900"}
                        fontWeight={"bold"}
                      >
                        {`$${formatNumberWithCommas(
                          (
                            parseInt(apiVehicleDetails?.vehicle_price) + 2000
                          ).toString()
                        )}`}
                      </Text>
                      <Text fontSize={{ base: "sm", md: "sm" }} color="#666">
                        Plus HST & Licensing
                      </Text>
                    </Box>
                    <Box py={4} borderRadius="lg" mt={{ base: 3, md: 2 }}>
                      <DetailsTable details={apiVehicleDetails} />
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </>
          ) : (
            <>
              {/* {console.log("VEHICLE DETAILS FALSE" , Object.keys(apiVehicleDetails).length)} */}
              <Flex justifyContent="center" alignItems="center" h={"80vh"}>
                <CircularProgress isIndeterminate color="blue.900" />
              </Flex>
            </>
          )}
          <Disclaimers />
          <Feedback />
        </>
      )}
    </div>
  );
};

export default DescriptionPage;
