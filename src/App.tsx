import React, { useEffect } from "react";
import { Route, Switch } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// pages
import Auth from "@pages/Auth";
import Explore from "@pages/Explore";
import NewsFeed from "@pages/NewsFeed";
import BookMarks from "@pages/BookMarks";
import MyProfile from "@pages/MyProfile";

const App = () => {
    const { getMeQuery } = useUser();

    useEffect(() => {
        getMeQuery.refetch();
    }, []);

    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={NewsFeed} />
                <Route path="/profile/:userId" component={MyProfile} />
                <Route path="/bookmarks" exact component={BookMarks} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/explore/:page" component={Explore} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
