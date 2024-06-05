const { Sequelize,DataTypes  } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(
  'bd_gestion_scolaire',
   'root',
   '030105',
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT
  }
);
sequelize.authenticate()
    .then(() => console.log('Connexion réussie...'))
    .catch(err => console.log('Erreur de connexion: ' + err));



// Import des modèles
const Etudiant = require('../models/etudiant.model')(sequelize, DataTypes);
const Utilisateur = require('../models/utilisateur.model')(sequelize, DataTypes);
const Administrateur = require('../models/administrateur.model')(sequelize, DataTypes);
const Professeur = require('../models/professeur.model')(sequelize, DataTypes);
const Compte = require('../models/compte.model')(sequelize, DataTypes);
const Matiere = require('../models/matiere.model')(sequelize, DataTypes);
const DispenserCours = require('../models/dispenser.cours.model')(sequelize, DataTypes);
const Evaluation = require('../models/evaluation.model')(sequelize, DataTypes);
const Groupe = require('../models/groupe.model')(sequelize, DataTypes);
const Faire = require('../models/faire.model')(sequelize, DataTypes);



// Relations entre Utilisateur et Compte
Utilisateur.hasOne(Compte, { foreignKey: 'utilisateurId' });
Compte.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

// Relations entre Utilisateur et ses sous-classes
Utilisateur.hasOne(Administrateur, { foreignKey: 'utilisateurId' });
Administrateur.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

Utilisateur.hasOne(Etudiant, { foreignKey: 'utilisateurId' });
Etudiant.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

Utilisateur.hasOne(Professeur, { foreignKey: 'utilisateurId' });
Professeur.belongsTo(Utilisateur, { foreignKey: 'utilisateurId' });

// Relations entre Etudiant et Groupe
Etudiant.belongsTo(Groupe, { foreignKey: 'groupeId' });
Groupe.hasMany(Etudiant, { foreignKey: 'groupeId' });

// Relations entre Professeur et Matiere via DispenserCours
Professeur.belongsToMany(Matiere, { through: DispenserCours });
Matiere.belongsToMany(Professeur, { through: DispenserCours });

// Relations entre Etudiant et Evaluation via Faire
Etudiant.belongsToMany(Evaluation, { through: Faire });
Evaluation.belongsToMany(Etudiant, { through: Faire });

// Relations entre Matiere et Groupe via Evaluation
Matiere.belongsToMany(Groupe, { through: Evaluation });
Groupe.belongsToMany(Matiere, { through: Evaluation });



module.exports = {
    sequelize,
    Utilisateur,
    Compte,
    Administrateur,
    Etudiant,
    Professeur,
    Matiere,
    Groupe,
    Evaluation,
    DispenserCours,
    Faire
};
