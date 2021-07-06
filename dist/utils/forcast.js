"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postman_request_1 = __importDefault(require("postman-request"));
const getLocation = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=450b0a90868807a4aecb625af805d715&query=';
    postman_request_1.default({ url: url + lat + ',' + lon, json: true }, (error, response) => {
        if (response && !response.body.error) {
            // console.log("Response-", response.body.current);
            let feelText = " but it feels like ";
            if (response.body.current.temperature == response.body.current.feelslike) {
                feelText = " and it also feels like ";
            }
            let data = 'Situation: <b>It\'s ' + response.body.current.weather_descriptions[0] + ". The official temperature is " + response.body.current.temperature + " degree Celsius " + feelText + response.body.current.feelslike + " degree Celsius.</b>";
            const { wind_speed, wind_degree, wind_dir, pressure, precip, humidity, cloudcover, uv_index, visibility } = response.body.current;
            const windDir = {
                S: 'South',
                N: 'North',
                W: 'West',
                E: 'East'
            };
            callback(undefined, {
                data,
                wind_speed: `Wind speed:<b> ${wind_speed} km/hr</b>`,
                wind_degree: `Wind degree:<b> ${wind_degree}</b>`,
                wind_dir: `Wind direction:<b> ${windDir[wind_dir]}</b>`,
                pressure: `Atmospheric pressure:<b> ${pressure} millibar</b>`,
                precip: `Precipitation:<b> ${precip} millimeters</b>`,
                humidity: `Humidity:<b> ${humidity}%</b>`,
                cloudcover: `Cloud cover:<b> ${cloudcover}%</b>`,
                uv_index: `UV Index:<b> ${uv_index}</b>`,
                visibility: `Visibility:<b> ${visibility} kilometer(s)</b>`
            });
        }
        else {
            callback(error ? 'Server or Network error occured' : 'WeatherStack API: Server error occurred', undefined);
        }
    });
};
exports.default = getLocation;
