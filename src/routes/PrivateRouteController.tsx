import { Route, Switch } from "react-router-dom";

// talons
import { useRoom } from "@talons/useRoom";
import { useStory } from "@talons/useStory";
import { useNotify } from "@talons/useNotify";
import { useHashtag } from "@talons/useHashtag";

// pages
import Chat from "@pages/Chat";
import HashTag from "@pages/HashTag";
import Explore from "@pages/Explore";
import NotFound from "@pages/NotFound";
import NewsFeed from "@pages/NewsFeed";
import StoryForm from "@pages/Story/Form";
import MyProfile from "@pages/MyProfile";
import BookMarks from "@pages/BookMarks";
import UserMedia from "@pages/UserMedia";
import UserLikes from "@pages/UserLikes";
import StoryView from "@pages/Story/View";
import TweetDetail from "@pages/Tweet/TweetDetail";

// components
import PrivateRoute from "@components/routes/PrivateRoute";

// routes
import { HASHTAG_ROUTES, STORY_ROUTES } from "./routes";
import { useEffect } from "react";
import Notification from "@pages/Notification";
import Search from "@pages/Search";

const PrivateRouteController = () => {
    const storyTalons = useStory();
    const notificationTalons = useNotify();
    const hashtagTalons = useHashtag();
    const { getAllUserRooms } = useRoom();

    useEffect(() => {
        getAllUserRooms();
    }, []);

    return (
        <Switch>
            <PrivateRoute path="/" exact component={NewsFeed} />
            <PrivateRoute
                path={STORY_ROUTES.CREATE}
                exact
                component={StoryForm}
            />
            <PrivateRoute
                path={`${STORY_ROUTES.VIEW}/:userId`}
                component={StoryView}
            />
            <PrivateRoute path="/bookmarks" exact component={BookMarks} />
            <PrivateRoute path="/search" exact component={Search} />
            <PrivateRoute
                path="/notifications"
                exact
                component={Notification}
            />
            <PrivateRoute
                path={`${HASHTAG_ROUTES.BASE}/:hashtag`}
                exact
                component={HashTag}
            />
            <PrivateRoute path="/chat/:roomId" exact component={Chat} />
            <PrivateRoute
                path="/profile/media/:userId"
                exact
                component={UserMedia}
            />
            <PrivateRoute
                path="/profile/likes/:userId"
                exact
                component={UserLikes}
            />
            <PrivateRoute path="/profile/:userId" component={MyProfile} />
            <PrivateRoute path="/explore/:page" component={Explore} />
            <PrivateRoute path="/tweet/:tweetId" component={TweetDetail} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRouteController;
