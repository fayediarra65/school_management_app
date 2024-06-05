const db = require('../config/db.config');
const {Professeur,Matiere} = require("../config/db.config");


const ajouterMatier = async (req, res) => {
    try {
        const {nomMatiere} = req.body;
        console.log(req.body)
        const matiereToSave = {nomMatiere};
        const matiere = await Matiere.create(matiereToSave);
        res.redirect('/accueilProf');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const getMatieres = async (req, res) => {
    try {
        const matieres = await Matiere.findAll();
        res.redirect('/accueilProf');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const updateMatiere = async (req, res) => {
    try {
        const {id} = req.params;
        const {nomMatiere} = req.body;
        const matiereToUpdate = {nomMatiere};
        const matiere = await Matiere.update(matiereToUpdate, {where: {id}});
        res.redirect('/allMatierePage');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const  deleteMatiere = async(req,res)=>{
    try {
        const {id} = req.params;
        const matiere = await Matiere.destroy({where: {id}});
        res.redirect('/allMatierePage');
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}



const allMatierePage = async (req, res) => {
    const matieres = await Matiere.findAll();

    res.render('./pages/crud-prof/show-matiere.ejs', {matieres});
}

const updateMatierePage = async (req, res) => {
    const {id} = req.params;
    const matiere = await Matiere.findOne({where: {id}});
    res.render('./pages/crud-prof/update-matiere.ejs', {matiere});
}

/***
 TODO: creation des methode CRUD pour: Note, Groupe, Examen
 Puis creer les methodes render pour les pages de CRUD
 N'oublier pas de creer les routes pour les pages de CRUD
 Aussi d'exporter les methodes CRUD
 */

module.exports ={
    ajouterMatier,
    getMatieres,
    updateMatiere,
    deleteMatiere,
    updateMatierePage,
    allMatierePage
}

