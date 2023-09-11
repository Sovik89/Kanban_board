//=============================Test the script page===================================//
//console.log("Hello there")


//============================= 1. Selecting the components in the HTML page===========================//

//================MAIN SECTION=======================================//
const mainContainer = document.querySelector("main");

//==================================NAVIGATION COMPONENTS=================================//

const priorityColorsArr = document.querySelectorAll(".toolbox-priority-cont .color");
const addBtn = document.querySelector(".add-btn");
const deleteBtn = document.querySelector(".remove-btn");

//==================================MODAL COMPONENTS=================================//

const modalContainer = document.querySelector(".modal-cont");
const colorModalArr = document.querySelectorAll(".color_modal");
const textArea = document.querySelector(".textarea-cont")

//-----------------------------------variables--------------------------------------//

//below to gnerate 5 length unique Hex id
const uid = new ShortUniqueId({ length: 5 });
//colors will remain constant hence keepingin an array
const colorsArray = ["red","amber", "green","blue" ];
//delete flag is kept in false for giving provision to do operations on tickets and not deleting them as we click on tickets
let deleteFlag = false;

//===============================2. APP LEVEL HANDLERS are below=========================//

//===============================2.a. Modal functionality================================//

// 1 add the event listener to add button so modal should appear 
addBtn.addEventListener("click",(e)=>{
    modalContainer.style.display="flex";
})

// 2 adding setting color and change functionality when modal appear

for(let i=0; i<colorModalArr.length;i++){
    let colorElement=colorModalArr[i];
    //now we can change the colors in the modal color selected

    colorElement.addEventListener("click",(e)=>{
        for(let i=0;i<colorModalArr.length;i++){
            //console.log(colorModalArr[i].classList);
            colorModalArr[i].classList.remove("selected");
            //console.log(colorModalArr[i].classList);
        }

        const targetColorElem=e.target;
        targetColorElem.classList.add("selected");

        //console.log(colorModalArr[i].classList);

    })

}

// 3 adding the value in the text area and use helper function to create the ticket

textArea.addEventListener("keydown",(event)=>{
    if(event.key=="Enter" && event.shiftKey==false){
        modalContainer.style.display="none";
        const task=textArea.value;

        //get the value from the selected color in modal color selector

        let colorElement=modalContainer.querySelector(".selected");
        const taskColor=colorElement.getAttribute("currColor");

        textArea.value="";

        createTicket(taskColor,task);

    }
})

deleteBtn.addEventListener("click",(e)=>{
    if (deleteFlag == false) {
        deleteBtn.style.color="red";
        deleteFlag=true;
    }else{
        deleteBtn.style.color="black";
        deleteFlag=false;
    }

})

// Selection of Status as we click on the states in the toolbox and double-click diminishes all filter

/********remove all the filter on db clicke***/

for (let i = 0; i < priorityColorsArr.length; i++) {
    let currentColorElem = priorityColorsArr[i];
    currentColorElem.addEventListener("dblclick", function () {
        console.log("dblclick");
        for (let i = 0; i < priorityColorsArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            priorityColorsArr[i].classList.remove("selected");
        }
        /********************ui********************/

        showAllTickets();
    })
}


/**************filtering logic on the tickets**********/
for (let i = 0; i < priorityColorsArr.length; i++) {
    let currentColorElem = priorityColorsArr[i];
    currentColorElem.addEventListener("click", function (event) {
        console.log("click")
        /*******************UI*********************/
        // registering the color
        // remove the selected from everyone
        for (let i = 0; i < priorityColorsArr.length; i++) {
            // console.log(colorModalArr[i].classList);
            priorityColorsArr[i].classList.remove("selected");
        }
        // add to that element thta was clicked
        const targetColorElem = event.target;
        // console.log("````````````````````");
        // console.log(targetColorElem)
        targetColorElem.classList.add("selected");
        /********************ui********************/

        const currentColor = colorsArray[i];
        filterTickets(currentColor);
    })
}



//=======================================Helper functions==========================//

function filterTickets(currentColor) {
    console.log("element to be visible will be of color ", currentColor);
    // 1. select all the latest tickets
    const ticketsArr = mainContainer.querySelectorAll(".ticket-cont");

    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        console.log(cTicket);
        let isPresent = cTicket.querySelector(`.${currentColor}`);
        if (isPresent == null) {
            cTicket.style.display = "none";
        } else {
            cTicket.style.display = "block";
        }
        // only make the ticket visible when the ticket color ==currentColor
    }
}

function showAllTickets() {
    // 1. select all the latest tickets
    const ticketsArr = mainContainer.querySelectorAll(".ticket-cont");
    //  loop through all the tickets
    for (let i = 0; i < ticketsArr.length; i++) {
        const cTicket = ticketsArr[i];
        cTicket.style.display = "block";
    // only make the ticket visible when the ticket color ==currentColor
    }
}


function createTicket(taskColor,task){
    /*************2-2 added the UI of ticket************/
    const id = uid.rnd();
    /****we are constructing our ticket********/
    const ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket-cont");
    ticketContainer.innerHTML = `<div class="ticket-color ${taskColor}"></div>
            <div class="ticket-id">#${id}</div>
            <div class="ticket-area">${task}</div>
             <i class="fa-solid fa-lock lock_icon"></i>
            `;


    /*******************adding ticket to my app********************/
    mainContainer.appendChild(ticketContainer);

    /***lock and unclock button */
    const lockButton = ticketContainer.querySelector(".lock_icon");
    const ticketArea = ticketContainer.querySelector(".ticket-area");
    const ticketColorElem = ticketContainer.querySelector(".ticket-color");

    /* The function of lock/unlock,change color and delete ticket  */
    //handle lock button *
    handlelockButton(lockButton,ticketArea);
    //handle color element *
    handleChangeColor(ticketColorElem);
    //delete the ticket *
    handeDelete(ticketContainer);

}

//handle lock button *
function handlelockButton(lockButton,ticketArea){
    lockButton.addEventListener("click",()=>{
        const isLocked=lockButton.classList.contains("fa-lock");

        if(isLocked){
            lockButton.classList.remove("fa-lock");
            lockButton.classList.add("fa-lock-open");
            //make the div editable
            ticketArea.setAttribute("contenteditable",true);
        }else{
            lockButton.classList.remove("fa-lock-open");
            lockButton.classList.add("fa-lock");
            //make the div editable
            ticketArea.setAttribute("contenteditable",false);
        }
    })
}

//handle color element *
function handleChangeColor(ticketColorElem){
    ticketColorElem.addEventListener("click",()=>{
        let currColor=ticketColorElem.classList[1];
        //console.log(currColor)
        
        let curIndex=colorsArray.indexOf(currColor);
        let nextIndex=(curIndex+1)%colorsArray.length;

        let nextColor=colorsArray[nextIndex];
        ticketColorElem.classList.remove(currColor);
        ticketColorElem.classList.add(nextColor);
        
    })
}

function handeDelete(ticketContainer){
    ticketContainer.addEventListener("click",()=>{
        if (deleteFlag==true){
            let res = confirm("do you want to delete it");
            if (res) {
                mainContainer.removeChild(ticketContainer)
            }
        }
    })
}








