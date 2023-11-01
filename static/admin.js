let home = document.getElementById("home");
let request = document.getElementById("request");
let patient = document.getElementById("patient");
let history = document.getElementById("history");
let doctor = document.getElementById("doctor");

let p_dpi = null;

document.getElementById("requestContainer").style.display = "none";
document.getElementById("doctorContainer").style.display = "none";
home.classList.add("selected");

home.addEventListener("click", function() {
    home.classList.add("selected");
    home.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    history.classList.remove("selected");
    history.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "block";
    document.getElementById("requestContainer").style.display = "none";
    document.getElementById("doctorContainer").style.display = "none";
});

function updateDoctorList() {
    var divElement = document.getElementById("doctorSelect");

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "get_doctor_list");

    xhr.onload = function() {
        divElement.innerHTML = xhr.responseText;
    };

    xhr.send();
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function updateRequests(call_name, data) {
    var divElement = document.getElementById("requestContainer");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", call_name);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

    xhr.onload = function() {
        divElement.innerHTML = xhr.responseText;

        document.getElementById("requetsTable").addEventListener("click", function (event) {
            const target = event.target;
          
            if (target.classList.contains("deleteButton")) {
                const row = target.closest("tr");
                const dpi = row.querySelector("td:nth-child(3)").textContent;
                updateRequests("remove_request", {"dpi": dpi});
            } else if (target.classList.contains("acceptButton")) {
                updateDoctorList();
                dpi = row.querySelector("td:nth-child(3)").textContent;
                document.getElementById("PatientRoot").style.display = "block";
                document.getElementById("PatientForm").scrollTop = 0;
                document.querySelector(".PatientRoot").classList.add("show");
                document.querySelector('.PatientRoot').classList.remove('close');
            }
        });
    };

    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    xhr.send(formData);
}

function updateDoctors(call_name, data) {
    var divElement = document.getElementById("doctorContainer");

    var xhr = new XMLHttpRequest();
    xhr.open("POST", call_name);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

    xhr.onload = function() {
        divElement.innerHTML = xhr.responseText;

        document.getElementById("doctorTable").addEventListener("click", function (event) {
            const target = event.target;
          
            if (target.classList.contains("deleteButton")) {
                const row = target.closest("tr");
                const membership = row.querySelector("td:nth-child(2)").textContent;
                updateDoctors("remove_doctor", {"membership": membership});
            }
        });
    };

    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    xhr.send(formData);
}

document.getElementById("PatientRoot").addEventListener("transitionend", function() {
    if (document.getElementById("PatientRoot").classList.contains("close")) {
        document.getElementById("PatientRoot").style.display = "none";
    }
});

document.getElementById("cancelPatientButton").addEventListener("click", function () {
    document.querySelector('.PatientRoot').classList.remove('show');
    document.querySelector(".PatientRoot").classList.add("close");
});

request.addEventListener("click", function() {
    request.classList.add("selected");
    request.classList.remove("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    history.classList.remove("selected");
    history.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("requestContainer").style.display = "block";
    document.getElementById("doctorContainer").style.display = "none";

    updateRequests("get_requests", {});
});

patient.addEventListener("click", function() {
    patient.classList.add("selected");
    patient.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    home.classList.remove("selected");
    home.classList.add("unselected");
    history.classList.remove("selected");
    history.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");
});

history.addEventListener("click", function() {
    history.classList.add("selected");
    history.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");
});

doctor.addEventListener("click", function() {
    doctor.classList.add("selected");
    doctor.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    history.classList.remove("selected");
    history.classList.add("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected");


    document.getElementById("requestContainer").style.display = "none";
    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("doctorContainer").style.display = "block";

    updateDoctors("get_doctors", {});
});


const animationElement = document.getElementById("bar");
const maxVelocity = 50;

let animationString = animationElement.textContent;
let currentIndex = 1;
let direction = 1;
let currentInterval = 0;

function updateAnimation() {
    const characters = animationString.split("");
    characters[currentIndex] = "●";
    animationElement.textContent = characters.join("");
    currentIndex += direction;
    
    if (currentIndex === animationString.length - 2 || currentIndex === 1) {
        direction *= -1;
    }
    currentInterval = (40 * Math.sin((Math.PI * currentIndex) / animationString.length)) + 20;


    setTimeout(updateAnimation,  currentInterval);
}

updateAnimation();