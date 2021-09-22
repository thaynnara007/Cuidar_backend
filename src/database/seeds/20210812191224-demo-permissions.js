/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */

const { Op } = require('sequelize');

const permissions = [
  {
    name: 'criar atividade',
    description:
      'Permite que o usuário registre novas categorias, atividades, etaps e edite as já existentes.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'criar usuário',
    description:
      'Permite que o usuário registre novos usuários e edite as permissões dos já existentes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'criar paciente',
    description: 'Permite que o usuário cadastre novos pacientes.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'ler usuário',
    description: 'Permite que o usuário veja os dados dos usuários cadastrados',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'ler paciente',
    description:
      'Permite que o usuário veja os dados dos pacientes cadastrados, incluindo o histórico dos pacientes',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'remover paciente',
    description: 'Permite que o usuário delete algum paciente cadastrado.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'remover usuário',
    description: 'Permite que o usuário delete algum usuário cadastrado.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'remover atividade',
    description:
      'Permite que o usuário delete alguma atividade, etapa ou categoria cadastrada.',
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
          'criar atividade',
          'criar usuário',
          'criar paciente',
          'ler usuário',
          'remover paciente',
          'delete_patients',
          'remover usuário',
          'remover atividade',
        ],
      },
    },
    {},
  ),
};
