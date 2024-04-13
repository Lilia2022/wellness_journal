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

        // theme: "Midnight Blue",
        calendarEvents: [{
            id: 'event1' ,  //required
            name: "New year", //required
            date: "January/1/2024", //required
            description: "Wish you happy new year",
            type: "holiday", //required
            everyYear: true //optional
        }, 
        {
            name: "Vacation Leave",
            badge: "02/13 - 02/15", // Event badge (optional)
            date: ["February/13/2020", "February/15/2020"], // Date range
            description: "Vacation leave for 3 days.", // Event description (optional)
            type: "event",
            color: "#63d867" // Event custom color (optional)
          }
    ]
    })
})
  

