// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  let isValid = true;

  // Email validation
  const emailError = document.getElementById('emailError');
  if (!email || !validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }

  // Password validation
  const passwordError = document.getElementById('passwordError');
  if (!password || password.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters long.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  if (isValid) {
    authenticateUser(email, password);
  }
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function authenticateUser(email, password) {
  const responseMessage = document.getElementById('responseMessage');
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: email,
      password: password
    })
  })
  .then(response => {
    if (response.ok) {
      responseMessage.textContent = "Login successful!";
      responseMessage.style.color = "green";
    } else {
      responseMessage.textContent = "Login failed!";
      responseMessage.style.color = "red";
    }
  })
  .catch(error => {
    responseMessage.textContent = "An error occurred. Please try again.";
    responseMessage.style.color = "red";
  });
}