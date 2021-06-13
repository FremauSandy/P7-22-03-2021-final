# P7 Groupomania

Voici la première version de l'application projet 7, du parcours Développeur Web d'OC.

    ! Au préalable, vous devrez avoir installé localement sur votre ordinateur :

        Node,
        npm,
        express,
        mysql,
        vuejs

Côté Backend :

    Accéder avec le terminal au backend : cd backend

    Installer NPM : npm install
    Installer les packages listés dans le fichier backend/package.json
    Pour utiliser le serveur, chargez le package nodemon : npm install -g nodemon

    Ouvrez le fichier (backend/).env et entrez le host, les identifiants (admin) et le nom de la base de données que vous souhaitez créer.
        Exemple : SQL_BDD_HOST = localhost SQL_BDD_USER = root SQL_BDD_PASSWORD = root SQL_BDD_NAME = groupomania
    Toujours dans ce même fichier (backend/).env, entrez une clé secrète qui sera utilisée pour encoder et décoder les tokens d'authenfications, entrez aussi une durée en heure avant l'expiration des tokens d'authentifications.
        Exemple : SECRET_TOKEN=56E4RH54ER654HEYERLKKJKGKGPME

    Exécutez la commande node bdd_config/bdd_config.js pour configurer et créer la base de données.

    Lancer le serveur côté backend : nodemon server
    Garder ce terminal ouvert durant toute votre session sur le site

Côté Frontend :

    Accéder avec le terminal au dossier frontend avec : cd frontend

    Exécutez la commande npm install afin d'installer les dépendances de l'appication.

    Lancer le serveur côté frontend : npm run serve
    !Il est important de garder ce terminal ouvert durant toute votre session sur le site !

Inscription et Connexion :

    Une fois sur l'appli, l'utilisateur devra s'inscrire en donnant une adresse mail et un mot de passe ayant au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole pour un total de 8 caractères minimum.

Veille et vulnérabilités

        Pour vérifier qu'aucune faille de sécurité lié aux dépendances de notre application n'a été découverte, exécutez la commande npm audit à la fois côté backend et frontend.
        Si le scan montre une ou plusieurs vulnérabilités, exécutez la commande npm audit --fix qui met à jour les dépendances avec de nouveaux patchs de sécurité.
