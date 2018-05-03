
const https = require("https");
const APIkey = "52f2fe54c8fe6b6195a0c68a1cdbb398";
const objects = [];

function getWeather(place){
    return new Promise((resolve, reject) => {
        let data = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${APIkey}&units=metric`, (response) => {
            if(response.statusCode == 200){

                let string = "";

                response.on("data", (chunk) => {
                    string += chunk.toString();
                });

                response.on("end", () => {

                    let object = JSON.parse(string);
                    resolve(object);

                });

            }else{

                reject("Error");

            }

        });
    });
}

module.exports.getWeather = getWeather;










