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

function downloadFile() {
    if (!validateForm()) {
        return;
    }

    // not yet done
}

document.addEventListener("DOMContentLoaded", function() {
    var print_form = document.querySelector(".print-form");

    print_form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
    });
});

$(document).ready(function() {
    Webcam.set({
        width: 320,
        height: 240,
        image_format: 'jpeg',
        jpeg_quality: 90
    });

    $('#accesscamera').on('click', function() {
        Webcam.reset();
        Webcam.on('error', function() {
            $('#photoModal').modal('hide');
            swal({
                title: 'Warning',
                text: 'Please give permission to access your webcam',
                icon: 'warning'
            });
        });
        Webcam.attach('#my_camera');
    });

    $('#takephoto').on('click', take_snapshot);

    $('#retakephoto').on('click', function() {
        $('#my_camera').addClass('d-block');
        $('#my_camera').removeClass('d-none');

        $('#results').addClass('d-none');

        $('#takephoto').addClass('d-block');
        $('#takephoto').removeClass('d-none');

        $('#retakephoto').addClass('d-none');
        $('#retakephoto').removeClass('d-block');

        $('#uploadphoto').addClass('d-none');
        $('#uploadphoto').removeClass('d-block');
    });

    $('#photoForm').on('submit', function(e) {
        e.preventDefault();
        
        Webcam.reset();

        $('#my_camera').addClass('d-block');
        $('#my_camera').removeClass('d-none');

        $('#results').addClass('d-none');

        $('#takephoto').addClass('d-block');
        $('#takephoto').removeClass('d-none');

        $('#retakephoto').addClass('d-none');
        $('#retakephoto').removeClass('d-block');

        $('#uploadphoto').addClass('d-none');
        $('#uploadphoto').removeClass('d-block');

        $('#photoModal').modal('hide');

        swal({
            title: 'Success',
            text: 'Photo uploaded successfully',
            icon: 'success',
            buttons: false,
            closeOnClickOutside: false,
            closeOnEsc: false,
            timer: 2000
        });
    });
});

function take_snapshot() {
    //take snapshot and get image 
    Webcam.snap(function(data_uri) {
        //display result image
        $('#results').html('<img src="' + data_uri + '" class="d-block mx-auto rounded"/>');

        var raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
        $('#photoStore').val(raw_image_data);
    });

    $('#my_camera').removeClass('d-block');
    $('#my_camera').addClass('d-none');

    $('#results').removeClass('d-none');

    $('#takephoto').removeClass('d-block');
    $('#takephoto').addClass('d-none');

    $('#retakephoto').removeClass('d-none');
    $('#retakephoto').addClass('d-block');

    $('#uploadphoto').removeClass('d-none');
    $('#uploadphoto').addClass('d-block');
}
