
const https = require("https");
let setMemory = new Set(["locality", "country"]);
let creds = require("./credentials.js");

Set.prototype.intersection = function(setB) {
    var intersection = new Set();
    for (var elem of setB) {
        if (this.has(elem)) {
            intersection.add(elem);
        }
    }
    return intersection;
}

const getLocation = (place)=>{
    return new Promise((resolve, reject) => {
        try{
            const request = https.get( `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${creds.googleAPIKey}` , (response)=>{
                if(response.statusCode == 200){
                    let string = "";

                    response.on("data", (data) => {
                        string += data.toString();
                    });

                    response.on("end", () => {
                        let object = JSON.parse(string);
                        if(object.status == "OK"){
                            let location = object.results[0].geometry.location;
                            let addressArray = object.results[0].address_components;
                            let place = "";
                            for(let i = 0; i < addressArray.length; i++){
                                let status = addressArray[i].types;
                                let statusSet = new Set(addressArray[i].types);
                                if(setMemory.intersection(statusSet).size != 0){
                                    if(status.indexOf("country") != -1){
                                        place += addressArray[i].short_name;
                                    }else{
                                        place += addressArray[i].long_name + " ";
                                    }
                                }
                            }
                            let completeData = {location, area : place,completeAddress : object.results[0].formatted_address};
                            resolve(completeData);
                        }else{
                            reject("Invalid Search");
                        }
                        
                    });

                }else{
                    reject(`Error : ${response.statusCode}`);
                }
            });

            request.on("error", (error)=>{
                reject(error.message);
            });

        }catch(error){
            reject(error.message);
        }
    });
};

module.exports.getLocation = getLocation;

































