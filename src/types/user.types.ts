export interface iUser {
    id: string;
    _id: string;
    name: string;
    bio: string;
    avatar: string;
    coverPhoto: string;
    password?: string | null;
    passwordConfirm?: string | null;
    email: string;
    gender: number;
    birthday: Date;
    isThirdParty?: boolean;
    following: iUser[] | string[];
    followers: iUser[] | string[];
}