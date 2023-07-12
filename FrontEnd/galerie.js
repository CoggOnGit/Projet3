/* ------ INDEX ------ */

/* FILTRER LES PROJETS PAR CATEGORIE */
function filtrerProjets(categorieId) {
  const galerieDiv = document.getElementById("galerie");
  const articles = galerieDiv.getElementsByClassName("galerie-item");

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];
    const categorieArticle = parseInt(article.getAttribute("data-categorieId"));

    if (categorieId === 0 || categorieId === categorieArticle) {
      article.style.display = "block";
    } else {
      article.style.display = "none";
    }
  }
}




/* REQUETE POUR RECUPERER LES PROJETS SUR L'API */

function allWorks() {
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      const galerieDiv = document.getElementById("galerie");

      data.forEach(article => {
        const galerieItem = document.createElement("div");
        galerieItem.classList.add("galerie-item");
        galerieItem.setAttribute("data-categorieId", article.categoryId);

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;

        const titleElement = document.createElement("h3");
        titleElement.textContent = article.title;

        galerieItem.appendChild(imageElement);
        galerieItem.appendChild(titleElement);
        galerieDiv.appendChild(galerieItem);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

allWorks();




/* ------ INDEX ADMIN------ */

/*  SI TOKEN AFFICHAGE MODAL ET LOGOUT */
document.addEventListener("DOMContentLoaded", function() {
  var token = localStorage.getItem("token");
  var loginLogoutLink = document.getElementById("loginLogout").firstElementChild;

  if (token) {
    var modal = document.getElementById("modal");
    modal.style.display = "block";
    loginLogoutLink.textContent = "logout";
  }

  /* OUVERTURE FERMETURE OVERLAY */
  var editButton = document.getElementById("editButton");
  if (editButton) {
    editButton.addEventListener("click", function() {
      var overlay = document.getElementById("overlay");
      overlay.style.display = "block";
    });
  }

  var closeButton = document.getElementById("closeButton");
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      var overlay = document.getElementById("overlay");
      overlay.style.display = "none";
    });
  }

  document.addEventListener("click", function(event) {
    var overlay = document.getElementById("overlay");
    var overlayContent = document.getElementById("overlay-content");
    // Ferme l'overlay lors du clic en dehors de son contenu
    if (
      (event.target === overlay || event.target === overlayContent) &&
      !overlayContent.contains(event.target)
    ) {
      overlay.style.display = "none";
    }
  });

  /* LOGOUT */
  loginLogoutLink.addEventListener("click", function(event) {
    event.preventDefault();

    if (token) {
      // Déconnexion : Supprime le jeton et redirige vers la page d'accueil
      localStorage.removeItem("token");
      window.location.href = "index.html";
    } else {
      // Redirection vers la page de connexion
      window.location.href = "login.html";
    }
  });
});





/* AFFICHER LA GALERIE DE L'OVERLAY + BOUTONS */
/* AJOUT D'ÉVÉNEMENTS SUR BTN SUPPRESSIONS */

