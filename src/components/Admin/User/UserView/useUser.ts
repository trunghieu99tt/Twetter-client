import client from "api/client";
import { toast } from "react-toastify";
import { useData } from "../../useData";

const useUser = () => {
  const { deleteOne, fetchList, fetchOne } = useData({
    endpoint: "/user",
  });

  const fetchUsers = async (
    options = {
      page: 1,
      limit: 10,
    }
  ) => {
    const response = await fetchList(options);
    return {
      data: response?.data,
      total: response?.total,
    };
  };

  const fetchUser = async (userID: string) => {
    const response = await client.get(`/user/admin/${userID}`);
    return response.data?.data;
  };

  const addUser = async (data: any) => {
    const response = await client.post("/auth/signup", data);
    return response;
  };

  const deleteUser = async (userID: string) => {
    const response = await deleteOne(userID);
    return response;
  };

  const forgotPassword = async (email: string) => {
    const response = await client.post("/auth/forgot-password", { email });
    if (response?.status === 201) {
      toast.info(`Password reset code sent to ${email}`);
    } else {
      toast.error(`Error sending password reset code to ${email}`);
    }
  };

  const updateUser = async (userID: string, updatedData: any) => {
    const response = await client.patch(`/user/update/${userID}`, updatedData);
    return response?.data;
  };

  return {
    addUser,
    fetchUser,
    fetchUsers,
    updateUser,
    deleteUser,
    forgotPassword,
  };
};

export { useUser };
