import { iUser } from "@type/user.types";
import React from "react";

// styles
import {
    Wrapper,
    EditItem,
    EditItemLabel,
    EditItemInput,
    EditItemImage,
} from "./EditInfoStyle";

interface Props {
    data: iUser;
}

const EditInfo = ({ data }: Props) => {
    const body = (
        <Wrapper>
            <EditItem>
                <EditItemLabel>Cover Photo</EditItemLabel>
                <EditItemImage src={data?.coverPhoto} />
            </EditItem>
        </Wrapper>
    );

    return <div></div>;
};

export default EditInfo;
