document.addEventListener("DOMContentLoaded", function() {
    var login_form = document.querySelector(".login-form");

    login_form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // TODO: form validation here
        
        var selectedView = document.getElementById("login-title").innerHTML;
        var redirectUrl;

        console.log(selectedView);

        switch (selectedView) {
            case "Employee Log-in:":
                redirectUrl = "employee-homepage.html";
                break;
            case "Administrator Log-in:":
                redirectUrl = "admin-homepage.html";
                break;
            case "Tanod Log-in:":
                redirectUrl = "tanod-homepage.html";
                break;
            case "Lupon Log-in:":
                redirectUrl = "lupon-homepage.html";
                break;
            default:
                redirectUrl = "employee-homepage.html";
        }

        window.location.href = redirectUrl;
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



