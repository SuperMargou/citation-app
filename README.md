🌫️ Haze – Citations App

Une expérience minimaliste et apaisante autour de la lecture de citations inspirantes.

Haze est une application web élégante et fluide développée par Cloud Roots Studio, pensée pour offrir un instant de réflexion et de sérénité à travers des citations inspirantes.
L’interface épurée, optimisée pour mobile et desktop, permet de découvrir, aimer et partager des citations avec fluidité — le tout dans une ambiance douce et immersive.

Fonctionnalités principales

-Affichage dynamique de citations, avec transition fluide (fade ou slide selon le device).

-Like système avec synchronisation entre local storage et Firebase Firestore.

-Authentification Google intégrée (connexion rapide, stockage des favoris dans le cloud).

-Support mobile complet avec swipe, double tap et design responsive.

-Partage facile (API Web Share + copier dans le presse-papier).

-Expérience fluide sans rechargement, pensée pour la lecture rapide et intuitive.

🧠 Stack technique
Technologie	Usage
HTML / CSS / JS	Front-end minimaliste et responsive
Firebase (Auth + Firestore)	Authentification Google et stockage des likes
Font Awesome	Icônes interactives (like, share, etc.)
JSON local	Base de citations légère et personnalisable

🚀 Installation & lancement
1️⃣ Cloner le projet
git clone https://github.com/CloudRoots/haze.git
cd haze

2️⃣ Configurer Firebase

Crée un projet sur Firebase Console

Active Authentication → Google

Active Firestore Database

Remplace la configuration dans auth.js par la tienne

3️⃣ Lancer en local

Utilise un petit serveur local (ex. VSCode Live Server, ou python3 -m http.server).

⚠️ Firebase ne fonctionne pas en “file://”, il faut être sur http://localhost.

🧾 Licence

GNU General Public License v3.0
Ce projet est open source sous licence GPLv3 — vous êtes libre de le redistribuer ou le modifier, tant que toute version dérivée reste open source.

🪶 À propos de Cloud Roots

Cloud Roots est un studio indépendant mêlant design minimaliste et technologies web modernes.
Nous créons des expériences numériques légères, humaines et élégantes, à la croisée du code et de la créativité.

💬 Exemple de citation

“La simplicité est la sophistication suprême.” — Leonardo da Vinci
