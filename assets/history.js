let currentId = -1

const divElements = document.querySelectorAll(".menuOption");

divElements.forEach(function(element) {
    element.addEventListener("click", function() {
        currentId = element.id;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "load_appointment");
        xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));

        divElements.forEach(function(btn) {
            btn.classList.remove("selected");
            btn.classList.add("unselected");
        });
        element.classList.remove("unselected");
        element.classList.add("selected");

        xhr.onload = function() {
            document.getElementById("reloadContainer").innerHTML = xhr.responseText;

            document.getElementById("saveChanges").addEventListener("click", function() {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "save_appointment");
                xhr.setRequestHeader("X-CSRFToken", getCookie("csrftoken"));
            
                var formData = new FormData();
                formData.append("a_id", currentId);
                formData.append("diagnostic", document.getElementById("diagnostic").value);
                formData.append("prescription", document.getElementById("prescription").value);

                xhr.onload = function() {
                    alert("Cambios guardados!!");
                }

                xhr.send(formData);
            });
        };

        var formData = new FormData();
        formData.append("a_id", currentId);
        xhr.send(formData);
    });
});

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