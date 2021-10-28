export interface iUpdateHashtagDTO {
    name: string;
    count: number;
}

export interface iHashtag extends iUpdateHashtagDTO {
    _id: string;
}