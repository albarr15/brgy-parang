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