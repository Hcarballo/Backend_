import bcrypt from 'bcrypt';

export const createHash = async (password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10));


export const validatePass = async (password,user) => bcrypt.compareSync(password, user.password);