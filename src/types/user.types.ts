export interface iUser {
    bio: string;
    _id: string;
    name: string;
    email: string;
    gender: number;
    avatar: string;
    birthday: Date;
    coverPhoto: string;
    isThirdParty?: boolean;
    following: iUser[];
    followers: iUser[];
}