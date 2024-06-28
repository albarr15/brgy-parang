document.addEventListener("DOMContentLoaded", function() {
    var login_form = document.querySelector(".login-form");

    login_form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // TODO: form validation here
        
        var selectedView = document.getElementById("login-title").innerHTML;
        var redirectUrl;

        console.log(selectedView);

        const user_email = document.getElementById("email");
        const user_pw = document.getElementById("pw");

        user_email.classList.remove("input-error");
        user_pw.classList.remove("input-error");

        let valid = true;
        let errorMessage = "";

        // for now, just set minimum length of password to be 8
        
        if (!user_pw.value) {
            isPWValid = false;
            errorMessage += "Password is required.\n"
        }
        else if (user_pw.value.length < 8) {
            isPWValid = false;
            errorMessage += "Incorrect password.\n"
        }

        if (!user_email.value) {
            isEmailValid = false;
            errorMessage += "Email is required.\n"
        }
        else if (!user_email.value.includes("@")) {
            isEmailValid = false;
            errorMessage += "Invalid email.\n"
        }

        if(valid) {
            switch (selectedView) {
            case "Employee Log-in:":
                redirectUrl = "employee-homepage.html";
                login("Employee");
                break;
            case "Administrator Log-in:":
                redirectUrl = "admin-homepage.html";
                login("Admin");
                break;
            case "Tanod Log-in:":
                redirectUrl = "tanod-homepage.html";
                login("Tanod");
                break;
            case "Lupon Log-in:":
                redirectUrl = "lupon-homepage.html";
                login("Lupon");
                break;
            default:
                redirectUrl = "employee-homepage.html";
                login("Employee");
            }

            window.location.href = redirectUrl;
        } else {
            showModal(errorMessage);
        }
    });
});
    
function tanodView() {
    document.getElementById("emp-panel").style.background = "#AFE1D7";
    document.getElementById("login-title").innerHTML = "Tanod Log-in:"
    document.getElementById("login-title").style.color = "black";
    document.getElementById("emp-lupon-tanod-btns").style.display = "none";
   //  document.getElementById("submit-link").href = "tanod-homepage.html";
}

function luponView() {
    document.getElementById("emp-panel").style.background = "#F3BE72";
    document.getElementById("login-title").innerHTML = "Lupon Log-in:"
    document.getElementById("login-title").style.color = "black";
    document.getElementById("emp-lupon-tanod-btns").style.display = "none";
    // document.getElementById("submit-link").href = "lupon-homepage.html";
}

function employeeView() {
    if (document.getElementById("login-title").innerHTML == "Employee Log-in:") {
        window.location.href = "../index.html";
    }
    else {
        document.getElementById("emp-panel").style.background = "#779FE5";
        document.getElementById("login-title").innerHTML = "Employee Log-in:"
        document.getElementById("login-title").style.color = "white";
        document.getElementById("emp-lupon-tanod-btns").style.display = "flex";
        // document.getElementById("submit-link").href = "employee-homepage.html";
    }
}

function login(userRole) {
    localStorage.setItem('userRole', userRole);
}