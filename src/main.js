import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

// Remplacez par votre URL SheetDB API
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/h2p4g7aw76i97';

document.querySelector('#app').innerHTML = `
  <div>
    <div class="container">
      <div class="left">
        <h1>Inscription</h1>
        <p>Masterclass exclusives :</p>
        
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
              <option value="Sans emploi">Sans emploi</option>
              <option value="Entrepreneur">Entrepreneur</option>
            </select>
          </div>
          <div class="field">
            <label class="checkbox-label">Masterclass souhaitées <span style="color:#aaa;font-size:0.9em">(au moins 1)</span> :</label>
            <div class="checkbox-group">
              <label class="checkbox-item">
                <input type="checkbox" name="masterclass" value=" De la créativité au business digital">
                <span class="checkmark"></span> De la créativité au business digital
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="masterclass" value=" IA & Personal Branding">
                <span class="checkmark"></span> IA & Personal Branding
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="masterclass" value=" IA & Contrôle parental">
                <span class="checkmark"></span> IA & Contrôle parental
              </label>
              <label class="checkbox-item">
                <input type="checkbox" name="masterclass" value="Santé mentale">
                <span class="checkmark"></span> Santé mentale
              </label>
            </div>
          </div>
          <button type="submit" id="submitBtn">S'enregistrer</button>
        </form>
        <div id="message" class="message"></div>
        <div class="social">
          <a href="https://facebook.com/votre-page" target="_blank" rel="noopener noreferrer">
            <span>f</span>
          </a>
          <a href="https://www.digiewomenawards.com/" target="_blank" rel="noopener noreferrer">
            <span>x</span>
          </a>
          <a href="https://www.linkedin.com/showcase/digiewomen-awards/" target="_blank" rel="noopener noreferrer">
            <span>in</span>
          </a>
          <a href="https://whatsapp.com/channel/0029Vb6foT6EQIaoB06z8m1F" target="_blank" rel="noopener noreferrer">
            <span>w</span>
          </a>
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
  
  // Récupération PRÉCISE des masterclass cochées AVEC EMOJIS
  const masterclassCheckboxes = document.querySelectorAll('input[name="masterclass"]:checked');
  const masterclassArray = Array.from(masterclassCheckboxes).map(cb => cb.value);
  const masterclassSelection = masterclassArray.join(' | '); // Séparateur clair
  
  console.log('Masterclass sélectionnées:', masterclassArray); // Debug
  
  // Validation
  if (!nom || !prenom || !statut) {
    showMessage('❌ Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }
  
  if (masterclassCheckboxes.length === 0) {
    showMessage('❌ Sélectionnez au moins une masterclass.', 'error');
    return;
  }
  
  // Désactiver le bouton
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enregistrement...';
  
  try {
    // DONNÉES ENVOYÉES À SHEETDB
    const data = {
      Nom: nom,
      Prenom: prenom,
      Statut: statut,
      Masterclass: masterclassSelection,  // ✅ ARRIVE COMME ÇA DANS VOTRE SHEET
      Date: new Date().toLocaleString('fr-FR')  // Bonus: date d'inscription
    };
    
    console.log('Données envoyées:', data); // Debug
    
    // Envoi à SheetDB
    const response = await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (response.ok) {
      showMessage(`✅ Enregistrement ! ${prenom} ${nom}\nMasterclass: ${masterclassSelection}`, 'success');
      form.reset();
    } else {
      throw new Error(`Erreur ${response.status}`);
    }
    
  } catch (error) {
    console.error('Erreur:', error);
    showMessage('❌ Erreur enregistrement. Réessayez.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "S'enregistrer";
  }
});

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  setTimeout(() => {
    messageDiv.textContent = '';
    messageDiv.className = 'message';
  }, 7000);
}

setupCounter(document.querySelector('#counter'))
