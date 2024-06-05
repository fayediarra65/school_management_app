module.exports = (sequelize, DataTypes) => {
    const Etudiant = sequelize.define('Etudiant', {
        utilisateurId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Utilisateurs',
                key: 'id'
            }
        }
    });

    return Etudiant;
};
  