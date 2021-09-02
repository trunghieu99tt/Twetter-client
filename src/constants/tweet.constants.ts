const prefix = '/tweet'

export const TWEET_ENDPOINTS = {
    BASE: prefix,
    GET_USER_TWEETS: `${prefix}/user`,
}

export const TWEET_QUERY = {
    DELETE_TWEET: 'DELETE_TWEET',
    GET_MY_TWEETS: 'GET_MY_TWEETS',
    CREATE_NEW_TWEET: 'CREATE_NEW_TWEET',
    GET_NEWS_FEED_TWEETS: 'GET_NEWS_FEED_TWEETS',
}