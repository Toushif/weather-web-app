import request from 'postman-request';

type args = (s: string | undefined, o: undefined | ({lat: number, lon: number, loc: string, coordinates: number[]})) => void;
const getCoordinates = (location: string, callback: args) => {
    const geoUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(location)}.json?access_token=pk.eyJ1IjoidG91c2hpZjciLCJhIjoiY2tkc2I0cjRoMGVwZzMxb3FiNXMxZTA5OSJ9.tLPXdAMSKnDQa4EUB5Dg4Q&limit=1`
    request({ url: geoUrl, json: true }, (error: string | undefined, response: { body: { error: any; features: [{ center: [number, number]; place_name: string }]; }; }) => {
        if(response && !response.body.error) {
            if(response.body.features && response.body.features.length) {
                console.log("Coordinates-", response.body.features[0].center);
                const coordinates = response.body.features[0].center;
                const lat = response.body.features[0].center[1] || 0 as number;
                const lon = response.body.features[0].center[0] || 0 as number;
                const loc = response.body.features[0].place_name;
                
                callback(undefined, {lat, lon, loc, coordinates})
            } else {
                callback('Unable to find location', undefined)
            }
        } else {
            callback('Mapbox Geocoding API: Server error occurred', undefined)
        }
    })
}

export default getCoordinates;