import React from "react";
import { Route, Switch } from "react-router";

// pages
import NewsFeed from "./pages/NewsFeed";

const App = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" component={NewsFeed} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
