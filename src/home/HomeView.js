import React, { useEffect, useState } from "react";
import { GET_VILAGE_FCST, SERVICE_KEY } from "../apis/ConstantsApis";
import sun2 from "../pic/sun2.png";
import cloud from "../pic/cloud.png";
import rain from "../pic/rain.png";
import "../css/HomeView.css";
import FineDust from "../pages/FineDust";

const HomeView = () => {
  const [allData, setAllData] = useState([]);
  const [skyData, setSkyData] = useState([]);
  const [maxTmp, setMaxTmp] = useState([]);
  const [popData, setPopData] = useState([]);
  const [minTmp, setMinTmp] = useState([]);
  const [nx, setNx] = useState("55");
  const [ny, setNy] = useState("127");

  let today = new Date();
  let nowHour = today.getHours();
  let nowDate = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
  let todayDate = today.getFullYear() + "0" + (today.getMonth() + 1) + nowDate;

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

    setTimeout(() => {
      var xhr = new XMLHttpRequest();
      var url = GET_VILAGE_FCST;
      var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY;
      queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
      queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("350"); /**/
      queryParams += "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON"); /**/
      queryParams += "&" + encodeURIComponent("base_date") + "=" + encodeURIComponent(todayDate); /**/
      queryParams += "&" + encodeURIComponent("base_time") + "=" + encodeURIComponent(baseTime); /**/
      queryParams += "&" + encodeURIComponent("nx") + "=" + encodeURIComponent(nx); /**/
      queryParams += "&" + encodeURIComponent("ny") + "=" + encodeURIComponent(ny); /**/
      xhr.open("GET", url + queryParams);
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          // alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'n  Body: '+this.responseText);
          // console.log(this.responseText);
          const tmpData = this.responseText;

          const jsonD = JSON.parse(tmpData);

          const data = jsonD.response.body.items.item;

          //POP = 강수확률
          //PTY = 강수형태
          //TMP = 온도
          //TMN = 최고온도
          //TMX = 최저온도
          //REH = 습도
          //SKY = 하늘상태 1 맑음 3 구름많음 4 흐림

          const filteredData = data.filter((item) => item.category === "TMP");
          const filteredDataSKY = data.filter((item) => item.category === "SKY");

          const filteredDataPOP = data.filter((item) => item.category === "POP");

          const filteredDataminmaxTmp = data.filter(
            (item) => item.category === "TMN" || (item.category === "TMX" && item.fcstDate === todayDate)
          );
          //catergory를 조건문으로 줘서 데이터 추출 할 수 있도록
          setSkyData(filteredDataSKY);
          setPopData(filteredDataPOP);
          setAllData(filteredData);

          if (baseTime === "0200") {
            localStorage.setItem("mintemp", filteredDataminmaxTmp[0].fcstValue);

            localStorage.setItem("maxtemp", filteredDataminmaxTmp[1].fcstValue);
          }
        }
      };
      xhr.send("");
    }, 100);
  };

  return (
    <>
      <div className="wholeLayout">
        <header className="header">오늘 날씨</header>
        <div className="mainBody">
          <select>
            <option>서울시</option>
          </select>
          {allData.map((data, index) =>
            index === 0 ? (
              <div key={index} className="topWeather">
                <div>
                  {skyData[index].fcstValue === "1" ? (
                    <img src={sun2} alt="" />
                  ) : skyData[index].fcstValue === "4" && popData[index].fcstValue >= 50 ? (
                    <img src={rain} alt="" />
                  ) : (
                    <img src={cloud} alt="" />
                  )}
                </div>
                <div className="celcius">{data.fcstValue}°</div>
                <div className="popPercent">강수확률: {popData[index].fcstValue}%</div>
                <div className="minmaxtemp">
                  최저기온:{parseInt(localStorage.getItem("mintemp"))}° 최고기온:
                  {parseInt(localStorage.getItem("maxtemp"))}°
                </div>
              </div>
            ) : (
              <div></div>
            )
          )}
        </div>
        <div className="underbody">
          {allData.map((data, index) =>
            index === 0 ? (
              <div key={index} className="topWeather">
                {/* <div>{skyData[index].fcstValue === 1 ? <img src={sun} /> : <img src={cloud} />}</div>
                <div className="celcius">{data.fcstValue}도</div>
                <div>
                  최저기온:{parseInt(minmaxTmp[0].fcstValue)}도 최고기온:{parseInt(minmaxTmp[1].fcstValue)}도
                </div> */}
              </div>
            ) : (
              <div key={index} className="anotherweather">
                <div className="underhour">{data.fcstTime / 100}시</div>
                <div>
                  {skyData[index].fcstValue === "1" ? (
                    <img src={sun2} width={80} height={74} alt="" />
                  ) : skyData[index].fcstValue === "4" && popData[index].fcstValue >= 50 ? (
                    <img src={rain} width={80} height={74} alt="" />
                  ) : (
                    <img src={cloud} width={80} height={74} alt="" />
                  )}
                </div>
                <div>{data.fcstValue}°</div>
              </div>
            )
          )}
        </div>
        <FineDust />
      </div>
    </>
  );
};

export default HomeView;
