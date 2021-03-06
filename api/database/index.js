import Sequelize from 'sequelize';
import {join} from 'path';

/**
* Parameters (database, username, password)
* Dialect : 'mysql'|'sqlite'|'postgres'|'mssql'
*/
export const dbSetup = new Sequelize('vibeDB', null, null, {
    host: 'localhost',
    dialect: 'sqlite',
    storage: join(__dirname, './vibeDB.sqlite'),

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

export const sequelizer = Sequelize;
