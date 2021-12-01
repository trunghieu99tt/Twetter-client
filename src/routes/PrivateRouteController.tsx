import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";

// talons
import { useRooms } from "@talons/useRoom";
import { useStory } from "@talons/useStory";
import { useNotify } from "@talons/useNotify";
import { useHashtag } from "@talons/useHashtag";
import { useAppContext } from "@context/app.context";

// pages
import Chat from "@pages/Chat";
import Call from "@pages/Call";
import Search from "@pages/Search";
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
import Notification from "@pages/Notification";
import TweetDetail from "@pages/Tweet/TweetDetail";

// components
import PrivateRoute from "@components/routes/PrivateRoute";
import CreateNewGroupChat from "@components/Chat/NewRoomModal";

// routes
import { HASHTAG_ROUTES, STORY_ROUTES } from "./routes";
import { useRecoilValue } from "recoil";
import { callState } from "states/call.state";
import CallModal from "@components/Call/CallModal";

const PrivateRouteController = () => {
    const storyTalons = useStory();
    const notificationTalons = useNotify();
    const hashtagTalons = useHashtag();
    const { getUserRooms } = useRooms();
    const call = useRecoilValue(callState);
    const {
        state: { visibleAddGroupChatModal },
    } = useAppContext();

    useEffect(() => {
        getUserRooms();
    }, []);

    return (
        <React.Fragment>
            {visibleAddGroupChatModal && <CreateNewGroupChat />}
            {call && <CallModal />}
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
                <PrivateRoute path="/call/:roomId" exact component={Call} />
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
        </React.Fragment>
    );
};

export default PrivateRouteController;
