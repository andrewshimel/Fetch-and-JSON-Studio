// TODO: add code here
function init(){
    fetch("https://handlers.education.launchcode.org/static/astronauts.json").then(function(response) {
        response.json().then(function(json){
            let mostHours = 0;
            let ast;
            let astIndex;
            for (let i = 0; i < json.length; i++){
                mostHours = json[i].hoursInSpace;
                ast = json[i];
                astIndex = i;
                for (let j = i; j < json.length; j++){
                    if (mostHours < json[j].hoursInSpace){
                        mostHours = json[j].hoursInSpace;
                        ast = json[j];
                        astIndex = j;
                    }
                }
                json[astIndex] = json[i];
                json[i] = ast;
            }
            let div = document.getElementById("container");
            let header = document.getElementById("header");
            let greenOrRed = [];
            for (let i = 0; i < json.length; i++){
                if (json[i].active == true){
                    greenOrRed.push("green");    
                }
                else {
                    greenOrRed.push("red");
                }
            }
            header.innerHTML = `${json.length} Astronauts`;
            
            for (let i = 0; i < json.length; i++){
                div.innerHTML += `
                    <div class="astronaut">
                        <div class="bio">
                            <h3>${json[i].firstName} ${json[i].lastName}</h3>
                                <ul>
                                    <li>Hours in space: ${json[i].hoursInSpace}</li>
                                    <li>Active: <span style = "color:${greenOrRed[i]}">${json[i].active}</span></li>
                                    <li>Skills: ${json[i].skills}</li>
                                </ul>
                        </div>
                    <img class="avatar" src=${json[i].picture}>
                </div>`;

            }
        });
    });


}
window.onload = init;