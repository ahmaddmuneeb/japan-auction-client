import React from "react";
import CarLoan from "../components/carLoan/CarLoan";
import PreApproval from "../components/preApproval/PreApproval";
import VehicleType from "../components/vehicleType/VehicleType";
import ApprovalProcess from "../components/approvalProcess/ApprovalProcess";
import Feedback from "../components/Feedback";
import Hero from "../components/Hero";

const Nav = () => {
  window.scrollTo(0, 0);

  return (
    <div>
      <Hero />
      <CarLoan />
      <ApprovalProcess />
      <PreApproval />
      <Feedback />
      <VehicleType />
    </div>
  );
};

export default Nav;
