import React from "react";
import { Form, Input } from "antd";
import defaultClasses from "./userForm.module.css";
import { FORM_TYPE } from "@type/app.types";
import mergeClasses from "@utils/mergeClasses";
import { useUserForm } from "./useUserForm";
import BaseView from "@layout/Admin/BaseView";

interface Props {
    classes?: object;
    view: FORM_TYPE;
}

const UserForm = ({ classes: propsClasses, view }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const { form, user, handleCancel, onSubmit, onChange } = useUserForm({
        view,
    });

    let title = null;
    let buttonText = null;

    switch (view) {
        case "ADD":
            title = "Thêm thông tin tài khoản";
            buttonText = "Thêm";
            break;
        case "EDIT":
            title = "Sửa thông tin tài khoản";
            buttonText = "Lưu thông tin";
            break;
    }

    return (
        <div className={classes.root}>
            <h2 className={classes.title}>{title}</h2>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                onFinish={onSubmit}
                onValuesChange={onChange}
                form={form}
                initialValues={user || {}}
                key={Math.random()}
            >
                <Form.Item
                    label="Tên người dùng"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập tên người dùng",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Tên tài khoản (username)"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập tên tài khoản",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Mô tả" name="bio">
                    <Input />
                </Form.Item>

                {view === "ADD" && (
                    <React.Fragment>
                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Xin hãy nhập mật khẩu tài khoản",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Xác nhận mật khẩu"
                            name="passwordConfirm"
                            rules={[
                                {
                                    required: true,
                                    message: "Xin hãy xác nhận mật khẩu",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                    </React.Fragment>
                )}
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Xin hãy nhập email",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <div className={classes.btnGroup}>
                    <button type="submit" className={classes.btn}>
                        {buttonText}
                    </button>
                    <button className={classes.btn} onClick={handleCancel}>
                        Hủy
                    </button>
                </div>
            </Form>
        </div>
    );
};

export default BaseView(UserForm);
