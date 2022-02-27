import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import AgoraRTC from "agora-rtc-sdk-ng";
import { Route, Switch, useLocation } from "react-router-dom";

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
import CallModal from "@components/Call/CallModal";
import UserList from "@components/Admin/User/UserList";
import UserForm from "@components/Admin/User/UserForm";
import UserView from "@components/Admin/User/UserView";
import PrivateRoute from "@components/routes/PrivateRoute";
import CreateNewGroupChat from "@components/Chat/NewRoomModal";
import UserStatistic from "@components/Admin/User/UserStatistic";
import TweetStatistic from "@components/Admin/Tweet/TweetStatistic";
import AdminPrivateRoute from "@components/routes/PrivateAdminRoute";
import ReportedTweetList from "@components/Admin/Tweet/ReportedTweetList";

// routes
import { HASHTAG_ROUTES, STORY_ROUTES } from "./routes";

// states
import { callState } from "states/call.state";

const PrivateRouteController = () => {
    const notificationTalons = useNotify();
    const hashtagTalons = useHashtag();
    const { getUserRooms } = useRooms();
    const call = useRecoilValue(callState);
    const location = useLocation();
    const {
        state: { visibleAddGroupChatModal },
    } = useAppContext();

    useEffect(() => {
        getUserRooms();
        AgoraRTC.setLogLevel(4);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        console.log("re-rendered PrivateRouteController");
    });

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

                {/* ----------------- USER ----------------------- */}
                <AdminPrivateRoute exact path="/users" component={UserList} />
                <AdminPrivateRoute
                    exact
                    path="/user/view/:id"
                    component={UserView}
                />
                <AdminPrivateRoute
                    exact
                    path="/user/add"
                    component={() => <UserForm view="ADD" />}
                />

                {/* ----------------- TWEET ----------------------- */}
                <AdminPrivateRoute
                    exact
                    path="/reported-tweets"
                    component={ReportedTweetList}
                />

                {/* ----------------- STATISTIC ----------------------- */}
                <AdminPrivateRoute
                    exact
                    path="/statistic/users"
                    component={UserStatistic}
                />

                <AdminPrivateRoute
                    exact
                    path="/statistic/tweet"
                    component={TweetStatistic}
                />

                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
};

export default PrivateRouteController;
