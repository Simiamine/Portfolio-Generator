/**
 * PORTFOLIO GENERATOR - MAIN LOGIC
 * Gestion de l'interface et génération du portfolio
 */

// État global de l'application
let portfolioConfig = {
    theme: {
        primaryColor: '#5e2933',
        secondaryColor: '#815443'
    },
    profile: {},
    about: {
        highlights: [],
        floatingCards: [],
        paragraphs: []
    },
    experiences: [],
    education: [],
    projects: [],
    skills: {
        technologies: [],
        languages: [],
        certifications: []
    },
    footer: {
        copyright: '© 2025. Tous droits réservés.',
        message: 'Conçu avec ❤️ et ☕'
    },
    metadata: {}
};

// Compteurs pour les IDs uniques
let counters = {
    highlight: 0,
    experience: 0,
    education: 0,
    project: 0,
    technology: 0,
    language: 0,
    certification: 0
};

// ===== GESTION DES ONGLETS =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les événements des onglets
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchTab(tabName);
        });
    });

    // Initialiser les color pickers
    initColorPickers();

    // Charger un exemple si disponible
    loadExampleConfig();
});

function switchTab(tabName) {
    // Désactiver tous les onglets
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    // Activer l'onglet sélectionné
    document.querySelector(`.tab[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(tabName).classList.add('active');
}

// ===== GESTION DES COULEURS =====
function initColorPickers() {
    const primaryInput = document.getElementById('primaryColor');
    const secondaryInput = document.getElementById('secondaryColor');
    const primaryPreview = document.getElementById('primaryColorPreview');
    const secondaryPreview = document.getElementById('secondaryColorPreview');

    primaryInput.addEventListener('input', (e) => {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            primaryPreview.style.background = color;
            portfolioConfig.theme.primaryColor = color;
        }
    });

    primaryPreview.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'color';
        input.value = primaryInput.value;
        input.addEventListener('change', (e) => {
            primaryInput.value = e.target.value;
            primaryPreview.style.background = e.target.value;
            portfolioConfig.theme.primaryColor = e.target.value;
        });
        input.click();
    });

    secondaryInput.addEventListener('input', (e) => {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            secondaryPreview.style.background = color;
            portfolioConfig.theme.secondaryColor = color;
        }
    });

    secondaryPreview.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'color';
        input.value = secondaryInput.value;
        input.addEventListener('change', (e) => {
            secondaryInput.value = e.target.value;
            secondaryPreview.style.background = e.target.value;
            portfolioConfig.theme.secondaryColor = e.target.value;
        });
        input.click();
    });
}

function generatePalettePreview() {
    const engine = new ThemeEngine(
        portfolioConfig.theme.primaryColor,
        portfolioConfig.theme.secondaryColor
    );
    
    const theme = engine.generateTheme();
    const palette = engine.generatePalette();
    
    const preview = document.getElementById('palettePreview');
    preview.style.display = 'grid';
    
    preview.innerHTML = `
        <div class="palette-color">
            <div class="palette-color-box" style="background: ${palette.primary.dark}"></div>
            <div class="palette-color-name">Primary Dark</div>
            <div class="palette-color-value">${palette.primary.dark}</div>
        </div>
        <div class="palette-color">
            <div class="palette-color-box" style="background: ${palette.primary.light}"></div>
            <div class="palette-color-name">Primary Light</div>
            <div class="palette-color-value">${palette.primary.light}</div>
        </div>
        <div class="palette-color">
            <div class="palette-color-box" style="background: ${theme.accentBrown}"></div>
            <div class="palette-color-name">Accent</div>
            <div class="palette-color-value">${theme.accentBrown}</div>
        </div>
        <div class="palette-color">
            <div class="palette-color-box" style="background: ${theme.secondaryBeige}"></div>
            <div class="palette-color-name">Secondary Beige</div>
            <div class="palette-color-value">${theme.secondaryBeige}</div>
        </div>
        <div class="palette-color">
            <div class="palette-color-box" style="background: ${theme.cream}"></div>
            <div class="palette-color-name">Cream</div>
            <div class="palette-color-value">${theme.cream}</div>
        </div>
    `;
}

// ===== GESTION DES HIGHLIGHTS =====
function addHighlight() {
    const id = counters.highlight++;
    const container = document.getElementById('highlightsList');
    
    const item = document.createElement('div');
    item.className = 'list-item';
    item.id = `highlight-${id}`;
    item.innerHTML = `
        <div class="list-item-header">
            <span class="list-item-title">Point Fort #${id + 1}</span>
            <button class="btn btn-danger btn-icon" onclick="removeHighlight(${id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-group">
            <label class="form-label">Icône FontAwesome</label>
            <input type="text" class="form-control" id="highlight-icon-${id}" placeholder="fas fa-rocket">
            <small style="color: #6c757d;">Exemple: fas fa-rocket, fas fa-chart-line</small>
        </div>
        <div class="form-group">
            <label class="form-label">Titre</label>
            <input type="text" class="form-control" id="highlight-title-${id}" placeholder="Innovant">
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" class="form-control" id="highlight-desc-${id}" placeholder="Toujours à la recherche de solutions créatives">
        </div>
    `;
    
    container.appendChild(item);
}

function removeHighlight(id) {
    document.getElementById(`highlight-${id}`).remove();
}

// ===== GESTION DES EXPÉRIENCES =====
function addExperience() {
    const id = counters.experience++;
    const container = document.getElementById('experiencesList');
    
    const item = document.createElement('div');
    item.className = 'list-item';
    item.id = `experience-${id}`;
    item.innerHTML = `
        <div class="list-item-header">
            <span class="list-item-title">Expérience #${id + 1}</span>
            <button class="btn btn-danger btn-icon" onclick="removeExperience(${id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Intitulé du poste</label>
                <input type="text" class="form-control" id="exp-title-${id}" placeholder="Data Analyst">
            </div>
            <div class="form-group">
                <label class="form-label">Entreprise</label>
                <input type="text" class="form-control" id="exp-company-${id}" placeholder="Google">
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Localisation</label>
                <input type="text" class="form-control" id="exp-location-${id}" placeholder="Paris, France">
            </div>
            <div class="form-group">
                <label class="form-label">Période</label>
                <input type="text" class="form-control" id="exp-period-${id}" placeholder="Janvier 2023 - Aujourd'hui">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Période courte (pour la timeline)</label>
            <input type="text" class="form-control" id="exp-period-short-${id}" placeholder="Jan 2023 - Aujourd'hui">
        </div>
        <div class="form-group">
            <label class="form-label">Description courte</label>
            <input type="text" class="form-control" id="exp-desc-${id}" placeholder="Description brève">
        </div>
        <div class="form-group">
            <label class="form-label">Logo (URL ou chemin)</label>
            <input type="text" class="form-control" id="exp-logo-${id}" placeholder="images/company.png">
        </div>
        <div class="form-group">
            <label class="form-label">Missions/Responsabilités (une par ligne)</label>
            <textarea class="form-control" id="exp-responsibilities-${id}" rows="4" placeholder="- Mission 1\n- Mission 2\n- Mission 3"></textarea>
        </div>
    `;
    
    container.appendChild(item);
}

function removeExperience(id) {
    document.getElementById(`experience-${id}`).remove();
}

// ===== GESTION DE LA FORMATION =====
function addEducation() {
    const id = counters.education++;
    const container = document.getElementById('educationList');
    
    const item = document.createElement('div');
    item.className = 'list-item';
    item.id = `education-${id}`;
    item.innerHTML = `
        <div class="list-item-header">
            <span class="list-item-title">Formation #${id + 1}</span>
            <button class="btn btn-danger btn-icon" onclick="removeEducation(${id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Établissement</label>
                <input type="text" class="form-control" id="edu-school-${id}" placeholder="Université Paris">
            </div>
            <div class="form-group">
                <label class="form-label">Diplôme</label>
                <input type="text" class="form-control" id="edu-degree-${id}" placeholder="Master en Informatique">
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Période</label>
                <input type="text" class="form-control" id="edu-period-${id}" placeholder="2020-2022">
            </div>
            <div class="form-group">
                <label class="form-label">Période courte (pour la timeline)</label>
                <input type="text" class="form-control" id="edu-period-short-${id}" placeholder="Sept 2020 - Juin 2022">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <input type="text" class="form-control" id="edu-desc-${id}" placeholder="Description">
        </div>
        <div class="form-group">
            <label class="form-label">Logo (URL ou chemin)</label>
            <input type="text" class="form-control" id="edu-logo-${id}" placeholder="images/school.png">
        </div>
        <div class="form-group">
            <label class="form-label">Cours/Matières (une par ligne)</label>
            <textarea class="form-control" id="edu-courses-${id}" rows="3" placeholder="- Cours 1\n- Cours 2"></textarea>
        </div>
    `;
    
    container.appendChild(item);
}

function removeEducation(id) {
    document.getElementById(`education-${id}`).remove();
}

// ===== GESTION DES PROJETS =====
function addProject() {
    const id = counters.project++;
    const container = document.getElementById('projectsList');
    
    const item = document.createElement('div');
    item.className = 'list-item';
    item.id = `project-${id}`;
    item.innerHTML = `
        <div class="list-item-header">
            <span class="list-item-title">Projet #${id + 1}</span>
            <button class="btn btn-danger btn-icon" onclick="removeProject(${id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="form-group">
            <label class="form-label">Nom du projet</label>
            <input type="text" class="form-control" id="proj-name-${id}" placeholder="Mon Super Projet">
        </div>
        <div class="form-group">
            <label class="form-label">Sous-titre</label>
            <input type="text" class="form-control" id="proj-subtitle-${id}" placeholder="Application web moderne">
        </div>
        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-control" id="proj-desc-${id}" rows="3" placeholder="Description détaillée du projet"></textarea>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Icône FontAwesome</label>
                <input type="text" class="form-control" id="proj-icon-${id}" placeholder="fas fa-rocket">
            </div>
            <div class="form-group">
                <label class="form-label">Image (URL ou chemin)</label>
                <input type="text" class="form-control" id="proj-image-${id}" placeholder="images/projet.png">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Fonctionnalités (une par ligne)</label>
            <textarea class="form-control" id="proj-features-${id}" rows="3" placeholder="- Fonctionnalité 1\n- Fonctionnalité 2"></textarea>
        </div>
        <div class="form-group">
            <label class="form-label">Lien GitHub/Démo</label>
            <input type="url" class="form-control" id="proj-link-${id}" placeholder="https://github.com/...">
        </div>
    `;
    
    container.appendChild(item);
}

function removeProject(id) {
    document.getElementById(`project-${id}`).remove();
}

// ===== GESTION DES TECHNOLOGIES =====
function addTechnology() {
    const id = counters.technology++;
    const container = document.getElementById('technologiesList');
    
    const item = document.createElement('div');
    item.className = 'tech-item';
    item.id = `tech-${id}`;
    item.innerHTML = `
        <button class="btn btn-danger btn-icon remove-tech" onclick="removeTechnology(${id})">
            <i class="fas fa-times"></i>
        </button>
        <div class="form-group">
            <label class="form-label">Nom</label>
            <input type="text" class="form-control" id="tech-name-${id}" placeholder="Python">
        </div>
        <div class="form-group">
            <label class="form-label">Logo (URL)</label>
            <input type="text" class="form-control" id="tech-logo-${id}" placeholder="https://...">
        </div>
    `;
    
    container.appendChild(item);
}

function removeTechnology(id) {
    document.getElementById(`tech-${id}`).remove();
}

// ===== GESTION DES LANGUES =====
function addLanguage() {
    const id = counters.language++;
    const container = document.getElementById('languagesList');
    
    const item = document.createElement('div');
    item.className = 'list-item';
    item.id = `language-${id}`;
    item.innerHTML = `
        <div class="list-item-header">
            <span class="list-item-title">Langue #${id + 1}</span>
            <button class="btn btn-danger btn-icon" onclick="removeLanguage(${id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Langue</label>
                <input type="text" class="form-control" id="lang-name-${id}" placeholder="Français">
            </div>
            <div class="form-group">
                <label class="form-label">Niveau</label>
                <input type="text" class="form-control" id="lang-level-${id}" placeholder="Maternelle">
            </div>
        </div>
        <div class="form-group">
            <label class="form-label">Drapeau (URL ou chemin)</label>
            <input type="text" class="form-control" id="lang-flag-${id}" placeholder="images/langues/france.png">
        </div>
    `;
    
    container.appendChild(item);
}

function removeLanguage(id) {
    document.getElementById(`language-${id}`).remove();
}

// ===== GESTION DES CERTIFICATIONS =====
function addCertification() {
    const id = counters.certification++;
    const container = document.getElementById('certificationsList');
    
    const item = document.createElement('div');
    item.className = 'list-item';
    item.id = `certification-${id}`;
    item.innerHTML = `
        <div class="list-item-header">
            <span class="list-item-title">Certification #${id + 1}</span>
            <button class="btn btn-danger btn-icon" onclick="removeCertification(${id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Nom</label>
                <input type="text" class="form-control" id="cert-name-${id}" placeholder="AWS Certified">
            </div>
            <div class="form-group">
                <label class="form-label">Émetteur</label>
                <input type="text" class="form-control" id="cert-issuer-${id}" placeholder="Amazon">
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label class="form-label">Date</label>
                <input type="text" class="form-control" id="cert-date-${id}" placeholder="2024">
            </div>
            <div class="form-group">
                <label class="form-label">Logo (URL)</label>
                <input type="text" class="form-control" id="cert-logo-${id}" placeholder="https://...">
            </div>
        </div>
    `;
    
    container.appendChild(item);
}

function removeCertification(id) {
    document.getElementById(`certification-${id}`).remove();
}

// ===== COLLECTE DES DONNÉES =====
function collectFormData() {
    const config = { ...portfolioConfig };
    
    // Profil
    config.profile = {
        name: document.getElementById('profileName')?.value || '',
        title: document.getElementById('profileTitle')?.value || '',
        tagline: document.getElementById('profileTagline')?.value || '',
        email: document.getElementById('profileEmail')?.value || '',
        phone: document.getElementById('profilePhone')?.value || '',
        location: document.getElementById('profileLocation')?.value || '',
        availability: document.getElementById('profileAvailability')?.value || '',
        photo: document.getElementById('profilePhoto')?.value || '',
        cv: document.getElementById('profileCV')?.value || '',
        socialLinks: {
            linkedin: document.getElementById('linkedinUrl')?.value || '',
            github: document.getElementById('githubUrl')?.value || ''
        }
    };
    
    // À propos
    config.about.sectionTag = document.getElementById('aboutTag')?.value || 'Qui suis-je ?';
    config.about.sectionTitle = document.getElementById('aboutTitle')?.value || 'À propos';
    config.about.image = document.getElementById('aboutImage')?.value || '';
    config.about.paragraphs = [
        document.getElementById('aboutParagraph1')?.value,
        document.getElementById('aboutParagraph2')?.value,
        document.getElementById('aboutParagraph3')?.value
    ].filter(p => p);
    
    // Highlights
    config.about.highlights = [];
    for (let i = 0; i < counters.highlight; i++) {
        const elem = document.getElementById(`highlight-${i}`);
        if (elem) {
            config.about.highlights.push({
                icon: document.getElementById(`highlight-icon-${i}`)?.value || '',
                title: document.getElementById(`highlight-title-${i}`)?.value || '',
                description: document.getElementById(`highlight-desc-${i}`)?.value || ''
            });
        }
    }
    
    // Expériences
    config.experiences = [];
    for (let i = 0; i < counters.experience; i++) {
        const elem = document.getElementById(`experience-${i}`);
        if (elem) {
            const responsibilities = document.getElementById(`exp-responsibilities-${i}`)?.value || '';
            config.experiences.push({
                title: document.getElementById(`exp-title-${i}`)?.value || '',
                company: document.getElementById(`exp-company-${i}`)?.value || '',
                location: document.getElementById(`exp-location-${i}`)?.value || '',
                period: document.getElementById(`exp-period-${i}`)?.value || '',
                periodShort: document.getElementById(`exp-period-short-${i}`)?.value || '',
                description: document.getElementById(`exp-desc-${i}`)?.value || '',
                logo: document.getElementById(`exp-logo-${i}`)?.value || '',
                icon: 'fas fa-briefcase',
                responsibilities: responsibilities.split('\n').filter(r => r.trim())
            });
        }
    }
    
    // Formation
    config.education = [];
    for (let i = 0; i < counters.education; i++) {
        const elem = document.getElementById(`education-${i}`);
        if (elem) {
            const courses = document.getElementById(`edu-courses-${i}`)?.value || '';
            config.education.push({
                school: document.getElementById(`edu-school-${i}`)?.value || '',
                degree: document.getElementById(`edu-degree-${i}`)?.value || '',
                period: document.getElementById(`edu-period-${i}`)?.value || '',
                periodShort: document.getElementById(`edu-period-short-${i}`)?.value || '',
                description: document.getElementById(`edu-desc-${i}`)?.value || '',
                logo: document.getElementById(`edu-logo-${i}`)?.value || '',
                icon: 'fas fa-graduation-cap',
                courses: courses.split('\n').filter(c => c.trim())
            });
        }
    }
    
    // Projets
    config.projects = [];
    for (let i = 0; i < counters.project; i++) {
        const elem = document.getElementById(`project-${i}`);
        if (elem) {
            const features = document.getElementById(`proj-features-${i}`)?.value || '';
            config.projects.push({
                name: document.getElementById(`proj-name-${i}`)?.value || '',
                subtitle: document.getElementById(`proj-subtitle-${i}`)?.value || '',
                description: document.getElementById(`proj-desc-${i}`)?.value || '',
                icon: document.getElementById(`proj-icon-${i}`)?.value || 'fas fa-folder',
                image: document.getElementById(`proj-image-${i}`)?.value || '',
                features: features.split('\n').filter(f => f.trim()),
                link: document.getElementById(`proj-link-${i}`)?.value || ''
            });
        }
    }
    
    // Technologies
    config.skills.technologies = [];
    for (let i = 0; i < counters.technology; i++) {
        const elem = document.getElementById(`tech-${i}`);
        if (elem) {
            config.skills.technologies.push({
                name: document.getElementById(`tech-name-${i}`)?.value || '',
                logo: document.getElementById(`tech-logo-${i}`)?.value || ''
            });
        }
    }
    
    // Langues
    config.skills.languages = [];
    for (let i = 0; i < counters.language; i++) {
        const elem = document.getElementById(`language-${i}`);
        if (elem) {
            config.skills.languages.push({
                name: document.getElementById(`lang-name-${i}`)?.value || '',
                level: document.getElementById(`lang-level-${i}`)?.value || '',
                flag: document.getElementById(`lang-flag-${i}`)?.value || ''
            });
        }
    }
    
    // Certifications
    config.skills.certifications = [];
    for (let i = 0; i < counters.certification; i++) {
        const elem = document.getElementById(`certification-${i}`);
        if (elem) {
            config.skills.certifications.push({
                name: document.getElementById(`cert-name-${i}`)?.value || '',
                issuer: document.getElementById(`cert-issuer-${i}`)?.value || '',
                date: document.getElementById(`cert-date-${i}`)?.value || '',
                logo: document.getElementById(`cert-logo-${i}`)?.value || ''
            });
        }
    }
    
    // Metadata
    config.metadata = {
        title: `${config.profile.name} - Portfolio`,
        description: `Portfolio de ${config.profile.name} - ${config.profile.title}`,
        author: config.profile.name,
        keywords: ['portfolio', 'développeur', 'web']
    };
    
    return config;
}

// ===== EXPORT JSON =====
function exportJSON() {
    const config = collectFormData();
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolio-config.json';
    a.click();
    URL.revokeObjectURL(url);
}

// ===== IMPORT JSON =====
function importJSON(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const config = JSON.parse(e.target.result);
            loadConfig(config);
            alert('Configuration importée avec succès !');
        } catch (error) {
            alert('Erreur lors de l\'import du fichier JSON.');
            console.error(error);
        }
    };
    reader.readAsText(file);
}

// ===== CHARGER UNE CONFIGURATION =====
function loadConfig(config) {
    portfolioConfig = config;
    
    // Charger le thème
    document.getElementById('primaryColor').value = config.theme.primaryColor;
    document.getElementById('secondaryColor').value = config.theme.secondaryColor;
    document.getElementById('primaryColorPreview').style.background = config.theme.primaryColor;
    document.getElementById('secondaryColorPreview').style.background = config.theme.secondaryColor;
    
    // Charger le profil
    if (config.profile) {
        document.getElementById('profileName').value = config.profile.name || '';
        document.getElementById('profileTitle').value = config.profile.title || '';
        document.getElementById('profileTagline').value = config.profile.tagline || '';
        document.getElementById('profileEmail').value = config.profile.email || '';
        document.getElementById('profilePhone').value = config.profile.phone || '';
        document.getElementById('profileLocation').value = config.profile.location || '';
        document.getElementById('profileAvailability').value = config.profile.availability || '';
        document.getElementById('profilePhoto').value = config.profile.photo || '';
        document.getElementById('profileCV').value = config.profile.cv || '';
        
        if (config.profile.socialLinks) {
            document.getElementById('linkedinUrl').value = config.profile.socialLinks.linkedin || '';
            document.getElementById('githubUrl').value = config.profile.socialLinks.github || '';
        }
    }
    
    // Charger About
    if (config.about) {
        document.getElementById('aboutTag').value = config.about.sectionTag || '';
        document.getElementById('aboutTitle').value = config.about.sectionTitle || '';
        document.getElementById('aboutImage').value = config.about.image || '';
        
        if (config.about.paragraphs) {
            document.getElementById('aboutParagraph1').value = config.about.paragraphs[0] || '';
            document.getElementById('aboutParagraph2').value = config.about.paragraphs[1] || '';
            document.getElementById('aboutParagraph3').value = config.about.paragraphs[2] || '';
        }
    }
    
    // Charger les highlights, expériences, etc.
    // (Code similaire pour les autres sections...)
}

// ===== CHARGER UN EXEMPLE =====
function loadExampleConfig() {
    // Charger l'exemple depuis example-config.json si disponible
    fetch('example-config.json')
        .then(response => response.json())
        .then(config => {
            loadConfig(config);
        })
        .catch(error => {
            console.log('Pas de configuration d\'exemple disponible');
        });
}

// ===== GÉNÉRATION DU PORTFOLIO =====
function generatePortfolio() {
    const config = collectFormData();
    
    // Afficher la progression
    document.getElementById('exportProgress').classList.remove('hidden');
    document.getElementById('exportSuccess').classList.add('hidden');
    
    // Simuler la progression (dans une vraie app, cela générerait les fichiers)
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        document.getElementById('progressFill').style.width = progress + '%';
        
        if (progress === 30) {
            document.getElementById('progressText').textContent = 'Génération du thème...';
        } else if (progress === 60) {
            document.getElementById('progressText').textContent = 'Génération du HTML...';
        } else if (progress === 90) {
            document.getElementById('progressText').textContent = 'Finalisation...';
        } else if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('exportProgress').classList.add('hidden');
            document.getElementById('exportSuccess').classList.remove('hidden');
            
            // Télécharger le JSON de configuration
            exportJSON();
            
            alert('Portfolio généré ! Les fichiers ont été téléchargés.\n\nNote: Cette version génère le JSON de configuration. Pour générer le portfolio complet HTML/CSS/JS, utilisez le script generator.html séparé.');
        }
    }, 200);
}

