let openEventModal = false;

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

function elemMaker(elem, id, classesInString) {
  let allClasses = classesInString.split(" ");
  for (each in allClasses) {
    elem.classList.add(allClasses[each]);
  }
  if (id) {
    elem.id = id;
  }

  return elem;
}

function makeListItem(content, badge) {
  let li = elemMaker(
    document.createElement("li"),
    undefined,
    "flex justify-around items-center border-b px-6 py-2 border-gray-200"
  );
  let completedButton = elemMaker(
    document.createElement("input"),
    undefined,
    "form-check-input appearance-none rounded-full h-5 w-5 border border-gray-300 bg-white focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
  );
  completedButton.type = "radio";
  li.appendChild(completedButton);
  let atag = elemMaker(
    document.createElement("a"),
    undefined,
    "block px-6 py-2 w-full text-left cursor-pointer"
  );
  atag.textContent = content.content;
  if (badge) {
    let span = elemMaker(
      document.createElement("span"),
      undefined,
      "text-xs mx-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded"
    );
    if (badge === "New") {
      span.classList.add("bg-blue-600");
    } else {
      span.classList.add("bg-green-500");
    }
    span.textContent = badge;
    atag.appendChild(span);
  }

  li.appendChild(atag);
  let edit = elemMaker(
    document.createElement("img"),
    undefined,
    "edit-logo mx-2 cursor-pointer"
  );

  let deleteButton = elemMaker(
    document.createElement("img"),
    undefined,
    "edit-logo mx-2 cursor-pointer"
  );
  edit.src = "https://img.icons8.com/material-rounded/24/22c55e/pencil--v2.png";
  deleteButton.src =
    "https://img.icons8.com/material-rounded/24/fa314a/delete-forever.png";

  li.appendChild(edit);
  li.appendChild(deleteButton);

  return li;
}

let tasks = document.getElementById("tasks");
let allTasks = [];
let myId = null;

function sendJSON(todo, time) {
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "/reminder/add";

  // open a connection
  xhr.open("POST", url, true);

  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");

  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Print received data from server
      allTasks = this.responseText;
    }
  };

  // Converting JSON data to string
  var data = JSON.stringify({ id: myId, todo: todo, time: time });

  // Sending data with the request
  xhr.send(data);
}

async function getTasks() {
  let url = "/reminder/getAll";
  const res = await fetch(url)
  allTasks = await res.json();
}

async function getTask(id){
    let url = `/reminder/get/${id}`;
    const res = await fetch(url);
    return res.json();
}

async function renderTasks(){
    await getTasks();
    for(let each of allTasks){
        let todo = await getTask(each);
        makeListItem(todo);
    }
}

renderTasks();

function addTodo() {
  sendJSON(todoField.value, new Date(dateField.value + " " + timeField.value));
  (todoField.value = ""), (timeField.value = null);
  dateField.value = null;
}

document.getElementById("save-event").addEventListener("click", () => {
  if (todoField.value && timeField.value && dateField.value) {
    addTodo();
  }
  toggleModal();
});
function deleteTodo() {}
