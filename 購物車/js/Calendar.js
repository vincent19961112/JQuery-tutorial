$(function(){
  let day = 1
  $("#cityplan").on('click',function(){
    hopecity = JSON.parse(window.localStorage.getItem("hopeCity"))
    $("#card").empty().css("flex-direction","column")
    $(".navPagination").css("display","none")
    $("#paycardbtn").attr("class","paycardbtn")
    $("#paycardlist").css("right",-2000);
    node = $(`
    <h3 id="calenderTitle">行程表</h3>
    <div id="calendercity"></div>
    <div id="calender">
      <div class="addDay">增加行程</div>
      <div class="day">
      <h2 class="dayTitle">day ${day}</h2>
      <ul class="calendarTime">
        <li>00</li><li>01</li><li>02</li><li>03</li><li>04</li><li>05</li><li>06</li><li>07</li>
        <li>08</li><li>09</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li>
        <li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li>
      </ul>
      </div>
    </div>
    <div id="calenderBackCity">返回繼續看景點</div>
    `)
    node.appendTo("#card")
    for(const [id, {Name}] of Object.entries(hopecity)){
     node = $(`
     <div  id=${id} class="calenderCard">
      <div>${Name}</div>
     </div>
     `)
     node.appendTo("#calendercity")
    }
  })

  $("#card").on("mousedown","#calendercity .calenderCard",function(ev){
    let offsetX = ev.pageX - $(this).offset().left;
    let offsetY = ev.pageY - $(this).offset().top;
    let winH = $(window).height()
    $(this).appendTo("#calendercity")
    $(this).css("position","absolute").css("top", ev.pageY - winH - offsetY - 90 ).css("left",ev.pageX-offsetX-90)
    let _this = $(this);
      $(document).mousemove(function(ev){
       $(_this).css({
        left: ev.pageX - offsetX - 90,
        top: ev.pageY - winH - offsetY - 90
       })
     })
     $(document).mouseup(function(){
      $(document).off("mousemove")
     })
  })

  $("#card").on("click",".addDay",function(){
    day++;
    $(`  <div class="day">
      <h2 class="dayTitle">day ${day}</h2>
      <ul class="calendarTime">
        <li>00</li><li>01</li><li>02</li><li>03</li><li>04</li><li>05</li><li>06</li><li>07</li>
        <li>08</li><li>09</li><li>10</li><li>11</li><li>12</li><li>13</li><li>14</li><li>15</li>
        <li>16</li><li>17</li><li>18</li><li>19</li><li>20</li><li>21</li><li>22</li><li>23</li>
      </ul>
      </div>`).appendTo($("#calender"))
  })

  $("#card").on("click",".calendarTime li",function(){
    $(`<div class="PlanDetail">
    <h2 class="PlanTitle">我是標題</h2>
    <p class="PlanContent">我是內容</p>
    <h3 class="PlanTime">${$(this).index()}點</h3>
    <div class="PlanClose">X</div>
     </div>`).appendTo($(this).css("position","relative"))
     $(this).children(".PlanDetail").css("visibility","visible")
  })

  $("#card").on("click",".calendarTime li .PlanDetail .PlanClose",function(){
     $(this).parent(".PlanDetail").css("visibility","hidden")
     return false
  })

  $("#card").on("click","#calenderBackCity",function(){

  $("#card").empty().css("flex-direction","row")

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
         <div class="price">${res[i].ZipCode ? res[i].ZipCode : "尚無資訊"}</div>
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
         <div class="price">我是Zip</div>
         <div id="${i}" class="paycard">加旅遊景點</div>
       </div>
       `)
    node.appendTo("#card")
     }
   }
  })
    
  $(".navPagination").css("display","flex")
  
  })
})