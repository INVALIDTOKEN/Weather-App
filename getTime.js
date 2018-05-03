const https = require("https");
const http = require("http");
const timeAPIkey = "0II71UIKTWXP";
const lng = 77.22;
const lat = 28.65;

const getTime = () => {
    return new Promise((resolve, reject) => {
        try{
            let request = https.get(`https://api.timezonedb.com/v2/get-time-zone?key=${timeAPIkey}&format=json&by=position&lat=${lat}&lng=${lng}`, (response) => {
                if(response.statusCode == 200){

                    let string = "";

                    response.on("data", (chunks) => {

                        string += chunks.toString();

                    });

                    response.on("end", () => {

                        try{

                            let object = JSON.parse(string);
                            let formatted = object.formatted;
                            let time = new Date(formatted).toTimeString();
                            time = time.replace("GMT+0530 (India Standard Time)", "(IST)");

                            let mainObject = {
                                date : new Date(formatted).toDateString(),
                                time : time
                            }
                            resolve(mainObject);

                        }catch(error){
                            reject(error.object);
                        }

                    });

                }else{
                    reject("Error");
                }
            });

            request.on("error", (error) => {reject(error.message);});
        }catch(error){
            reject(error.message);
        }
    });
}

module.exports.getTime = getTime;





























