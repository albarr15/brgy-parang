document.addEventListener("DOMContentLoaded", function() {

    var dateInput = document.querySelector("#dateInput");

    if (dateInput) {
        // sets date max to current date in the format mm/dd/yyyy
        dateInput.max = new Date().toLocaleDateString('fr-ca');

        // sets date minimum to January 1, 1970
        dateInput.min = "1970-01-01";
    }

    // autocapitalizes middle initial inputs
    document.querySelectorAll('.middle-name-input').forEach(function(mid_initial) {
        mid_initial.addEventListener('input', function() {
            this.value = this.value.toUpperCase();
        });
    });
});