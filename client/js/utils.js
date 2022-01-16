/**
 * takes an element, adds classes to it and id in case
 * @param {HTMLElement} elem Element to be created and modified
 * @param {String} id
 * @param {String} classesInString a long string of classes seprated with spaces
 * @returns HTMLElement
 */
function elemMaker(elem, id, classesInString) {
    // split the given string classes from spaces
    let allClasses = classesInString.split(' ');
    for (let each in allClasses) {
        // add each class to the element
        elem.classList.add(allClasses[each]);
    }
    // add id if available
    if (id) {
        elem.id = id;
    }

    return elem;
}

/**
 * takes the todo details and make a list item
 * @param {Object} content details of the list item
 * @param {String} badge if it is newly added
 * @returns listItem (HTMLElemenet)
 */
function makeListItem(content, badge) {
    // make outer li tag
    let li = elemMaker(
        document.createElement('li'),
        content._id,
        'flex justify-around items-center border-b px-6 py-2 border-gray-200'
    );
    // radio button to mark as complete
    let completedButton = elemMaker(
        document.createElement('input'),
        undefined,
        'form-check-input completed appearance-none rounded-full h-5 w-5 border border-gray-300 bg-white focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer'
    );
    completedButton.type = 'radio';
    li.appendChild(completedButton);

    // link to the list item(in case we need to see details or edit it)
    let atag = elemMaker(
        document.createElement('a'),
        undefined,
        'block px-6 py-2 w-full text-left bold cursor-pointer'
    );
    atag.textContent = content.content;
    // check if the tag is supplied
    if (badge) {
        let span = elemMaker(
            document.createElement('span'),
            undefined,
            'text-xs mx-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded'
        );
        span.classList.add('bg-blue-600');
        span.textContent = badge;
        atag.appendChild(span);
    }

    li.appendChild(atag);

    // delete button
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');

    let del = elemMaker(
        document.createElement('img'),
        undefined,
        'edit-logo mx-2 cursor-pointer'
    );
    del.src =
        'https://img.icons8.com/material-rounded/24/fa314a/delete-forever.png';

    deleteButton.appendChild(del);
    li.appendChild(deleteButton);

    return li;
}

/**
 * takes the todo details and make a list item
 * @param {Object} content details of the list item
 * @param {String} badge if it is newly added
 * @returns listItem (HTMLElemenet)
 */
function makeCompletedListItem(content, badge) {
    // make outer li tag
    let li = elemMaker(
        document.createElement('li'),
        content._id,
        'flex justify-around items-center border-b px-6 py-2 border-gray-200'
    );
    // green tick in front of each completed todo
    let completed = document.createElement('img');
    completed.src =
        'https://img.icons8.com/material-rounded/24/26e07f/ok--v1.png';

    li.appendChild(completed);
    let atag = elemMaker(
        document.createElement('a'),
        undefined,
        'block px-6 py-2 w-full text-left cursor-pointer'
    );
    atag.textContent = content.content;

    // check for badge
    if (badge) {
        let span = elemMaker(
            document.createElement('span'),
            undefined,
            'text-xs mx-2 inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-white rounded'
        );
        span.classList.add('bg-green-500');
        span.textContent = badge;
        atag.appendChild(span);
    }

    li.appendChild(atag);

    let deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-completed');
    let del = elemMaker(
        document.createElement('img'),
        undefined,
        'edit-logo mx-2 cursor-pointer'
    );
    del.src =
        'https://img.icons8.com/material-rounded/24/fa314a/delete-forever.png';

    deleteButton.appendChild(del);
    li.appendChild(deleteButton);

    return li;
}

export { makeListItem, makeCompletedListItem };
