let home = document.getElementById("home")
let patient = document.getElementById("patient")
let history = document.getElementById("history")

home.classList.add("selected");

home.addEventListener("click", function() {
    home.classList.add("selected");
    home.classList.remove("unselected");
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    history.classList.remove("selected");
    history.classList.add("unselected");
});

patient.addEventListener("click", function() {
    patient.classList.add("selected");
    patient.classList.remove("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected");
    history.classList.remove("selected");
    history.classList.add("unselected");
});

history.addEventListener("click", function() {
    history.classList.add("selected");
    history.classList.remove("unselected");
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected");
});