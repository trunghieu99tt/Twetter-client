import MyProfile from "pages/MyProfile";
import React from "react";
import { Route, Switch } from "react-router";

// pages
import NewsFeed from "./pages/NewsFeed";

const App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={NewsFeed} />
                <Route path="/my-profile" exact component={MyProfile} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
