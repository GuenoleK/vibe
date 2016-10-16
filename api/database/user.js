import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';

export const User = dbSetup.define(
  'user',
  {
    firstName: {
      type: sequelizer.STRING
    },
    lastName: {
      type: sequelizer.STRING
    },
    pseudo: {
      type: sequelizer.STRING
    },
    password: {
      type: sequelizer.STRING
    },
    role: {
      type: sequelizer.STRING
    }
  },
  {timestamps: false}
);
