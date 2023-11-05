let home = document.getElementById("home");
let request = document.getElementById("request");
let patient = document.getElementById("patient");
let message = document.getElementById("message");
let doctor = document.getElementById("doctor");

let p_dpi = null;

document.getElementById("reloadContainer").style.display = "none";
home.classList.add("selected");

function updateDoctorList(div_name) {
    var divElement = document.getElementById(div_name);

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
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function updateRequests(call_name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", call_name);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

    xhr.onload = function() {
        document.getElementById("reloadContainer").innerHTML = xhr.responseText;

        try {
            document.getElementById("requetsTable").addEventListener("click", function (event) {
                const target = event.target;
              
                if (target.classList.contains("deleteButton")) {
                    const row = target.closest("tr");
                    const dpi = row.querySelector("td:nth-child(3)").textContent;
                    updateRequests("remove_request", {"dpi": dpi});
                } else if (target.classList.contains("acceptButton")) {
                    const row = target.closest("tr");
                    updateDoctorList("doctorSelect1");
                    p_dpi = row.querySelector("td:nth-child(3)").textContent;
                    document.getElementById("PatientRoot").style.display = "block";
                    document.getElementById("PatientForm").scrollTop = 0;
                    document.querySelector(".PatientRoot").classList.add("show");
                    document.querySelector('.PatientRoot').classList.remove('close');
                }
            });
        } catch (e) {
        }
    };

    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    xhr.send(formData);
}

function updatePatients(call_name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", call_name);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

    xhr.onload = function() {
        document.getElementById("reloadContainer").innerHTML = xhr.responseText;

        try {
            document.getElementById("patientTable").addEventListener("click", function (event) {
                const target = event.target;
                
                if (target.classList.contains("appointmentButton")) {
                    const form = document.createElement('form');
                    form.action = "show_appointment";
                    form.method = 'POST';

                    const dpi = document.createElement('input');
                    dpi.type = 'hidden';
                    dpi.name = 'dpi';
                    dpi.value = target.closest("tr").querySelector("td:nth-child(3)").textContent;
                    form.appendChild(dpi);
                    
                    const csrfTokenInput = document.createElement('input');
                    csrfTokenInput.type = 'hidden';
                    csrfTokenInput.name = 'csrfmiddlewaretoken';
                    csrfTokenInput.value = getCookie("csrftoken");
                    form.appendChild(csrfTokenInput);

                    document.getElementById('container').append(form);
                    form.submit();
                } else if (target.classList.contains("deleteButton")) {
                    const row = target.closest("tr");
                    const dpi = row.querySelector("td:nth-child(3)").textContent;
                    updatePatients("remove_patient", {"dpi": dpi});
                }
            });
        } catch(e) {
        }
    };

    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    xhr.send(formData);
}

function updateMessages(call_name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", call_name);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

    xhr.onload = function() {
        document.getElementById("reloadContainer").innerHTML = xhr.responseText;

        try {
            const buttons = document.querySelectorAll(".deleteButton");

            buttons.forEach(function(button) {
                button.addEventListener("click", function() {
                    updateMessages("remove_message", {"m_id": button.id});
                });
            });
        } catch (e) {
        }
    };

    var formData = new FormData();
    for (var key in data) {
        formData.append(key, data[key]);
    }
    xhr.send(formData);
}

function updateDoctors(call_name, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", call_name, true);
    xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

    xhr.onload = function() {
        document.getElementById("reloadContainer").innerHTML = xhr.responseText;

        document.querySelectorAll(".deleteButton").forEach(function(button) {
            button.addEventListener("click", function() {
                updateDoctors("remove_doctor", {"membership": button.id});
            })
        });

        document.querySelectorAll(".acceptButton").forEach(function(button) {
            button.addEventListener("click", function() {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "save_doctor", true);
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

                var formData = new FormData();
                formData.append("d_id", button.id);
                formData.append("name", document.getElementById("n_" + button.id).value);
                formData.append("specialty", document.getElementById("s_" + button.id).value);
                formData.append("other", document.getElementById("o_" + button.id).value);

                xhr.onload = function() {
                    alert("Datos guardados");
                };
                xhr.send(formData);

            })
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
        document.getElementById("addPatientForm").reset();
        document.getElementById("PatientRoot").style.display = "none";
    }
});

document.getElementById("cancelPatientButton").addEventListener("click", function () {
    document.querySelector('.PatientRoot').classList.remove('show');
    document.querySelector(".PatientRoot").classList.add("close");
});

document.getElementById("acceptPatientButton").addEventListener("click", function () {
    const parsedDate = Date.parse(document.getElementById("datePatient").value);
    if (parsedDate && !isNaN(parsedDate)) {
        const timeRegex = /^\d{2}:\d{2}$/;

        const isTimeValid = timeRegex.test(document.getElementById("timePatient").value);
        if (isTimeValid) {
            if(document.getElementById("doctorName").value !== "default") {
                document.querySelector('.PatientRoot').classList.remove('show');
                document.querySelector(".PatientRoot").classList.add("close");

                updateRequests("accept_patient", {
                    "dpi": p_dpi,
                    "date": document.getElementById("datePatient").value,
                    "time": document.getElementById("timePatient").value,
                    "doctor": document.getElementById("doctorName").value,
                    "other": document.getElementById("otherPatient").value
                });
            } else {
                alert("Select a doctor")
            }
        } else {
            alert("Format time error")
        }
    } else {
        alert("Format date error")
    }
});

document.getElementById("DoctorRoot").addEventListener("transitionend", function() {
    if (document.getElementById("DoctorRoot").classList.contains("close")) {
        document.getElementById("addDoctorForm").reset();
        document.getElementById("DoctorRoot").style.display = "none";
    }
});

document.getElementById("addDoctorButton").addEventListener("click", function() {
    if (document.getElementById("nameDoctor").value !== "") {
        const nt = /^\d+$/.test(document.getElementById("membership").value);
        if (nt && document.getElementById("membership").value.length == 9) {
            if (document.getElementById("specialty").value !== "") {
                document.querySelector('.DoctorRoot').classList.remove('show');
                document.querySelector(".DoctorRoot").classList.add("close");

                updateDoctors("add_doctor", {
                    "name": document.getElementById("nameDoctor").value,
                    "membership": document.getElementById("membership").value,
                    "specialty": document.getElementById("specialty").value,
                    "other": document.getElementById("otherDoctor").value
                });
            } else {
                alert("Ingrese la especialidad del medico")
            }
        } else {
            alert("El formato del colegiado no es valido")
        }
    } else {
        alert("Ingrese el nombre del medico");
    }
});

document.getElementById("formDoctorButton").addEventListener("click", function() {
    document.getElementById("DoctorRoot").style.display = "block";
    document.getElementById("DoctorForm").scrollTop = 0;
    document.querySelector(".DoctorRoot").classList.add("show");
    document.querySelector('.DoctorRoot').classList.remove('close');
});

document.getElementById("cancelDoctorButton").addEventListener("click", function () {
    document.querySelector('.DoctorRoot').classList.remove('show');
    document.querySelector(".DoctorRoot").classList.add("close");
});

//--------------------------------------------------------------------------------------
document.getElementById("NewPatientRoot").addEventListener("transitionend", function() {
    if (document.getElementById("NewPatientRoot").classList.contains("close")) {
        document.getElementById("addNewPatientForm").reset();
        document.getElementById("NewPatientRoot").style.display = "none";
    }
});

document.getElementById("formPatientButton").addEventListener("click", function() {
    updateDoctorList("doctorSelect2");
    document.getElementById("NewPatientRoot").style.display = "block";
    document.getElementById("NewPatientForm").scrollTop = 0;
    document.querySelector(".NewPatientRoot").classList.add("show");
    document.querySelector('.NewPatientRoot').classList.remove('close');
});

document.getElementById("cancelNewPatientButton").addEventListener("click", function () {
    document.querySelector('.NewPatientRoot').classList.remove('show');
    document.querySelector(".NewPatientRoot").classList.add("close");
});

document.getElementById("addNewPatientButton").addEventListener("click", function () {
    if (document.getElementById("nameNewPatient").value !== "") {
        const dpi = /^\d+$/.test(document.getElementById("dpiNewPatient").value);
        if (dpi && document.getElementById("dpiNewPatient").value.length === 13) {
            const nt = /^\d+$/.test(document.getElementById("dpiNewPatient").value);
            if (nt && document.getElementById("phoneNewPatient").value.length === 8) {
                var parsedDate = Date.parse(document.getElementById("birdthdateNewPatient").value);

                if (parsedDate && !isNaN(parsedDate)) {
                    parsedDate = Date.parse(document.getElementById("dateNewPatient").value);

                    if (parsedDate && !isNaN(parsedDate)) {
                        const timeRegex = /^\d{2}:\d{2}$/;

                        const isTimeValid = timeRegex.test(document.getElementById("timeNewPatient").value);
                        if (isTimeValid) {
                            if(document.getElementById("doctorName").value !== "default") {
                                if (document.getElementById("reasonNewPatient").value !== "") {
                                    document.querySelector('.NewPatientRoot').classList.remove('show');
                                    document.querySelector(".NewPatientRoot").classList.add("close");

                                    updatePatients("add_patient", {
                                        "name": document.getElementById("nameNewPatient").value,
                                        "dpi": document.getElementById("dpiNewPatient").value,
                                        "noPhone": document.getElementById("phoneNewPatient").value,
                                        "birdthdate": document.getElementById("birdthdateNewPatient").value,
                                        "date": document.getElementById("dateNewPatient").value,
                                        "time": document.getElementById("timeNewPatient").value,
                                        "doctor": document.getElementById("doctorName").value,
                                        "reason": document.getElementById("otherNewPatient").value,
                                        "other": document.getElementById("otherNewPatient").value
                                    });
                                } else {
                                    alert("Ingrese la razón de la visita")
                                }
                            } else {
                                alert("Seleccione un medico")
                            }
                        } else {
                            alert("Error con el formato del la hora")
                        }
                    } else {
                        alert("Error con el formato de la fecha de la consulta")
                    }
                } else {
                    alert("Error con el formato de la fecha de nacimiento")
                }
            } else {
                alert("El formato del numero de telefono no es valido")
            }
        } else {
            alert("El formato del numero de dpi no es valido")
        }
    } else {
        alert("Ingrese el nombre del paciente")
    }
});

//--------------------------------------------------------------------------------------

home.addEventListener("click", function() {
    home.classList.add("selected");
    home.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    message.classList.remove("selected");
    message.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "block";
    document.getElementById("reloadContainer").style.display = "none";
});

request.addEventListener("click", function() {
    request.classList.add("selected");
    request.classList.remove("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    message.classList.remove("selected");
    message.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("reloadContainer").style.display = "block";

    updateRequests("get_requests", {});
});

patient.addEventListener("click", function() {
    patient.classList.add("selected");
    patient.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    home.classList.remove("selected");
    home.classList.add("unselected");
    message.classList.remove("selected");
    message.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("reloadContainer").style.display = "block";

    updatePatients("get_patients", {});
});

message.addEventListener("click", function() {
    message.classList.add("selected");
    message.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected");
    doctor.classList.remove("selected");
    doctor.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("reloadContainer").style.display = "block";

    updateMessages("load_message", {});
});

doctor.addEventListener("click", function() {
    doctor.classList.add("selected");
    doctor.classList.remove("unselected");
    request.classList.remove("selected");
    request.classList.add("unselected")
    patient.classList.remove("selected");
    patient.classList.add("unselected");
    message.classList.remove("selected");
    message.classList.add("unselected");
    home.classList.remove("selected");
    home.classList.add("unselected");

    document.getElementById("homeContainer").style.display = "none";
    document.getElementById("reloadContainer").style.display = "block";

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