import {dbSetup} from './index';
import {createUser} from './helpers/user-helpers';
import {createRoles} from './helpers/role-helpers';
import {createArticle} from './helpers/article-helpers';
import {Role} from './role';
import faker from 'faker';

/** Create the database. */
async function initDb() {

    // Creates the file.
    try {
        await dbSetup.authenticate();
        console.log('Connection to the database successful.');
    } catch (error) {
        console.log(`Error while trying to connect to the database: ${error}`);
    }

    // Syncs the model
    try {
        await dbSetup.sync({ force: true });
        console.log('Database sync sucessful');
    } catch (error) {
        console.log(`Error while trying to sync the model with the database : ${error}`);
    }

    // if (process.env.DB_ENV !== 'prod') {
        // Populate the database with fake data
        createRoles();
        createUser({firstName: 'Joe', lastName: 'Bidden', pseudo: 'jbmax', password: 'helloworld'});
        createArticle({corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date()});
    // }
}

initDb();
