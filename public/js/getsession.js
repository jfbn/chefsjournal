let sesh = undefined;

fetch('http://localhost:8080/api/auth/session', {
            method: 'GET',
        }).then( (res) => {
            return res.json();
        }).then( (session) => {
            sesh = session;

            document.cookie = "username=" + session.username;
            document.getElementById('greeting').innerHTML = "Welcome, " + session.firstname;});