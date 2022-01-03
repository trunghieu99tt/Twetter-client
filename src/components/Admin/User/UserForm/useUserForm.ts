import { FORM_TYPE } from "@type/app.types";
import { Form, message, Modal } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useUser } from "../useUser";

const useUserForm = ({ view }: { view: FORM_TYPE }) => {
    const [form] = Form.useForm();

    const params: { id: string } = useParams();
    const history = useHistory();

    const [user, setUser] = useState<any | null>(null);

    const { addUser, fetchUser, updateUser } = useUser();

    useEffect(() => {
        if (params?.id) {
            handleFetchUser();
        }
    }, [params.id]);

    const handleFetchUser = async () => {
        const id = params?.id;
        if (!id) return;
        const data = await fetchUser(id);
        if (!data) {
            history.push("/users");
            message.error("Không tồn tại người dùng với id này");
        }
        setUser(data);
    };

    const onSubmit = (values: any) => {
        if (view === "ADD") {
            handleAddUser(values);
        } else if (view === "EDIT") {
            Modal.confirm({
                title: "Lưu",
                content: "Bạn có chắc muốn lưu lại tất cả các thay đổi không ?",
                okText: "Lưu",
                cancelText: "Hủy",
                onOk: () => handleUpdateUser(values),
            });
        } else {
            history.push(`/user/edit/${params.id}`);
        }
    };

    const handleAddUser = async (values: any) => {
        if (values.password !== values.passwordConfirm) {
            message.error("Mật khẩu không trùng khớp,  xin kiểm tra lại");
        } else {
            const response = await addUser(values);
            if (response.status === 201) {
                message.success("Them moi thanh cong");
                history.push("/users");
            } else {
                message.error(response.data.message);
            }
        }
    };

    const handleUpdateUser = async (values: any) => {
        const response = await updateUser(params.id, values);
        if (response.status === 200) {
            message.success("Update thành công!");
        } else {
            message.error(response.message);
        }
    };

    const onChange = () => {};

    const handleCancel = () => {
        history.push("/users");
    };

    return {
        form,
        user,
        onSubmit,
        onChange,
        handleCancel,
    };
};

export { useUserForm };
