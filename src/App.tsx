import React from "react";
import { Route, Switch } from "react-router";
// talons
import { useSocket } from "socket/useSocket";
import { useApp } from "@talons/useApp";
import { useAppContext } from "@context/app.context";

// pages
import Auth from "@pages/Auth";
import NotFound from "@pages/NotFound";

// components

// routes
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRouteController from "routes/PrivateRouteController";

const App = () => {
    const {} = useSocket();
    const { isLoading, user } = useApp();

    const {
        state: { visibleAddGroupChatModal },
    } = useAppContext();

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
