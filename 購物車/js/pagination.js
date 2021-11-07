$(function(){

  let cityLastIndex = 172;
  let currentClickIndex = null;
  let currentIndexValue = 0;
  let firstIndex = 0;
  let lastindex = 0;

  for(let i = 0; i <= 10; i++){
   $(`<li>${i}</li>`).appendTo(".paginationIndex")
    if(i === 0){
      $("li").attr("class","active")
    } 
  }
 function changeLiActive(){
   $("li").eq(currentClickIndex).attr("class", "active").siblings().removeAttr("class", "active")
 }
 function getCityWithIndex(){
  $(".carditem").remove()
 $.ajax({
   method: "GET",
   url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$skip=${currentIndexValue * 30}`,
   dataType:"json",
   success: function(res){
     citylistString = window.localStorage.getItem("cityList")
     cityList = JSON.parse(citylistString)
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
 }

 $("ul").on("click","li",function(e){
  currentClickIndex = $(this).index();
  currentIndexValue = +e.currentTarget.innerHTML;
  changeLiActive()
  getCityWithIndex()
 })

 $("#firstPage").click(function(){
   currentClickIndex = 0;
   $("ul li").remove()
   for(let i = 0; i <= 10; i++ ){
     $(`<li>${i}</li>`).appendTo("ul")
   }
   changeLiActive()
   getCityWithIndex()
 })

 $("#prevPage").click(function(){
   firstIndex = + $($("ul li").eq(0)[0]).html()
   currentClickIndex--
   currentIndexValue = firstIndex;
   if(currentClickIndex < 0 && currentIndexValue > 0){
     currentClickIndex = 0
     $(`<li>${currentIndexValue-1}</li>`).prependTo("ul")
     $("ul li").eq(11).remove()
   }
   if(currentClickIndex < 0){
     currentClickIndex = 0
   }
   changeLiActive()
   getCityWithIndex()
 })

 $("#nextPage").click(function(){
   lastindex = +$($("ul li").eq(10)[0]).html()
   currentClickIndex ++
   currentIndexValue = lastindex + 1
   if(currentClickIndex > 10 && currentIndexValue <= cityLastIndex){
     currentClickIndex = 10
     $(`<li>${currentIndexValue}</li>`).appendTo("ul")
     $("ul li").eq(0).remove()
   }
   changeLiActive()
   getCityWithIndex()
 })

 $("#lastPage").click(function(){
   console.log("cityLastIndex",cityLastIndex)
   currentIndexValue = cityLastIndex;
   currentClickIndex = 10;
   $("ul li").remove()
   for(let i = cityLastIndex; i >= (cityLastIndex - 10); i--){
     $(`<li>${i}</li>`).prependTo("ul")
   }
   changeLiActive()
   getCityWithIndex()
 })
})