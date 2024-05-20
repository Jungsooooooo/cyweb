import React, { useEffect, useState } from "react";
import { GET_VILAGE_FCST, SERVICE_KEY } from "../apis/ConstantsApis";

const HomeView = () => {

  const [allData, setAllData] = useState([]);

  useEffect(()=>{
    getData()
  },[]);

  const getData = () =>{
    console.log("data");
    var xhr = new XMLHttpRequest();
      var url = GET_VILAGE_FCST; 
      var queryParams = '?' + encodeURIComponent('serviceKey') + '='+ SERVICE_KEY;
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
      queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json'); /**/
      queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20240520'); /**/
      queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /**/
      queryParams += '&' + encodeURIComponent('category') + '=' + encodeURIComponent('TMP');
      queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
      queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
      xhr.open('GET', url + queryParams);
      xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
              // alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'n  Body: '+this.responseText);
              // console.log(this.responseText);
              const tmpData = this.responseText;

              const jsonD = JSON.parse(tmpData)
              
              const data = jsonD.response.body.items.item
              const filteredData = data.filter(item => item.category === "TMP");
              setAllData(filteredData);
          }
          
      };
      console.log(allData)
      xhr.send('');
  }
  
  return (
    <>
      <div>home</div>
      <button onClick={getData}>test</button>
    </>
  );
};

export default HomeView;
