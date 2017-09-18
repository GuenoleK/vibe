import {Article} from '../article';
import {User} from '../user';
import faker from 'faker';

export const createArticle = (data, userID) => {
    try {
        const user = User.findById(userID);
        // const Article = Article.create(data);
        user.then((owner) => owner.createArticle(data).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n')) );
    } catch (error) {
        console.log(`Error while trying to insert the article in the database : ${error}`);
    }
}

export const createAllArticles = () => {
    try {
        let data = [];
        fs.readdir('../tablature_ressources', (err, files) => {
            files.forEach(file => {
                data.push({
                    tablature: base64_encode(`../docs/${file}`),
                    title: title.split('.')[0],
                    corpus: faker.lorem.sentences(),
                    description: faker.lorem.sentence(),
                    link: 'htpp://google.com',
                    createdAt: new Date(),
                    userId: 11
                })
            });
        });
        Article.bulkCreate(data);
    } catch(e) {
        console.log(e);
    }
}

export const createFakeArticles = (articlesNumber) => {
    try {
        let data = [];
        for (let i = 0; i < articlesNumber; i++) {
            data.push({
                tablature: base64_encode('../tablature_ressources/20151120_181753.jpg'),
                title: faker.company.companyName(), corpus: faker.lorem.sentences(),
                description: faker.lorem.sentence(), link: 'htpp://google.com',
                createdAt: new Date(),
                userId: 11
            })
        }
        Article.bulkCreate(data);
        console.log('=============================\n10 articles successfully inserted.\n=============================\n');
    } catch (error) {
        console.log(`Error while trying to insert an user in the database : ${error}`);
    }
}
