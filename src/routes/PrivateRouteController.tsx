import { Route, Switch } from "react-router-dom";

// pages
import Explore from "@pages/Explore";
import NewsFeed from "@pages/NewsFeed";
import MyProfile from "@pages/MyProfile";
import BookMarks from "@pages/BookMarks";

// components
import NotFound from "@pages/NotFound";
import PrivateRoute from "@components/routes/PrivateRoute";

const PrivateRouteController = () => {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={NewsFeed} />
            <PrivateRoute path="/profile/:userId" component={MyProfile} />
            <PrivateRoute path="/bookmarks" exact component={BookMarks} />
            <PrivateRoute path="/explore/:page" component={Explore} />
            <Route component={NotFound} />
        </Switch>
    );
};

export default PrivateRouteController;
