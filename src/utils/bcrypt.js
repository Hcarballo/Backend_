import bcrypt from 'bcrypt'; //Encriptacion

// Hasheamos el Password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// Validamos el Password
export const validatePass = (user, password) => bcrypt.compareSync(password, user.password);