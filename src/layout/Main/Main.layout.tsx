import ChatUserList from "@components/Chat/ChatUserList";
import React from "react";
import Header from "./Header";

const MainLayout =
    <P extends object>(WrappedComponent: React.ComponentType<P>) =>
    (props: P) => {
        return (
            <React.Fragment>
                <Header />
                <WrappedComponent {...props} />
                <ChatUserList />
            </React.Fragment>
        );
    };

export default MainLayout;
