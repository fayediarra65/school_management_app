module.exports = (sequelize, DataTypes) => {
    const DispenserCours = sequelize.define('DispenserCours', {
        dateCours: {
            type: DataTypes.DATE,
            allowNull: false
        },
        dureeCours: {
            type: DataTypes.TIME,
            allowNull: false
        },
        numeroSalle: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return DispenserCours;
};
