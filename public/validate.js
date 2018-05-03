let input = document.querySelector(".showcase form input");
let form = document.querySelector(".showcase form");
input.value = "";

form.addEventListener("submit", (event) => {
    if(input.value == ""){
        alert("Please Search something");
        event.preventDefault();
    }
    input.value = stringValidate(input.value);
});






const generateElement = (element, content, clsName = "") => {
    let thatElement = document.createElement(element);
    thatElement.textContent = content;
    thatElement.className = clsName;
    return thatElement;
}

// REMOVES ALL THE SPACES IN THE STARTING OF THE STRING
const firstSpacing = (string) =>{
    let tempSting = string;
    for(let i = 0; i < tempSting.length; i++){
        if(tempSting[i] !== " "){
            string = tempSting.substr(i);
            break;
        }
    }
    return string;
}

// VALIDATE ONLY A SINGLE SPACE BETWEEN ALL STRINGS
const separateName = (string) => {
    let tempSting = string;
    let test;
    for(let i = 0; i < tempSting.length; i++){
        if(tempSting[i] == " " && tempSting[i + 1] == " "){
            let firstString = tempSting.substr(0, i);
            let lastString = firstSpacing(tempSting.substr(i + 1));
            string = firstString + " " + lastString;
            tempSting = string;
            i--;
            continue;
        }
    }
    return string;
}

// REVERSE A STRING
const reverse = (string) =>{
    let reverse = "";
    for(let i = string.length - 1; i >= 0; i--){
        reverse += string[i];
    }
    return reverse;
}

const stringValidate = (string) =>{
    // FIRST WE REMOVE ALL THE SPACES FROM THE STARTING
    string = firstSpacing(string);
    // THEN WE REMOVED SPACES FROM THE BACK
    let reverseString = reverse(string);
    reverseString = firstSpacing(reverseString);
    // PUT THE FINAL STRING INTO THE SAME STRING VARIABLE
    string = reverse(reverseString);

    // AND THAN WE VALIDATE THE SPACES TO A SINGLE SPACE ONLY
    string = separateName(string);
    return string;
}




























