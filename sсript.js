let inputRub = document.getElementById("rub");
let inputUsd = document.getElementById("usd");

inputRub.addEventListener('input', () => {
    let request = new XMLHttpRequest();

    //request.open(method, url, async, login, pass);
    request.open('GET', './data.json');
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send();

    //status
    //statusText
    //responseText / response
    //readyState

    request.addEventListener('readystatechange', function() {
        if(request.readyState === 4 && request.status == 200) {
            let data = JSON.parse(request.response);

            inputUsd.value = inputRub.value / data.usd;
        } else {
            inputUsd.value = "OH NOOOO!!!";
        }
    });
});