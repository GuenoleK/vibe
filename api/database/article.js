import {dbSetup, sequelizer} from './index';
import Sequelize from 'sequelize';

export const Article = dbSetup.define(
    'article',
    {
        title: {type: sequelizer.STRING, allowNull: false},
        corpus: { type: sequelizer.STRING, allowNull: true },
        description: { type: sequelizer.STRING, allowNull: true },
        link: { type: sequelizer.STRING, allowNull: true },
        createdAt: { type: sequelizer.DATE },
        modifiedAt: { type: sequelizer.DATE, allowNull: true },
        tablature: { type: sequelizer.BLOB('long'), allowNull: true },
        audio: { type: sequelizer.BLOB, allowNull: true }
    },
    {
        timestamps: false
    }
);
