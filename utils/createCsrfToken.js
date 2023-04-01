import crypto from 'crypto';

export const createCsrfToken = () => {
    return crypto.randomBytes(32).toString('hex');
}
