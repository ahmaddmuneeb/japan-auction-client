import React from "react";

import { Box } from "@chakra-ui/react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import AdminSide from "./AdminSide";

const AdminPanel = () => {
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <main className={`min-h-screen flex-col items-center justify-between`}>
          <Box position={"sticky"} top={0} zIndex={999}>
            <Navbar />
          </Box>
          <AdminSide />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
