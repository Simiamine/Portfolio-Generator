# 🎨 Générateur de Portfolio Personnalisé

Un système complet pour créer des portfolios personnalisés avec une interface visuelle et un format JSON réutilisable.

## 📁 Structure du Projet

```
portfolio-generator/
├── index.html              # Interface web du générateur
├── generator.js            # Logique principale de l'application
├── theme-engine.js         # Moteur de génération de thèmes
├── config-schema.json      # Schéma JSON standardisé
├── example-config.json     # Exemple de configuration pré-rempli
├── build-portfolio.js      # Script Node.js pour générer le portfolio
└── README.md              # Cette documentation
```

## 🚀 Utilisation

### Option 1 : Interface Web (Recommandé)

1. **Ouvrir l'interface**
   ```bash
   # Ouvrir index.html dans un navigateur
   open index.html
   ```

2. **Configurer votre portfolio**
   - 🎨 **Thème** : Choisissez 2 couleurs, le reste est généré automatiquement
   - 👤 **Profil** : Nom, titre, photo, liens sociaux
   - ℹ️ **À propos** : Présentation, points forts
   - 💼 **Expériences** : Ajoutez vos expériences professionnelles
   - 🎓 **Formation** : Vos études
   - 📁 **Projets** : Vos réalisations
   - ⚡ **Compétences** : Technologies, langues, certifications

3. **Exporter**
   - **Exporter JSON** : Sauvegarde votre configuration (réutilisable)
   - **Générer Portfolio** : Crée le portfolio complet

### Option 2 : Édition Manuelle du JSON

1. **Dupliquer l'exemple**
   ```bash
   cp example-config.json mon-portfolio.json
   ```

2. **Éditer le fichier JSON**
   ```json
   {
     "theme": {
       "primaryColor": "#5e2933",
       "secondaryColor": "#815443"
     },
     "profile": {
       "name": "Votre Nom",
       "title": "Votre Titre",
       ...
     },
     ...
   }
   ```

3. **Importer dans l'interface**
   - Ouvrir `index.html`
   - Aller dans l'onglet "Export"
   - Cliquer sur "Importer une Configuration"
   - Sélectionner votre fichier JSON

### Option 3 : Ligne de Commande (Node.js)

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Générer le portfolio**
   ```bash
   node build-portfolio.js mon-portfolio.json
   ```

3. **Résultat**
   ```
   output/
   ├── index.html
   ├── fr.html
   ├── en.html (optionnel)
   ├── css/
   │   └── style.css (thème personnalisé)
   ├── js/
   │   └── script.js
   └── images/ (à copier manuellement)
   ```

## 🎨 Système de Thème

Le moteur de thème génère automatiquement **toutes les variations** à partir de 2 couleurs :

### Couleurs Générées Automatiquement
- ✅ Couleur primaire foncée
- ✅ Couleur primaire claire
- ✅ Couleur d'accent
- ✅ Tons beige/crème (calculés intelligemment)
- ✅ Tous les gradients
- ✅ Toutes les ombres (avec opacité adaptée)

### Vérifications Automatiques
- ✅ Contraste WCAG (accessibilité)
- ✅ Harmonie des couleurs
- ✅ Cohérence visuelle

### Exemple de Génération

**Entrée :**
```json
{
  "theme": {
    "primaryColor": "#5e2933",
    "secondaryColor": "#815443"
  }
}
```

**Sortie automatique :**
```css
:root {
    --primary-dark: #5e2933;
    --primary-light: #815443;
    --secondary-beige: #d2bdb1;
    --accent-brown: #7d5e4c;
    --cream: #f7f6f6;
    --gradient-primary: linear-gradient(135deg, #5e2933 0%, #815443 100%);
    --shadow: 0 10px 30px rgba(94, 41, 51, 0.2);
    /* ... et beaucoup plus ! */
}
```

## 📝 Structure du JSON

### Sections Principales

#### 1. Thème
```json
{
  "theme": {
    "primaryColor": "#5e2933",    // Couleur principale
    "secondaryColor": "#815443"    // Couleur secondaire
  }
}
```

#### 2. Profil
```json
{
  "profile": {
    "name": "Prénom Nom",
    "title": "Titre Professionnel",
    "tagline": "Phrase d'accroche",
    "photo": "images/moi.jpg",
    "email": "email@example.com",
    "socialLinks": {
      "linkedin": "https://linkedin.com/in/...",
      "github": "https://github.com/..."
    }
  }
}
```

#### 3. Expériences
```json
{
  "experiences": [
    {
      "title": "Data Analyst",
      "company": "Entreprise",
      "location": "Paris, France",
      "period": "Janvier 2023 - Aujourd'hui",
      "logo": "images/company.png",
      "responsibilities": [
        "Mission 1",
        "Mission 2"
      ]
    }
  ]
}
```

