import {User} from '../user';
import {Role} from '../role';
import {Article} from '../article';
import faker from 'faker';
var fs = require('fs');

const base64_encode = (file) => {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap, 'binary').toString('base64');
}

export const createFakeUsers = (userNumber) => {
    try {
        let data = [];
        for (let i = 0; i < userNumber; i++) {
            data.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                username: faker.internet.userName(),
                password: 'user',
                roleId: 3
            });
        }
        User.bulkCreate(data);
        console.log('=============================\n10 users successfully inserted.\n=============================\n');
    } catch (error) {
        console.log(`Error while trying to insert an user in the database : ${error}`);
    }
}

export const createUser = (data) => {
    try {
        const role = Role.findById(1);
        // const user = User.create(data);
        role.then((user) => user.createUser(data));
        console.log('=============================\nUser was successfully inserted.\n=============================\n')
    } catch (error) {
        console.log(`Error while trying to insert the user in the database : ${error}`);
    }
}

export const createUserAndArticle = (userData, articleData) => {
    try {
        const role = Role.findById(1);
        role.then((user) => user.createUser(userData).then(
            (article) => {
                fs.readdir('../tablature_ressources', (err, files) => {
                    files.forEach(file => {
                        // const fileName = file.split('').map(e => {
                        //     if(e === '\'' || e === ',') {
                        //         return ' ';
                        //     }
                        //     return e;
                        // }).join('');
                        article.createArticle(
                            {
                                tablature: base64_encode(`../tablature_ressources/${file}`),
                                title: file.split('.')[0],
                                corpus: faker.lorem.sentences(),
                                description: faker.lorem.sentence(), link: 'htpp://google.com',
                                createdAt: new Date(),
                                userId: user.dataValues.id
                            }
                        )
                    });
                });
            }
        ));
    } catch (error) {
        console.log(`Error while trying to insert the user in the database : ${error}`);
    }
}
