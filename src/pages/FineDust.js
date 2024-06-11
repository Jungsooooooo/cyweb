import React, { useEffect, useState } from "react";
import { ResponsiveBullet } from "@nivo/bullet";
import "../css/FineDust.css";
import { SERVICE_KEY_FINEDUST } from "../apis/ConstantsApis";

const FineDust = () => {
  const today = new Date();
  const nowDate = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  const todayDate = `${today.getFullYear()}-0${today.getMonth() + 1}-${nowDate}`;
  console.log(todayDate);
  const [value, setValue] = useState(0);

  useEffect(() => {
    getFineData();
    getFineData2();
  }, []);

  const getFineData = () => {
    var xhr = new XMLHttpRequest();
    var url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth";
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY_FINEDUST;
    queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json");
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
    queryParams += "&" + encodeURIComponent("searchDate") + "=" + encodeURIComponent(todayDate);
    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        const tmpData = this.responseText;
        const jsonD = JSON.parse(tmpData);
        console.log({ jsonD });
      }
    };
    xhr.send("");
  };

  const getFineData2 = () => {
    var xhr = new XMLHttpRequest();
    var url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty";
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY_FINEDUST;
    queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json");
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100");
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1");
    queryParams += "&" + encodeURIComponent("stationName") + "=" + encodeURIComponent("종로구");
    queryParams += "&" + encodeURIComponent("dataTerm") + "=" + encodeURIComponent("DAILY");
    queryParams += "&" + encodeURIComponent("ver") + "=" + encodeURIComponent("1.0");
    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        const tmpData = this.responseText;
        const AjsonD = JSON.parse(tmpData);
        console.log({ AjsonD });
        setValue(30);
      }
    };
    xhr.send("");
  };

  return (
    <div className="finemain">
      <h1>Fill Rectangle</h1>
      <div className="rectangle">
        <div className="fill" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

export default FineDust;
