//show highscore and display localstorage values
const highscores = document.getElementById("highscores");
const clear = document.getElementById("clear");
const initials = document.getElementById("initials");

window.onload = function() {
    var initials = localStorage.getItem("initials");
    var results = localStorage.getItem("result");
    if(initials){
        highscores.innerHTML += "<li>" + initials + " : " + results + "</li>";
    }
    else {
        highscores.innerHTML = "";
    }
};
// clear button works 
clear.addEventListener("click", function () {
    localStorage.clear();
    highscores.innerHTML = "";
});