#### 4. Projets
```json
{
  "projects": [
    {
      "name": "Nom du Projet",
      "subtitle": "Description courte",
      "description": "Description détaillée",
      "icon": "fas fa-rocket",
      "features": [
        "Fonctionnalité 1",
        "Fonctionnalité 2"
      ],
      "link": "https://github.com/..."
    }
  ]
}
```

#### 5. Compétences
```json
{
  "skills": {
    "technologies": [
      {
        "name": "Python",
        "logo": "https://..."
      }
    ],
    "languages": [
      {
        "name": "Français",
        "level": "Maternelle",
        "flag": "images/langues/france.png"
      }
    ],
    "certifications": [
      {
        "name": "Certification",
        "issuer": "Émetteur",
        "date": "2024",
        "logo": "https://..."
      }
    ]
  }
}
```

Voir `config-schema.json` pour le schéma complet et `example-config.json` pour un exemple détaillé.

## 🔄 Réutilisation du JSON

Le format JSON standardisé peut être utilisé pour :

### ✅ Applications Web
```javascript
fetch('portfolio-config.json')
  .then(response => response.json())
  .then(config => {
    // Utiliser la configuration
    document.title = config.profile.name;
    // ...
  });
```

### ✅ Générateurs Statiques (Gatsby, Next.js, etc.)
```javascript
import config from './portfolio-config.json';

export default function Profile() {
  return <h1>{config.profile.name}</h1>;
}
```

### ✅ APIs / Bases de Données
```javascript
// Sauvegarder dans MongoDB
db.portfolios.insertOne(config);

// Créer une API
app.get('/api/portfolio/:id', (req, res) => {
  const config = getPortfolioConfig(req.params.id);
  res.json(config);
});
```

### ✅ CMS Personnalisé
```javascript
// Utiliser comme source de données
const portfolioData = require('./portfolio-config.json');
```

## 🎯 Fonctionnalités Avancées

### 1. Import/Export
- ✅ Sauvegarde de la configuration en JSON
- ✅ Import de configuration existante
- ✅ Modification et ré-export

### 2. Prévisualisation
- ✅ Palette de couleurs en temps réel
- ✅ Validation des contrastes
- ✅ Suggestions de couleurs harmonieuses

### 3. Validation
- ✅ Champs requis
- ✅ Format des URLs
- ✅ Format des couleurs hex
- ✅ Accessibilité (WCAG)

## 🛠️ Personnalisation Avancée

### Modifier le Template

Le portfolio généré utilise les templates dans `../` (répertoire parent).

Pour personnaliser :
1. Modifier `fr.html` pour la structure
2. Modifier `css/style.css` pour les styles de base
3. Modifier `js/script.js` pour les comportements

Les couleurs sont automatiquement remplacées par le thème généré.

### Ajouter des Sections

1. **Dans le JSON** : Ajouter une nouvelle section
```json
{
  "customSection": {
    "title": "Ma Section",
    "content": "..."
  }
}
```

2. **Dans le générateur** : Ajouter la logique de rendu
```javascript
// Dans build-portfolio.js
function generateCustomSection(data) {
  return `<section>...</section>`;
}
```

## 📋 Checklist de Génération

- [ ] Choisir 2 couleurs pour le thème
- [ ] Remplir les informations de profil
- [ ] Ajouter au moins 1 paragraphe "À propos"
- [ ] Ajouter les expériences professionnelles
- [ ] Ajouter les formations
- [ ] Ajouter au moins 3 projets
- [ ] Ajouter les compétences techniques
- [ ] Ajouter les langues
- [ ] Vérifier les URLs (LinkedIn, GitHub, etc.)
- [ ] Exporter la configuration JSON
- [ ] Générer le portfolio complet

## 🚀 Déploiement

Une fois le portfolio généré :

### GitHub Pages
```bash
cd output
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/username/portfolio.git
git push -u origin main
```

### Netlify
```bash
cd output
netlify deploy --prod
```

### Vercel
```bash
cd output
vercel --prod
```

## 🤝 Contribution

Pour améliorer le générateur :
1. Fork le projet
2. Créer une branche (`git checkout -b feature/amelioration`)
3. Commit les changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push (`git push origin feature/amelioration`)
5. Créer une Pull Request

## 📄 Licence

Ce projet est libre d'utilisation. Créé pour faciliter la création de portfolios personnalisés.

## 💡 Support

Pour toute question ou suggestion :
- Ouvrir une issue sur GitHub
- Consulter les exemples dans `example-config.json`
- Lire le schéma complet dans `config-schema.json`

---

**Bon portfolio ! 🎨✨**

