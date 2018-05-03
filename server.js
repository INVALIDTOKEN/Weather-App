// MAIN SERVER FILE 
const express = require("express");
let itsTime = require("./getTime.js");
let querystring = require("querystring");
let { getForcast } = require("./forcast.js");
let weather = require("./app.js");
const app = express();
const port = 3000;
const hostName = "127.0.0.1";


app.set("view engine", "pug");
app.set("views", "./views");
app.use("/static", express.static("./public"));

app.use("/", (request, response, next) => {
    let string = "";
    request.on("data", (chunk) => {
        string += chunk.toString();
    });
    request.on("end", ()=> {
        if(string !== ""){
            let object = querystring.parse(string);
            request.body = object;
        }
        next();
    });
});

const makeArray = (object) => {
    let value = 1;
    let array = [];
    for(let key in object){
        array.push(todayForecast(object[key]));
    }
    return array.slice(1);
}

function todayForecast(object){
    let array = ["temp", "maxTemp", "minTemp", "humidity", "windSpeed", "pressure", "cloudiness"];
    let tempObject = {};

    for(let key in object){
        if(array.indexOf(key) !== -1){
            tempObject[key] = parseFloat(object[key]/object.count).toFixed(2);
        }else{
            tempObject[key] = object[key];
        }
    }

    return tempObject;
}

app.post("/", (request, response) => {
    let place = request.body.getWeather;
    response.redirect(`/${place}`);
});


app.post("/forcast", (request, response, next) => {

    getForcast(request.body.lat, request.body.lan).then( (object) => {
        
        response.send(object);

    } ).catch((string) => {

        response.send(string);

    });

});

let searchRoutes = require("./modularFiles/serverOne.js");
app.use(searchRoutes);

 
app.listen(port, hostName, () => {
    console.log(`The server is running on http://${hostName}:${port}`);
});


































