import { v4 as uuidv4 } from "uuid";

export const menu = [
    {
        name: "Home",
        path: "/",
        id: uuidv4(),
    },
    {
        name: "Explore",
        path: "/explore/top",
        submenus: [
            '/explore/latest',
            '/explore/top',
            '/explore/people',
            '/explore/media'
        ],
        id: uuidv4(),
    },
    {
        name: "Bookmarks",
        path: "/bookmarks",
        id: uuidv4(),
    },
];