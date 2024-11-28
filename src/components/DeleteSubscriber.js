import React, { useEffect } from 'react';
import { Box, Heading, Image } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteSubscriber = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const apiSecretKey = process.env.REACT_APP_SECRET_KEY;
  const apiUrl = process.env.REACT_APP_URL;
  const headers = {
    "api-key": apiSecretKey,
  };
  useEffect(() => {
    const deleteSubscriber = async () => {
      try {
        const response = await axios.post(`${apiUrl}/subscribers/delete-subscriber`, {
          _id: id,
        },{headers});

        if (response.data.success) {
        } else {
          console.error('Failed to delete subscriber:', response.data.message);
 
        }
      } catch (error) {
        console.error('Error deleting subscriber:', error.message);
      }
    };


    deleteSubscriber();
  }, [id, navigate]);

  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading fontSize="2xl" mb={4}>
        Sad to see you go
      </Heading>
      <Image
        src="https://spp.co/img/containers/assets/content/losing-customers.jpg/e4ef9626f6376c16baf5fc256f0f42e4.jpg" // Replace with the path to your sad image
        alt="Sad Emoji"
        boxSize="70%" // Adjust the size as needed
        objectFit="contain"
        mb={4}
      />
      {/* You can add additional content or links here */}
    </Box>
  );
};

export default DeleteSubscriber;
