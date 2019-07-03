window.onload = function() {
    document.querySelector('#btn').onclick = function() {
        ajaxGet('data2.json', show);
    }
}

function ajaxGet(url, callback) {
    let f = callback || function(data) {
        console.log(data);
    }
    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            f(request.responseText);
        }
    }

    request.open('GET', url);
    request.send();
}

function show(str) {
    let data = JSON.parse(str);
    document.querySelector('.myip').innerHTML = data.ip;
}