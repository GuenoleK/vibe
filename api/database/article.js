import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';

export const Article = dbSetup.define(
  'article',
  {
    corpus: {
      type: sequelizer.STRING,
      allowNull: true
    },
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
      type: sequelizer.BLOB,
      allowNull: true
    },
    audio: {
      type: sequelizer.BLOB,
      allowNull: true
    }
  },
  {timestamps: false}
);
