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
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("#title_input"),
descripTag = popupBox.querySelector("#textarea_input "),
addBtn = popupBox.querySelector("#addBtn");

const months = ["January", "February", "March", "April", "May", "June"
                , "August", "September", "October", "November", "Descember"];
//parsing the journal from json file
const journals = JSON.parse(localStorage.getItem("journals") || "[]")

addBox.addEventListener("click", ()=>{
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
  popupBox.classList.remove("show");
});


function showJournals(){
  journals.forEach(journal => {
    // console.log(journal);
    let liTag = `
          <li class="diary">
            <div class="details">
                <p>Title of your journal</p>
                <span>Lorem, ipsum dolor sit amet consectetur 
                    adipisicing elit. Dolore, est. Iste nemo 
                    quidem earum quam error tempora iure, ipsam 
                    vitae magnam, distinctio voluptas nesciunt 
                    officia provident, delectus eum velit ipsa!
                </span>
                <div class="bottom-content">
                    
                  <span>April 14, 2024</span>
                  <div class="settings">
                      <i class="uil uil-ellipsis-h"></i>
                      <ul class="menu_set">
                          <li><i class="uil uil-pen"></i>Edit</li>
                          <li><i class="uil uil-trash"></i>Delete</li>
                      </ul>
                </div>
            </div>   
          </li>
          `;
    addBox.insertAdjacentHTML("afterend", liTag); 
  });
}
showJournals();

addBtn.addEventListener("click", e=>{
  e.preventDefault();
  let journalTitle = titleTag.value,
  journalDesc = descripTag.value;
  
  if(journalTitle || journalDesc){
    let record = new Date();
    month = months[record.getMonth()];
    day = record.getDate();
    year = record.getFullYear();
    // console.log(record);

    let journalInfo = {
      title: journalTitle , descripTag: journalDesc,
      date: `${month} ${day}, ${year}`
    }
    // console.log(month, day, year);
    
    //const journals = [];
    journals.push(journalInfo); //adding new journal

    //saving notes to localstorage
    localStorage.setItem("journals", JSON.stringify(journals));
    closeIcon.click();
  }


});

