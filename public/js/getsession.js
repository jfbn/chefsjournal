fetch(`${window.location.origin}/api/auth/session`, {
            method: 'GET',
        }).then( (res) => {
            return res.json();
        }).then( (session) => {
            document.getElementById('greeting').innerHTML = "Welcome, " + session.firstname;});