import bcrypt from 'bcrypt'; //Encriptacion

// Hasheamos el Password
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));
// Validamos el Password
export const validatePass = (password,userPassword) =>{
    console.log(`tengo el user ${userPassword} y tengo el password: ${password}`)
    bcrypt.compareSync(password, userPassword);
    console.log(bcrypt.compareSync(password, userPassword));
    return (bcrypt.compareSync(password, userPassword));   
} 