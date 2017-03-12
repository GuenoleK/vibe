import {dbSetup} from './index';
import {createArticle} from './helpers/article-helpers';
import faker from 'faker';

async function insertDB() {
    try {
        createArticle({title: faker.company.companyName(), corpus: faker.lorem.sentences(), description: faker.lorem.sentence(), link: 'htpp://google.com', createdAt: new Date()}, 1);
    } catch(error) {
        console.log('Error :', error);
    }
}

insertDB();
