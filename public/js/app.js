console.log('Web with Node is working.');


function goTo(path='') {
    const url = location.pathname.slice(1)
    if(url === path) {
        return
    }
    window.open('/'+path, "_self")
}

const callWeatherAPI = (location) => {
    reset()
    place.textContent = 'Loading...'
    time.textContent = ''
    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                place.textContent = data.error;
            }
            else {
                place.innerHTML = 'Location: <b>' + data.location + '</b>';
                reset(data.forcast)
                setTime()
            }
        });
    });
};

function setTime() {
    let timeIST = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    timeIST = timeIST.substr(timeIST.indexOf(',')+2, timeIST.length)
    let timeGMT = new Date().toLocaleString(undefined, {timeZone: 'GMT'});
    timeGMT = timeGMT.substr(timeGMT.indexOf(',')+2, timeGMT.length)

    time.textContent = 'This is a Real Time Weather Report generated at ' + timeIST + ' IST/ ' + timeGMT + ' GMT.'
}

const weatherForm = document.querySelector('form');
const inputIocation = document.getElementById('location');

const place = document.querySelector('#place');
const time = document.querySelector('#time');

const section = document.getElementsByClassName('weather-report');
function reset(forcast) {
    if(section && section[0]) {
        for (let i = 1; i < section[0].children.length; i++) {
            const element = section[0].children[i]
            if(forcast && element.id in forcast) {
                element.innerHTML = forcast[element.id]
            } else {
                element.textContent = ''
            }
        }
    }
}

if(weatherForm) {
    weatherForm.addEventListener('submit', event => {
        event.preventDefault();
        callWeatherAPI(inputIocation.value);
    });
}
