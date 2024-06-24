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
    document.querySelectorAll('.date-fields input').forEach(input => input.value = '');
    document.getElementById('cedula').value = '';
    document.getElementById('location').value = '';
    document.getElementById('deets-profile-img').src = '../public/images/customer.png';
}

function validateForm() {
    const imageUpload = document.getElementById('imageUpload').files[0];
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const day = document.getElementById('day').value.trim();
    const month = document.getElementById('month').value.trim();
    const year = document.getElementById('year').value.trim();
    const cedula = document.getElementById('cedula').value.trim();
    const location = document.getElementById('location').value.trim();

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
    if (!address) {
        valid = false;
        errorMessage += 'Address is required.\n';
    }
    if (!day || !month || !year) {
        valid = false;
        errorMessage += 'Complete date is required.\n';
    } 
    if (!cedula) {
        valid = false;
        errorMessage += 'Cedula Number is required.\n';
    }
    if (!location) {
        valid = false;
        errorMessage += 'Location of Issue is required.\n';
    }

    if (!valid) {
        showModal(errorMessage);
    }

    return valid;
}

function showModal(message) {
    const modal = document.getElementById('validationModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeBtn = document.getElementsByClassName('close')[0];

    
    modalMessage.textContent = message;
    modalMessage.innerHTML = message.replace(/\n/g, '<br>');
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

        // TODO: form validation here
    });
});