import './style.css'
import javascriptLogo from './javascript.svg'
import { setupCounter } from './counter.js'

// URL SheetDB
const SHEETDB_API_URL = 'https://sheetdb.io/api/v1/h2p4g7aw76i97';

document.querySelector('#app').innerHTML = `
  <div>
    <div class="container">
      <div class="left">
        <h1>Bienvenue à notre Masterclass</h1>
     
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
  <label class="checkbox-label">
    Masterclass souhaitées 
    <span class="required-note">(Choix multiple)</span> :
  </label>

  <div class="masterclass-table">
    <div class="table-header">
      <div class="col-selector"></div>
      <div class="col-title">Masterclass</div>
    </div>
    
    <label class="table-row checkbox-item">
      <input type="checkbox" name="masterclass" value="De la créativité au business digital">
      <span class="checkmark"></span>
      <span class="row-title">De la créativité au business digital / IA & Personal Branding</span>
    </label>

    <label class="table-row checkbox-item">
      <input type="checkbox" name="masterclass" value="IA & Contrôle parental">
      <span class="checkmark"></span>
      <span class="row-title">IA & Contrôle parental</span>
    </label>

    <label class="table-row checkbox-item">
      <input type="checkbox" name="masterclass" value="Santé mentale">
      <span class="checkmark"></span>
      <span class="row-title">Santé mentale</span>
    </label>
  </div>
</div>


          <button type="submit" id="submitBtn">S'enregistrer</button>
        </form>

        <div id="message" class="message"></div>

        <!-- 🔗 RÉSEAUX SOCIAUX -->
        <div class="social">

          <a href="https://www.facebook.com/femmedigitaleafrique" target="_blue">
            <span class="social-icon facebook">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle> <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse"> <stop stop-color="#18ACFE"></stop> <stop offset="1" stop-color="#0163E0"></stop> </linearGradient> </defs> </g></svg>
            </span>
          </a>

          <a href="https://www.digiewomenawards.com/" target="_white">
            <span class="social-icon website">
              <svg fill="#ffffff" viewBox="0 0 512 512" id="_x30_1" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M418.275,146h-46.667 c-5.365-22.513-12.324-43.213-20.587-61.514c15.786,8.776,30.449,19.797,43.572,32.921C403.463,126.277,411.367,135.854,418.275,146 z M452,256c0,17.108-2.191,33.877-6.414,50h-64.034c1.601-16.172,2.448-32.887,2.448-50s-0.847-33.828-2.448-50h64.034 C449.809,222.123,452,238.892,452,256z M256,452c-5.2,0-21.048-10.221-36.844-41.813c-6.543-13.087-12.158-27.994-16.752-44.187 h107.191c-4.594,16.192-10.208,31.1-16.752,44.187C277.048,441.779,261.2,452,256,452z M190.813,306 c-1.847-16.247-2.813-33.029-2.813-50s0.966-33.753,2.813-50h130.374c1.847,16.247,2.813,33.029,2.813,50s-0.966,33.753-2.813,50 H190.813z M60,256c0-17.108,2.191-33.877,6.414-50h64.034c-1.601,16.172-2.448,32.887-2.448,50s0.847,33.828,2.448,50H66.414 C62.191,289.877,60,273.108,60,256z M256,60c5.2,0,21.048,10.221,36.844,41.813c6.543,13.087,12.158,27.994,16.752,44.187H202.404 c4.594-16.192,10.208-31.1,16.752-44.187C234.952,70.221,250.8,60,256,60z M160.979,84.486c-8.264,18.301-15.222,39-20.587,61.514 H93.725c6.909-10.146,14.812-19.723,23.682-28.593C130.531,104.283,145.193,93.262,160.979,84.486z M93.725,366h46.667 c5.365,22.513,12.324,43.213,20.587,61.514c-15.786-8.776-30.449-19.797-43.572-32.921C108.537,385.723,100.633,376.146,93.725,366z M351.021,427.514c8.264-18.301,15.222-39,20.587-61.514h46.667c-6.909,10.146-14.812,19.723-23.682,28.593 C381.469,407.717,366.807,418.738,351.021,427.514z"></path></g></svg>
            </span>
          </a>

          <a href="https://www.linkedin.com/showcase/digiewomen-awards/" target="_blue">
            <span class="social-icon linkedin">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="24" cy="24" r="20" fill="#0077B5"></circle> <path fill-rule="evenodd" clip-rule="evenodd" d="M18.7747 14.2839C18.7747 15.529 17.8267 16.5366 16.3442 16.5366C14.9194 16.5366 13.9713 15.529 14.0007 14.2839C13.9713 12.9783 14.9193 12 16.3726 12C17.8267 12 18.7463 12.9783 18.7747 14.2839ZM14.1199 32.8191V18.3162H18.6271V32.8181H14.1199V32.8191Z" fill="white"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M22.2393 22.9446C22.2393 21.1357 22.1797 19.5935 22.1201 18.3182H26.0351L26.2432 20.305H26.3322C26.9254 19.3854 28.4079 17.9927 30.8101 17.9927C33.7752 17.9927 35.9995 19.9502 35.9995 24.219V32.821H31.4922V24.7838C31.4922 22.9144 30.8404 21.6399 29.2093 21.6399C27.9633 21.6399 27.2224 22.4999 26.9263 23.3297C26.8071 23.6268 26.7484 24.0412 26.7484 24.4574V32.821H22.2411V22.9446H22.2393Z" fill="white"></path> </g></svg>
            </span>
          </a>

          <a href="https://whatsapp.com/channel/0029Vb6foT6EQIaoB06z8m1F" target="_green">
            <span>
       <svg width="191px" height="191px" viewBox="-102.4 -102.4 1228.80 1228.80" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#ffffff" stroke="#ffffff" stroke-width="0.01024" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0" transform="translate(179.2,179.2), scale(0.65)"><rect x="-102.4" y="-102.4" width="1228.80" height="1228.80" rx="614.4" fill="#7ed0ec" strokewidth="0"></rect></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#CCCCCC" stroke-width="2.048"></g><g id="SVGRepo_iconCarrier"> <defs> <path id="a" d="M1023.941 765.153c0 5.606-.171 17.766-.508 27.159-.824 22.982-2.646 52.639-5.401 66.151-4.141 20.306-10.392 39.472-18.542 55.425-9.643 18.871-21.943 35.775-36.559 50.364-14.584 14.56-31.472 26.812-50.315 36.416-16.036 8.172-35.322 14.426-55.744 18.549-13.378 2.701-42.812 4.488-65.648 5.3-9.402.336-21.564.505-27.15.505l-504.226-.081c-5.607 0-17.765-.172-27.158-.509-22.983-.824-52.639-2.646-66.152-5.4-20.306-4.142-39.473-10.392-55.425-18.542-18.872-9.644-35.775-21.944-50.364-36.56-14.56-14.584-26.812-31.471-36.415-50.314-8.174-16.037-14.428-35.323-18.551-55.744-2.7-13.378-4.487-42.812-5.3-65.649-.334-9.401-.503-21.563-.503-27.148l.08-504.228c0-5.607.171-17.766.508-27.159.825-22.983 2.646-52.639 5.401-66.151 4.141-20.306 10.391-39.473 18.542-55.426C34.154 93.24 46.455 76.336 61.07 61.747c14.584-14.559 31.472-26.812 50.315-36.416 16.037-8.172 35.324-14.426 55.745-18.549 13.377-2.701 42.812-4.488 65.648-5.3 9.402-.335 21.565-.504 27.149-.504l504.227.081c5.608 0 17.766.171 27.159.508 22.983.825 52.638 2.646 66.152 5.401 20.305 4.141 39.472 10.391 55.425 18.542 18.871 9.643 35.774 21.944 50.363 36.559 14.559 14.584 26.812 31.471 36.415 50.315 8.174 16.037 14.428 35.323 18.551 55.744 2.7 13.378 4.486 42.812 5.3 65.649.335 9.402.504 21.564.504 27.15l-.082 504.226z"></path> </defs> <linearGradient id="b" gradientUnits="userSpaceOnUse" x1="512.001" y1=".978" x2="512.001" y2="1025.023"> <stop offset="0" stop-color="#61fd7d"></stop> <stop offset="1" stop-color="#2bb826"></stop> </linearGradient> <use xlink:href="#a" overflow="visible" fill="url(#b)"></use> <g> <path fill="#FFF" d="M783.302 243.246c-69.329-69.387-161.529-107.619-259.763-107.658-202.402 0-367.133 164.668-367.214 367.072-.026 64.699 16.883 127.854 49.017 183.522l-52.096 190.229 194.665-51.047c53.636 29.244 114.022 44.656 175.482 44.682h.151c202.382 0 367.128-164.688 367.21-367.094.039-98.087-38.121-190.319-107.452-259.706zM523.544 808.047h-.125c-54.767-.021-108.483-14.729-155.344-42.529l-11.146-6.612-115.517 30.293 30.834-112.592-7.259-11.544c-30.552-48.579-46.688-104.729-46.664-162.379.066-168.229 136.985-305.096 305.339-305.096 81.521.031 158.154 31.811 215.779 89.482s89.342 134.332 89.312 215.859c-.066 168.243-136.984 305.118-305.209 305.118zm167.415-228.515c-9.177-4.591-54.286-26.782-62.697-29.843-8.41-3.062-14.526-4.592-20.645 4.592-6.115 9.182-23.699 29.843-29.053 35.964-5.352 6.122-10.704 6.888-19.879 2.296-9.176-4.591-38.74-14.277-73.786-45.526-27.275-24.319-45.691-54.359-51.043-63.543-5.352-9.183-.569-14.146 4.024-18.72 4.127-4.109 9.175-10.713 13.763-16.069 4.587-5.355 6.117-9.183 9.175-15.304 3.059-6.122 1.529-11.479-.765-16.07-2.293-4.591-20.644-49.739-28.29-68.104-7.447-17.886-15.013-15.466-20.645-15.747-5.346-.266-11.469-.322-17.585-.322s-16.057 2.295-24.467 11.478-32.113 31.374-32.113 76.521c0 45.147 32.877 88.764 37.465 94.885 4.588 6.122 64.699 98.771 156.741 138.502 21.892 9.45 38.982 15.094 52.308 19.322 21.98 6.979 41.982 5.995 57.793 3.634 17.628-2.633 54.284-22.189 61.932-43.615 7.646-21.427 7.646-39.791 5.352-43.617-2.294-3.826-8.41-6.122-17.585-10.714z"></path> </g> </g></svg>
            </span>
          </a>

        </div>
      </div>
    </div>
  </div>
`;

