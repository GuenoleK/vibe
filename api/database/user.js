import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';
import {Article} from './article';

export const User = dbSetup.define(
    'user',
    {
        firstName: { type: sequelizer.STRING },
        lastName: { type: sequelizer.STRING },
        username: { type: sequelizer.STRING, allowNull: false, unique: true },
        password: { type: sequelizer.STRING, allowNull: false },
    },
    {
        timestamps: false
    }
);
User.hasMany(Article, {as: 'Articles'})
