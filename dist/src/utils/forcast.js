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
            let data = response.body.current.weather_descriptions[0] + ". The official temperature is " + response.body.current.temperature + feelText + response.body.current.feelslike + ".";
            callback(undefined, data);
        }
        else {
            callback(error ? 'Server or Network error occured' : 'WeatherStack API: Server error occurred', undefined);
        }
    });
};
exports.default = getLocation;
