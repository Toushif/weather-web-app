import request from 'postman-request';

type undStr = undefined | string
type args = (s: undStr, o: undStr) => void;
const getLocation = (lat: number, lon: number, callback: args) => {
    const url = 'http://api.weatherstack.com/current?access_key=450b0a90868807a4aecb625af805d715&query=';
    request({ url: url+lat+','+lon, json: true }, (error: string | undefined, response: { body: { error: any; current: { temperature: string; feelslike: string; weather_descriptions: string[]; }; }; }) => {
        if(response && !response.body.error) {
            // console.log("Response-", response.body.current);
            let feelText = " but it feels like ";
            if(response.body.current.temperature == response.body.current.feelslike) {
                feelText = " and it also feels like ";
            }
            let data = response.body.current.weather_descriptions[0] + ". The official temperature is " + response.body.current.temperature + feelText + response.body.current.feelslike + "."
            callback(undefined, data)
        } else {
            callback(error ? 'Server or Network error occured' : 'WeatherStack API: Server error occurred', undefined)
        }
    })
}

export default getLocation;