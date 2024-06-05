module.exports = (sequelize, DataTypes) => {
    const Faire = sequelize.define('Faire', {
      noteEtudiant: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    return Faire;
  };
  