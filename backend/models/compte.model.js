module.exports = (sequelize, DataTypes) => {
    const Compte = sequelize.define('Compte', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        mot_de_passe: {
            type: DataTypes.STRING,
            allowNull: false
        },
        etat: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    return Compte;
};
