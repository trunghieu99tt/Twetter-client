import { useHistory } from "react-router";
import client from "../../../api/client";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { USER_QUERY } from "constants/user.constants";
import { useEffect } from "react";

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

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");
        if (hasCode) {
            const newUrl = url.split("?code=");
            const code = newUrl[1];
            responseGithub(code);
        }
    }, []);

    const showAlert = () => {
        alert(
            "Try Google instead ;). Didn't implemented other social network yet ;)"
        );
    };

    const responseGoogle = async (data: any) => {
        const response = await client.post("/auth/google", {
            tokenId: data.tokenId,
        });
        handleAuth(response);
    };

    const responseGithub = async (code: string) => {
        const response = await client.post("/auth/github", {
            code,
        });
        handleAuth(response);
    };

    const handleAuth = (response: any) => {
        const accessToken = response?.data?.accessToken;
        const user = response?.data?.user;
        if (user && accessToken) {
            window.localStorage.setItem(
                "accessToken",
                JSON.stringify(accessToken)
            );
            queryClient.invalidateQueries(USER_QUERY.GET_ME);
            history.push("/");
            toast.success("Login Success");
        }
    };

    const githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    const githubRedirectUrl = process.env.REACT_APP_GITHUB_REDIRECT_URL;
    const githubUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=${githubClientID}&redirect_uri=${githubRedirectUrl}`;

    return {
        githubUrl,
        showAlert,
        responseGoogle,
    };
};

export { useSocialLogin };
