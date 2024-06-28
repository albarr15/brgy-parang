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

    // capitalizes first character of first and last names after each space
    document.querySelectorAll('.first-name-input').forEach(function(first_name) {
        first_name.addEventListener('input', function() {
            this.value = capitalizeName(this.value);
        });
    });

    document.querySelectorAll('.last-name-input').forEach(function(last_name) {
        last_name.addEventListener('input', function() {
            this.value = capitalizeName(this.value);
        });
    });
});

function capitalizeName(name) {
    var name_split = name.toLowerCase().split(' ');

    for (var i = 0; i < name_split.length; i++) {
        name_split[i] = name_split[i].charAt(0).toUpperCase() + name_split[i].substring(1);     
    }
    return name_split.join(' '); 
}