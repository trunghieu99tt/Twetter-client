import ChatUserList from "@components/Chat/SmallRoomList";
import React from "react";
import Header from "./Header";

const MainLayout =
  <P extends Record<string, any>>(WrappedComponent: React.ComponentType<P>) =>
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
