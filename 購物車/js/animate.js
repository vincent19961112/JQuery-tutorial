$(function(){
 
 let active = false;
 
 $("#paycardbtn").click(function(){
   active = !active;
   plancard()
 })

 function plancard(){
  if(active){
     $("#paycardbtn").attr("class","paycardbtn paycardbtn-active")
     $("#paycardlist").css("right",0)
   }else{
     $("#paycardbtn").attr("class","paycardbtn")
     $("#paycardlist").css("right",-2000);
   }
 }

 $(".head").scroll(function(e){
  console.log(e.clientY)
 })

 $(window).scroll(function(e){
   height = $(".head").outerHeight()
   scrollHeight = e.currentTarget.scrollY
   fontSize = 50 + Math.ceil(scrollHeight/20);
   bgWhite = 20 + (scrollHeight/height)*16;
   bgBlack = 40 + (scrollHeight/height)*32;
   LogoTop = 50 + (scrollHeight/height)*50;
   LogoLeft = 50 - (scrollHeight/height)*50;
   radialGradient = `radial-gradient(circle,rgba(255, 255, 255, 1) ${bgWhite}%,rgba(0, 0, 0, 1) ${bgBlack}%)`
   if(LogoTop >= 80){
   $("#logo").css("font-size",fontSize+"px").css("top",90+"%").css("left",15+"%")
   $(".head").css("border-bottom-right-radius",(scrollHeight/height)*100+"%")
   $("#paycardbtn").css("display","flex")
   }else{
   $("#paycardbtn").css("display","none")
   $("#logo").css("font-size",fontSize+"px").css("top",LogoTop+"%").css("left",LogoLeft+"%")
   $(".head").css("border-bottom-right-radius",(scrollHeight/height)*100+"%").css("background",radialGradient)
   }
  //  console.log(height,scrollHeight,LogoTop, LogoLeft)
 })
})