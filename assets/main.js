document.getElementById("adminButton").addEventListener("click", function () {
    document.getElementById("Welcome").style.display = "none";
    document.getElementById("LoginAdminitrator").style.display = "block";
});

document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("LoginAdminitrator").style.display = "none";
    document.getElementById("Welcome").style.display = "block";
});

document.getElementById("cancelButton").addEventListener("click", function () {
    document.getElementById("PatientRoot").style.display = "nome";
});