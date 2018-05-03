
let table = document.getElementsByClassName("details");

for(let i = 0; i < table.length; i++){
    let rows = table[i].children[0].children;
    for(let i = 0; i < rows.length; i++){
        if(i == rows.length - 1){
            rows[i].children[1].style.color =  "red";
            rows[i].children[1].style.fontWeight =  "bold";
        }
        if(i % 2 == 0){
            rows[i].style.backgroundColor = "lightgray";
        }
    }
}

let data = document.getElementsByClassName("data")[0];
if(data){
    let child = data.children;
    child[0].style.backgroundColor = "lightgray";
    child[3].style.backgroundColor = "lightgray";    
}












