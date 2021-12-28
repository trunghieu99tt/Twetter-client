import React, { useEffect } from "react";

// utils

// talons
import { useSetRecoilState } from "recoil";
import { useHistory } from "react-router";

// components
import { Form, Input, Button, message } from "antd";

// styles
import classes from "./auth.module.css";
import { useLocalStorage } from "@hooks/useLocalStorage";
import { adminState } from "states/user.state";
import client from "api/client";
import { AUTH_ENDPOINTS } from "constants/auth.constants";
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

interface iLoginForm {
    username: string;
    password: string;
}

const AdminAuth = () => {
    const setAdmin = useSetRecoilState(adminState);
    const [adminToken, setAdminToken] = useLocalStorage("admin-token", false);
    const [token, setToken] = useLocalStorage("accessToken", false);
    const history = useHistory();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (adminToken) {
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
            history.push("/users");
        }
    }, [adminToken]);

    const onFinish = (values: iLoginForm) => {
        handleLogin(values);
    };

    const handleLogin = async (values: iLoginForm) => {
        console.log(`values`, values);
        try {
            const response = await client.post(AUTH_ENDPOINTS.SIGN_IN, values);
            console.log(`response`, response);
            const token = response?.data?.accessToken;
            setAdminToken(token);
            setToken(token);
        } catch (error) {
            message.error("Wrong username or password");
            setAdminToken(null);
        }
    };

    const getUser = async () => {
        try {
            const response = await client.get("/user/me");
            // setAdmin(response.data.data);
        } catch (error) {}
    };

    return (
        <div className={classes.root}>
            <Form
                {...layout}
                name="basic"
                onFinish={onFinish}
                className={classes.form}
            >
                <h2 className={classes.title}>Đăng nhập</h2>
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập username",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập password!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AdminAuth;
