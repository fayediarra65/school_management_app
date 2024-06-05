module.exports = (sequelize, DataTypes) => {
	const Utilisateur = sequelize.define('Utilisateur', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			unique: true
		},
		prenom: {
			type: DataTypes.STRING,
			allowNull: false
		},
		nom: {
			type: DataTypes.STRING,
			allowNull: false
		},
		profil: {
			type: DataTypes.ENUM('professeur', 'admin', 'etudiant'),
			default: 'etudiant',
			allowNull: false
		}
	});

	return Utilisateur;
};