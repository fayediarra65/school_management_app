const db = require('../config/db.config');
const Utilisateur = db.Utilisateur;

// Middleware pour vérifier si l'utilisateur est authentifié
const isAuthenticated = (req, res, next) => {
    if (req.session.utilisateur) {
        next();
    } else {
        res.redirect('/connexion');
    }
};

// Middleware pour vérifier si l'utilisateur a les privilèges requis
const hasPrivileges = (privileges) => {
    return (req, res, next) => {
        if (req.session.utilisateur && privileges.includes(req.session.utilisateur.profil)) {
            next();
        } else {
            res.status(403).send("Vous n'avez pas les privilèges nécessaires pour accéder à cette page.");
        }
    };
};

module.exports = { isAuthenticated, hasPrivileges };