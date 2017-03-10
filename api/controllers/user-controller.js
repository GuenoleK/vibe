import {User} from '../database/user';

export const getUser = async (req, res, next) => {
    console.log((await User.findById(req.params.id)));
    res.status(200).json({
        message: req.params.id
    })
}
