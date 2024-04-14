//small screen menu
let menuList = document.getElementById("menuList");
menuList.style.maxHeight ="0px";

function togglemenu(){
    if(menuList.style.maxHeight =="0px"){
        menuList.style.maxHeight ="250px";
    }
    else{
        menuList.style.maxHeight ="0px";
    }


};

//journal popup form

const addBox = document.querySelector(".add-box"),
popupBox = document.querySelector(".popup-box"),
closeIcon = popupBox.querySelector("header i");


addBox.addEventListener("click", ()=>{
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
  popupBox.classList.remove("show");
});


