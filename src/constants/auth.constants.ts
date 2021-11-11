const prefix = '/auth'

export const AUTH_ENDPOINTS = {
    BASE: prefix,
    SIGN_IN: `${prefix}/signin`,
    SIGN_UP: `${prefix}/signup`,
    LOG_OUT: `${prefix}/logout`,
}

export const AUTH_QUERY = {
    GET_ME: 'GET_ME',
    GET_USER: 'GET_USER',
    GET_POPULAR_USERS: 'GET_POPULAR_USERS',
    GET_LIMITED_POPULAR_USERS: 'LIMITED_POPULAR_USERS',
}

export const GENDER = {
    MALE: 0,
    FEMALE: 1,
    UNKNOWN: 2,
}