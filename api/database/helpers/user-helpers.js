import {User} from '../user';
import {Role} from '../role';
import faker from 'faker';

export const createFakeUsers = (userNumber) => {
    try {
        let data = [];
        for (let i = 0; i < userNumber; i++) {
            data.push({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName()
            });
        }
        User.bulkCreate(data);
        console.log('=============================\n10 articles successfully inserted.\n=============================\n');
    } catch (error) {
        console.log(`Error while trying to insert an user in the database : ${error}`);
    }
}

export const createUser = (data) => {
    try {
        const role = Role.findById(1);
        // const user = User.create(data);
        role.then((owner) => owner.createUser(data));
        console.log('=============================\nUser was successfully inserted.\n=============================\n')
    } catch (error) {
        console.log(`Error while trying to insert the user in the database : ${error}`);
    }
}

export const createUserAndArticle = (userData, articleData) => {
    try {
        const role = Role.findById(1);
        role.then((owner) => owner.createUser(userData).then(
            (thing) => {
                console.log(thing);
                console.log('=============================\nUser was successfully inserted.\n=============================\n')
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
                thing.createArticle(
                    {title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date(), userId: thing.dataValues.id}
                ).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n'))
            }
        ));
    } catch (error) {
        console.log(`Error while trying to insert the user in the database : ${error}`);
    }
}
