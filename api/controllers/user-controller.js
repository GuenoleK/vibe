import {User} from '../database/user';

export const getUser = async (req, res, next) => {
    try {
        res.json((await User.findById(req.params.id)).get());
        console.log('A user was returned');
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}
