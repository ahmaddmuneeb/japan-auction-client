import { Flex } from '@chakra-ui/react';
import React from 'react';

const AppointmentIFrames5 = () => {
  return (
    <div >
    <Flex h={"100vh"}>
      <iframe
        src="https://api.leadconnectorhq.com/widget/booking/FGpDFEV8YazKbsIhmMHz"
        style={{ width: '100%', border: 'none', overflow: 'hidden' }}
        scrolling="no"
        id="msgsndr-calendar"
      ></iframe>
      <br />
      <script src="https://link.msgsndr.com/js/embed.js" type="text/javascript"></script>

      </Flex>
    </div>
  );
};

export default AppointmentIFrames5;
