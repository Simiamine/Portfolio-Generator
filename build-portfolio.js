#!/usr/bin/env node

/**
 * PORTFOLIO BUILDER
 * Génère un portfolio HTML complet à partir d'un fichier de configuration JSON
 * 
 * Usage: node build-portfolio.js config.json [output-dir]
 */

const fs = require('fs');
const path = require('path');

// Vérifier les arguments
const args = process.argv.slice(2);
if (args.length === 0) {
    console.error('❌ Erreur: Veuillez fournir un fichier de configuration JSON');
    console.log('Usage: node build-portfolio.js config.json [output-dir]');
    process.exit(1);
}

const configFile = args[0];
const outputDir = args[1] || 'output';

// Charger la configuration
let config;
try {
    const configData = fs.readFileSync(configFile, 'utf8');
    config = JSON.parse(configData);
    console.log('✅ Configuration chargée depuis', configFile);
} catch (error) {
    console.error('❌ Erreur lors de la lecture du fichier de configuration:', error.message);
    process.exit(1);
}

// Importer le moteur de thème
const ThemeEngine = require('./theme-engine.js');

// Créer le répertoire de sortie
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Créer les sous-répertoires
['css', 'js', 'res', 'images'].forEach(dir => {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
});

console.log('📁 Répertoire de sortie créé:', outputDir);

// ===== GÉNÉRATION DU CSS =====
function generateCSS(config) {
    const engine = new ThemeEngine(config.theme.primaryColor, config.theme.secondaryColor);
    const cssVariables = engine.generateCSS();
    
    // Lire le CSS de base du template
    const templateCSS = fs.readFileSync(path.join(__dirname, 'test-output/css/style.css'), 'utf8');
    
    // Remplacer les variables CSS
    const updatedCSS = templateCSS.replace(
        /\/\* ===== VARIABLES CSS ===== \*\/[\s\S]*?(?=\/\* ===== RESET & BASE ===== \*\/)/,
        cssVariables + '\n\n'
    );
    
    // Sauvegarder
    fs.writeFileSync(path.join(outputDir, 'css', 'style.css'), updatedCSS);
    console.log('✅ CSS généré avec le thème personnalisé');
}

// ===== GÉNÉRATION DU HTML =====
function generateHTML(config, lang = 'fr') {
    let html = `<!doctype html>
<html lang="${lang}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="${escapeHtml(config.metadata?.description || config.profile.title)}">
    <meta name="author" content="${escapeHtml(config.profile.name)}">
    
    <title>${escapeHtml(config.metadata?.title || config.profile.name + ' - Portfolio')}</title>
    
    <!-- FONTS -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- ICONS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    
    <!-- CSS -->
    <link href="css/style.css" rel="stylesheet">
</head>

<body>
    <!-- PRELOADER -->
    <section class="preloader">
        <div class="spinner">
            <div class="spinner-rotate"></div>
        </div>
    </section>

    <!-- NAVIGATION -->
    ${generateNavigation(config)}

    <!-- MODALS -->
    ${generateModals(config)}

    <main>
        <!-- HERO SECTION -->
        ${generateHero(config)}

        <!-- À PROPOS -->
        ${generateAbout(config)}

        <!-- PARCOURS (TIMELINE) -->
        ${generateTimeline(config)}

        <!-- PROJETS -->
        ${generateProjects(config)}

        <!-- COMPÉTENCES -->
        ${generateSkills(config)}

        <!-- FORMATION -->
        ${generateEducation(config)}

        <!-- EXPÉRIENCE -->
        ${generateExperience(config)}
    </main>

    <!-- FOOTER -->
    ${generateFooter(config)}

    <!-- SCRIPTS -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="js/script.js"></script>
</body>
</html>
`;

    return html;
}

