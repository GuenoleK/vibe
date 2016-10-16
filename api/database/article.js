import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';
import {User} from './user';

export const Article = dbSetup.define(
  'article',
  {
    description: {
      type: sequelizer.STRING,
      allowNull: true
    },
    link: {
      type: sequelizer.STRING,
      allowNull: true
    },
    createdAt: {
      type: sequelizer.DATE
    },
    modifiedAt: {
      type: sequelizer.DATE,
      allowNull: true
    },
    file: {
      type: sequelizer.BLOB
    },
    audio: {
      type: sequelizer.BLOB,
      allowNull: true
    },
    author: {
      type: sequelizer.BLOB
    }
  }
);
Article.belongsTo(User);
