$(function(){

 $.ajax({
  method: "GET",
  url: "https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30",
  dataType:"json",
  success: function(res){
    let cityList = {}
    for(var i=0; i < res.length; i++){
      cityList[`${res[i].ID}`] = {Name:`${res[i].Name}`,Description:`${res[i].Description ? res[i].Description : "尚無資訊"}`,ZipCode:`${res[i].ZipCode ? res[i].ZipCode : "尚無資訊"}`}
      let node = $(`
      <div class="carditem">
        <div class="title">${res[i].Name}</div>
        <div class="description">${res[i].Description ? res[i].Description : "尚無資訊"}</div>
        <div class="zipcode">${res[i].ZipCode ? res[i].ZipCode : "尚無資訊"}</div>
        <div id=${res[i].ID} class="paycard">加旅遊景點</div>
        </div>
        `)
        node.appendTo("#card")
      }
  window.localStorage.setItem("cityList", JSON.stringify(cityList))
  },error: function(msg){
    for(var i=0; i< 10 ; i++){
    let node = $(`
      <div class="carditem">
        <div class="title">我是標題</div>
        <div class="description">我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容我是內容</div>
        <div class="zipcode">我是Zip</div>
        <div id="${i}" class="paycard">加旅遊景點</div>
      </div>
      `)
   node.appendTo("#card")
    }
  }
 })
})