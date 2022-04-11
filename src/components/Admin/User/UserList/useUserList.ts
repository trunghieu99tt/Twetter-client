import { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { Form } from "antd";
import { iUser } from "@type/user.types";
import { useUser } from "../useUser";

const useUserList = () => {
  const [form] = Form.useForm();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalNumber, setTotalNumber] = useState<number>(0);

  const { fetchUsers, deleteUser, forgotPassword, updateUser } = useUser();

  useEffect(() => {
    handleFetchUsers();
  }, []);

  const handleFetchUsers = async () => {
    setLoading(true);
    const { data, total } = await fetchUsers({
      page: pageNumber,
      limit: 1000,
    });
    const filteredData =
      data && data.length > 0 && data.filter((e: iUser) => e.role !== "admin");
    setInitialData(filteredData);
    setTotalNumber(total);
    setData(filteredData);
    setLoading(false);
  };

  const handleSearch = (values: any) => {
    const { name = "", status = "active" } = values;

    const filteredUsers = initialData?.filter((user) => {
      return (
        (user?.name?.toLowerCase()?.includes(name.toLowerCase()) ||
          user?.id === name) &&
        user.status === status
      );
    });
    setTotalNumber(filteredUsers.length);
    setData(filteredUsers);
  };

  const onDelete = (userId: string) => {
    Modal.confirm({
      title: "Xóa người dùng này?",
      content: `Bạn có chắc muốn xóa người dùng này không?`,
      okText: "Xác nhận xóa",
      cancelText: "Hủy",
      onOk: async () => {
        const data = await deleteUser(userId);
        setPageNumber(1);
        console.log(data);
        await handleFetchUsers();
        if (data.statusCode === 200) {
          message.success("Xóa người dùng thành công");
        } else {
          message.error("Đã xảy ra lỗi. Xin thử lại sau");
        }
      },
    });
  };

  const resetPassword = async (email: string) => {
    await forgotPassword(email);
  };

  const changeUserStatus = async (userId: string, status = "banned") => {
    await updateUser(userId, {
      status,
    });
    handleFetchUsers();
  };

  const handleSort = async (sortBy: string, isAsc = true) => {
    const newData = initialData.sort((a: any, b: any) => {
      switch (sortBy) {
        case "name":
          return isAsc
            ? a.name.length - b.name.length
            : b.name.length - a.name.length;
        case "followers":
          return isAsc
            ? a.followers.length - b.followers.length
            : b.followers.length - a.followers.length;
        case "following":
          return isAsc
            ? a.following.length - b.following.length
            : b.following.length - a.following.length;
        default:
          return a.length - b.length;
      }
    });
    setData(newData);
  };

  const handleChangeTable = (
    pagination: any,
    filters: any,
    sorter: any,
    extra: any
  ) => {
    let isAsc = true;
    if (sorter.order === "descend") {
      isAsc = false;
    }
    if (sorter?.field) {
      handleSort(sorter.field, isAsc);
    }
  };

  const onStatusFilterChange = (status: string) => {
    form.setFieldsValue({
      status,
    });
  };

  return {
    data,
    form,
    pageSize: 10,
    loading,
    totalNumber,

    onDelete,
    handleSearch,
    resetPassword,
    changeUserStatus,
    handleChangeTable,
    onStatusFilterChange,
  };
};

export { useUserList };