function generateEditGalerie() {
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      const editGalerieDiv = document.getElementById("edit-galerie");
  
      data.forEach(image => {
        const editGalerieItem = document.createElement("div");
        editGalerieItem.className = "edit-galerie-item";
        editGalerieItem.id = "edit-galerie-item";
        editGalerieItem.setAttribute("data-id", image.id);
  
        const editGalerieCard = document.createElement("div");
        editGalerieCard.className = "edit-galerie-card";
        editGalerieCard.id = "edit-galerie-card";
  
        const moveButton = document.createElement("button");
        moveButton.className = "moveButton";
        moveButton.id = "moveButton";
        moveButton.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.2364 5.81583L9.97332 4.55272C9.82886 4.40818 9.61143 4.36503 9.42271 4.44318C9.23391 4.52139 9.1108 4.7056 9.1108 4.90996V5.66783H6.33199V2.88898H7.08986C7.29421 2.88898 7.47843 2.76587 7.55664 2.57707C7.63482 2.38828 7.5916 2.17096 7.4471 2.02646L6.18399 0.763343C5.98671 0.566028 5.66679 0.566028 5.46947 0.763343L4.20636 2.02646C4.06186 2.17096 4.01865 2.38828 4.09683 2.57707C4.17504 2.76587 4.35928 2.88898 4.5636 2.88898H5.3215V5.66783H2.54266V4.90996C2.54266 4.7056 2.41955 4.52136 2.23076 4.44318C2.04193 4.365 1.82461 4.40822 1.68014 4.55272L0.417029 5.81583C0.219714 6.01314 0.219714 6.33303 0.417029 6.53035L1.68014 7.79346C1.77681 7.89013 1.90598 7.94146 2.03752 7.94146C2.10259 7.94146 2.16824 7.92887 2.23076 7.903C2.41955 7.82479 2.54266 7.64054 2.54266 7.43622V6.67832H5.3215V9.45716H4.56364C4.35928 9.45716 4.17504 9.58028 4.09686 9.76907C4.01868 9.95786 4.0619 10.1752 4.2064 10.3197L5.46951 11.5828C5.56813 11.6815 5.69744 11.7308 5.82675 11.7308C5.95606 11.7308 6.08537 11.6815 6.18399 11.5828L7.4471 10.3197C7.5916 10.1752 7.63482 9.95783 7.55664 9.76904C7.47843 9.58024 7.29421 9.45713 7.08986 9.45713H6.33199V6.67832H9.11084V7.43618C9.11084 7.64054 9.23391 7.82479 9.42274 7.90296C9.48522 7.92887 9.55091 7.94143 9.61598 7.94143C9.74745 7.94143 9.87669 7.8901 9.97332 7.79343L11.2364 6.53031C11.4338 6.33303 11.4338 6.01314 11.2364 5.81583Z" fill="white"/>
      </svg>
    `;
  
        const deleteSelfButton = document.createElement("button");
        deleteSelfButton.className = "deleteSelfButton";
        deleteSelfButton.id = "deleteSelfButton";
        deleteSelfButton.innerHTML = `
        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.6 1.8V0.9C6.6 0.402944 6.19704 0 5.7 0H3.3C2.80294 0 2.4 0.402944 2.4 0.9V1.8H0V2.4H0.6V8.1C0.6 8.59704 1.00294 9 1.5 9H7.5C7.99704 9 8.4 8.59704 8.4 8.1V2.4H9V1.8H6.6ZM3 0.9C3 0.734316 3.13432 0.6 3.3 0.6H5.7C5.86568 0.6 6 0.734316 6 0.9V1.8H3V0.9ZM4.2 4.2V7.2H4.8V4.2H4.2ZM2.4 7.2V5.4H3V7.2H2.4ZM6 5.4V7.2H6.6V5.4H6Z" fill="white"/>
      </svg>
    `;

    deleteSelfButton.addEventListener("click", async (event) => {
      event.preventDefault();
  
      const photo = event.target.closest(".edit-galerie-item");
      if (photo) {
        const photoId = photo.getAttribute("data-id");
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5678/api/works/${photoId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          photo.remove();
          fetchAllWorks();
          fetchEditGalleryWorks();
  
        } else {
          console.error("Erreur lors de la suppression");
        }
      }
    })
  
        const editSelfButton = document.createElement("button");
        editSelfButton.textContent = "éditer";
  
        editGalerieCard.style.backgroundImage = `url(${image.imageUrl})`;
  
        editGalerieCard.appendChild(moveButton);
        editGalerieCard.appendChild(deleteSelfButton);
  
        editGalerieItem.appendChild(editGalerieCard);
        editGalerieItem.appendChild(editSelfButton);
  
        editGalerieDiv.appendChild(editGalerieItem);
      });
    })
    .catch(error => {
      console.error(error);
    });
}

generateEditGalerie(); 




/* PASSER SUR L'OVERLAY AJOUT PHOTO */
var publishButton = document.getElementById("publishButton");
if (publishButton) {
  publishButton.addEventListener("click", function() {
    var overlay = document.getElementById("overlay-content");
    overlay.style.display = "none";
    var addOverlay = document.getElementById("overlay-add");
    addOverlay.style.display = "block";
  });
}


/* FERMER OVERLAY AJOUT PHOTO */
var closeButtonAdd = document.getElementById("closeButtonAdd");
if (closeButtonAdd) {
  closeButtonAdd.addEventListener("click", function() {
    var overlay = document.getElementById("overlay");
    overlay.style.display = "none";
  });
}


/* PRECEDENT */
var backButton = document.getElementById("backButton");
if (backButton) {
  backButton.addEventListener("click", function() {
    var addOverlay = document.getElementById("overlay-add");
    addOverlay.style.display = "none";
    var overlay = document.getElementById("overlay-content");
    overlay.style.display = "block";
  });
}



/* DECLENCHER PHOTO INPUT GRACE A BOUTON */
document.getElementById('addPhotoButton').addEventListener('click', function() {
  document.getElementById('photoInput').click();
});
  
document.getElementById('photoInput').addEventListener('change', function() {
  var file = this.files[0];
});




/* AJOUTER DES IMAGES */

var form = document.getElementById("uploadForm");
var fileInput = document.getElementById("photoInput");
var btnConfirm = document.getElementById("submitButton");
var title = document.getElementById("uploadTitre");
var category = document.getElementById("uploadCategorie");

fileInput.addEventListener("change", function (event) {
  var file = event.target.files[0];
  var fileSizeLimit = 4 * 1024 * 1024;

  if (file.size > fileSizeLimit) {
    alert("Erreur : La taille du fichier dépasse 4 Mo");
    fileInput.value = "";
    return;
  }

  var allowedFormats = ["image/jpeg", "image/png"];

  if (!allowedFormats.includes(file.type)) {
    alert("Erreur ! Formats autorisés : JPG, PNG");
    fileInput.value = "";
    return;
  }

  var reader = new FileReader();

  reader.onload = function (e) {
    var previewFile = document.createElement("img");
    previewFile.src = e.target.result;

    var photoInputDiv = document.querySelector('.photoInputDiv');
    photoInputDiv.appendChild(previewFile);

    var photoInputMain = document.querySelector(".photoInputMain");
    photoInputMain.style.display = "none";
  };

  reader.readAsDataURL(file);
  checkForm();
});

function checkForm() {
  btnConfirm.style.backgroundColor = (title.value && category.value && fileInput.files[0]) ? "#1d6154" : "#A7A7A7";
}

title.addEventListener("input", checkForm);
category.addEventListener("input", checkForm);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!title.value || !category.value || !fileInput.files[0]) {
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  var formData = new FormData();

  formData.append("image", fileInput.files[0]);
  formData.append("title", title.value);
  formData.append("category", category.value);

  var token = localStorage.getItem("token");
  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        alert("Formulaire correctement envoyé !");
        return response.json();
      } else {
        throw new Error("Erreur");
      }
    })
    .then(() => {
      document.getElementById("overlay").style.display = "none";
      fetchAllWorks();
      fetchEditGalleryWorks();
    })
    .catch(function (error) {
      console.error(error);
    });
});




function fetchEditGalleryWorks() {
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(() => {
      const galerieDiv = document.getElementById("edit-galerie");
      galerieDiv.innerHTML = ""; 
      generateEditGalerie();
    })
    .catch(error => {
      console.error(error);
    });
}



/* ------ SUPPRIMER LES TRAVAUX------ */

function fetchAllWorks() {
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
      const galerieDiv = document.getElementById("galerie");
      galerieDiv.innerHTML = ""; 
      
      data.forEach(article => {
        const galerieItem = document.createElement("div");
        galerieItem.classList.add("galerie-item");
        galerieItem.setAttribute("data-categorieId", article.categoryId);

        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.title;

        const titleElement = document.createElement("h3");
        titleElement.textContent = article.title;

        galerieItem.appendChild(imageElement);
        galerieItem.appendChild(titleElement);
        galerieDiv.appendChild(galerieItem);
      });
    })
    .catch(error => {
      console.error(error);
    });
}
