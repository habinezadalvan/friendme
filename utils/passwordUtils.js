import  { compare, hash, genSalt } from 'bcrypt';

export const hashPassword = async (password) => {
    const salt = await genSalt(10);
    return await hash(password, salt);
}

export const comparePassword = async (password, hashPassword) => {
    return await compare(password, hashPassword);
}