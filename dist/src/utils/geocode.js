"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const postman_request_1 = __importDefault(require("postman-request"));
const getCoordinates = (location, callback) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoidG91c2hpZjciLCJhIjoiY2tkc2I0cjRoMGVwZzMxb3FiNXMxZTA5OSJ9.tLPXdAMSKnDQa4EUB5Dg4Q&limit=1`;
    postman_request_1.default({ url: geoUrl, json: true }, (error, response) => {
        if (response && !response.body.error) {
            if (response.body.features && response.body.features.length) {
                console.log("Coordinates-", response.body.features[0].center);
                const coordinates = response.body.features[0].center;
                const lat = response.body.features[0].center[1] || 0;
                const lon = response.body.features[0].center[0] || 0;
                const loc = response.body.features[0].place_name;
                callback(undefined, { lat, lon, loc, coordinates });
            }
            else {
                callback('Unable to find location', undefined);
            }
        }
        else {
            callback('Mapbox Geocoding API: Server error occurred', undefined);
        }
    });
};
exports.default = getCoordinates;
