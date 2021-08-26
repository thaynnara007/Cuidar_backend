/* eslint-disable no-await-in-loop, no-console, no-restricted-syntax */
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');

const patients = [
  {
    name: 'Monkey D.',
    lastName: 'Luffy',
    cpf: '10015925458',
    email: 'luffy@email.com',
    birthday: new Date(1996, 5, 24),
    phoneNumber: '123456789',
    passwordHash: '123luffy',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Tony',
    lastName: 'Chopper',
    cpf: '12345678989',
    email: 'chopper@gmail.com',
    birthday: new Date(2002, 5, 24),
    phoneNumber: '789456123',
    passwordHash: '123chopper',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Nico',
    lastName: 'Robin',
    cpf: '75326248486579',
    email: 'robin@gmail.com',
    birthday: new Date(1990, 5, 24),
    phoneNumber: '(83)159753456852',
    passwordHash: '123robin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface) => {
    for (const patient of patients) {
      patient.passwordHash = await bcrypt.hash(patient.passwordHash, 5);

      const existedPatient = await queryInterface.rawSelect(
        'Patients',
        {
          where: {
            email: patient.email,
          },
        },
        ['id']
      );

      if (!existedPatient || existedPatient.length === 0)
        await queryInterface.bulkInsert('Patients', [patient], {});
      else console.log(`paciente com o email '${patient.email}' já existe`);
    }
  },

  down: (queryInterface) =>
    queryInterface.bulkDelete(
      'Patients',
      {
        email: {
          [Op.in]: ['luffy@email.com', 'chopper@gmail.com', 'robin@gmail.com'],
        },
      },
      {}
    ),
};
