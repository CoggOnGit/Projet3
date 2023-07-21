/* ------ LOGIN ------ */

document.getElementById("button").addEventListener("click", function() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var data = {
    email: email,
    password: password
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Erreur : " + response.status);
      }
    })
    .then(response => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("Token enregistré :", response.token);
        window.location.href = "index.html";
      }
    })
    .catch(error => {
      console.error("Erreur :", error);
      alert("Utilisateur non reconnu !");
    });
});