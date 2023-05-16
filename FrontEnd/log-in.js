addListenerConnection();

/**
 * Performs user login by sending a POST request to the login API endpoint.
 * @param {Object} user - The user object containing login credentials.
 * @returns {Promise} A promise that resolves to the login result.
 */
async function login(user) {
  const response = await fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token'),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });

  const result = await response.json();

  if (response.ok) {
    // If the login is successful
    // Get the authentication token from the result
    const token = result.token;
    // Store the token in local storage
    localStorage.setItem('token', token);
    // Redirect the user to the index.html page
    window.location.href = "index.html";
  } else {
    // If there is an error in the login credentials
    // Display an error message to the user
    alert("Erreur dans l’identifiant ou le mot de passe");
  }
  // Get the authentication token from local storage
  const token = localStorage.getItem('token');
}

/**
 * Adds a submit event listener to the login form for user authentication.
 * @returns {void}
 */
function addListenerConnection() {
  const pageConnection = document.querySelector("#login");
  pageConnection.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const user = {
      email: email,
      password: password
    };

    await login(user);
  });
}