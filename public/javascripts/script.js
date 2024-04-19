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
popupTitle = popupBox.querySelector("header p"),
closeIcon = popupBox.querySelector("header i"),
titleTag = popupBox.querySelector("#title_input"),
descripTag = popupBox.querySelector("#textarea_input "),
addBtn = popupBox.querySelector("#addBtn");

const months = ["January", "February", "March", "April", "May", "June"
                , "August", "September", "October", "November", "Descember"];
//parsing the journal from json file
const journals = JSON.parse(localStorage.getItem("journals") || "[]")
let isUpdate = false, updateId;

addBox.addEventListener("click", ()=>{
    popupBox.classList.add("show");
});

closeIcon.addEventListener("click", ()=>{
  titleTag.value = "";
  descripTag.value = "";
  addBtn.innerText = "Add Journal";
  popupTitle.innerText = "Add a new Journal";
  popupBox.classList.remove("show");
});


function showJournals(){
  document.querySelectorAll(".diary").forEach(journal => journal.remove());

  journals.forEach((journal, index) => {
    // console.log(journal);
    let liTag = `
          <li class="diary">
            <div class="details">
                <p>${journal.title}</p>
                <span>${journal.description}</span>
                <div class="bottom-content">
                    
                  <span>${journal.date}</span>
                  <div class="settings">
                      <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                      <ul class="menu_set">
                          <li onclick="updateNote(${index}, '${journal.title}', '${journal.description}')"><i class="uil uil-pen"></i>Edit</li>
                          <li onclick="deleteJournal(${index})"><i class="uil uil-trash"></i>Delete</li>
                      </ul>
                </div>
            </div>   
          </li>
          `;
    addBox.insertAdjacentHTML("afterend", liTag); 
  });
}
showJournals();

function showMenu(element){
  element.parentElement.classList.add("show");

  document.addEventListener("Click", e =>{
    titleTag.focus();
    //removing show class from the settings mebu
     if(e.target.tagName != "I" || e.target != element){
      element.parentElement.classList.remove("show");
     }
  })
}

function deleteJournal(journalId){
  let confirmDel = confirm("Are you sure to delete this journal?");
  if(!confirmDel) return;
  journals.splice(journalId, 1) //removing selected diary from array
  //console.log(journalId);
  // update the locastorage
  localStorage.setItem("journals",JSON.stringify(journals))
  showJournals();
}

function updateNote(journalId,title ,desc ){
    isUpdate = true;
    updateId = journalId;
    addBox.click();
    titleTag.value = title;
    descripTag.value = desc;
    addBtn.innerText = "Update Journal";
    popupTitle.innerText = "Update Journal";

}

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
      title: journalTitle , 
      description: journalDesc,
      date: `${month} ${day}, ${year}`
    }
    if(!isUpdate){
      journals.push(journalInfo); //adding new journal
    }
    else {
      journals[updateId] = journalInfo; //updating specific note
    }
    // console.log(month, day, year);
    
    //const journals = [];

    //saving notes to localstorage
    localStorage.setItem("journals", JSON.stringify(journals));
    closeIcon.click();
    showJournals();
  }


});

// script.js
function setReminder() {
  var selectedDate = document.getElementById('date').value;
  var reminderTime = document.getElementById('reminder-time').value;
  
  // Code to set reminder goes here
  alert('Reminder set for ' + selectedDate + ' at ' + reminderTime);
}
