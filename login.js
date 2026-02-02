document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    if (!email.endsWith("@student.tce.edu")) {
        errorMsg.textContent = "Please use your college email ID";
        return;
    }

    if (email && password) {
        alert("Login successful!");
        // window.location.href = "home.html";
    } else {
        errorMsg.textContent = "Invalid credentials";
    }
});
