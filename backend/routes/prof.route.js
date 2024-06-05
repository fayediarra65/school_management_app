const express = require('express');
const router = express.Router();

const { isAuthenticated, hasPrivileges } = require('../middleware/auth');
const {ajouterMatier,getMatieres,updateMatiere,deleteMatiere,updateMatierePage,allMatierePage} = require('../controllers/prof-controller');

router.post('/ajouterMatier',isAuthenticated, hasPrivileges(['professeur']),ajouterMatier);
router.get('/getMatieres',isAuthenticated, hasPrivileges(['professeur']),getMatieres);
router.get('/deleteMatiere/:id',isAuthenticated, hasPrivileges(['professeur']),deleteMatiere);
router.get('/updateMatierePage/:id',isAuthenticated, hasPrivileges(['professeur']),updateMatierePage);
router.post('/updateMatiere/:id',isAuthenticated, hasPrivileges(['professeur']),updateMatiere);
router.get('/allMatierePage',isAuthenticated, hasPrivileges(['professeur']),allMatierePage);
module.exports = router;