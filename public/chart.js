
let array = [" #2c3e50", " #E01931", "#3b5998", "#00bf8f",  "#282830", "#8e44ad"];

const otherDetails = (object) => {
    for(let key in object){
        console.log(key);
    }
};

const makeLabels = (object) => {
    let array = [];
    for(let i = 0; i <= 21 ; i++){
        if(i % 3 == 0){
            if(i < 10){
                array.push("0" + i + ":00");
            }else{
                array.push(i + ":00");
            }
        }
    }
    return array;   
};

const makeDataSet = (object) => {
    let datasets = [];
    let arrayIndex = 0;
    for(let key in object){
        let dataObject = {};
        dataObject.label = key.replace(" 2018", "");

        dataObject.data = [];

        object[key].forEach((current) => {
            let temp = current.temp;
            dataObject.data.push(temp);
        });
        dataObject.backgroundColor = "transparent";
        dataObject.borderColor = array[arrayIndex];
        datasets.push(dataObject);
        arrayIndex++;
    }

    return datasets;
};

const drawChart = (object) =>{
    let chx = document.querySelector(".chart canvas");
    if(chx){

        let weatherChart = new Chart(chx, {
            type : "line",
            data : {
                labels : makeLabels(object),
                datasets : makeDataSet(object)
            },
            options : {
                title: {
                    display : true,
                    text : "Temperature change every 3 Hr in °C",
                    fontSize : 18,
                    fontColor : "#171516"
                },
                elements: {
                    line: {
                        tension: 0, // disables bezier curves
                    }
                }
            }
        });
    }
};

const getLocation = () => {
    let coord = document.querySelector(".details");
    coord = coord.children[0].children;
    coord = coord[coord.length - 1].children[1].textContent;
    coord = coord.replace("[", "");
    coord = coord.replace("]", "");
    coord = coord.split(", ");
    return coord;
};

document.addEventListener("DOMContentLoaded", (event) => {
    let coord = getLocation();
    let querystring = `lat=${coord[0]}&lan=${coord[1]}`;
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:3000/forcast", true);

    xhr.onload = function() {
        if(xhr.status == 200){
            let object = JSON.parse(xhr.responseText);
            drawChart(object);
        }else{
            console.log("Cant show anything");
        }
    }

    xhr.send(querystring);
});

// let xhr = new XMLHttpRequest();





















