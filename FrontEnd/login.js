/* ------ LOGIN ------ */

document.getElementById("button").addEventListener("click", function() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var data = {
    email: email,
    password: password
  };

  var xhr = new XMLHttpRequest();

  xhr.open("POST", "http://localhost:5678/api/users/login");
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.token) {
        localStorage.setItem("token", response.token);
        console.log("Token enregistré :", response.token);
        window.location.href = "index.html";
      }
    } else {
      var errorResponse = JSON.parse(xhr.responseText);
      console.error("Erreur :", errorResponse.message);
      alert("Utilisateur non reconnu !");
    }
  };

  // Envoyer la requête avec les données d'identification de l'utilisateur
  xhr.send(JSON.stringify(data));
});