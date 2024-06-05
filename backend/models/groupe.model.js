module.exports = (sequelize, DataTypes) => {
    const Groupe = sequelize.define('Groupe', {
      numeroGroupe: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      nombreCompte: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Groupe;
  };
  