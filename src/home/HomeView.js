import React, { useEffect, useState } from "react";
import { GET_VILAGE_FCST, SERVICE_KEY } from "../apis/ConstantsApis";
import sun2 from "../pic/sun2.png";
import cloud from "../pic/cloud.png";
import rain from "../pic/rain.png";
import "../css/HomeView.css";
import FineDust from "../pages/FineDust";
import Temp from "../pages/Temp";

const HomeView = () => {
  return (
    <>
      <div className="wholeLayout">
        <Temp />
        <FineDust />
      </div>
    </>
  );
};

export default HomeView;
