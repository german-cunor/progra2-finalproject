document.getElementById("adminButton").addEventListener("click", function () {
    document.getElementById("Welcome").style.display = "none";
    document.getElementById("LoginAdminitrator").style.display = "block";
});

document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("LoginAdminitrator").style.display = "none";
    document.getElementById("Welcome").style.display = "block";
});

document.getElementById("patientButton").addEventListener("click", function () {
    document.getElementById("PatientRoot").style.display = "block";
    document.getElementById("PatientForm").scrollTop = 0;
    document.querySelector(".PatientRoot").classList.add("show");
    document.querySelector('.PatientRoot').classList.remove('close');
});

document.getElementById("cancelPatientButton").addEventListener("click", function () {
    document.querySelector('.PatientRoot').classList.remove('show');
    document.querySelector(".PatientRoot").classList.add("close");
});

document.getElementById("PatientRoot").addEventListener("transitionend", function() {
    if (document.getElementById("PatientRoot").classList.contains("close")) {
        document.getElementById("PatientRoot").style.display = "none";
    }
});

document.getElementById("cancelMessageButton").addEventListener("click", function () {
    document.querySelector('.MessageRoot').classList.remove('show');
    document.querySelector(".MessageRoot").classList.add("close");
});

document.getElementById("floatingButton").addEventListener("click", function () {
    document.getElementById("MessageRoot").style.display = "block";
    document.getElementById("MessageForm").scrollTop = 0;
    document.querySelector(".MessageRoot").classList.add("show");
    document.querySelector('.MessageRoot').classList.remove('close');
});

document.getElementById("MessageRoot").addEventListener("transitionend", function() {
    if (document.getElementById("MessageRoot").classList.contains("close")) {
        document.getElementById("MessageRoot").style.display = "none";
    }
});

console. log("Clicked");
document.getElementById("login").addEventListener("click", function() {
    document.getElementById("userForm").submit;
    console. log("Clicked");
    window.print();
});