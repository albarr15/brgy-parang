function previewProfileImage(event) {
    const input = event.target;
    const previewImage = document.getElementById('deets-profile-img');
    const uploadButton = document.querySelector('label[for="imageUpload"]');

    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
            uploadButton.style.display = 'none';
        };

        reader.readAsDataURL(file);
    }
}

function cancelForm() {
    document.getElementById('name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('ctc-date-issued').value = '';
    document.getElementById('Birthday').value = '';
    document.getElementById('cert-date-issued').value = '';
    document.getElementById('cedula').value = '';
    document.getElementById('location').value = '';
    document.getElementById('reason').value = '';
    document.getElementById('deets-profile-img').src = '../public/images/customer.png';

    document.querySelector('label[for="imageUpload"]').style.display = 'inline-block';
    document.getElementById('imageUpload').value = '';
}

function validateForm() {
    const imageUpload = document.getElementById('imageUpload').files[0];
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const ctc_date = document.getElementById('ctc-date-issued').value.trim();
    const cert_date = document.getElementById('cert-date-issued').value.trim();
    const birthday = document.getElementById('Birthday').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const location = document.getElementById('location').value.trim();
    const reason = document.getElementById('reason').value.trim();

    let valid = true;
    let errorMessage = '';

    if (!imageUpload) {
        valid = false;
        errorMessage += 'Profile image is required.\n';
    }

    if (!name) {
        valid = false;
        errorMessage += 'Name is required.\n';
    }

    if (!birthday) {
        valid = false;
        errorMessage += 'Complete Birth Date is required.\n'; 
    } else {
        const [month, day, year] = birthday.split('/');
        if (!isValidDate(day, month, year)) {
            valid = false;
            errorMessage += 'Invalid Birth Date.\n';
        }
    }

    if (!address) {
        valid = false;
        errorMessage += 'Address is required.\n';
    }

    if (!ctc_date) {
        valid = false;
        errorMessage += 'Complete CTC Issuance Date is required.\n'; 
    } else {
        const [month, day, year] = ctc_date.split('/');
        if (!isValidDate(day, month, year)) {
            valid = false;
            errorMessage += 'Invalid CTC Issuance Date.\n';
        }
    }

    if (!location) {
        valid = false;
        errorMessage += 'Place of CTC Issuance is required.\n';
    }
    
    if (!cedula) {
        valid = false;
        errorMessage += 'CTC Number is required.\n';
    }
    else if (cedula.length !== 8) {
        valid = false;
        errorMessage += 'Invalid CTC Number.\n';
    }

    if (!cert_date) {
        valid = false;
        errorMessage += 'Complete Certificate Issuance Date is required.\n'; 
    } else {
        const [month, day, year] = cert_date.split('/');
        if (!isValidDate(day, month, year)) {
            valid = false;
            errorMessage += 'Invalid Certificate Issuance Date.\n';
        }
    }

    if (!reason) {
        valid = false;
        errorMessage += 'Reason of Certificate is required.\n';
    }

    if (!valid) {
        showModal(errorMessage);
    }

    return valid;
}

function isValidDate(day, month, year) {
    const dayInt = parseInt(day);
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();
    const inputDate = new Date(`${year}-${month}-${day}`);

    if (isNaN(dayInt) || isNaN(monthInt) || isNaN(yearInt)) {
        return false;
    }

    if (yearInt < 1900 || yearInt > currentYear) {
        return false;
    }

    if (monthInt < 1 || monthInt > 12) {
        return false;
    }

    const daysInMonth = [31, isLeapYear(yearInt) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (dayInt < 1 || dayInt > daysInMonth[monthInt - 1]) {
        return false;
    }

    if (inputDate > currentDate) {
        return false;
    }

    return true;
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

function showModal(message) {
    const modal = document.getElementById('validationModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.getElementsByClassName('close')[0];
    const formattedMessage = message
        .replace(/required/g, '<span style="color: red;">required</span>')
        .replace(/Invalid/g, '<span style="color: red;">Invalid</span>');

    modalMessage.innerHTML = formattedMessage.replace(/\n/g, '<br>');
    modal.style.display = 'block';

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}

function formatBirthday(birthday) {
    // Split the birthday string into parts
    const parts = birthday.split('/');

    // Extract month, day, and year
    const month = parts[0];
    const day = parts[1];
    const year = parts[2];

    // Create an array of month names for formatting
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];

    // Get the month name based on the month number (adjust for zero-index)
    const monthName = monthNames[parseInt(month, 10) - 1];

    // Format day with suffix (st, nd, rd, th)
    let daySuffix;
    if (day == 1 || day == 21 || day == 31) {
        daySuffix = "st";
    } else if (day == 2 || day == 22) {
        daySuffix = "nd";
    } else if (day == 3 || day == 23) {
        daySuffix = "rd";
    } else {
        daySuffix = "th";
    }

    // Construct the formatted string
    const formattedBirthday = `${day}${daySuffix} of ${monthName}, ${year}`;

    return formattedBirthday;
}

function downloadFile() {
    

    // not yet done
}

document.addEventListener("DOMContentLoaded", function() {
    var print_form = document.querySelector(".print-form");

    print_form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
    });
});