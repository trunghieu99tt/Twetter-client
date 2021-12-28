import React from "react";

// talons
import { useUserView } from "./useUserView";

// utils
import DataView from "../../DataView";

import BaseView from "@layout/Admin/BaseView";

interface Props {
    classes?: object;
}

const UserView = ({ classes: propsClasses }: Props) => {
    const { user, params, onGoBack, onGoToEdit } = useUserView();

    return (
        <DataView
            data={user}
            onGoBack={onGoBack}
            onGoToEdit={onGoToEdit}
            params={params}
            title="Thông tin tài khoản"
            exculedFields={["password", "__v", "_id", "avatar", "coverPhoto"]}
        />
    );
};

export default BaseView(UserView);
