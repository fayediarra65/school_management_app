const express = require('express');
const router = express.Router();

const {inscriptionPage, inscription, connexionPage,
    connexion,accueilEtuPage,accueilProfPage,
    accueilAdminPage,updateUtilisateurCompte,deleteUtilisateurCompte,listUtilisateurCompte} = require('../controllers/utilisateur.controller');

//const {inscriptionEtu} = require('../controllers/etudiant-controller')
const { isAuthenticated, hasPrivileges } = require('../middleware/auth');

// Routes publiques
router.get('/connexion', connexionPage);
router.post('/connexion', connexion);


// Routes protégées
router.get('/accueilEtu', isAuthenticated, hasPrivileges(['etudiant','admin']), accueilEtuPage);
router.get('/accueilProf', isAuthenticated, hasPrivileges(['professeur','admin']), accueilProfPage);
router.get('/accueilAdmin', isAuthenticated, hasPrivileges(['admin']), accueilAdminPage);
router.get('/inscription',isAuthenticated, hasPrivileges(['admin']),inscriptionPage);
router.post('/inscription',isAuthenticated, hasPrivileges(['admin']),inscription);
router.get('/updateUtilisateurCompte/:id',isAuthenticated, hasPrivileges(['admin']),updateUtilisateurCompte);
router.get('/deleteUtilisateurCompte/:id',isAuthenticated, hasPrivileges(['admin']),deleteUtilisateurCompte);
router.get('/listeUtilisateurCompte',isAuthenticated, hasPrivileges(['admin']),listUtilisateurCompte);


module.exports = router;



//router.post('/inscription-prof', inscriptionProf);

