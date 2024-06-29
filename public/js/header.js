document.addEventListener("DOMContentLoaded", function() {
    function toggleDarkPage() {
        document.documentElement.style.background = "url(../public/images/bg-dark.png) no-repeat center center fixed";
        document.documentElement.style.backgroundSize = "cover";
        document.documentElement.style.WebkitBackgroundSize = "cover"; // For older WebKit-based browsers
        document.documentElement.style.MozBackgroundSize = "cover"; // For older Mozilla-based browsers
        document.documentElement.style.OBackgroundSize = "cover"; // For older Opera browsers
        document.getElementById("header").style.background = "#1C8A3B";
        document.getElementById("logout-btn").style.setProperty("--logout-hover-bg", "#004112");
    }

    function toggleLightPage() {
        document.documentElement.style.background = "url(../public/images/bg-light.png) no-repeat center center fixed";
        document.documentElement.style.backgroundSize = "cover";
        document.documentElement.style.WebkitBackgroundSize = "cover"; // For older WebKit-based browsers
        document.documentElement.style.MozBackgroundSize = "cover"; // For older Mozilla-based browsers
        document.documentElement.style.OBackgroundSize = "cover"; // For older Opera browsers
        document.getElementById("header").style.background = "#004112";
        document.getElementById("logout-btn").style.setProperty("--logout-hover-bg", "#1C8A3B");
    }

    function initializePage() {
        if (document.querySelector(".search-page") || document.querySelector("#view-case-page")) {
            toggleLightPage();
            console.log("toggled light");
        } else {
            toggleDarkPage();
        }
    }

    // pages are in light mode by default
    toggleLightPage();

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
                toggleDarkPage();
                break;

            case "Admin":
                document.getElementById("profile-text").style.color="#F07507";
                user_profile.src = "../public/images/admin-profile.png";
                home_link1.href = "admin-homepage.html";
                home_link2.href = "admin-homepage.html";
                toggleDarkPage();
                break;
            default:
                document.getElementById("profile-text").style.color="#FFFFFF";
                user_profile.src = "../public/images/logo.png";
                home_link1.href = "../index.html";
                home_link2.href = "../index.html";
        }
    }
    initializePage();
});
    
