import React, { useEffect, useState } from "react";
import { GET_VILAGE_FCST, SERVICE_KEY } from "../apis/ConstantsApis";
import sun2 from "../pic/sun2.png";
import cloud from "../pic/cloud.png";
import "../css/HomeView.css";

const HomeView = () => {
  const [allData, setAllData] = useState([]);
  const [skyData, setSkyData] = useState([]);
  const [minmaxTmp, setMinMaxTmp] = useState([]);

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

    setTimeout(()=>{
      var xhr = new XMLHttpRequest();
    var url = GET_VILAGE_FCST;
    var queryParams = "?" + encodeURIComponent("serviceKey") + "=" + SERVICE_KEY;
    queryParams += "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
    queryParams += "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("350"); /**/
    queryParams += "&" + encodeURIComponent("dataType") + "=" + encodeURIComponent("JSON"); /**/
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
        //SKY = 하늘상태

        const filteredData = data.filter((item) => item.category === "TMP");
        const filteredDataPOP = data.filter((item) => item.category === "SKY");
        const filteredDataminmaxTmp = data.filter((item) => item.category === "TMN" || item.category === "TMX");
        //catergory를 조건문으로 줘서 데이터 추출 할 수 있도록

        setSkyData(filteredDataPOP);

        setAllData(filteredData);
        setMinMaxTmp(filteredDataminmaxTmp);
      }
    };
    xhr.send("");
    }, 100)
    
  };

  return (
    <>
      <div className="wholeLayout">
        <header className="header">오늘 날씨</header>
        <div className="mainBody">
          {allData.map((data, index) =>
            index === 0 ? (
              <div key={index} className="topWeather">
                <div>{skyData[index].fcstValue === "1" ? <img src={sun2} alt="" /> : <img src={cloud} alt="" />}</div>
                <div className="celcius">{data.fcstValue}°</div>
                <div>
                  최저기온:{parseInt(minmaxTmp[0].fcstValue)}° 최고기온:{parseInt(minmaxTmp[1].fcstValue)}°
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
                <div>{data.fcstTime/100}시</div>
                <div>{skyData[index].fcstValue === "1" ? <img src={sun2} width={80} alt=""/> : <img src={cloud} width={80} alt=""/>}</div>
                <div>{data.fcstValue}°</div>
            </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default HomeView;
