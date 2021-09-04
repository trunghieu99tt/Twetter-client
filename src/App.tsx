import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router";

// talons
import { useUser } from "@talons/useUser";

// pages
import Auth from "@pages/Auth";
import NotFound from "@pages/NotFound";

// routes
import PublicRoute from "@components/routes/PublicRoute";
import PrivateRouteController from "routes/PrivateRouteController";

const App = () => {
    const { user, getMeQuery } = useUser();
    const history = useHistory();

    useEffect(() => {
        const windowHref = window.location.href;
        if (!user?._id) {
            if (!windowHref.includes("auth")) {
                history.push("/auth");
            }
        } else {
            if (windowHref.includes("auth")) {
                history.push("/");
            }
        }
    }, [user]);

    if (getMeQuery.isLoading) return <div>Loading...</div>;

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
