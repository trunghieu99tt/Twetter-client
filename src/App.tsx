import React from "react";
import { Route, Switch } from "react-router";

// pages
import Auth from "@pages/Auth";
import NewsFeed from "@pages/NewsFeed";
import BookMarks from "@pages/BookMarks";
import MyProfile from "@pages/MyProfile";
import { useUser } from "@talons/useUser";
import { useEffect } from "react";

const App = () => {
    const { getUserQuery } = useUser();

    useEffect(() => {
        getUserQuery.refetch();
    }, []);

    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={NewsFeed} />
                <Route path="/my-profile" exact component={MyProfile} />
                <Route path="/bookmarks" exact component={BookMarks} />
                <Route path="/auth" exact component={Auth} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
