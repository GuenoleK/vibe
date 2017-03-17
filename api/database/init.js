import {dbSetup} from './index';
import {createUser, createUserAndArticle} from './helpers/user-helpers';
import {createRoles} from './helpers/role-helpers';
import {createArticle} from './helpers/article-helpers';
import {Role} from './role';
import faker from 'faker';
const fs = require('fs');
const uuid = require('node-uuid');
const Jimp = require('jimp');

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

    const createDocsReferencesDictionary = () => {
        let dictionary = [];
        fs.readdir('../tablature_ressources', (err, files) => {
            files.forEach(file => {
                const name = uuid.v4();
                const associatedFilename = `${name}.jpg`;
                dictionary[file] = associatedFilename;

                Jimp.read(`../tablature_ressources/${file}`, function (err, image) {
                    if (err) throw err;
                    image.quality(60).write(`../tablature_copy/${associatedFilename}`); // save
                });
            });
        });
        console.log('Created dictionary', dictionary);
        return dictionary;
    }

    const dictionary = createDocsReferencesDictionary();

    // Populate the database with data
    createRoles();
    createUserAndArticle({
        firstName: 'Guénolé', lastName: 'kikabou', username: 'guenole_k', password: 'admin', roleId: 1
    }, dictionary);
}

initDb();