function generateNavigation(config) {
    const links = config.profile.socialLinks || {};
    return `
    <nav class="navbar" id="navbar">
        <div class="container">
            <a href="#home" class="navbar-brand">${escapeHtml(config.profile.name)}</a>
            
            <ul class="navbar-nav" id="navbar-nav">
                <li><a href="#home" class="nav-link click-scroll">Accueil</a></li>
                <li><a href="#about" class="nav-link click-scroll">Moi</a></li>
                <li><a href="#parcours" class="nav-link click-scroll">Parcours</a></li>
                <li><a href="#projects" class="nav-link click-scroll">Projets</a></li>
                <li><a href="#skills" class="nav-link click-scroll">Compétences</a></li>
                <li><a href="#formation" class="nav-link click-scroll">Formation</a></li>
                <li><a href="#experience" class="nav-link click-scroll">Expérience</a></li>
                <li><a href="#" class="nav-link" data-modal="contactModal"><i class="bi bi-envelope"></i></a></li>
                ${config.profile.cv ? '<li><a href="#" class="nav-link" data-modal="cvModal"><i class="bi bi-file-earmark-person"></i></a></li>' : ''}
                ${links.linkedin ? `<li><a href="${escapeHtml(links.linkedin)}" target="_blank" class="nav-link"><i class="bi bi-linkedin"></i></a></li>` : ''}
                ${links.github ? `<li><a href="${escapeHtml(links.github)}" target="_blank" class="nav-link"><i class="bi bi-github"></i></a></li>` : ''}
            </ul>
            
            <button class="navbar-toggler" id="navbar-toggler">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>`;
}

