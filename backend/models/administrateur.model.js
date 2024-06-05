module.exports = (sequelize, DataTypes) => {
    const Administrateur = sequelize.define('Administrateur', {
        utilisateurId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Utilisateurs',
                key: 'id'
            }
        }
    });

    return Administrateur;
};
