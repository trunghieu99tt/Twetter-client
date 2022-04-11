import { v4 as uuid } from "uuid";

export const myProfileRouter = [
  {
    name: "Tweets",
    path: "/profile",
    id: uuid(),
  },
  {
    name: "Media",
    path: "/profile/media",
    id: uuid(),
  },
  {
    name: "Likes",
    path: "/profile/likes",
    id: uuid(),
  },
];

export const newFeedsRouter = [
  {
    name: "Top",
    path: "/explore/top",
    id: uuid(),
  },
  {
    name: "Latest",
    path: "/explore/latest",
    id: uuid(),
  },
  {
    name: "People",
    path: "/explore/people",
    id: uuid(),
  },
  {
    name: "Media",
    path: "/explore/media",
    id: uuid(),
  },
];
