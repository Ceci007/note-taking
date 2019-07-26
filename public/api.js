const postButton = document.getElementById("form_post");
postButton.addEventListener("submit", notePost);
const putButton = document.getElementById("form_put");
putButton.addEventListener("submit", notePut);
const deleteButton = document.getElementById("form_delete");
deleteButton.addEventListener("submit", noteDelete);
const searchButton = document.getElementById("form_search");
searchButton.addEventListener("submit", noteGet);

function notePost(event, post) {
    event.preventDefault();
    const note = event.target.note.value;

    post = {
        note: note
    }
    const options = {
        method: "POST", 
        body: JSON.stringify(post), 
        headers: new Headers({
            "content-type": "application/json"
        })
    }
    return fetch("/notes", options).then(res => res.json())
    .then(res => console.log(res))
    .then(error => console.error("error: ", error));
}

function notePut(event) {
    event.preventDefault();
    const noteId = event.target.noteId.value;
    const note = event.target.note.value;

    post = {
        note: note
    }

    const options = {
        method: "PATCH",
        body: JSON.stringify(post),
        headers: new Headers({
            "content-type": "application/json"
        })
    }
    const URL = `/notes/${noteId}`;
    return fetch(URL, options).then(response => response.json())
    .then(data => console.log("note to edit: ", data));
}

function noteDelete(event) {
    event.preventDefault();
    const noteId = event.target.noteId.value;
    const options = {
        method: "DELETE",
        headers: new Headers({
            "content-type": "application/json"
        }), 
        body: JSON.stringify({ noteId: noteId })
    }
    const URL = `/notes/${noteId}`;
    fetch(URL, options).then(response => response.json())
    .then(data => console.log("note to delete: ", data));
}

function noteGet(event) {
    event.preventDefault();
    const noteId = event.target.noteId.value;

    fetch(`/notes/${noteId}`).then(response => {
        return response.json();
    }).then(data => {
        if(!noteId) {
            document.getElementById("results").innerHTML = "";
            for(let i in data) {
                document.getElementById("results").innerHTML += data[i].note + "<br />";
            }
        } else {
            document.getElementById("results").innerHTML = "";
            document.getElementById("results").innerHTML += data.note + "<br />";
        }
        console.log(JSON.stringify(data));
    });
}