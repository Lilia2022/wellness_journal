let menuList = document.getElementById("menuList");
menuList.style.maxHeight ="0px";

function togglemenu(){
    if(menuList.style.maxHeight =="0px"){
        menuList.style.maxHeight ="250px";
    }
    else{
        menuList.style.maxHeight ="0px";
    }

}

// ---initializing calendar
$(document).ready(function(){
    $('#calendar').evoCalendar({
        settingName: settingValue
    })
})
  

