let openEventModal = false;

let currentTodo = {
  todo: "",
  date: null,
  time: null,
};

function toggleModal() {
  // console.log("in modals")
  openEventModal = !openEventModal;
  document.getElementById("event-modal").style.display = openEventModal
    ? "inherit"
    : "none";
}

const todoField = document.getElementById("todo-field");
const timeField = document.getElementById("time-picker");
const dateField = document.getElementById("date-picker");

function handleChange(e) {
  console.log(e.target.id);
  console.log(e.target.value);
  switch (e.target.id) {
    case "todo-field":
      currentTodo.todo = e.target.value;
      console.log(currentTodo);

    case "time-picker":
      let time = e.target.value + ":00";
      currentTodo.time = time;

    case "date-picker":
      let date = new Date(e.target.value).toDateString();
      currentTodo.date = date;
  }
}

todoField.addEventListener("keyup", handleChange);
timeField.addEventListener("change", handleChange);
dateField.addEventListener("change", handleChange);

function elemMaker(elem, id, classesInString) {
    let allClasses = classesInString.split(' ');
    for (each in allClasses){
        elem.classList.add(allClasses[each])
    }
    if(id){
        elem.id = id
    }

    return elem;
}

function makeListItem(content, badge) {

    let li = elemMaker(document.createElement('li'), undefined, "flex justify-around items-center border-b px-6 py-2 border-gray-200")
    let completedButton = elemMaker(document.createElement('input'), undefined, "form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 bg-white focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer")
    completedButton.type = "radio"
    li.appendChild(completedButton);
    let atag = elemMaker(document.createElement('a'), undefined, "block px-6 py-2 w-full text-left cursor-pointer")
    atag.textContent = content.todo;
    if(badge){
        let span = elemMaker(document.createElement('span'), undefined, "text-xs mx-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded")
        if(badge === "New"){
            span.classList.add("bg-blue-600")
        }else{
            span.classList.add("bg-green-500")
        }
        span.textContent = badge
        atag.appendChild(span)
    }

    li.appendChild(atag);
    let edit = elemMaker(document.createElement('img'), undefined, "edit-logo mx-2 cursor-pointer");

    let deleteButton = elemMaker(document.createElement('img'), undefined, "edit-logo mx-2 cursor-pointer");
    edit.src = "https://img.icons8.com/material-rounded/24/22c55e/pencil--v2.png"
    deleteButton.src = "https://img.icons8.com/material-rounded/24/fa314a/delete-forever.png"

    li.appendChild(edit);
    li.appendChild(deleteButton);

    return li;
}


let tasks = document.getElementById("tasks")

function addTodo() {
    let content = {
        todo: "do this"
    }
    for(let i = 0; i < 10; i++){
        let element;
        if(i === 0){

            element = makeListItem(content, "New");
        }else{
            element = makeListItem(content);
        }
        tasks.insertAdjacentElement("beforeend", element)
    }
}


addTodo()
function deleteTodo() {
    
}
