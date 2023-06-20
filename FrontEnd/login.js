/* ------ LOGIN ------ */

// Attacher un écouteur d'événements au bouton de connexion
document.getElementById("button").addEventListener("click", function() {
  // Récupérer les valeurs de l'e-mail et du mot de passe saisis par l'utilisateur
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  
  // Créer un objet contenant les données d'identification de l'utilisateur
  var data = {
    email: email,
    password: password
  };

  // Créer une instance de l'objet XMLHttpRequest
  var xhr = new XMLHttpRequest();

  // Configurer la requête POST vers l'URL de l'API de connexion
  xhr.open("POST", "http://localhost:5678/api/users/login");

  // Définir le type de contenu de la requête comme étant JSON
  xhr.setRequestHeader("Content-Type", "application/json");

  // Gérer la réponse de la requête
  xhr.onload = function() {
    // Vérifier si le code de statut de la réponse est 200 (OK)
    if (xhr.status === 200) {
      // Analyser la réponse JSON renvoyée par l'API
      var response = JSON.parse(xhr.responseText);
      // Vérifier si la réponse contient un token
      if (response.token) {
        localStorage.setItem("token", response.token); // Enregistrement du token dans le stockage local
        console.log("Token enregistré :", response.token);
        // Rediriger l'utilisateur vers la page index.html
        window.location.href = "index.html";
      }
    } else {
      // La requête a renvoyé un code de statut autre que 200
      // Analyser la réponse JSON pour obtenir le message d'erreur
      var errorResponse = JSON.parse(xhr.responseText);
      console.error("Erreur :", errorResponse.message);
      console.log("Utilisateur non reconnu !");
    }
  };

  // Envoyer la requête avec les données d'identification de l'utilisateur
  xhr.send(JSON.stringify(data));
});