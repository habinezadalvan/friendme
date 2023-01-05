import jwt from 'jsonwebtoken';

export const createToken = async (user, maxAge) => {
    const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: maxAge});
    return token;
}