
let express = require("express");
let router = express.Router();
let weather = require("./../app.js");
let forcast = require("./../forcast.js");
let location = require("./../location.js");
let weatherByLocation = require("./../weatherByLocation.js");
let perfectObject = require("./func.js");
const places = ["washington,usa", "london,uk", "sydney"];

let fullDate = new Date();
let time = fullDate.toTimeString();
time = time.replace("GMT+0530 (India Standard Time)", "(IST)");


router.get("/:place", (request, response) => {
    let place = request.params.place;
    place = encodeURIComponent(place);
    let locationPromise = location.getLocation(place);
    locationPromise.then((object)=>{

        let weatherPromise = weatherByLocation.getWeather(object);
        weatherPromise.then((object) => {

            let mainObject = perfectObject.objectValues(object);
            response.render("search", {fullDate :  `${fullDate.toDateString()} ${time}`,place : "Search", today : mainObject});

        }, (string) => {
            response.send(string);
        });

    },(string)=>{
        response.send(string);
    }); 
});


router.get("/", (request, response)=>{
    let myWeather = weather.getWeather(places[0]);
    myWeather.then(function(object){
        let send1 = perfectObject.makeObject(object);
        
        return weather.getWeather(places[1]);
    }).then(function(object){
        let send2 = perfectObject.makeObject(object);

        return weather.getWeather(places[2]);
    }).then(function(object){
        let send3 = perfectObject.makeObject(object);

        
        response.render("home", {place : "HOME",fullDate: `${fullDate.toDateString()} ${time}` ,objects : send3});

    }).catch((string) => {
        console.log(string);
    });
});



module.exports = router;














