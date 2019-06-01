function getUrlHostnameNewPost() {
    // let domain = window.location.hostname;
    domain = `http://localhost:3000/api/post/new`;
    return domain;
}

function getObjectForRequestBody() {
    let data = {
        title: document.getElementById('title').innerHTML,
        content: document.getElementById('content').innerHTML,
        author: document.getElementById('author').value
    };
    return data;
}
// an ajax request
function postNewPost(url = '', data = {}) {
    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    })
    .then(response => response.json());
}


window.onload = function() {
    // call the ajax request on click to hit the api
    let send = document.getElementById('btnSend');
    
    send.onclick = () => {
        let url = getUrlHostnameNewPost();
        let data = getObjectForRequestBody();
        postNewPost(url, data)
            .then(data => console.log(JSON.stringify(data)))
            .catch(error => console.log(error));
    }
}