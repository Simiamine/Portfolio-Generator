#!/bin/bash

# Script d'initialisation du repo Git pour portfolio-generator

echo "🚀 Initialisation du repo portfolio-generator..."

# Nettoyer les fichiers de test
if [ -d "test-output" ]; then
    echo "🧹 Nettoyage du dossier test-output..."
    rm -rf test-output
fi

# Initialiser le repo git
if [ ! -d ".git" ]; then
    echo "📦 Initialisation du repo Git..."
    git init
else
    echo "✅ Repo Git déjà initialisé"
fi

# Ajouter tous les fichiers
echo "📝 Ajout des fichiers..."
git add .

# Premier commit
echo "💾 Premier commit..."
git commit -m "Initial commit: Portfolio Generator avec solution hybride

- Interface web graphique pour personnalisation facile
- Moteur de thème intelligent (2 couleurs → palette complète)
- Format JSON réutilisable et standardisé
- Génération HTML/CSS/JS automatique
- Documentation complète (README, guides, exemples)
- Testé et fonctionnel"

# Afficher le statut
echo ""
echo "✅ Repo initialisé avec succès !"
echo ""
echo "📋 Prochaines étapes :"
echo "   1. Créer un repo sur GitHub: https://github.com/new"
echo "   2. Ajouter le remote: git remote add origin https://github.com/USERNAME/portfolio-generator.git"
echo "   3. Push: git push -u origin main"
echo ""
echo "📊 Statut actuel :"
git status

