import { useHistory } from "react-router";
import client from "../../../api/client";
import { toast } from 'react-toastify';
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";


/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html}
 * that contains social login logic
 *
 * @kind function.
 *
 * @return {{
 * showAlert: func,
 * responseGoogle: func,
 * }}
 */
const useSocialLogin = () => {
    const history = useHistory();
    const queryClient = useQueryClient();

    const showAlert = () => {
        alert(
            "Try Google instead ;). Didn't implemented other social network yet ;)"
        );
    };

    const responseGoogle = async (data: any) => {
        const response = await client.post("/auth/google", {
            tokenId: data.tokenId,
        });
        const accessToken = response?.data?.accessToken;
        const user = response?.data?.user;
        if (user && accessToken) {
            window.localStorage.setItem("accessToken", JSON.stringify(accessToken));
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
            history.push('/');
            toast.success("Login Success");
        }
    };

    return {
        showAlert,
        responseGoogle
    }

}

export { useSocialLogin };