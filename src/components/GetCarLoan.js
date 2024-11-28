import { Flex } from "@chakra-ui/react";
import React from "react";

const GetCarLoan = () => {
  React.useEffect(() => {
    // Scroll to the top of the page when component mounts
    window.scrollTo(0, 0);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
      <Flex h={"100vh"}>
        <iframe
          src="https://api.leadconnectorhq.com/widget/survey/XOZOtVBYPWN9u3Pa8RDC"
          style={{ width: "100%", border: "none", overflow: "hidden" }}
          scrolling="no"
          id="XOZOtVBYPWN9u3Pa8RDC"
          title="Pre-Approval Survey"
        ></iframe>
        <br />
        <script src="https://link.msgsndr.com/js/form_embed.js"></script>
      </Flex>
    </div>
  );
};

export default GetCarLoan;
