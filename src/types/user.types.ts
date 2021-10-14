export interface iUser {
    bio: string;
    _id: string;
    name: string;
    email: string;
    gender: number;
    avatar: string;
    birthday: Date;
    username: string;
    followers: iUser[];
    following: iUser[];
    coverPhoto: string;
    storyAudience: number;
    isThirdParty?: boolean;
}