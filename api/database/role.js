import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';
import {User} from './user';

export const Role = dbSetup.define(
  'role',
  {
    roleName: {
      type: sequelizer.STRING
    }
  },
  {timestamps: false}
);
Role.hasMany(User, {as: 'Users'});
