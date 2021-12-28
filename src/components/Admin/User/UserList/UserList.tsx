import cn from "classnames";
import { Link } from "react-router-dom";

// utils

// talons

// components
import { Button, Form, Input, Space, Table, Tag, Select } from "antd";

// styles
import defaultClasses from "./userList.module.css";
import mergeClasses from "@utils/mergeClasses";
import { useUserList } from "./useUserList";
import BaseView from "@layout/Admin/BaseView";

interface Props {
    classes?: object;
}

const UserList = ({ classes: propsClasses }: Props) => {
    const classes = mergeClasses(defaultClasses, propsClasses);

    const {
        data,
        form,
        loading,
        pageSize,
        totalNumber,

        onDelete,
        handleSearch,
        resetPassword,
        changeUserStatus,
        handleChangeTable,
        onStatusFilterChange,
    } = useUserList();

    const columns = [
        {
            title: "Tên",
            dataIndex: "name",
            key: "name",
            width: 200,
            sorter: (a: any, b: any) => NaN,
        },
        {
            title: "Tên",
            dataIndex: "avatar",
            key: "avatar",
            width: 100,
            render: (avatar: string) => (
                <img src={avatar} alt="avatar" className={classes.avatar} />
            ),
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            width: 200,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            width: 150,
        },
        {
            title: "Followers",
            dataIndex: "followers",
            key: "followers",
            width: 100,
            render: (followers: any) => {
                return (
                    <p style={{ textAlign: "center" }}>
                        {followers?.length || 0}
                    </p>
                );
            },
            sorter: (a: any, b: any) => NaN,
        },
        {
            title: "Following",
            dataIndex: "following",
            key: "following",
            width: 100,
            render: (following: any) => {
                return (
                    <p style={{ textAlign: "center" }}>
                        {following?.length || 0}
                    </p>
                );
            },
            sorter: (a: any, b: any) => NaN,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            width: 100,
            render: (status: any) => {
                let color = "volcano";

                switch (status) {
                    case "active":
                        color = "green";
                        break;
                    case "blocked":
                        color = "red";
                        break;
                }

                return (
                    <span>
                        <Tag color={color}>{status}</Tag>
                    </span>
                );
            },
        },
        {
            title: "Số lần bị báo cáo",
            dataIndex: "reportedCount",
            key: "reportedCount",
            width: 100,
        },
        {
            title: "Quyền",
            dataIndex: "role",
            key: "role",
            width: 150,
            render: (role: any) => {
                let color = "volcano";

                switch (role) {
                    case "user":
                        color = "geekblue";
                        break;
                    case "admin":
                        color = "green";
                        break;
                }

                return (
                    <span>
                        <Tag color={color}>{role}</Tag>
                    </span>
                );
            },
        },
        {
            title: "Thao tác",
            key: "action",
            render: (text: any, record: any) => (
                <Space size="middle">
                    <button className={cn(classes.btn, classes.view)}>
                        <a
                            href={`/profile/${record.id}`}
                            target={"_blank"}
                            rel="noreferrer"
                        >
                            View
                        </a>
                    </button>
                    <button
                        className={cn(classes.btn, classes.delete)}
                        onClick={() =>
                            changeUserStatus(
                                record.id,
                                record?.status === "banned"
                                    ? "active"
                                    : "banned"
                            )
                        }
                    >
                        {record?.status === "banned" ? "Unban" : "Ban"}
                    </button>
                    <button
                        className={cn(classes.btn, classes.edit)}
                        onClick={() => resetPassword(record.email)}
                    >
                        Reset password
                    </button>
                    <button
                        className={cn(classes.btn, classes.delete)}
                        onClick={() => onDelete(record.id)}
                    >
                        Delete
                    </button>
                </Space>
            ),
            width: 400,
            fixed: "right" as "right",
        },
    ];

    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <Link to="/user/add">
                    <Button type="primary">Thêm mới</Button>
                </Link>

                <div className={classes.search}>
                    <Form form={form} layout="inline" onFinish={handleSearch}>
                        <Form.Item label="Tìm kiếm theo tên" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="status" label="Status">
                            <Select
                                defaultValue="active"
                                onChange={onStatusFilterChange}
                            >
                                <Select.Option value="banned">
                                    banned
                                </Select.Option>
                                <Select.Option value="active">
                                    active
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Tìm kiếm
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </header>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{
                    pageSize,
                    total: totalNumber,
                    pageSizeOptions: ["10", "20", "30"],
                }}
                onChange={handleChangeTable}
                scroll={{ x: "500px" }}
                loading={loading}
            />
        </div>
    );
};

export default BaseView(UserList);