/* ===== FONCTION ANTI-DOUBLON ===== */
async function isAlreadyRegistered(nom, prenom) {
  const url = `${SHEETDB_API_URL}/search?Nom=${encodeURIComponent(nom)}&Prenom=${encodeURIComponent(prenom)}`;
  const response = await fetch(url);
  const result = await response.json();
  return result.length > 0;
}

/* ===== FORMULAIRE ===== */
const form = document.getElementById('signupForm');
const messageDiv = document.getElementById('message');
const submitBtn = document.getElementById('submitBtn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nom = document.getElementById('nom').value.trim();
  const prenom = document.getElementById('prenom').value.trim();
  const statut = document.getElementById('statut').value;

  const masterclassCheckboxes = document.querySelectorAll('input[name="masterclass"]:checked');
  const masterclassSelection = [...masterclassCheckboxes].map(cb => cb.value).join(' | ');

  if (!nom || !prenom || !statut || masterclassCheckboxes.length === 0) {
    showMessage('❌ Veuillez remplir tous les champs.', 'error');
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Enregistrement...';

  try {
    if (await isAlreadyRegistered(nom, prenom)) {
      showMessage(`⚠️ ${prenom} ${nom}, vous êtes déjà enregistré(e).`, 'error');
      return;
    }

    await fetch(SHEETDB_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Nom: nom,
        Prenom: prenom,
        Statut: statut,
        Masterclass: masterclassSelection,
        Date: new Date().toLocaleString('fr-FR')
      })
    });

    showMessage(`✅ Enregistrement. réussie ${prenom} ${nom}`, 'success');
    form.reset();

  } catch {
    showMessage('❌ Erreur lors de l’enregistrement.', 'error');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "S'enregistrer";
  }
});

function showMessage(text, type) {
  messageDiv.textContent = text;
  messageDiv.className = `message ${type}`;
  setTimeout(() => messageDiv.textContent = '', 7000);
}

setupCounter(document.querySelector('#counter'));
