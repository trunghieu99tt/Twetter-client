const prefix = '/user'

export const USER_ENDPOINTS = {
    BASE: prefix,
    GET_ME: `${prefix}/me`,
    FOLLOW: `${prefix}/follow`,
    UPDATE_ME: `${prefix}/update`,
}

export const USER_QUERY = {
    GET_ME: 'GET_ME',
    GET_USER: 'GET_USER',
}

export const GENDER = {
    MALE: 0,
    FEMALE: 1,
    UNKNOWN: 2,
}