function generateModals(config) {
    let modals = `
    <!-- MODAL CONTACT -->
    <div class="modal" id="contactModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Me Contacter</h5>
                    <button type="button" class="btn-close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <form id="contactForm">
                        <div class="form-group">
                            <label for="name" class="form-label">Votre nom</label>
                            <input type="text" class="form-control" id="name" name="Nom" placeholder="Jean Dupont" required>
                        </div>
                        <div class="form-group">
                            <label for="email" class="form-label">Votre e-mail</label>
                            <input type="email" class="form-control" id="email" name="Email" placeholder="jean.dupont@example.com" required>
                        </div>
                        <div class="form-group">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" name="message" placeholder="Bonjour..." required></textarea>
                        </div>
                        <button type="submit" class="btn-primary">
                            <i class="fas fa-paper-plane"></i> Envoyer le message
                        </button>
                        <div id="formResponse" style="margin-top: 1rem; text-align: center;"></div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;

    if (config.profile.cv) {
        modals += `
    <!-- MODAL CV -->
    <div class="modal" id="cvModal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Mon CV</h5>
                    <button type="button" class="btn-close" data-dismiss="modal">×</button>
                </div>
                <div class="modal-body">
                    <iframe src="${escapeHtml(config.profile.cv)}" style="width: 100%; height: 600px; border: none;" title="CV"></iframe>
                </div>
            </div>
        </div>
    </div>`;
    }

    return modals;
}

function generateHero(config) {
    const floatingCards = config.about.floatingCards || [];
    
    return `
    <section class="hero" id="home">
        <div class="hero-background">
            <div class="wave-shape wave-shape-1"></div>
            <div class="wave-shape wave-shape-2"></div>
        </div>
        
        <div class="hero-content">
            <div class="hero-text">
                ${config.profile.photo ? `
                <div class="avatar-wrapper">
                    <img src="${escapeHtml(config.profile.photo)}" alt="${escapeHtml(config.profile.name)}" class="avatar-image">
                    <div class="chat-bubble">Bonjour !</div>
                </div>` : ''}
                <div class="chat-bubble">Je suis ${escapeHtml(config.profile.name)}</div>
                <div class="chat-bubble">${escapeHtml(config.profile.title)}</div>
                <div class="chat-bubble">${escapeHtml(config.profile.tagline)}</div>
            </div>
            
            ${floatingCards.length > 0 ? `
            <div class="hero-image">
                ${floatingCards.map(card => `
                <div class="floating-card">
                    <div class="card-content">
                        <i class="${escapeHtml(card.icon)}"></i>
                        <span>${escapeHtml(card.text)}</span>
                    </div>
                </div>`).join('')}
            </div>` : ''}
        </div>
        
        <div class="scroll-indicator">
            <div class="mouse"></div>
            <span>Scroll</span>
        </div>
    </section>`;
}

function generateAbout(config) {
    const about = config.about || {};
    const highlights = about.highlights || [];
    
    return `
    <section class="about" id="about">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">${escapeHtml(about.sectionTag || 'Qui suis-je ?')}</span>
                <h2 class="section-title">${escapeHtml(about.sectionTitle || 'À propos')}</h2>
            </div>
            
            <div class="about-content">
                ${about.image ? `
                <div class="about-image-wrapper">
                    <img src="${escapeHtml(about.image)}" alt="Illustration" class="about-image">
                </div>` : ''}
                
                <div class="about-text">
                    <h3>${escapeHtml(about.sectionTitle || 'À propos')}</h3>
                    ${(about.paragraphs || []).map(p => `<p>${p}</p>`).join('\n                    ')}
                </div>
            </div>
            
            ${highlights.length > 0 ? `
            <div class="about-highlights">
                ${highlights.map(h => `
                <div class="highlight-item">
                    <i class="${escapeHtml(h.icon)}"></i>
                    <h4>${escapeHtml(h.title)}</h4>
                    <p>${escapeHtml(h.description)}</p>
                </div>`).join('')}
            </div>` : ''}
        </div>
    </section>`;
}

function generateTimeline(config) {
    const experiences = config.experiences || [];
    const education = config.education || [];
    
    // Combiner et trier par date
    const timeline = [];
    
    education.forEach(edu => {
        timeline.push({
            type: 'education',
            data: edu,
            side: 'left'
        });
    });
    
    experiences.forEach(exp => {
        timeline.push({
            type: 'experience',
            data: exp,
            side: 'right'
        });
    });
    
    if (timeline.length === 0) return '';
    
    return `
    <section class="timeline-section" id="parcours">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Mon Histoire</span>
                <h2 class="section-title">Mon Parcours</h2>
            </div>
            
            <div class="timeline">
                ${timeline.map((item, index) => {
                    if (index % 2 === 0 && index + 1 < timeline.length) {
                        const left = timeline[index];
                        const right = timeline[index + 1];
                        return generateTimelineRow(left, right);
                    } else if (index % 2 === 0) {
                        return generateTimelineRow(item, null);
                    }
                    return '';
                }).join('')}
            </div>
        </div>
    </section>`;
}

function generateTimelineRow(left, right) {
    return `
    <div class="timeline-row">
        ${left ? generateTimelineItem(left, 'left') : '<div></div>'}
        ${right ? generateTimelineItem(right, 'right') : '<div></div>'}
    </div>`;
}

function generateTimelineItem(item, side) {
    const data = item.data;
    const link = item.type === 'education' ? '#formation' : '#experience';
    const icon = data.icon || (item.type === 'education' ? 'fas fa-graduation-cap' : 'fas fa-briefcase');
    const title = data.school || data.company || '';
    const subtitle = data.degree || data.description || '';
    
    return `
    <a href="${link}" class="timeline-item-link">
        <div class="timeline-item ${side}">
            <div class="timeline-icon">
                <i class="${escapeHtml(icon)}"></i>
            </div>
            <div class="timeline-content">
                <small>${escapeHtml(data.periodShort || data.period || '')}</small>
                <h4>${escapeHtml(title)}</h4>
                <p>${escapeHtml(subtitle)}</p>
            </div>
        </div>
    </a>`;
}

function generateProjects(config) {
    const projects = config.projects || [];
    if (projects.length === 0) return '';
    
    return `
    <section class="projects" id="projects">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Mes réalisations</span>
                <h2 class="section-title">Projets</h2>
            </div>
            
            <div class="projects-grid">
                ${projects.map(proj => `
                <div class="project-card">
                    <div class="project-image">
                        ${proj.link ? `
                        <div class="project-overlay">
                            <a href="${escapeHtml(proj.link)}" target="_blank" class="project-link">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>` : ''}
                        ${proj.image ? `<img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.name)}" style="width: 100%; height: 100%; object-fit: cover;">` : `
                        <div class="project-placeholder">
                            <i class="${escapeHtml(proj.icon || 'fas fa-folder')}"></i>
                        </div>`}
                    </div>
                    <div class="project-content">
                        <h3>${escapeHtml(proj.name)}</h3>
                        ${proj.subtitle ? `<h4>${escapeHtml(proj.subtitle)}</h4>` : ''}
                        ${proj.description ? `<p>${escapeHtml(proj.description)}</p>` : ''}
                        ${proj.features && proj.features.length > 0 ? `
                        <ul>
                            ${proj.features.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                        </ul>` : ''}
                        ${proj.link ? `
                        <a href="${escapeHtml(proj.link)}" target="_blank" class="custom-btn custom-border-btn">
                            <i class="fab fa-github"></i> Dépôt GitHub
                        </a>` : ''}
                    </div>
                </div>`).join('')}
            </div>
            
            ${config.profile.socialLinks?.github ? `
            <div style="text-align: center; margin-top: 3rem;">
                <p style="margin-bottom: 1.5rem;">Plus de projets sur mon GitHub</p>
                <a href="${escapeHtml(config.profile.socialLinks.github)}" target="_blank" class="custom-btn">
                    <i class="fab fa-github"></i> Voir tous mes projets
                </a>
            </div>` : ''}
        </div>
    </section>`;
}

function generateSkills(config) {
    const skills = config.skills || {};
    const technologies = skills.technologies || [];
    const languages = skills.languages || [];
    const certifications = skills.certifications || [];
    
    if (technologies.length === 0 && languages.length === 0 && certifications.length === 0) return '';
    
    return `
    <section class="skills" id="skills">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Mes atouts</span>
                <h2 class="section-title">Compétences Techniques</h2>
            </div>
            
            ${technologies.length > 0 ? `
            <h3 style="text-align: center; margin-bottom: 3rem; color: var(--primary-dark);">Langages, Big Data & DevOps</h3>
            
            <div class="row justify-content-center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
                ${technologies.map(tech => `
                <div class="clients-item-height">
                    <img src="${escapeHtml(tech.logo)}" class="clients-image" alt="${escapeHtml(tech.name)}">
                    <legend style="text-align:center; font-weight: 600;">${escapeHtml(tech.name)}</legend>
                </div>`).join('')}
            </div>` : ''}
            
            ${languages.length > 0 ? `
            <h3 style="text-align: center; margin: 4rem 0 3rem; color: var(--primary-dark);">Langues</h3>
            
            <div class="row justify-content-center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem;">
                ${languages.map(lang => `
                <div class="clients-item-height">
                    ${lang.flag ? `<img src="${escapeHtml(lang.flag)}" class="clients-image" alt="${escapeHtml(lang.name)}">` : ''}
                    <legend style="text-align:center; font-weight: 600;">${escapeHtml(lang.name)} : ${escapeHtml(lang.level)}</legend>
                </div>`).join('')}
            </div>` : ''}
            
            ${certifications.length > 0 ? `
            <h3 style="text-align: center; margin: 4rem 0 3rem; color: var(--primary-dark);">Certifications</h3>
            
            <div class="row justify-content-center" style="display: flex; flex-wrap: wrap; justify-content: center;">
                ${certifications.map(cert => `
                <div class="clients-item-height">
                    ${cert.logo ? `<img src="${escapeHtml(cert.logo)}" class="clients-image" alt="${escapeHtml(cert.name)}">` : ''}
                    <legend style="text-align:center; font-weight: 600;">${escapeHtml(cert.name)}</legend>
                </div>`).join('')}
            </div>` : ''}
        </div>
    </section>`;
}

function generateEducation(config) {
    const education = config.education || [];
    if (education.length === 0) return '';
    
    return `
    <section class="projects" id="formation">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Mes études</span>
                <h2 class="section-title">Formation</h2>
            </div>
            
            <div class="projects-grid">
                ${education.map(edu => `
                <div class="project-card">
                    <div class="project-image">
                        ${edu.logo ? `<img src="${escapeHtml(edu.logo)}" style="width: 120px; height: 120px; border-radius: 20px; object-fit: contain;">` : ''}
                    </div>
                    <div class="project-content">
                        <h3>${escapeHtml(edu.school)}</h3>
                        <h4>${escapeHtml(edu.degree)} (${escapeHtml(edu.period)})</h4>
                        ${edu.description ? `<p>${escapeHtml(edu.description)}</p>` : ''}
                        ${edu.courses && edu.courses.length > 0 ? `
                        <ul>
                            ${edu.courses.map(c => `<li>${escapeHtml(c)}</li>`).join('')}
                        </ul>` : ''}
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>`;
}

function generateExperience(config) {
    const experiences = config.experiences || [];
    if (experiences.length === 0) return '';
    
    return `
    <section class="skills" id="experience">
        <div class="container">
            <div class="section-header">
                <span class="section-tag">Mon parcours professionnel</span>
                <h2 class="section-title">Expérience Professionnelle</h2>
            </div>
            
            <div class="projects-grid">
                ${experiences.map(exp => `
                <div class="project-card">
                    <div class="project-image">
                        ${exp.logo ? `<img src="${escapeHtml(exp.logo)}" style="width: 120px; height: 120px; border-radius: 20px; object-fit: contain; background: white; padding: 10px;" alt="${escapeHtml(exp.company)}">` : ''}
                    </div>
                    <div class="project-content">
                        <h3>${escapeHtml(exp.title)}</h3>
                        <h4>${escapeHtml(exp.company)}${exp.location ? ' · ' + escapeHtml(exp.location) : ''}</h4>
                        <p style="font-style: italic; color: var(--text-gray);">${escapeHtml(exp.period)}</p>
                        ${exp.responsibilities && exp.responsibilities.length > 0 ? `
                        <ul>
                            ${exp.responsibilities.map(r => `<li>${escapeHtml(r)}</li>`).join('')}
                        </ul>` : ''}
                    </div>
                </div>`).join('')}
            </div>
        </div>
    </section>`;
}

function generateFooter(config) {
    const footer = config.footer || {};
    return `
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>${footer.copyright || '© 2025. Tous droits réservés.'}</p>
                <p>${footer.message || 'Conçu avec ❤️ et ☕'}</p>
            </div>
        </div>
    </footer>`;
}

function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// ===== EXÉCUTION PRINCIPALE =====
console.log('🚀 Génération du portfolio...\n');

try {
    // Générer le CSS
    console.log('🎨 Génération du CSS avec le thème personnalisé...');
    generateCSS(config);
    
    // Générer le HTML
    console.log('📄 Génération du HTML...');
    const html = generateHTML(config);
    fs.writeFileSync(path.join(outputDir, 'fr.html'), html);
    console.log('✅ HTML généré: fr.html');
    
    // Copier le JavaScript
    console.log('📜 Copie du JavaScript...');
    const jsSource = path.join(__dirname, 'test-output/js/script.js');
    if (fs.existsSync(jsSource)) {
        fs.copyFileSync(jsSource, path.join(outputDir, 'js', 'script.js'));
        console.log('✅ JavaScript copié');
    }
    
    // Créer index.html (redirection)
    const indexHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>${escapeHtml(config.profile.name)} - Portfolio</title>
  <script>
    window.location.href = 'fr.html';
  </script>
  <noscript>
    <meta http-equiv="refresh" content="0; url=fr.html">
  </noscript>
</head>
<body>
  <p>Redirection en cours...</p>
</body>
</html>`;
    fs.writeFileSync(path.join(outputDir, 'index.html'), indexHtml);
    console.log('✅ index.html créé');
    
    // Sauvegarder la configuration utilisée
    fs.writeFileSync(
        path.join(outputDir, 'portfolio-config.json'),
        JSON.stringify(config, null, 2)
    );
    console.log('✅ Configuration sauvegardée');
    
    console.log('\n✅ Portfolio généré avec succès !');
    console.log(`📂 Fichiers disponibles dans: ${outputDir}/`);
    console.log('\n📋 Prochaines étapes:');
    console.log('  1. Copiez vos images dans', path.join(outputDir, 'images/'));
    console.log('  2. Si vous avez un CV, copiez-le dans', path.join(outputDir, 'res/'));
    console.log('  3. Ouvrez', path.join(outputDir, 'index.html'), 'dans un navigateur');
    console.log('  4. Déployez le contenu de', outputDir, 'sur votre hébergement');
    
} catch (error) {
    console.error('\n❌ Erreur lors de la génération:', error.message);
    console.error(error.stack);
    process.exit(1);
}

