import jwt from 'jsonwebtoken';

export const createToken = async (id, maxAge) => {
    const token = await jwt.sign({id}, process.env.SECRET_KEY, {expiresIn: maxAge});
    return token;
}