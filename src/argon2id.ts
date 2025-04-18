import { password } from 'bun';

export const hashPassword = async (p: string) => {
    const passwordHash = await password.hash(p, {
        algorithm: 'argon2id',
        memoryCost: 32768,
        timeCost: 3,
    });

    return passwordHash;
};

export const verifyPassword = async (p: string, h: string) => {
    const match = await password.verify(p, h);

    return match;
};