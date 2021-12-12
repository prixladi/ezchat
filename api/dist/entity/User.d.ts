export declare class User {
    id: string;
    username: string;
    normalizedUsername: string;
    email: string;
    normalizedEmail: string;
    passwordHash: string;
    passwordSalt: string;
    isDisabled: boolean;
    isAnonymous: boolean;
    createdAt: Date;
    updatedAt: Date;
    static validUsernameRegex: RegExp;
}
