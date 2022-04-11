import { useEffect, useState } from "react";
import { message, Modal } from "antd";
import { Form } from "antd";
import { useReportedTweets } from "./useReportedTweets";

export const useReportedTweetList = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [initialData, setInitialData] = useState<any[]>([]);
  const [totalNumber, setTotalNumber] = useState<number>(0);

  const { getReportedTweets, deleteTweet } = useReportedTweets();

  useEffect(() => {
    handleFetchReportedTweetList();
  }, []);

  const handleFetchReportedTweetList = async () => {
    setLoading(true);
    const reportedTweets = await getReportedTweets();
    setInitialData(reportedTweets);
    setTotalNumber(reportedTweets.length);
    setData(reportedTweets);
    setLoading(false);
  };

  const handleSearch = (values: any) => {
    const { keyword } = values;
    console.log(`keyword`, keyword);
    const filteredTweets = initialData.filter((tweet) => {
      return (
        tweet?.content?.includes(keyword) ||
        tweet?.author?.name?.includes(keyword)
      );
    });
    setTotalNumber(filteredTweets.length);
    setData(filteredTweets);
  };

  const onDelete = (userId: string) => {
    Modal.confirm({
      title: "Xóa tweet này?",
      content: `Bạn có chắc muốn xóa tweet này không?`,
      okText: "Xác nhận xóa",
      cancelText: "Hủy",
      onOk: async () => {
        const data = await deleteTweet(userId);
        setPageNumber(1);
        await handleFetchReportedTweetList();
        if (data.status === 200) {
          message.success("Xóa tweet thành công");
        } else {
          message.error("Đã xảy ra lỗi. Xin thử lại sau");
        }
      },
    });
  };

  const handleSort = async (sortBy: string, isAsc = true) => {
    const newData = initialData.sort((a: any, b: any) => {
      switch (sortBy) {
        case "content":
          return isAsc ? a.content - b.content : b.content - a.content;
        case "author":
          return isAsc
            ? a.author.name - b.author.name
            : b.author.name - a.author.name;
        case "likes":
        case "saved":
        case "retweeted":
          return isAsc
            ? a[sortBy].length - b[sortBy].length
            : b[sortBy].length - a[sortBy].length;
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

  return {
    data,
    form,
    loading,
    pageSize: 10,
    totalNumber,

    onDelete,
    handleSearch,
    handleChangeTable,
  };
};
