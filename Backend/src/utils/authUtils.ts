import bcrypt from 'bcrypt';

// ~ Función encriptadora...
export const HashPassword = async (
    password: string,
): Promise<string> => {
    const saltRounds = 10;

    return await bcrypt.hash(password, saltRounds);
};

// ~ Función desncriptadora...
export const ComparePassword = async (
    password: string,
    hashedPassword: string,
): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};
