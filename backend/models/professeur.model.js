    module.exports = (sequelize, DataTypes) => {
        const Professeur = sequelize.define('Professeur', {
            utilisateurId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'Utilisateurs',
                    key: 'id'
                }
            }
        });

        return Professeur;
    };
