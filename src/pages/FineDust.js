import { useEffect, useState } from "react";
import { SERVICE_KEY_FINEDUST } from "../apis/ConstantsApis";

const FineDust = () => {
  let today = new Date();
  let nowDate = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  let todayDate = today.getFullYear() + "-" + "0" + (today.getMonth() + 1) + "-" + nowDate;
  console.log(todayDate);
  useEffect(() => {
    getFineData();
  }, []);

  const getFineData = () => {
    var xhr = new XMLHttpRequest();
    var url = "http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMinuDustFrcstDspth"; /*URL*/
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY_FINEDUST; /*Service Key*/
    queryParams += "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("json"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("100"); /**/
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("searchDate") + "=" + encodeURIComponent(todayDate); /**/
    // queryParams += "&" + encodeURIComponent("InformCode") + "=" + encodeURIComponent("PM10"); /**/
    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
        const tmpData = this.responseText;

        const jsonD = JSON.parse(tmpData);
      }
    };
    xhr.send("");
  };
  return <div>fineDust</div>;
};

export default FineDust;
