let mainObjects = [];

function objectValues(object) {
    let sunrise = new Date(object.sys.sunrise * 1000).toString();
    sunrise = sunrise.replace("(India Standard Time)", "(IST)");
    let sunset = new Date(object.sys.sunset * 1000).toString();
    sunset = sunset.replace("(India Standard Time)", "(IST)");
    let mainObject = {
        place : object.name,
        icon : object.weather[0].icon,
        temperature: object.main.temp,
        maxTemp : object.main.temp_max,
        minTemp : object.main.temp_min,
        main : object.weather[0].description,
        windSpeed : object.wind.speed,
        windDegree : object.wind.deg,
        clouds : object.clouds.all,
        pressure : object.main.pressure,
        humidity : object.main.humidity,
        sunrise : sunrise,
        sunset : sunset,
        longitude : object.coord.lon,
        latitude : object.coord.lat
    }
    return mainObject;
}

function makeObject(object){
    if(mainObjects.length >= 3){
        mainObjects = [];
    }
    let mainObject = objectValues(object);
    mainObjects.push(mainObject);
    return mainObjects;
}

module.exports.makeObject = makeObject;
module.exports.objectValues = objectValues;