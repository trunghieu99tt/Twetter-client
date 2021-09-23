import { Route, Switch } from "react-router-dom";

// pages
import Chat from "@pages/Chat";
import Explore from "@pages/Explore";
import NotFound from "@pages/NotFound";
import NewsFeed from "@pages/NewsFeed";
import MyProfile from "@pages/MyProfile";
import BookMarks from "@pages/BookMarks";
import UserMedia from "@pages/UserMedia";
import UserLikes from "@pages/UserLikes";

// components
import PrivateRoute from "@components/routes/PrivateRoute";

const PrivateRouteController = () => {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={NewsFeed} />
            <PrivateRoute path="/bookmarks" exact component={BookMarks} />
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
            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRouteController;
