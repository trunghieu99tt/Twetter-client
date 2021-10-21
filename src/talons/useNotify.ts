import {
    QueryFunctionContext,
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "react-query";

// utils
import client from "api/client";
import { getInfinityList } from "@utils/query";

// context
import { useAppContext } from "@context/app.context";

// constants
import {
    NOTIFICATION_ENDPOINT,
    NOTIFICATION_QUERIES,
} from "constants/notify.constants";
import {
    INFINITY_QUERY_LIST_CONFIG,
} from "constants/config.constant";

// types
import { iNotification, iNotificationDTO } from "@type/notify.types";

const getNotifications = async ({
    pageParam = 0,
}: QueryFunctionContext) => {
    return getInfinityList(`${NOTIFICATION_ENDPOINT.BASE}`, pageParam);
};

const createNotification = async (newNotification: iNotificationDTO) => {
    try {
        const response = await client.post(
            NOTIFICATION_ENDPOINT.BASE,
            newNotification
        );

        return response.data;
    } catch (error: any) {
        console.log(new Date(), "error createNotification: ", error.message);
    }
};

const readNotification = async (notificationIds: string[]) => {
    try {
        const response = await Promise.all(
            notificationIds.map(async (id) => {
                const response = await client.post(
                    `${NOTIFICATION_ENDPOINT.BASE}/${id}`
                );

                return response?.data;
            })
        );

        return response;
    } catch (error: any) {
        console.log(new Date(), "error createNotification: ", error.message);
    }
};

export const useNotify = () => {
    const {
        state: { socket },
    } = useAppContext();
    const queryClient = useQueryClient();

    // create notify
    const createNotificationMutation = useMutation(createNotification);

    // get notifies
    const getNotificationsQuery = useInfiniteQuery(
        NOTIFICATION_QUERIES.GET_NOTIFICATIONS,
        getNotifications,
        INFINITY_QUERY_LIST_CONFIG
    );

    // read notifies
    const readNotificationMutation = useMutation(readNotification);

    const createNotificationAction = (newNotification: iNotificationDTO) => {
        createNotificationMutation.mutate(newNotification, {
            onSuccess: (response) => {
                if (socket) {
                    console.log(`response`, response);
                    if (response) {
                        socket.emit("createNotification", {
                            ...response,
                        });
                    }
                }
            },
        });
    };

    const readNotificationAction = (notificationIds: string[]) => {
        readNotificationMutation.mutate(notificationIds, {
            onSuccess: () => {
                queryClient.invalidateQueries(
                    NOTIFICATION_QUERIES.GET_NOTIFICATIONS
                );
            },
        });
    };

    const notifications: iNotification[] = getNotificationsQuery?.data?.pages?.reduce(
        (res: iNotification[], curr: {
            data: iNotification[];
            total: number;
        }) => [...res, ...curr.data],
        []
    ) || [];

    return {
        notifications,
        readNotificationAction,
        createNotificationAction,
    };
};
