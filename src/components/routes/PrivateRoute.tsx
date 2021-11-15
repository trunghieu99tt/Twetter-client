import { USER_QUERY } from "constants/user.constants";
import React from "react";
import { useQueryClient } from "react-query";

// Libs
import { Route, Redirect, RouteProps } from "react-router-dom";

// Ok to use any? Investigate further if for some reason this causes issues
interface PropTypes extends RouteProps {
    component: React.ComponentType<any>;
}

/**
 * Private route component, check if user is valid else redirect
 *
 * @param Component
 *  Component to be rendered on the route
 * @param rest
 *  Props passed in
 */
const PrivateRoute: React.FC<PropTypes> = ({
    component: Component,
    ...rest
}) => {
    const user = useQueryClient().getQueryData(USER_QUERY.GET_ME);

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/login" }} />
                )
            }
        />
    );
};

export default PrivateRoute;
