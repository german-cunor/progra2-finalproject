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

document.getElementById("PatientRoot").addEventListener("transitionend", function() {
    if (document.getElementById("PatientRoot").classList.contains("close")) {
        document.getElementById("PatientRoot").style.display = "none";
    }
});

document.getElementById("cancelPatientButton").addEventListener("click", function () {
    document.querySelector('.PatientRoot').classList.remove('show');
    document.querySelector(".PatientRoot").classList.add("close");
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

document.getElementById("login").addEventListener("click", function() {
    document.getElementById("userForm").submit();
});

document.getElementById("requestButton").addEventListener("click", function() {
    if (document.getElementById("namePatient").value !== "") {
        const dpi = /^\d+$/.test(document.getElementById("dpiPatient").value);
        if (dpi && document.getElementById("dpiPatient").value.length === 13) {
            const nt = /^\d+$/.test(document.getElementById("dpiPatient").value);
            if (nt && document.getElementById("noPhone").value.length === 8) {
                if (document.getElementById("reasonPatient").value !== "") {
                    document.getElementById("requestForm").submit();
                } else {
                    document.getElementById("requestMessage").textContent = "Ingrese la razón de su visita";
                    document.getElementById("requestMessage").style.color = "red";    
                }
            } else {
                document.getElementById("requestMessage").textContent = "El formato del número telefonico no es valido";
                document.getElementById("requestMessage").style.color = "red";    
            }
        } else {
            document.getElementById("requestMessage").textContent = "El formato del DPI no es valido";
            document.getElementById("requestMessage").style.color = "red";    
        }
    } else {
        document.getElementById("requestMessage").textContent = "Ingrese su nombre";
        document.getElementById("requestMessage").style.color = "red";
    }
});