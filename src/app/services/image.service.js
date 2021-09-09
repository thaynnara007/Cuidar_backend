const { Image } = require('../models');

const getByStepId = (stepId) => Image.findOne({
  where: {
    stepId,
  },
});

const create = async (stepId, { fileName, token }) => {
  const data = {
    stepId,
    imageName: fileName,
    token,
  };

  const picture = await Image.create(data);

  return picture;
};

const edit = async (stepId, { fileName, token }) => {
  const data = {
    imageName: fileName,
    token,
  };

  await Image.update(data, {
    where: {
      stepId,
    },
  });

  return getByStepId(stepId);
};

const delet = (picture) => picture.destroy();

module.exports = {
  getByStepId,
  create,
  edit,
  delet,
};
