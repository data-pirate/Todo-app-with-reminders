// this file handles requests to the server
import { makeListItem } from './utils.js';

/**
 * fetch all tasks from the db
 * @returns list of all todo tasks
 */
async function getTasks() {
    let url = '/reminder/getAll';
    const res = await fetch(url);
    return res.json();
}

/**
 * fetchs a specific todo from the db
 * @param {String} id Id of the todo
 * @returns Todo
 */
async function getTask(id) {
    let url = `/reminder/get/${id}`;
    const res = await fetch(url);
    return res.json();
}

/**
 * This function handles the post requests to the server
 * @param {String} url endpoint to send data
 * @param {Object} todo
 * @param {Date} time
 */
function sendJSON(url, todo, time) {
    // Creating a XHR object
    let xhr = new XMLHttpRequest();

    // open a connection
    xhr.open('POST', url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader('Content-Type', 'application/json');

    // Create a state change callback
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // Print received data from server
            renderCurrent(JSON.parse(this.responseText));
        }
    };

    // Converting JSON data to string
    let data = JSON.stringify({ todo, time });

    // Sending data with the request
    xhr.send(data);
}

/**
 * removes and element from the html page
 * @param {String} id Id of the HTML element
 * @returns
 */
function removeElement(id) {
    var elem = document.getElementById(id);
    return elem.parentElement.removeChild(elem);
}

/**
 * Takes id as an argument and deletes todo from db and html
 * @param {String} id Id of the todo
 */
function deleteTodo(id) {
    // console.log('i was clicked', id);
    let xhr = new XMLHttpRequest();
    let url = `/reminder/delete/${id}`;
    // open a connection
    xhr.open('POST', url, true);

    // Create a state change callback
    xhr.onreadystatechange = async function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // if successfully deleted from database then delete from the client side
            removeElement(this.responseText);
        }
    };
    xhr.send();
}

const tasks = document.getElementById('tasks');

/**
 * renders the newly added todo
 * @param {String} id id of the currently added todo
 */
async function renderCurrent(id) {
    let todo = await getTask(id);
    let task = makeListItem(todo);
    // last added todo should be at the top
    tasks.insertAdjacentElement('afterbegin', task);
}

export { sendJSON, deleteTodo, getTask, getTasks };
