const { FIREBASE } = require('../../config/environment');

module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      imageName: {
        type: DataTypes.STRING,
        unique: true,
      },
      token: {
        type: DataTypes.STRING,
      },
      pictureUrl: {
        type: DataTypes.VIRTUAL,
        get() {
          return `https://firebasestorage.googleapis.com/v0/b/${
            FIREBASE.storageBucket
          }/o/${this.getDataValue(
            'imageName',
          )}?alt=media&token=${this.getDataValue('token')}`;
        },
      },
    },
    {},
  );
  Image.associate = (models) => {
    Image.belongsTo(models.Step, {
      foreignKey: 'stepId',
      as: 'step',
      onDelete: 'CASCADE',
    });
  };

  return Image;
};
