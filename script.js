/*
Author: Usama DarkWeb
*/

//  getAndUpdate functon get value from the title and description feilds and save in localstorage
function getAndUpdate() {
    let myTitle = document.getElementById('title').value;
    let myDescription = document.getElementById('description').value;
    let date = new Date();
    // display date in string format
    let todo_date = date.toLocaleDateString('en-US', {'weekday':'long', 'day':'numeric', 'month':'long', 'year':'numeric'});
    //  validate input feilds if empty or not
    if ((myTitle=="") && (myDescription=="")){
        document.getElementById('title').style.border = "2px solid red";
        document.getElementById('description').style.border = "2px solid red";

    }
    else if (myTitle == "") {
        document.getElementById('title').style.border = "2px solid red";
    }
    else if (myDescription == "") {
        document.getElementById('description').style.border = "2px solid red";
    }
    else {
        console.log("Update...");
        if (localStorage.getItem('itemsJson') == null) {
            var itemsJsonArray = [];
            itemsJsonArray.push([myTitle, myDescription, todo_date]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        }
        else {
            let itemsJsonArrayparse = localStorage.getItem('itemsJson');
            itemsJsonArray = JSON.parse(itemsJsonArrayparse);
            itemsJsonArray.push([myTitle, myDescription, todo_date]);
            localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        }
        // calling clearInputFeilds when getAndUpdate function end.
        clearInputFeilds();
        // call update function for display new todo if added
        update();
    }

}
//  update function display all todo's in table form on html page.
function update() {
    itemsJsonArrayparse = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayparse);
    // display list items in the table
    let tableBody = document.getElementById('tableBody');
    let str = "";
    itemsJsonArray.forEach((element, index) => {
        str += `
     <tr>
         <th scope="row">${index + 1}</th>
         <td>${element[0]}</td>
         <td>${element[1]}</td>
         <td>${element[2]}</td>
         <td><button class="btn btn-sm btn-danger" onclick = "deleted(${index})">Delete</button></td>
     </tr>
     `
    });
    tableBody.innerHTML = str;
}
//  this function deleted all rows by using index 
function deleted(itemindex) {
    itemsJsonArrayparse = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayparse);
    itemsJsonArray.splice(itemindex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    update();

}

//  this function clearAll clear all todos
function clearAll() {
    localStorage.clear();
    localStorage.setItem('itemsJson', '[]');

    console.log("cleared");
    update();
}

//  clear input feilds after submiting
function clearInputFeilds(){
    styleTitle.value = "";
    styleDescription.value = "";
}

// start main
// styling of textarea and input area
// get the id of title input feild
let styleTitle = document.getElementById('title');
// get the id of the description input feild
let styleDescription = document.getElementById('description');
// set border of title feild
styleTitle.style.border = "2px solid #DCDCDC";
// set the border of descripton feild
styleDescription.style.border = "2px solid #DCDCDC";
// this event perfrom action when pointer is on input feilds
styleTitle.addEventListener('mouseup', () =>{
    styleTitle.style.border = "2px solid #DCDCDC";
})
styleDescription.addEventListener('mouseup', () =>{
    styleDescription.style.border = "2px solid #DCDCDC";
})
//  get the id of button 
let buttonAdd = document.getElementById('add');
// using js event and listen add list button and items in lists 
// get values and call function
buttonAdd.addEventListener('click', getAndUpdate)
update();