import React, { useRef , useEffect } from "react";
import { Image, IconButton, Box , useBreakpointValue } from "@chakra-ui/react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import "./ImageGallery.css";

const ImageGallery = ({ processedImages, onSelectImage }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    console.log("MOUNTS")
    return () => {
    console.log("UNMOUNTS")
    };
  }, []);

  // const scrollLeft = () => {
  //   if (galleryRef.current) {
  //     galleryRef.current.scrollBy({
  //       left: -400,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  // const scrollRight = () => {
  //   if (galleryRef.current) {
  //     galleryRef.current.scrollBy({
  //       left: 400,
  //       behavior: "smooth",
  //     });
  //   }
  // };
  const scrollLeft = () => {
    if (galleryRef.current) {
      if (galleryRef.current.scrollLeft > 0) {
        galleryRef.current.scrollBy({
          left: -400,
          behavior: "smooth",
        });
      }
    }
  };
  
  const scrollRight = () => {
    if (galleryRef.current) {
      const maxScrollLeft = galleryRef.current.scrollWidth - galleryRef.current.clientWidth;
      if (galleryRef.current.scrollLeft < maxScrollLeft) {
        galleryRef.current.scrollBy({
          left: 400,
          behavior: "smooth",
        });
      }
    }
  };

  const iconSize = useBreakpointValue({ base: "sm", md: "lg" });

  return (
    <div className="image-gallery-container">
      <div className="image-gallery-scroll" ref={galleryRef}>
        {processedImages.slice(0, -1).map((processedImage, index) => (
          <Image
            w={"3xl"}
            borderRadius={"md"}
            key={index}
            src={`data:image/jpeg;base64,${processedImage}`}
            alt={`Processed Vehicle Image ${index + 1}`}
            onClick={() => onSelectImage(index)}
            className="image-gallery-item"
          />
        ))}
      </div>
      <Box
        textAlign="center"
        mt={10}
        position={"absolute"}
        top={"16%"}
        transform={"translateY(-50%)"}
        cursor={"pointer"}
        left={"10px"}
        display={{ base: "none", md: "block" }}
      >
        <IconButton
          onClick={() => scrollLeft()}
          aria-label="GitHub Icon"
          icon={<FaArrowAltCircleLeft />}
          size={iconSize}
          borderRadius={"100%"}
        />
      </Box>
      <Box
        textAlign="center"
        mt={10}
        position={"absolute"}
        top={"16%"}
        transform={"translateY(-50%)"}
        cursor={"pointer"}
        right={"10px"}
        display={{ base: "none", md: "block" }}
   
      >
        <IconButton
          onClick={() => scrollRight()}
          aria-label="GitHub Icon"
          icon={<FaArrowAltCircleRight />}
          size={iconSize}
          borderRadius={"100%"}
        />
      </Box>
    </div>
  );
};

export default ImageGallery;
