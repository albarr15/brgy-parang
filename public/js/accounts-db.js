function hidePW(role_pw) {
    var x = document.getElementById(role_pw);
    var eye_icon = document.getElementById("eye-" + role_pw);

    if (x.type === "password") {
        x.type = "text";
        eye_icon.innerHTML = "<img src='../public/images/action-hide.png'>";
    } else {
        x.type = "password";
        eye_icon.innerHTML = "<img src='../public/images/action-view.png'>";
    }
}

// for account details (email and password) validation
document.addEventListener("DOMContentLoaded", function() {
    var acc_info_form = document.querySelector(".acc-info-form");

    acc_info_form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // NOTE: does not update email or password yet
        var redirectUrl;
        var role_name = document.getElementById("role-name").innerHTML;
        var user_role = role_name.toLowerCase();

        var email_id = user_role + "-email";
        var pw_id = user_role + "-pw";

        const user_email = document.getElementById(email_id);
        const user_pw = document.getElementById(pw_id);
        const confirm_user_pw = document.getElementById(pw_id + "1");

        let valid = true;
        let errorMessage = "";

        // for now, just set minimum length of password to be 8
        
        if (!user_pw.value || !confirm_user_pw.value) {
            valid = false;
            user_pw.classList.add("input-error");
            errorMessage += "Password is required.\n"
        }
        else if (user_pw.value.length < 8) {
            valid = false;
            user_pw.classList.add("input-error");
            errorMessage += "Incorrect password.\n"
        }
        else if (!(user_pw.value === confirm_user_pw.value)) {
            valid = false;
            user_pw.classList.add("input-error");
            errorMessage += "Passwords do not match.\n"
        }
        else {
            user_pw.classList.remove("input-error");
        }

        if (!user_email.value) {
            valid = false;
            user_email.classList.add("input-error");
            errorMessage += "Email is required.\n"
        }
        else if (!user_email.value.includes("@")) {
            valid = false;
            user_email.classList.add("input-error");
            errorMessage += "Invalid email.\n"
        }
        else {
            user_email.classList.remove("input-error");
        }

        if(valid) {
            window.history.back();
        } else {
            showModal(errorMessage);
        }
    });
});

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