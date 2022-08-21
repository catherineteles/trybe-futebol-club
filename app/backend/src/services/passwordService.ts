import * as bcrypt from 'bcryptjs';

const passwordService = {
  encryptPassword: (password: string) => {
    const salt = bcrypt.genSaltSync(5);
    const encryptedPassword = bcrypt.hashSync(password, salt);
    return encryptedPassword;
  },
  checkPassword: (password: string, hash: string) => bcrypt.compareSync(password, hash),
};

export default passwordService;
