/**
 * fetchs user from the server
 * @returns user
 */
async function getUser() {
    const url = '/user';
    const res = await fetch(url);
    return res.json();
}

// fill avatar and username
async function fillUserDetail() {
    const user = await getUser();
    document.getElementById('avatar').src = user.picture;
    document.getElementById('username').textContent = user.name;
}

export { fillUserDetail };
