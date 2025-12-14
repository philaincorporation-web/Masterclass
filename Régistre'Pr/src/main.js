import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Remplacez par votre URL SheetDB API
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/h2p4g7aw76i97'; // Remplacez YOUR_API_ID

document.querySelector('#app').innerHTML = `
  <div>
    <div class="container">
      <div class="left">
        <h1>Inscription</h1>
        <p>Créez votre compte en quelques instants</p>
      </div>
      <div class="right">
        <h2>Régistre de présence!</h2>
        <form id="signupForm">
          <div class="field">
            <input type="text" id="nom" placeholder="Nom" required />
          </div>
          <div class="field">
            <input type="text" id="prenom" placeholder="Prénom" required />
          </div>
          <div class="field">
            <select id="statut" required>
              <option value="">Sélectionnez votre statut</option>
              <option value="Etudiante">Etudiante</option>
              <option value="Sans emplo">Sans emploi</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>
          <button type="submit" id="submitBtn">S'enregistrer</button>
        </form>
        <div id="message" class="message"></div>
        <div class="social">
          <span>f</span>
          <span>G</span>
          <span>t</span>
        </div>
      </div>
    </div>
  </div>
`

// Gestion du formulaire
const form = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  // Récupération des valeurs
  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const statut = document.getElementById('statut').value;
  
  // Validation
  if (!nom || !prenom || !statut) {
    showMessage('Veuillez remplir tous les champs.', 'error');
    return;
  }
  
  // Désactiver le bouton pendant l'envoi
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enregistrement...';
  
  try {
    // Préparation des données pour SheetDB
    const data = {
      Nom: nom,
      Prenom: prenom,
      Statut: statut
    };
    
    // Envoi à l'API SheetDB
    const response = await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      showMessage(`✅ Enregistrement réussi ! Bienvenue à la Masterclass ${prenom} ${nom}`, 'success');
      form.reset();
    } else {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
  } catch (error) {
    console.error('Erreur:', error);
    showMessage('❌ Erreur lors de l\'enregistrement. Veuillez réessayer.', 'error');
  } finally {
    // Réactiver le bouton
    submitBtn.disabled = false;
    submitBtn.textContent = "S'enregistrer";
  }
});

// Fonction pour afficher les messages
function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  
  // Auto-disparition après 5 secondes
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 5000);
}

setupCounter(document.querySelector('#counter'))
