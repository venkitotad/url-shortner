import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export  async function createUserToken(payload){
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

export function validateUserToken(token){
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
}