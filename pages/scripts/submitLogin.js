document.forms['loginForm'].addEventListener('submit', (event) => {
    event.preventDefault();
    // TODO do something here to show user that form is being submitted

    document.getElementById('submitButton').replaceWith('<div> class="loader"></div>')

    fetch(event.target.action, {
        method: 'POST',
        body: new URLSearchParams(new FormData(event.target)) // event.target is the form
    }).then((resp) => {
        return resp.json(); // or resp.text() or whatever the server sends
    }).then((body) => {
        console.log(body);
        // TODO handle body
    }).catch((error) => {
        // TODO handle error
    });
});