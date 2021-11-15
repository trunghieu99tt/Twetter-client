import React from "react";
import { Route, Switch } from "react-router";

// pages
import Auth from "@pages/Auth";
import NotFound from "@pages/NotFound";

// routes
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRouteController from "routes/PrivateRouteController";
import { useApp } from "@talons/useApp";
import { useSocket } from "socket/useSocket";

const App = () => {
    const {} = useSocket();
    const { isLoading, user } = useApp();
    if (isLoading) return <div>Loading...</div>;
    if (user?._id) return <PrivateRouteController />;
    return (
        <React.Fragment>
            <Switch>
                <PublicRoute path="/auth" exact component={Auth} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
