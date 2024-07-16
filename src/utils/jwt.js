import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const PRIVATE_KEY = 'secret-pass';

export const generateToken = user => jwt.sign(user, PRIVATE_KEY, { expiresIn: '24h' });

export const parseJwt = (token) => {
    const decToken = jwt.verify(token, PRIVATE_KEY);
    return decToken;
}

