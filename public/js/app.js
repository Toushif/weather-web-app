"use strict";
console.log('Web with Node is working.');
const callWeatherAPI = (location) => {
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    fetch(`/weather?address=${location}`).then(response => {
        response.json().then(data => {
            if (data.error) {
                // console.log(data.error)
                messageOne.textContent = data.error;
            }
            else {
                // console.log(data.location)
                // console.log(data.forcast)
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forcast;
            }
        });
    });
};
const weatherForm = document.querySelector('form');
const inputIocation = document.getElementById('location');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
messageOne.textContent = '';
messageTwo.textContent = '';
weatherForm.addEventListener('submit', event => {
    event.preventDefault();
    callWeatherAPI(inputIocation.value);
});
