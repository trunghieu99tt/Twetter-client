const prefix = '/tweet'

export const TWEET_ENDPOINTS = {
    BASE: prefix,
    RETWEET: `${prefix}/retweet`,
    SAVE_TWEET: `${prefix}/save`,
    REACT_TWEET: `${prefix}/react`,
    GET_USER_TWEETS: `${prefix}/user`,
    LATEST_TWEETS: `${prefix}/latest`,
    POPULAR_TWEETS: `${prefix}/popular`,
    MY_SAVED_TWEETS: `${prefix}/user/saved`,
}

export const TWEET_QUERY = {
    DELETE_TWEET: 'DELETE_TWEET',
    LATEST_TWEETS: 'LATEST_TWEETS',
    GET_MY_TWEETS: 'GET_MY_TWEETS',
    POPULAR_TWEETS: 'POPULAR_TWEETS',
    GET_TWEET_MEDIAS: 'GET_TWEET_MEDIAS',
    CREATE_NEW_TWEET: 'CREATE_NEW_TWEET',
    GET_MY_SAVED_TWEETS: 'GET_MY_SAVED_TWEETS',
    GET_NEWS_FEED_TWEETS: 'GET_NEWS_FEED_TWEETS',
}