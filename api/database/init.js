import {sequelize, User} from './index';
import faker from 'faker';

/** Create the database. */
async function initDb() {

    // Creates the file.
    try {
        await sequelize.authenticate();
        console.log('Connection to the database successful.');
    } catch (error) {
        console.log(`Error while trying to connect to the database: ${error}`);
    }

    // Syncs the model
    try {
        await sequelize.sync({ force: true });
        console.log('Database sync sucessful');
    } catch (error) {
        console.log(`Error while trying to sync the model with the database : ${error}`);
    }

    // if (process.env.DB_ENV !== 'prod') {
        // Populate the database with fake data
        try {
            let data = [];
            for (let i = 0; i < 10; i++) {
                data.push({
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName()
                });
            }
            await User.bulkCreate(data);
            console.log('10 articles successfully inserted.');
        } catch (error) {
            console.log(`Error while trying to insert an article in the database : ${error}`);
        }
    // }
}

initDb();
