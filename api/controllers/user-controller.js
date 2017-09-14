import {User} from '../database/user';
import {Role} from '../database/role';

export const getUsers = async (req, res) => {
    try {
        res.json(await User.findAll());
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}

export const getUser = async (req, res) => {
    try {
        res.json((await User.findById(req.params.id)).get());
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}

export const signIn = async (req, res) => {
    const credentials = req.body;
    if(credentials.username && credentials.password) {
        const user = await User.findOne({where: {username: credentials.username}});
        if(!user) {
            res.json({error: 'login.snackbar.userNotFound'})
        }
        if(user && credentials.password !== user.password) {
            res.json({error: 'login.snackbar.invalidPassword'});
        } else if(user && credentials.password === user.password) {
            const role = await Role.findOne({where: {id: user.roleId}});
            res.json({userid: user.id, username: user.username, role: role.roleName});
        }
    }
}
