/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const images = [
  {
    imageName: 'solid_step1.png',
    token: '6784ac23-49c2-46f7-ac11-fd1990af8778',
    stepId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'solid_step2.png',
    token: '2195135a-143b-4582-b44f-81ca56451b2e',
    stepId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'solid_step3.png',
    token: '30bec57e-163e-4ae0-91cf-e9bd0eabf557',
    stepId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'solid_step4.png',
    token: '0363c4a3-fa71-45a7-b91a-1e961a8fba2b',
    stepId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'solid_step5.png',
    token: 'f925ea11-4aff-4ff7-a75b-216eb3e06cb6',
    stepId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step1.png',
    token: '27eac5c9-6a4c-42fc-b798-10f9e8236457',
    stepId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step2.png',
    token: 'dc9fa350-8e29-47c6-bf8d-95f52620c5a0',
    stepId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step3.png',
    token: '1ab8d0da-024c-4d28-aaf3-e7d0f9aa21b3',
    stepId: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step4.png',
    token: '9cd3a8d4-33d7-4dc7-8b26-4864b6cec2fa',
    stepId: 9,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step5.png',
    token: '183b9d79-c6c1-4147-8508-ae34b8d9c448',
    stepId: 10,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step6.png',
    token: '7de7a59b-38a4-4c86-8e3a-0c7c4524eea5',
    stepId: 11,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pasty_step7.png',
    token: 'c2540b7f-6567-4de4-b925-7f893a39ca41',
    stepId: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'liquid_step1.png',
    token: '60da9fbd-1de6-4e44-92e4-45983134987c',
    stepId: 13,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'liquid_step2.png',
    token: '05c08d9c-880b-4b34-8aa8-9d8638c638eb',
    stepId: 14,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'liquid_step3.png',
    token: 'dfe265a0-0505-4777-8726-7e850a9553cc',
    stepId: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'liquid_step4.png',
    token: '1e023b1c-2daa-4249-a7d7-ec51ed279fbb',
    stepId: 16,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'liquid_step5.png',
    token: '4c01b21b-1deb-4977-8999-e8e80c0301b4',
    stepId: 17,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'body_step1.png',
    token: '219ac361-4794-4329-87a8-e84302394eab',
    stepId: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'body_step2.png',
    token: '280577c3-44ab-4e80-9a2d-04b334e1a9db ',
    stepId: 19,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'body_step3.png',
    token: ' 939e784b-cba4-4881-a77c-0f948281ce6d',
    stepId: 20,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'body_step4.png',
    token: 'bbe56d71-bcea-4968-a749-2539be0f5703',
    stepId: 21,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'body_step5.png',
    token: '0e985a75-9e9d-4463-baf5-219578917bef',
    stepId: 22,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'body_step6.png',
    token: '5f433647-76a9-4b58-b38d-aa5ef8fe9745',
    stepId: 23,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step1.png',
    token: 'a1da6d21-b75a-4bfc-b91a-33cc9654c9b3',
    stepId: 24,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step2.png',
    token: '189e9e27-3bfe-4a93-8091-9bf0f1a33897',
    stepId: 25,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step3.png',
    token: '85428622-aa50-4086-b3c2-e22da6598d54',
    stepId: 26,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step4.png',
    token: 'c8139776-edc4-44f3-a49f-d13f6c9e786a',
    stepId: 27,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step5.png',
    token: 'b4432a1b-8f15-4a17-84c7-ff287ade4046',
    stepId: 28,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step6.png',
    token: '406c8e12-dee5-4620-9b1b-0a033cdc2867',
    stepId: 29,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'tooth_step7.png',
    token: 'b66a33cc-0d4c-406d-8648-d0e8876b10c7',
    stepId: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'shirt_step1.png',
    token: 'd46f0f24-cc75-46eb-940f-679ce816df73',
    stepId: 31,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'shirt_step2.png',
    token: '727f0837-0f7f-46d4-87ad-38eb5fd85a32',
    stepId: 32,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'shirt_step3.png',
    token: '756fdc7a-8392-4bc0-a905-ecbdc663b1c0',
    stepId: 33,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'shirt_step4.png',
    token: '437a46b6-6bc5-4d28-a0c0-be0b06b85e38',
    stepId: 34,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'shirt_step5.png',
    token: 'b70c631f-a463-4f2c-a805-7d1ba365617c',
    stepId: 35,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'shirt_step6.png',
    token: '92ceb1aa-907f-4947-ac53-bb6021fe8bf5',
    stepId: 36,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pants_step1.png',
    token: '2ed9161a-1550-4d94-ab01-f3234725e9ab',
    stepId: 37,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pants_step2.png',
    token: '0a3edd9c-daee-4574-b3b1-3f3dbe854f68',
    stepId: 38,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pants_step3.png',
    token: '100ab7b2-ae12-4117-b31d-fdb4df42afc3',
    stepId: 39,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pants_step4.png',
    token: 'feb0f511-74b2-4ba2-9d1e-3e72d9be2ec8',
    stepId: 40,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    imageName: 'pants_step5.png',
    token: 'a9b25f96-9a8d-46ac-b080-231e4e006916',
    stepId: 41,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
const ids = [];
for (let i = 1; i <= 41; i += 1) ids.push(i);

module.exports = {
  up: async (queryInterface) => {
    for (const image of images) {
      const existedImage = await queryInterface.rawSelect(
        'Images',
        {
          where: {
            imageName: image.imageName,
            token: image.token,
          },
        },
        ['id'],
      );

      if (!existedImage || existedImage.length === 0) await queryInterface.bulkInsert('Images', [image], {});
      else console.log('Image já existe');
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'Images',
    {
      id: {
        [Op.in]: ids,
      },
    },
    {},
  ),
};
