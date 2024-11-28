import React, { useState } from "react";
import {
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  IconButton,
  Box,
} from "@chakra-ui/react";
import {
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
  FaTimes,
} from "react-icons/fa";

const ImageModal = ({ isOpen, onClose, imageData, selectedIndex }) => {
  const [selected, setSelected] = useState(selectedIndex);

  const handlePrevious = () => {
    setSelected((prevSelected) =>
      prevSelected === 0 ? imageData.length - 2 : prevSelected - 1
    );
  };
  const handleNext = () => {
    setSelected((prevSelected) =>
      prevSelected === imageData.length - 2 ? 0 : prevSelected + 1
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full">
      <ModalOverlay bg="rgba(0, 0, 0, 0.5)" />
      <ModalContent bg="transparent">
        <ModalHeader></ModalHeader>
        <ModalCloseButton m={10} p={2} color="white" />
        <ModalBody>
          <Box position="relative">
            <IconButton
              onClick={handlePrevious}
              aria-label="Previous Image"
              icon={<FaArrowAltCircleLeft />}
              size="lg"
              borderRadius="100%"
              position="absolute"
              top="50%"
              left="20px"
              transform="translateY(-50%)"
            />
            <Image
              borderRadius="md"
              w={{ base: "100%", md: "70%" }}
              h={{ base: "3xl", md: "70%" }}
              m="auto"
              justifyContent={"center"}
              objectFit="contain"
              src={`data:image/jpeg;base64,${imageData[selected]}`}
              alt={`Image ${selected + 1}`}
            />
            <IconButton
              onClick={handleNext}
              aria-label="Next Image"
              icon={<FaArrowAltCircleRight />}
              size="lg"
              borderRadius="100%"
              position="absolute"
              top="50%"
              right="20px"
              transform="translateY(-50%)"
            />
            <IconButton
              onClick={onClose} // This will close the modal
              aria-label="Close Modal"
              icon={<FaTimes />}
              size="lg"
              borderRadius="100%"
              position="absolute"
              top="10px"
              right="25px"
            />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ImageModal;
