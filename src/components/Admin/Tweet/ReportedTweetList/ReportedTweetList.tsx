import BaseView from "@layout/Admin/BaseView";
import mergeClasses from "@utils/mergeClasses";
import { Button, Form, Input, Space, Table } from "antd";
import cn from "classnames";
import defaultClasses from "./reportedTweetList.module.css";
import { useReportedTweetList } from "./useReportedTweetList";

interface Props {
  classes?: Record<string, any>;
}

const TweetList = ({ classes: propsClasses }: Props) => {
  const classes = mergeClasses(defaultClasses, propsClasses);

  const {
    data,
    form,
    loading,
    pageSize,
    totalNumber,

    onDelete,
    handleSearch,
    handleChangeTable,
  } = useReportedTweetList();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 150,
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      width: 200,
      render: (content: string) => {
        return <p>{content.slice(0, Math.min(content.length, 20))}</p>;
      },
    },
    {
      title: "Người viết",
      dataIndex: "author",
      key: "author",
      width: 200,
      sorter: (a: any, b: any) => NaN,
      render: (author: any) => {
        return <p>{author?.name || ""}</p>;
      },
    },
    {
      title: "Like",
      dataIndex: "likes",
      key: "likes",
      width: 100,
      sorter: (a: any, b: any) => NaN,
      render: (likes: any) => {
        return <p style={{ textAlign: "center" }}>{likes?.length || 0}</p>;
      },
    },
    {
      title: "Saved",
      dataIndex: "saved",
      key: "saved",
      width: 100,
      sorter: (a: any, b: any) => NaN,
      render: (saved: any) => {
        return <p style={{ textAlign: "center" }}>{saved?.length || 0}</p>;
      },
    },
    {
      title: "Retweeted",
      dataIndex: "retweeted",
      key: "retweeted",
      width: 150,
      sorter: (a: any, b: any) => NaN,
      render: (retweeted: any) => {
        return <p style={{ textAlign: "center" }}>{retweeted?.length || 0}</p>;
      },
    },
    {
      title: "Số lần bị báo cáo",
      dataIndex: "reportedCount",
      key: "reportedCount",
      width: 150,
      sorter: (a: any, b: any) => NaN,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <button className={cn(classes.btn, classes.view)}>
            <a
              href={`/tweet/${record.id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Xem tweet
            </a>
          </button>
          <button
            className={cn(classes.btn, classes.delete)}
            onClick={() => onDelete(record.id)}
          >
            Xóa
          </button>
        </Space>
      ),
      width: 400,
      fixed: "right" as const,
    },
  ];

  return (
    <div className={classes.root}>
      <header className={classes.header}>
        <div className={classes.search}>
          <Form form={form} layout="inline" onFinish={handleSearch}>
            <Form.Item
              label="Tìm kiếm theo tên người viết hoặc nội dung"
              name="keyword"
            >
              <Input />
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

export default BaseView(TweetList);
