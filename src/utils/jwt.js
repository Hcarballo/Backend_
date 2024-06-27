import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

export const PRIVATE_KEY = 'secret-pass';

export const generateToken = user => jwt.sign(user, PRIVATE_KEY, {expiresIn: '24h'});
