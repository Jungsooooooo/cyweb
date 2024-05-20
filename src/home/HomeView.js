import React from "react";
import axios from "axios";

const HomeView = () => {

  const getData=() =>{
    console.log("data");
    var xhr = new XMLHttpRequest();
      var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst'; /*URL*/
      var queryParams = '?' + encodeURIComponent('serviceKey') + '='+'pssWI8FkQmDOOOz8ydNxIKn1QaRT%2FauH15VvCgA5x0LMRdlPPH%2BpfBuYs1Nyr%2FNUjkt0%2BU1mTOlLT1%2BoISxxsQ%3D%3D';
      queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
      queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /**/
      queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('json'); /**/
      queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent('20240520'); /**/
      queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent('0500'); /**/
      queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent('55'); /**/
      queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent('127'); /**/
      xhr.open('GET', url + queryParams);
      xhr.onreadystatechange = function () {
          if (this.readyState == 4) {
              // alert('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'n  Body: '+this.responseText);
              console.log(this.responseText);
          }
      };

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
