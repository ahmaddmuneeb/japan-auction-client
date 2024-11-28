import { Outlet } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function User() {
  return (
    <div>
      <div className="relative float-right h-full min-h-screen w-full !bg-white dark:!bg-navy-900">
        <main className={`min-h-screen flex-col items-center justify-between`}>
          <Box position={"sticky"} top={0} zIndex={999}>
            <Navbar />
          </Box>
          <Outlet />
          <Footer />
        </main>
      </div>
    </div>
  );
}
