import AgoraRTC from "agora-rtc-sdk-ng";
import React, { lazy, memo, Suspense, useEffect } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useAppContext } from "@context/app.context";
import { useRooms } from "@talons/useRoom";
import ReportedTweetList from "@components/Admin/Tweet/ReportedTweetList";
import TweetStatistic from "@components/Admin/Tweet/TweetStatistic";
import UserForm from "@components/Admin/User/UserForm";
import UserList from "@components/Admin/User/UserList";
import UserStatistic from "@components/Admin/User/UserStatistic";
import UserView from "@components/Admin/User/UserView";
import AdminPrivateRoute from "@components/routes/PrivateAdminRoute";
import PrivateRoute from "@components/routes/PrivateRoute";
import BookMarks from "@pages/BookMarks";
import Call from "@pages/Call";
import Chat from "@pages/Chat";
import Explore from "@pages/Explore";
import HashTag from "@pages/HashTag";
import MyProfile from "@pages/MyProfile";
import NewsFeed from "@pages/NewsFeed";
import NotFound from "@pages/NotFound";
import Notification from "@pages/Notification";
import Search from "@pages/Search";
import StoryForm from "@pages/Story/Form";
import StoryView from "@pages/Story/View";
import TweetDetail from "@pages/Tweet/TweetDetail";
import UserLikes from "@pages/UserLikes";
import UserMedia from "@pages/UserMedia";

// components
const CallModal = lazy(() => import("@components/Call/CallModal"));
const CreateNewGroupChat = lazy(() => import("@components/Chat/NewRoomModal"));

// routes
import { HASHTAG_ROUTES, STORY_ROUTES } from "./routes";

// states
import { callState } from "states/call.state";

const PrivateRouteController = () => {
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

  return (
    <React.Fragment>
      {visibleAddGroupChatModal && (
        <Suspense fallback={<div>Loading...</div>}>
          <CreateNewGroupChat />
        </Suspense>
      )}
      {call && (
        <Suspense fallback={<div>Loading...</div>}>
          <CallModal />
        </Suspense>
      )}
      <Switch>
        <PrivateRoute path="/" exact component={NewsFeed} />
        <PrivateRoute path={STORY_ROUTES.CREATE} exact component={StoryForm} />
        <PrivateRoute
          path={`${STORY_ROUTES.VIEW}/:userId`}
          component={StoryView}
        />
        <PrivateRoute path="/bookmarks" exact component={BookMarks} />
        <PrivateRoute path="/search" exact component={Search} />
        <PrivateRoute path="/notifications" exact component={Notification} />
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
        <AdminPrivateRoute exact path="/user/view/:id" component={UserView} />
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

export default memo(PrivateRouteController);
