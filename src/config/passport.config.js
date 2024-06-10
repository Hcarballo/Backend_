//PASSWORD JWT
import passport from "passport";
import { Strategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { PRIVATE_KEY } from "../utils/jwt.js"

const JWTStrategy = Strategy;
const JWTExtract = ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) token = req.cookies['token'];
    return token;
}

export const initializePassport = () => {
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([cookieExtractor]),
        secretOrKey: PRIVATE_KEY
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))
}
