// Show appropriate form on page load
document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
        window.location.href = "welcome.html"; // Redirect to welcome page
    }
});

// Toggle between login and signup forms
function toggleForm() {
    const loginForm = document.getElementById('login-form-container');
    const signupForm = document.getElementById('signup-form-container');
    
    // Toggle visibility
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

// Login validation
function validateLoginForm() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === "" || password === "") {
        errorMessage.innerText = "Both fields are required!";
        return false;
    }

    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem("isLoggedIn", "true");
        alert("Login successful!");
        window.location.href = "welcome.html";
        return false;
    } else {
        errorMessage.innerText = "Invalid username or password!";
        return false;
    }
}

// Signup validation
function validateSignupForm() {
    const username = document.getElementById('new-username').value;
    const password = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const errorMessage = document.getElementById('signup-error-message');

    if (username === "" || password === "" || confirmPassword === "") {
        errorMessage.innerText = "All fields are required!";
        return false;
    }

    if (password !== confirmPassword) {
        errorMessage.innerText = "Passwords do not match!";
        return false;
    }

    // Save user data to localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("Account created successfully! You can now log in.");
    toggleForm(); // Switch to login form
    return false;
}


// Function to share the location with the saved WhatsApp number
function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            // Create a message with the location
            const message = `Emergency! I'm at: https://www.google.com/maps?q=${lat},${lon}`;

            // Get saved WhatsApp number from localStorage
            const whatsappNumber = localStorage.getItem('whatsappNumber');
            if (whatsappNumber) {
                // Open WhatsApp with the pre-filled message and location
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                // Try using window.location.href for more consistent behavior
                window.location.href = whatsappUrl;
            } else {
                alert('No WhatsApp number saved. Please save a number first.');
            }
        }, function(error) {
            alert('Error getting location: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}





