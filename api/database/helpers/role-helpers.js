import {Role} from '../role';
import faker from 'faker';

export const createRoles = () => {
  try {
    Role.bulkCreate([{roleName: 'admin'}, {roleName: 'moderator'}, {roleName: 'reader'}]);
    console.log('=============================\nRoles were successfully inserted.\n=============================\n');
  } catch (error) {
    console.log(`Error while trying to insert roles in the database : ${error}`);
  }
}

export const createUser = (roleName) => {
  try {
    Role.create(roleName);
    console.log('=============================\nThe role was successfully inserted.\n=============================\n');
  } catch (error) {
    console.log(`Error while trying to insert the role in the database : ${error}`);
  }
}
