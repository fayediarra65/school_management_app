module.exports = (sequelize, DataTypes) => {
    const Matiere = sequelize.define('Matiere', {
        nomMatiere: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Matiere;
};
