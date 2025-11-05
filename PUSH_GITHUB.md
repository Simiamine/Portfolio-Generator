# 🚀 Comment Pusher sur GitHub

## Étapes à Suivre

### 1️⃣ Initialiser le Repo (dans ce dossier)

```bash
# Rendre le script exécutable
chmod +x init-repo.sh

# Exécuter le script
./init-repo.sh
```

Ou manuellement :

```bash
# Nettoyer
rm -rf test-output

# Initialiser git
git init

# Ajouter tous les fichiers
git add .

# Premier commit
git commit -m "Initial commit: Portfolio Generator"
```

---

### 2️⃣ Créer un Repo sur GitHub

1. Va sur [https://github.com/new](https://github.com/new)
2. Nom du repo : **portfolio-generator**
3. Description : "🎨 Générateur de portfolio avec interface web et format JSON réutilisable"
4. **Ne pas** initialiser avec README (on en a déjà un)
5. Cliquer sur "Create repository"

---

### 3️⃣ Ajouter le Remote et Push

```bash
# Ajouter le remote (remplace USERNAME par ton pseudo GitHub)
git remote add origin https://github.com/USERNAME/portfolio-generator.git

# Vérifier la branche
git branch -M main

# Push
git push -u origin main
```

---

### 4️⃣ Ajouter un README.md sur GitHub (optionnel)

GitHub affichera automatiquement le `README.md` existant !

---

### 5️⃣ Configurer GitHub Pages (optionnel)

Pour héberger l'interface web directement :

1. Va dans **Settings** > **Pages**
2. Source : **Deploy from a branch**
3. Branch : **main** / **(root)**
4. Save

L'interface sera accessible sur : `https://USERNAME.github.io/portfolio-generator/`

---

## 📝 Message de Commit Suggéré

```bash
git commit -m "Initial commit: Portfolio Generator avec solution hybride

- Interface web graphique pour personnalisation facile
- Moteur de thème intelligent (2 couleurs → palette complète)
- Format JSON réutilisable et standardisé
- Génération HTML/CSS/JS automatique
- Documentation complète (README, guides, exemples)
- Testé et fonctionnel"
```

---

## 🏷️ Ajouter des Tags (optionnel)

```bash
# Créer un tag pour la version 1.0
git tag -a v1.0.0 -m "Version 1.0.0 - Premier release stable"

# Pousser le tag
git push origin v1.0.0
```

---

## 📊 Structure du Repo

```
portfolio-generator/
├── README.md              # Documentation principale (affichée sur GitHub)
├── INDEX.md               # Vue d'ensemble
├── GUIDE_RAPIDE.md       # Guide de démarrage
├── index.html            # Interface web (peut être hébergée sur GitHub Pages)
├── generator.js          # Logique de l'interface
├── theme-engine.js       # Moteur de thème
├── build-portfolio.js    # Générateur CLI
├── example-config.json   # Exemple de configuration
├── config-schema.json    # Schéma JSON
└── package.json          # Config npm
```

---

## 🎯 Topics GitHub Suggérés

Ajoute ces topics à ton repo pour le rendre plus visible :

```
portfolio
generator
theme-generator
static-site-generator
web-design
javascript
json
html-css-javascript
portfolio-website
customizable
```

---

## 📝 Description GitHub Suggérée

```
🎨 Générateur de portfolio personnalisé avec interface web graphique et format JSON réutilisable. Choisissez 2 couleurs et obtenez une palette complète automatiquement. Solution hybride pour créer des portfolios professionnels en quelques clics.
```

---

## 🔗 Liens Utiles

- **Créer un repo** : https://github.com/new
- **GitHub Pages** : https://pages.github.com
- **Markdown Guide** : https://guides.github.com/features/mastering-markdown/

---

**Prêt à partager ton générateur avec le monde ! 🚀**

