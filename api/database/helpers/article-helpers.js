import {Article} from '../article';
import {User} from '../user';

export const createArticle = (data, userID) => {
    console.log('Hey');
    try {
        const user = User.findById(userID);
        // const Article = Article.create(data);
        user.then((owner) => owner.createArticle(data).done(console.log('=============================\nArticle was successfully inserted.\n=============================\n')) );
    } catch (error) {
        console.log(`Error while trying to insert the article in the database : ${error}`);
    }
}
