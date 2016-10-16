import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';
import {Article} from './article';

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
      type: sequelizer.STRING,
      allowNull: true
    },
    password: {
      type: sequelizer.STRING
    },
  },
  {timestamps: false}
);
User.hasMany(Article, {as: 'Articles'})
