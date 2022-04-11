import client from "api/client";

export const useReportedTweets = () => {
  const getReportedTweets = async () => {
    const response = await client.get("/tweet/reportedTweet");
    return response?.data?.data || [];
  };

  const deleteTweet = async (id: string) => {
    const response = await client.delete(`/tweet/${id}/without-permission`);
    console.log(`response`, response);
    return response;
  };

  return {
    deleteTweet,
    getReportedTweets,
  };
};
