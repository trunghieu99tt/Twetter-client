import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import client from "../../api/client";
import { toast } from "react-toastify";
import { useState } from "react";
import { AUTH_ENDPOINTS } from "constants/auth.constants";
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";
import { useAppContext } from "@context/app.context";
import { useUser } from "@talons/useUser";

type Props = {
  isRegister?: boolean;
};

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that contains authentication logic
 *
 * @kind function.
 *
 * @return {{
 * register: any,
 * handleSubmit: func,
 * }}
 */
const useAuth = ({ isRegister = false }: Props) => {
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const {
    state: { socket },
  } = useAppContext();

  const [gender, setGender] = useState<number>(2);
  const [birthday, setBirthday] = useState<Date>(new Date());
  const [visibleForgotPasswordForm, setVisibleForgotPasswordForm] =
    useState<boolean>(false);

  const onSubmit = async (formData: any) => {
    if (!isRegister) await handleLogin(formData);
    else {
      await handleRegister(formData);
    }
  };

  const checkPassword = (password: string, confirmPassword: string) => {
    return password === confirmPassword;
  };

  const handleLogin = async (formData: any) => {
    try {
      const response = await client.post(AUTH_ENDPOINTS.SIGN_IN, formData);
      const accessToken = response?.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", `"${accessToken}"`);
        queryClient.invalidateQueries(USER_QUERY.GET_ME);
        toast.success("Login successfully");
        history.push("/");
      } else {
        toast.error("Login Failed");
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = async () => {
    const response = await client.post(AUTH_ENDPOINTS.LOG_OUT);
    const message = response?.data?.message;
    localStorage.setItem("accessToken", "");
    socket?.emit("userOff", user);
    history.push("/auth");
    toast.info(message);
    window.location.reload();
  };

  const handleRegister = async (formData: any) => {
    try {
      if (!checkPassword(formData.password, formData.passwordConfirm)) {
        toast.error("Password does not match");
        return;
      }

      const response = await client.post(AUTH_ENDPOINTS.SIGN_UP, {
        ...formData,
        birthday,
      });

      const accessToken = response?.data?.accessToken;

      if (accessToken) {
        localStorage.setItem("accessToken", `"${accessToken}"`);
        queryClient.invalidateQueries(USER_QUERY.GET_ME);
        toast.success("Registered successfully");
        history.push("/");
      }
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const onCloseForgotPasswordForm = () => setVisibleForgotPasswordForm(false);

  const onOpenForgotPasswordForm = () => setVisibleForgotPasswordForm(true);

  return {
    gender,
    register,
    birthday,
    visibleForgotPasswordForm,

    setGender,
    setBirthday,
    handleLogout,
    onOpenForgotPasswordForm,
    onCloseForgotPasswordForm,
    handleSubmit: handleSubmit(onSubmit),
  };
};

export { useAuth };
