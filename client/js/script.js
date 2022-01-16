import { fillUserDetail } from './user.js';
import { makeListItem, makeCompletedListItem } from './utils.js';
import { sendJSON, deleteTodo, getTask, getTasks } from './requests.js';

/**
 * Input fields and Task list
 */
const todoField = document.getElementById('todo-field');
const timeField = document.getElementById('time-picker');
const dateField = document.getElementById('date-picker');
let tasks = document.getElementById('tasks');
let completedTasks = document.getElementById('completed-tasks');
let allTasks = [];

/**
 * Render tasks
 * fetch and render tasks on initial load
 */
async function renderTasks() {
    allTasks = await getTasks();
    for (let each of allTasks) {
        let todo = await getTask(each);
        let task = makeListItem(todo);
        tasks.insertAdjacentElement('afterbegin', task);
    }
}

/**
 * new todo
 */
async function addTodo() {
    // make todo and send to the server
    sendJSON(
        '/reminder/add',
        todoField.value,
        new Date(dateField.value + ' ' + timeField.value)
    );
    todoField.value = '';
    timeField.value = null;
    dateField.value = null;
}

// Event listener for save button
document.getElementById('save-event').addEventListener('click', () => {
    if (todoField.value && timeField.value && dateField.value) {
        addTodo();
        // renderTasks();
    }
    toggleModal();
});

// in case we want to delete a todo
// or mark it as complete
tasks.addEventListener('click', async (e) => {
    e.preventDefault();
    // grab id of the todo to be delted
    let elementId;
    if (e.target.classList.contains('edit-logo')) {
        elementId = e.target.parentElement.parentElement.id;
    } else if (e.target.classList.contains('delete')) {
        elementId = e.target.parentElement.id;
    }
    if (elementId) {
        // delete todo
        deleteTodo(elementId);
        // delete form the all tasks array
        const index = allTasks.indexOf(elementId);
        if (index > -1) {
            allTasks.splice(index, 1);
        }
    }

    // in case marked as completed
    // completed todos are only visible until the page is not refreshed
    if (e.target.classList.contains('completed')) {
        let completedId = e.target.parentElement.id;
        const todo = await getTask(completedId);
        // delete todo (else it will conflict with the schedule)
        deleteTodo(completedId);
        let task = makeCompletedListItem(todo, 'Completed Recently');
        completedTasks.insertAdjacentElement('afterbegin', task);
    }
});

// INTIAL Function calls
fillUserDetail();
renderTasks();
