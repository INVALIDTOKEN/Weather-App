
const https = require("https");
const http = require("http");

// THIS IS THE FILE THAT CONTAINS MY GOOGLE CREDENTIALS MAKE YOUR OWN ONE TO RUN THE APP
const creds = require("./credentials.js");
// http.STATUS_CODES;

let gettempWithTime = (object) => {

    let list = object.list;
    let tempObject = {};
    let mainObject = {};
    list.forEach((current) => {

        let temp = current.main.temp;
        let time = toTime(current.dt_txt).substr(0, 5);

        tempObject = { temp, time };

        if(!mainObject.hasOwnProperty(toDate(current.dt_txt))){
            mainObject[toDate(current.dt_txt)] = [];
            mainObject[toDate(current.dt_txt)].push(tempObject);
        }else{
            mainObject[toDate(current.dt_txt)].push(tempObject);
        }
    });

    return mainObject;

};

let filterList = (tempObject) => {
    let filterObject = {};
    for(let key in tempObject){
        if(tempObject[key].length == 8){
            filterObject[key] = tempObject[key];
        }
    }

    return filterObject;
};

let toTime = (time) => {
    return new Date(time).toTimeString().replace("GMT+0530 (India Standard Time)", "");
};

let toDate = (date) => {
    return new Date(date).toDateString();
};


const getForcast = (lat, lon) => {
    return new Promise((resolve, reject) => {
        try{
            let request = https.get( `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${creds.openWeatherMapAPIkey}&units=metric` , (response) => {
                if(response.statusCode == 200){
                    let string = "";
                    response.on("data", (chunk) => {
                        string += chunk.toString();
                    });
                    response.on("end", () => {
                        let object = JSON.parse(string);
                        if(object.cod == 200){

                            let mainObject = gettempWithTime(object);

                            let anotherObject = filterList(mainObject);

                            resolve(anotherObject);

                        }else{
                            reject("Sorry Not Found" + object.cod);
                        }
                    });
                }else{
                    reject("ERROR : " + response.statusCode + "\n" + "Message : " + http.STATUS_CODES[response.statusCode]);
                }
            });
            request.on("error", (error)=>{
                console.log(error.message);
            });
        }catch(error){
            reject(error.message);
        }
    });
}


module.exports.getForcast = getForcast;




















