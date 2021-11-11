export const MASONRY_CONFIG_BREAKPOINTS = {
    default: 3,
    700: 2,
    500: 1,
};

export const DEFAULT_LIST_LIMIT = 4;
export const USER_LIST_LIMIT = 10;
export const TWEET_LIST_LIMIT = 3;
export const COMMIT_LIST_LIMIT = 2;
export const MESSAGE_LIST_LIMIT = 20;
export const USER_MEDIA_LIST_LIMIT = 10;

export const DEFAULT_LIST_RESPONSE = {
    data: [],
    total: 0
};

export const SORT_STALE_TIME = 60 * 60 * 1000; // 1 hour
export const LONG_STATE_TIME = 60 * 60 * 1000 * 24; // 1 day


export const generateInfinityQueryListConfig = (staleTime = SORT_STALE_TIME, limit = DEFAULT_LIST_LIMIT) => {
    return {
        staleTime,
        getPreviousPageParam: (lastPage: any, pages: any) => {
            return pages.length - 1;
        },
        getNextPageParam: (lastPage: any, pages: any) => {
            const totalPage = lastPage.total / limit;
            return pages.length < totalPage ? pages.length : null;
        }
    };
};