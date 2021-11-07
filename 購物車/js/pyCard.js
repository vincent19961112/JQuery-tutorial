$(function(){
  
  let hopeCity = JSON.parse(window.localStorage.getItem('hopeCity'))

  if(hopeCity === null){
    hopeCity = {}
  }else{
    for (const [id, {Name,Description,ZipCode}] of Object.entries(hopeCity)) {
      node = $(`
      <div id=${id} class="pycarditem">
        <div class="pytitle">${Name}</div>
        <div class="pydescription">${Description.slice(0,30)}</div>
        <div class="pyprice">${ZipCode}</div>
      <div class="removeCity">X</div>
      </div>
      `)
      node.insertBefore("#cityplan")
  }

  }
 $("#card").on("click",".paycard",function(){
  let id = this.id;
  let cityList = JSON.parse(window.localStorage.getItem('cityList'))
  let { Name, Description, ZipCode } = cityList[id]
  let hasCity = false;

  let node = $(`
   <div id=${id} class="pycarditem">
     <div class="pytitle">${Name}</div>
     <div class="pydescription">${Description.slice(0,30)}</div>
     <div class="pyprice">${ZipCode}</div>
   <div class="removeCity">X</div>
   </div>
  `)

  $('.pycarditem').attr("id",function(){
     if(id === $(this).attr("id")){
       hasCity = true
     }
  })
  if(!hasCity){
    hopeCity[id] = {Name, Description, ZipCode}
    window.localStorage.setItem("hopeCity",JSON.stringify(hopeCity))
    node.insertBefore("#cityplan")
  }
})

  $("#paycardlist").on("click",".removeCity",function(){
    $(this).parent().remove()
    delete hopeCity[$(this).parent().attr("id")]
    window.localStorage.setItem("hopeCity",JSON.stringify(hopeCity))
  })

})
