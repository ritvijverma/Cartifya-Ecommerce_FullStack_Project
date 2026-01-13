import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/Form/CategoryForm";
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Typography,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title } = Typography;

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // ================= CREATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/category/create-category",
        { name }
      );

      if (data.success) {
        toast.success(`${name} created successfully`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // ================= GET =================
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/category/get-category"
      );
      if (data.success) setCategories(data.category);
    } catch (error) {
      toast.error("Failed to load categories");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (slug) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${slug}`
      );
      if (data.success) {
        toast.success("Category deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );

      if (data.success) {
        toast.success("Category updated");
        setVisible(false);
        setSelected(null);
        getAllCategory();
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // ================= TABLE COLUMNS =================
  const columns = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setVisible(true);
              setUpdatedName(record.name);
              setSelected(record);
            }}
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.slug)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 0 }}>
      <Card
        title={
          <Title level={3} style={{ margin: 0 }}>
            📂 Manage Categories
          </Title>
        }
        style={{
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        {/* CREATE CATEGORY */}
        <Space
          direction="vertical"
          size="large"
          style={{ width: "100%" }}
        >
          <CategoryForm
            handleSubmit={handleSubmit}
            value={name}
            setValue={setName}
          />

          {/* CATEGORY TABLE */}
          <Table
            columns={columns}
            dataSource={categories}
            rowKey="_id"
            pagination={{ pageSize: 5 }}
          />
        </Space>
      </Card>

      {/* EDIT MODAL */}
      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        title="Edit Category"
      >
        <CategoryForm
          value={updatedName}
          setValue={setUpdatedName}
          handleSubmit={handleUpdate}
        />
      </Modal>
    </div>
  );
};

export default CreateCategory;
