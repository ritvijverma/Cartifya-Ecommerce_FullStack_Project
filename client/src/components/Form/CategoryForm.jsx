import React from "react";
import { Input, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit}>
      <Space direction="vertical" size="middle" style={{ width: "50%" }}>
        <Input
          size="large"
          placeholder="Enter Category Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <Button
          type="primary"
          htmlType="submit"
          icon={<PlusOutlined />}
          block
        >
          Submit
        </Button>
      </Space>
    </form>
  );
};

export default CategoryForm;
