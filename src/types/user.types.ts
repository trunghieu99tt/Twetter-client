export interface iUser {
    bio: string;
    _id: string;
    name: string;
    email: string;
    gender: number;
    avatar: string;
    birthday: Date;
    username: string;
    coverPhoto: string;
    isThirdParty?: boolean;
    following: iUser[];
    followers: iUser[];
}