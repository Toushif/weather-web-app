import request from 'postman-request';

type UndStr = undefined | string
type CbObj = { 
    data: string,
    wind_speed: string,
    wind_degree: string,
    wind_dir: string,
    pressure: string,
    precip: string,
    humidity: string,
    cloudcover: string,
    uv_index: string,
    visibility: string
}
type ResType = { 
    body: { 
        error: any; 
        current: { 
            temperature: string;
            feelslike: string;
            weather_descriptions: string[];
            wind_speed: number;
            wind_degree: number;
            wind_dir: string;
            pressure: number;
            precip: number;
            humidity: number;
            cloudcover: number;
            uv_index: number;
            visibility: number;
        };
        };
    }
type args = (s: UndStr, o: CbObj | undefined) => void;
const getLocation = (lat: number, lon: number, callback: args) => {
    const url = 'http://api.weatherstack.com/current?access_key=450b0a90868807a4aecb625af805d715&query=';
    request({ url: url+lat+','+lon, json: true }, (error: string | undefined, response: ResType) => {
        if(response && !response.body.error) {
            // console.log("Response-", response.body.current);
            let feelText = " but it feels like ";
            if(response.body.current.temperature == response.body.current.feelslike) {
                feelText = " and it also feels like ";
            }
            let data = 'Situation: <b>It\'s ' + response.body.current.weather_descriptions[0] + ". The official temperature is " + response.body.current.temperature + " degree Celsius " + feelText + response.body.current.feelslike + " degree Celsius.</b>"
            const { wind_speed, wind_degree, wind_dir, pressure, precip, humidity, cloudcover, uv_index, visibility } = response.body.current;
            interface WindIntf {
                [property: string]: string;
            }
            const windDir: WindIntf = {
                S: 'South',
                N: 'North',
                W: 'West',
                E: 'East'
            }
            
            callback(undefined, {
                data,
                wind_speed: `Wind speed:<b> ${wind_speed} km/hr</b>`,
                wind_degree: `Wind degree:<b> ${wind_degree}</b>`,
                wind_dir: `Wind direction:<b> ${windDir[wind_dir] || wind_dir}</b>`,
                pressure: `Atmospheric pressure:<b> ${pressure} millibar</b>`,
                precip: `Precipitation:<b> ${precip} millimeters</b>`,
                humidity: `Humidity:<b> ${humidity}%</b>`,
                cloudcover: `Cloud cover:<b> ${cloudcover}%</b>`,
                uv_index: `UV Index:<b> ${uv_index}</b>`,
                visibility: `Visibility:<b> ${visibility} kilometer(s)</b>`
            })
        } else {
            callback(error ? 'Server or Network error occured' : 'WeatherStack API: Server error occurred', undefined)
        }
    })
}

export default getLocation;