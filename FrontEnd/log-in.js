addListenerConnection();

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
    const token = result.token;
    localStorage.setItem('token', token);
    window.location.href="index.html";
  } else {
    alert("Combinaison identifiant/mot de passe erronée");
  }
  const token = localStorage.getItem('token');
}

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







