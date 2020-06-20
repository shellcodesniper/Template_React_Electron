const {
  ipcRenderer
} = window;

const ApiUtil ={
  getApiData: function () {
    var connectKey= localStorage.getItem("connectKey");
    var  secretKey= localStorage.getItem("secretKey");
    connectKey = !connectKey ? "": connectKey
    secretKey = !secretKey ? "" : secretKey

    return {
      connectKey:connectKey,
      secretKey:secretKey
    }
  },
  // ! api data 준비해줌, localStorage 에서 api key 를 받아온다.

  prepareApiData: function (params) {
    return {
      apiData: this.getApiData(),
      apiParams: params
    }
  },
  // ! api 요청시에 데이터 준비용 유틸 함수, params 를 만들어줌

  decodeApiResponse : function (data) {
    if(!data || data === "ERROR") {
      return null;
    }
    else {
      if(data.status !== "0000") {
        console.error("###### found Error in decodeApiResponse ######")
        console.error("CODE :" + data.status)
        return null;
      }
      return data.data
    }
  },
  // ! ipcrender / ipcmain 을 통해 보내지는 결과값을 디코딩, 존재하지않거나 에러시 null 반환
  getDateFromTimeStamp: function (epoch) {
    var timestamp = parseInt(epoch);
    var d = new Date(timestamp);
    return d;
  },
  // ! epoch timestamp 를 data 로 만들어줌
  getFullStringFromTimeStamp: function (epoch) {
    var d = this.getDateFromTimeStamp(epoch);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDay()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
  },
  // ! epoch timestamp 를 data 로 만든 후 날짜 형식으로 반환

  comma3Seperator: function (price,fixed=3) {
    let ordinary = parseInt(price);
    let floats = this.toFixedFloat((parseFloat(price) - ordinary),1);
    let returnString = ordinary.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    if(floats > 0) {
      returnString += `${floats.toString().slice(1)}`
    }
    return returnString
  },
  // ! 숫자를 3자리씩 잘라서 , 붙여줌

  toFixedFloat: function(price,fixed=3) {
    return parseFloat(price).toFixed(fixed);
  }
}

export default ApiUtil