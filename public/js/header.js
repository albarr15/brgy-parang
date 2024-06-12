document.addEventListener("DOMContentLoaded", function() {
    var user_role = document.getElementById("profile-text").innerHTML;
    var user_profile = document.getElementById("profile-img");
    var home_link1 = document.getElementById("home-link1");
    var home_link2 = document.getElementById("home-link2");

    if (user_role) {
        console.log("Found user_role: " + user_role);
        switch(user_role) {
            case "Lupon":
                document.getElementById("profile-text").style.color="#F3BE72";
                user_profile.src = "../public/images/lupon-profile.png";
                home_link1.href = "lupon-homepage.html";
                home_link2.href = "lupon-homepage.html";
                break;

            case "Tanod":
                document.getElementById("profile-text").style.color="#AFE1D7";
                user_profile.src = "../public/images/tanod-profile.png";
                home_link1.href = "tanod-homepage.html";
                home_link2.href = "tanod-homepage.html";
                break;

            case "Employee":
                document.getElementById("profile-text").style.color="#779FE5";
                user_profile.src = "../public/images/employee-profile.png";
                home_link1.href = "employee-homepage.html";
                home_link2.href = "employee-homepage.html";
                break;

            case "Admin":
                document.getElementById("profile-text").style.color="#F07507";
                user_profile.src = "../public/images/admin-profile.png";
                home_link1.href = "admin-homepage.html";
                home_link2.href = "admin-homepage.html";
                break;
            default:
                document.getElementById("profile-text").style.color="#FFFFFF";
                user_profile.src = "../public/images/logo.png";
                home_link1.href = "../index.html";
                home_link2.href = "../index.html";
        }
    }
});
    