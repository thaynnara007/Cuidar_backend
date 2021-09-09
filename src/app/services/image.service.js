const { Image } = require('../models');

const getByStepId = (stepId) => Image.findOne({
  where: {
    stepId,
  },
});

const create = async (stepId, { fileName, token }) => {
  const data = {
    stepId,
    image_name: fileName,
    token,
  };

  const picture = await Image.create(data);

  return picture;
};

const edit = async (posterId, { fileName, token }) => {
  const data = {
    imageName: fileName,
    token,
  };

  await Image.update(data, {
    where: {
      posterId,
    },
  });

  return getByStepId(posterId);
};

const delet = (picture) => picture.destroy();

module.exports = {
  getByStepId,
  create,
  edit,
  delet,
};
