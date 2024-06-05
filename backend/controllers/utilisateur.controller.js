const db = require('../config/db.config');
const {Etudiant,Administrateur,Professeur,Compte} = require("../config/db.config");
const Utilisateur = db.Utilisateur;


const inscriptionPage = (req, res) => {
	//afficher la page d'inscription
	
	res.render('./pages/connexion/inscription.ejs')
}

const inscription = async (req, res)=> {

	const { prenom, nom, email, mot_de_passe, confirmation_mot_de_passe,profil } = req.body;
	console.log(req.body)

	if (mot_de_passe !== confirmation_mot_de_passe) {
		res.status(400).send('Les mots de passe ne correspondent pas');
		return;
	}

	const utilisateur = { prenom, nom,profil };

	try {
	const response = await Utilisateur.create(utilisateur);

	const compte = await Compte.create({email, mot_de_passe, utilisateurId: response.id});

	let profile;
	switch (utilisateur.profil){
		case 'etudiant':
			profile = await Etudiant.create({utilisateurId: response.id});
			break;
		case 'admin':
			profile = await Administrateur.create({utilisateurId: response.id});
			break;
		case 'professeur':
			profile = await Professeur.create({utilisateurId: response.id});
			break;
		default:
			throw new Error('Profil inconnu');
	}
	res.redirect('/accueilAdmin');
	} catch (error) {
		console.log(error);
	}
};

const connexionPage  = (req, res) => {
	//afficher la page de connexion
	res.render('./pages/connexion/connexion.ejs')
}

const connexion = async (req, res)=> {
	const {email, mot_de_passe} = req.body;

	const compte = await Compte.findOne({where: {email,mot_de_passe}})
	
	if (!compte) {
		res.status(404).send('Utilisateur introuvable');
	}

	const utilisateur = await Utilisateur.findOne({ where: { id: compte.utilisateurId } });

	switch (utilisateur.profil) {
		case 'etudiant':
			req.session.utilisateur = utilisateur;
			res.redirect('/accueilEtu');
			break;
		case 'professeur':
			req.session.utilisateur = utilisateur;
			res.redirect('/accueilProf');
			break;
		case 'admin':
			req.session.utilisateur = utilisateur;
			res.redirect('/accueilAdmin');
			break;
		default:
			res.status(400).send('Profil inconnu');

	}
	
}


const updateUtilisateurCompte = async (req, res) => {
	const { id } = req.params;
	const { prenom, nom, email, mot_de_passe, profil } = req.body;

	const utilisateur = await Utilisateur.findOne({where: { utilisateurId: id } });

	const compte = await Compte.findOne({ where: { utilisateurId: id } });

	if (!utilisateur || !compte) {
		res.status(404).send('Utilisateur introuvable');
		return;
	}

	switch (utilisateur.profil) {
		case 'etudiant':
			await Etudiant.update({}, { where: { utilisateurId: id } });
			await compte.update({ email, mot_de_passe });
			await utilisateur.update({prenom, nom , profil },{ where: { utilisateurId: id } });
			break;
		case 'professeur':
			await Professeur.update({ }, { where: { utilisateurId: id } });
			await compte.update({ email, mot_de_passe });
			await utilisateur.update({prenom, nom , profil },{ where: { utilisateurId: id } });
			break;
		case 'admin':
			await Administrateur.update({ }, { where: { utilisateurId: id } });
			await compte.update({ email, mot_de_passe });
			await utilisateur.update({prenom, nom , profil },{ where: { utilisateurId: id } });
			break;
		default:
			res.status(400).send('Profil inconnu');

	}
	res.redirect('/accueilAdmin');

}


const deleteUtilisateurCompte = async (req, res) => {
	const { id } = req.params;

	const utilisateur = await Utilisateur.findOne({ where: { utilisateurId: id } });
	const compte = await Compte.findOne({ where: { utilisateurId: id } });

	if (!utilisateur || !compte) {
		res.status(404).send('Utilisateur introuvable');
		return;

	}
	switch (utilisateur.profil) {
		case 'etudiant':
			await Etudiant.destroy({ where: { utilisateurId: id } });
			await compte.destroy();
			await utilisateur.destroy();
			break;
		case 'professeur':
			await Professeur.destroy({ where: { utilisateurId: id } });
			await compte.destroy();
			await utilisateur.destroy();
			break;
		case 'admin':
			await Administrateur.destroy({ where: { utilisateurId: id } });
			await compte.destroy();
			await utilisateur.destroy();
			break;
		default:
			res.status(400).send('Profil inconnu');
	}

	res.redirect('/accueilAdmin');

}

const listUtilisateurCompte = async (req, res) => {
	const utilisateurs = await Utilisateur.findAll({
		include: [
			{
				model: Compte
			}
		],


	});
	console.log(utilisateurs)
	res.json(utilisateurs);

}

const accueilEtuPage = (req, res) => {
    res.render('./pages/accueilEtu.ejs');
};

const accueilProfPage = (req, res) => {
    res.render('./pages/accueilProf.ejs');
};
const accueilAdminPage = (req, res) => {
    res.render('./pages/accueilAdmin.ejs');
};

module.exports = {inscriptionPage, inscription, connexionPage, connexion, accueilEtuPage,
	accueilProfPage,accueilAdminPage,updateUtilisateurCompte,deleteUtilisateurCompte,listUtilisateurCompte};



