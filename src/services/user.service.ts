import { IApiResponse, IGetList } from "@type/api.type";
import { iUser } from "@type/user.types";
import { getInfinityList } from "@utils/query";
import client from "api/client";
import { USER_ENDPOINTS } from "constants/user.constants";
import { UserModel } from "model/user.model";
import { QueryFunctionContext } from "react-query";

export class UserService {
  static parseUser = (user: iUser): iUser | undefined => {
    if (!user) return undefined;
    if (user?.followers?.length > 0) {
      user.followers = user.followers.map(
        (follower) => new UserModel(follower)
      );
    }
    if (user?.following?.length > 0) {
      user.following = user.following.map(
        (following) => new UserModel(following)
      );
    }
    return new UserModel(user).getData();
  };

  static getMe = async (): Promise<iUser | undefined> => {
    const response = await client.get(USER_ENDPOINTS.GET_ME);
    return UserService.parseUser(response?.data?.data);
  };

  static getUser = async ({
    queryKey,
  }: QueryFunctionContext): Promise<iUser | undefined> => {
    const userId = queryKey[1];
    if (!userId) return;
    const response = await client.get(`${USER_ENDPOINTS.BASE}/${userId}`);
    return UserService.parseUser(response?.data?.data);
  };

  static getPopularUsers = async ({
    pageParam = 0,
  }: QueryFunctionContext): Promise<IGetList<iUser>> => {
    return getInfinityList(USER_ENDPOINTS.POPULAR_USERS, pageParam, {
      limit: 10,
    });
  };

  // get 5 most popular users
  static getLimitedPopularUsers = async (): Promise<iUser[]> => {
    const response = await client.get(USER_ENDPOINTS.POPULAR_USERS, {
      params: {
        page: 1,
        limit: 5,
      },
    });
    return response?.data?.data || [];
  };

  static updateUser = async ({
    userId,
    updatedUser,
  }: {
    updatedUser: Partial<iUser>;
    userId: string;
  }): Promise<iUser | void> => {
    if (!userId) return;
    const response = await client.patch(USER_ENDPOINTS.UPDATE_ME, updatedUser);
    return response?.data?.data;
  };

  static followUser = async (
    userId: string
  ): Promise<IApiResponse<iUser> | void> => {
    if (!userId) return;
    const response = await client.post(`${USER_ENDPOINTS.FOLLOW}/${userId}`);
    return response?.data;
  };

  static reportUser = async (userId: string): Promise<iUser | void> => {
    const response = await client.patch(
      `${USER_ENDPOINTS.REPORT_USER}/${userId}`
    );
    return response?.data;
  };
}
