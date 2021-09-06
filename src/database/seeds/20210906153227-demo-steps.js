/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const steps = [
  {
    name: 'Etapa 1',
    description: 'Fale o nome da comida para a criança!',
    number: 1,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Coloque-a para sentir o cheiro da comida!',
    number: 2,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Coloque-a para pegar o alimento!',
    number: 3,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Coloque a criança para comer o alimento!',
    number: 4,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'O desenvolvimento do seu filho agradece!',
    number: 5,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 1',
    description: 'Escolha os ingredientes para fazer a sopinha!',
    number: 1,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Fale o nome dos ingredientes para ela!',
    number: 2,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Coloque-a para sentir o cheiro dos ingredientes!',
    number: 3,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Coloque-a para pegar nos ingredientes!',
    number: 4,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 5',
    description: 'Prepare a sopinha enquanto a criança a observa!',
    number: 5,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 6',
    description: 'Agora é só comer a sopinha, seja com a mão ou com a colher!',
    number: 6,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'O desenvolvimento do seu filho agradece!',
    number: 7,
    activityId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 1',
    description: 'Encha o copo de bico com o líquido, pode ser água ou suco!',
    number: 1,
    activityId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Coloque a criança para pegar no copo!',
    number: 2,
    activityId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Coloque-a para beber o líquido com calma!',
    number: 3,
    activityId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Agora pode deixar ela brincar com o copo vazio!',
    number: 4,
    activityId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'O desenvolvimento do seu filho agradece!',
    number: 5,
    activityId: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 1',
    description:
      'Tire a roupa movimentando os membros superiores e inferiores!',
    number: 1,
    activityId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Coloque a criança sentada no local do banho!',
    number: 2,
    activityId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Estimule-a para que ela vá se ensaboando!',
    number: 3,
    activityId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Deixe ela ir retirando o shampoo de seu cabelo!',
    number: 4,
    activityId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 5',
    description:
      'Deixe que ela possa brincar com o sabonete, o chuveirinho, etc.',
    number: 5,
    activityId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'Você foi muito bem!',
    number: 6,
    activityId: 4,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 1',
    description: 'Mostre a escova para a criança!',
    number: 1,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Passe a escova na mão da criança!',
    number: 2,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Deixa-a brincar, pegar, morder a escova!',
    number: 3,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Fale o nome do objeto para a criança!',
    number: 4,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 5',
    description: 'Converse com ela, enquanto pede para ir abrindo a boca!',
    number: 5,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 6',
    description: 'Realize a escovação e higienização !',
    number: 6,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'Você foi muito bem!',
    number: 7,
    activityId: 5,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 1',
    description: 'Escolha a blusinha que será vestida!',
    number: 1,
    activityId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Encoste a criança em uma superfície.',
    number: 2,
    activityId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Coloque o braço direito, na manga enquanto conversa com ela!',
    number: 3,
    activityId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Agora o braço esquerdo, enquanto vai conversa com ela!',
    number: 4,
    activityId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 5',
    description: 'Mantendo a conversa, insira a cabeça na gola da blusa!',
    number: 5,
    activityId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'O seu progresso está melhorando!',
    number: 6,
    activityId: 6,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 1',
    description: 'Escolha a calça ou o short que a criança irá vestir!',
    number: 1,
    activityId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 2',
    description: 'Encoste a criança em uma superfície!',
    number: 2,
    activityId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 3',
    description: 'Coloque a perna direita na calça enquanto conversa com ela!',
    number: 3,
    activityId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Etapa 4',
    description: 'Coloque a perna esquerda, enquanto conversa com ela!',
    number: 4,
    activityId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'PARABÉNS',
    description: 'O seu progresso está melhorando!',
    number: 5,
    activityId: 7,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const ids = [];
for (let i = 1; i <= 41; i += 1) ids.push(i);

module.exports = {
  up: async (queryInterface) => {
    for (const step of steps) {
      const existedStep = await queryInterface.rawSelect(
        'Steps',
        {
          where: {
            name: step.name,
            description: step.description,
            number: step.number,
            activityId: step.activityId,
          },
        },
        ['id'],
      );

      if (!existedStep || existedStep.length === 0) await queryInterface.bulkInsert('Steps', [step], {});
      else console.log('Esse passo já existe');
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'Steps',
    {
      id: {
        [Op.in]: ids,
      },
    },
    {},
  ),
};
