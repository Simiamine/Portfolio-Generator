# 🚀 Guide de Démarrage Rapide

## ⚡ Utilisation en 3 étapes

### 1️⃣ Configurer votre portfolio

**Option A : Interface Graphique (recommandé)**
```bash
# Ouvrir index.html dans un navigateur
open index.html
```

Remplissez simplement les formulaires et exportez votre configuration JSON.

**Option B : Éditer le JSON directement**
```bash
# Dupliquer l'exemple
cp example-config.json mon-portfolio.json

# Éditer avec votre éditeur préféré
nano mon-portfolio.json
```

### 2️⃣ Générer le portfolio

```bash
# Avec Node.js
node build-portfolio.js mon-portfolio.json

# Ou utiliser npm
npm run generate
```

### 3️⃣ Déployer

```bash
cd output
# Vérifier localement
open index.html

# Déployer sur GitHub Pages, Netlify, Vercel, etc.
```

---

## 🎨 Personnalisation du Thème

Le système génère **automatiquement** toutes les variations à partir de 2 couleurs :

```json
{
  "theme": {
    "primaryColor": "#5e2933",
    "secondaryColor": "#815443"
  }
}
```

**Résultat automatique :**
- ✅ 5+ variations de couleurs
- ✅ Tous les gradients
- ✅ Toutes les ombres
- ✅ Contraste vérifié (WCAG)

### Exemples de thèmes

**Bleu Tech :**
```json
"theme": {
  "primaryColor": "#2C3E50",
  "secondaryColor": "#3498DB"
}
```

**Vert Nature :**
```json
"theme": {
  "primaryColor": "#27AE60",
  "secondaryColor": "#A8E6CF"
}
```

**Rose Moderne :**
```json
"theme": {
  "primaryColor": "#E91E63",
  "secondaryColor": "#F8BBD0"
}
```

---

## 📝 Sections Minimales

Voici ce qu'il faut **au minimum** pour un portfolio fonctionnel :

```json
{
  "theme": {
    "primaryColor": "#...",
    "secondaryColor": "#..."
  },
  "profile": {
    "name": "Votre Nom",
    "title": "Votre Titre",
    "tagline": "Votre phrase d'accroche"
  },
  "about": {
    "paragraphs": ["Présentez-vous ici..."]
  },
  "projects": [
    {
      "name": "Mon Projet",
      "description": "Description...",
      "icon": "fas fa-rocket"
    }
  ],
  "skills": {
    "technologies": [
      {
        "name": "Compétence 1",
        "logo": "https://..."
      }
    ]
  }
}
```

---

## 🔥 Tips & Astuces

### 1. Icônes FontAwesome

Utilisez [FontAwesome](https://fontawesome.com/icons) pour les icônes :
```json
"icon": "fas fa-rocket"     // Solide
"icon": "fab fa-github"     // Marques
"icon": "far fa-heart"      // Regular
```

### 2. Images

**Options :**
- Chemin relatif : `"images/moi.jpg"`
- URL complète : `"https://example.com/image.jpg"`
- CDN : `"https://cdn.example.com/logo.png"`

### 3. Responsive

Le portfolio est **automatiquement responsive**. Testez sur mobile !

### 4. SEO

Les métadonnées sont générées automatiquement :
```json
"metadata": {
  "title": "...",
  "description": "...",
  "keywords": ["web", "portfolio"]
}
```

### 5. Réseaux Sociaux

Ajoutez vos liens :
```json
"socialLinks": {
  "linkedin": "https://linkedin.com/in/...",
  "github": "https://github.com/...",
  "twitter": "https://twitter.com/..."
}
```

---

## ❓ FAQ

**Q : Comment changer les couleurs après génération ?**
R : Modifiez le JSON et régénérez avec `node build-portfolio.js config.json`.

**Q : Puis-je ajouter des sections personnalisées ?**
R : Oui ! Modifiez `build-portfolio.js` ou le HTML généré.

**Q : Le portfolio est-il optimisé pour le SEO ?**
R : Oui, les balises meta sont générées automatiquement.

**Q : Puis-je utiliser ce générateur commercialement ?**
R : Oui, c'est libre d'utilisation !

**Q : Comment ajouter Google Analytics ?**
R : Ajoutez le script dans le HTML généré avant `</body>`.

---

## 🆘 Dépannage

### Problème : "Cannot find module"
```bash
# Vérifier que vous êtes dans le bon dossier
cd portfolio-generator
node build-portfolio.js config.json
```

### Problème : Couleurs incorrectes
```bash
# Vérifier le format hex (avec #)
"primaryColor": "#5e2933"  // ✅ Bon
"primaryColor": "5e2933"   // ❌ Manque le #
```

### Problème : Images manquantes
```bash
# Copier vos images dans output/images/
cp -r images/ output/images/
```

---

## 📚 Ressources

- **Icônes** : [FontAwesome](https://fontawesome.com)
- **Images** : [Unsplash](https://unsplash.com), [Pexels](https://pexels.com)
- **Couleurs** : [Coolors](https://coolors.co), [Adobe Color](https://color.adobe.com)
- **Fonts** : [Google Fonts](https://fonts.google.com)

---

**Besoin d'aide ?** Consultez le [README.md](README.md) complet ! 📖

