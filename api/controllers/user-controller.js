import {User} from '../database/user';
import {Role} from '../database/role';

export const getUsers = async (req, res) => {
    try {
        res.json(await User.findAll());
        console.log('A user was returned');
    } catch (e) {
        res.status(400);
        res.json({error: e})
    }
}

export const getUser = async (req, res) => {
    try {
        res.json((await User.findById(req.params.id)).get());
        console.log('A user was returned');
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
            console.log('User not found');
            res.json({error: 'login.snackbar.userNotFound'})
        }
        if(user && credentials.password !== user.password) {
            console.log('Invalid Password');
            res.json({error: 'login.snackbar.invalidPassword'});
        } else if(user && credentials.password === user.password) {
            console.log('SignIn Success');
            const role = await Role.findOne({where: {id: user.roleId}});
            res.json({userid: user.id, username: user.username, role: role.roleName});
        }
    }
}
