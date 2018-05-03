
const axios = require("axios");
const yargs = require("yargs");
let argv = yargs.argv.address;

let encoded = encodeURIComponent(argv);
console.log(encoded);
const APIkey =  "AIzaSyAM4MRfgWrXXZinddlWIZelKpMDhPiiLN8";
const geoLocationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded}&key=${APIkey}`

axios.get(geoLocationUrl).then((response) => {
    console.log(response);
}).catch((errorString) => {
    console.log(errorString);
});


































