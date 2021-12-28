import React from "react";
import { Route, Switch } from "react-router";
// talons
import { useSocket } from "socket/useSocket";
import { useApp } from "@talons/useApp";

// pages
import Auth from "@pages/Auth";
import AdminAuth from "@pages/Admin/Auth";
import NotFound from "@pages/NotFound";

// components

// routes
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRouteController from "routes/PrivateRouteController";

const App = () => {
    const {} = useSocket();
    const { isLoading, user } = useApp();

    if (isLoading) return <div>Loading...</div>;
    if (user?._id)
        return (
            <React.Fragment>
                <PrivateRouteController />;
            </React.Fragment>
        );

    return (
        <React.Fragment>
            <Switch>
                <PublicRoute path="/auth" exact component={Auth} />
                <PublicRoute path="/admin/auth" exact component={AdminAuth} />
                <Route component={NotFound} />
            </Switch>
        </React.Fragment>
    );
};

export default App;
