document.addEventListener("DOMContentLoaded", function() {
    var user_role = document.getElementById("profile-text").innerHTML;
    var user_profile = document.getElementById("profile-img");

    if (user_role) {
        console.log("Found user_role: " + user_role);
        switch(user_role) {
            case "Lupon":
                document.getElementById("profile-text").style.color="#F3BE72";
                user_profile.src = "../public/images/lupon-profile.png";
                break;

            case "Tanod":
                document.getElementById("profile-text").style.color="#AFE1D7";
                user_profile.src = "../public/images/tanod-profile.png";
                break;

            case "Employee":
                document.getElementById("profile-text").style.color="#779FE5";
                user_profile.src = "../public/images/employee-profile.png";
                break;

            case "Admin":
                document.getElementById("profile-text").style.color="#F07507";
                user_profile.src = "../public/images/admin-profile.png";
                break;
            default:
                document.getElementById("profile-text").style.color="#FFFFFF";
        }
    }
});
    