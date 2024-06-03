import passport from "passport";
import local from "passport-local";
import UsersManager from "../dao/managers/usersManager.js"
import { createHash, validatePass } from "../utils/bcrypt.js";
import GithubStrategy from 'passport-github2';

//const localStrategi = local.Strategy;
const userManager = new UsersManager();

//PASSWORD LOCAL----------------------------------------------------------------------

// export const initPassport = () => {
//     passport.use('register', new localStrategi({
//         passReqToCallback: true,
//         usernameField: 'email'
//     }, async (req, username, passport, done) => {
//         const { first_name, last_name } = req.body;
//         try {
//             let userFound = await userManager.getUserBy({ email: username });
//             if (userFound) {
//                 console.log('El usuario existe');
//                 return done(null, false);
//             }
//             let newUser = {
//                 first_name,
//                 last_name,
//                 email,
//                 password: createHash(passport)
//             }
//             let result = await userManager.createUser(newUser);
//             return done(null, result);
//         } catch (error) {
//             return done('error al registrar usuario' + error);
//         }
//     }))

//     passport.use('login', new localStrategi({
//         usernameField: 'email'
//     }, async (username, password, done) => {
//         try {
//             const user = userManager.getUserBy('username')
//             if (!user) {
//                 console.log('Usuario no encontrado');
//                 return done(null, false);
//             }
//             if (!validatePass(password, { password: user.password })) return (null, false)
//             return done(null, false);
//         } catch (error) {
//             return done(error);
//         }
//     }))

//     passport.serializeUser((user, done) => {
//         done(null, user._id);
//     });
//     passport.deserializeUser(async (id, done) => {
//         try {
//             let user = await userManager.getUserBy({ _id: id });
//             done(null, user);
//         } catch (error) {
//             console.log(error);
//             done(error);
//         }
//     });
// }
//-------------------------------------------------------------------------------------------------------
//PASSWORD DE TERCEROS

export const initPassport = () => {
    passport.use('github', new GithubStrategy({
        clientID: 'Iv23liPq6X8Tm3TumPGP',
        clientSecret: '395824724f0e80cacbcbf09ed5d174805cd35437',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accesToken, refreshToken, profile, done) => {
        try {
            console.log(`Esto es lo que trae ${profile._json.email}`);
            let user = await userManager.getUserBy({email: profile._json.email});
            if (!user) {
                let newuser = {
                    first_name: profile._json.name,
                    last_name: profile._json.name,
                    email: profile._json.email,
                    password: 'x'
                }                
                let result = await userManager.createUser(newuser);
                done(null, result);
            } else {
                return done(null, user); 
            }
        } catch (error) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userManager.getUserBy({ _id: id });
            done(null, user);
        } catch (error) {
            console.log(error);
            done(error);
        }
    });
}