/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const permissions = [
  {
    name: 'create_activity',
    description:
      'Permite que o usuário crie novas atividades e categorias e edite as já existentes.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'create_user',
    description:
      'Permite que o usuário crie novos usuários e edite os já existentes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'create_patient',
    description:
      'Permite que o usuário cadastre novos pacientes e edite as informações dos já cadastrados',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'read_user',
    description: 'Permite que o usuário veja os dados dos usuários cadastrados',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'read_patients',
    description:
      'Permite que o usuário veja os dados dos pacientes cadastrados',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'delete_patients',
    description: 'Permite que o usuário delete algum paciente cadastrado.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'delete_user',
    description: 'Permite que o usuário delete algum usuário cadastrado.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'delete_activity',
    description:
      'Permite que o usuário delete alguma atividade ou categoria cadastrada.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const permission of permissions) {
      const existedPermission = await queryInterface.rawSelect(
        'Permissions',
        {
          where: {
            name: permission.name,
          },
        },
        ['id'],
      );

      if (!existedPermission) await queryInterface.bulkInsert('Permissions', [permission], {});
      else console.log(`Papel de nome '${permission.name}' já existe`);
    }
  },

  down: (queryInterface) => queryInterface.bulkDelete(
    'Permissions',
    {
      name: {
        [Op.in]: [
          'create_activity',
          'create_user',
          'create_patient',
          'read_patients',
          'read_user',
          'delete_patients',
          'delete_user',
          'delete_activity',
        ],
      },
    },
    {},
  ),
};
