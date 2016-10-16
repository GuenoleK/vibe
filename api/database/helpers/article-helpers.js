import {Article} from '../article';
import {User} from '../user';
import faker from 'faker';

export const createArticle = (data, userID) => {
  try {
    const article = Article.create(data);
  } catch (error) {
    console.log(`Error while trying to insert the article in the database : ${error}`);
  }
}
