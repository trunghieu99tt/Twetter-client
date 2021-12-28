const prefix = "/user";

export const USER_ENDPOINTS = {
    BASE: prefix,
    GET_ME: `${prefix}/me`,
    FOLLOW: `${prefix}/follow`,
    UPDATE_ME: `${prefix}/update`,
    POPULAR_USERS: `${prefix}/popular`,
    REPORT_USER: `${prefix}/report`,
};

export const USER_QUERY = {
    GET_ME: "GET_ME",
    GET_USER: "GET_USER",
    GET_POPULAR_USERS: "GET_POPULAR_USERS",
    GET_LIMITED_POPULAR_USERS: "LIMITED_POPULAR_USERS",
};

export const GENDER = {
    MALE: 0,
    FEMALE: 1,
    UNKNOWN: 2,
};
