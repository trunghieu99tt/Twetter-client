import client from "api/client";

export const useVideoCall = () => {
  const getToken = async (channelName: string) => {
    const response = await client.post("/agora/generate-token", {
      channelName,
    });

    return response?.data;
  };

  return {
    getToken,
  };
};
