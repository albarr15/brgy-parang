document.addEventListener("DOMContentLoaded", function() {
    var dateInput = document.querySelector("#dateInput");

    // sets date max to current date in the format mm/dd/yyyy
    dateInput.max = new Date().toLocaleDateString('fr-ca');
    dateInput.min = "1970-01-01";
});