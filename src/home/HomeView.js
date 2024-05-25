import React, { useEffect, useState } from "react";
import { GET_VILAGE_FCST, SERVICE_KEY, GET_VILAGE_FCST_SHORT } from "../apis/ConstantsApis";

import "../css/HomeView.css";

const HomeView = () => {
  const [allData, setAllData] = useState([]);

  let today = new Date();
  let nowHour = today.getHours();
  let todayDate = today.getFullYear() + "0" + (today.getMonth() + 1) + today.getDate();
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    //base_time 은 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 이걸로 업데이트 됨/
    let baseTime;
    if (nowHour < 5) {
      baseTime = "0200";
    } else if (nowHour < 8) {
      baseTime = "0500";
    } else if (nowHour < 11) {
      baseTime = "0800";
    } else if (nowHour < 14) {
      baseTime = "1100";
    } else if (nowHour < 17) {
      baseTime = "1400";
    } else if (nowHour < 20) {
      baseTime = "1700";
    } else if (nowHour < 23) {
      baseTime = "2000";
    } else {
      baseTime = "2300";
    }

    var xhr = new XMLHttpRequest();
    var url = GET_VILAGE_FCST;
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY;
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("300"); /**/
    queryParams += "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("json"); /**/
    queryParams += "&" + encodeURIComponent("base_date") + "=" + encodeURIComponent(todayDate); /**/
    queryParams += "&" + encodeURIComponent("base_time") + "=" + encodeURIComponent(baseTime); /**/
    queryParams += "&" + encodeURIComponent("nx") + "=" + encodeURIComponent("55"); /**/
    queryParams += "&" + encodeURIComponent("ny") + "=" + encodeURIComponent("127"); /**/
    xhr.open("GET", url + queryParams);
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        // alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'n  Body: '+this.responseText);
        // console.log(this.responseText);
        const tmpData = this.responseText;

        const jsonD = JSON.parse(tmpData);
        const data = jsonD.response.body.items.item;

        //POP = 강수확률
        //TMP = 온도
        //TMN = 최고온도
        //TMX = 최저온도
        const filteredData = data.filter((item) => item.category === "TMP" || item.category === "POP");
        console.log(filteredData);
        setAllData(filteredData);
      }
    };

    xhr.send("");
  };

  return (
    <>
      <div className="wholeLayout">
        <header className="header">오늘 날씨</header>
        <div className="mainBody">
          {allData.map((data, index) =>
            index === 0 ? (
              <div key={index} className="topWeather">
                {data.fcstValue}도
              </div>
            ) : (
              data.fcstTime
            )
          )}
        </div>
        <button onClick={getData}>test</button>
      </div>
    </>
  );
};

export default HomeView;
