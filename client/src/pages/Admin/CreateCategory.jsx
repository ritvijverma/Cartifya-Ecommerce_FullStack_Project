import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CategoryForm from "../../components/Form/CategoryForm";
import { Button, Modal } from 'antd';


const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  //modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const[visible, setVisible] = useState(false)
    const[selected, setSelected] =useState(null)
    const [updatedName, setUpdatedName] = useState("")


  //handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data.success) {
        toast.success(`${name} is created`);
        setName("");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form ");
    }
  };

  // Get all Categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error("Failed to load categories");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };

//delete categories 
const handleDelete = async(slug) =>{
  try{
    const {data} = await axios.delete(`/api/v1/category/delete-category/${slug}`)
    if(data.success){
      toast.success("Category Deleted ")
      getAllCategory(); // refresh list
    }
    else{
      toast.error(data.message)
    }
  }catch(error){
    console.log(error);
  }
}

// update handler
const handleUpdate = async(e) => {
  e.preventDefault()
  try{
    const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
    if(data.success){
      toast.success("category updates successfully")
      getAllCategory();
      setSelected(null);
      setVisible(false)
    }

  }catch(error){
    console.log(error);
  }
}


  useEffect(() => {
    getAllCategory();
  }, []);


  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Manage Categories</h1>
        <CategoryForm
          handleSubmit={handleSubmit}
          value={name}
          setValue={setName}
        />
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">
                  Name
                </th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((c) => (
                <tr
                  key={c._id}
                  className="border-t  hover:bg-gray-100 transition"
                >
                  <td className="px-6 py-4  space-x-3">{c.name}</td>
                  <td className="px-6 py-4 ">
                    <div className="flex  gap-3">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                      // onClick={() => handleUpdate(c._id)}
                      onClick={() => {
                        setVisible(true); 
                        setUpdatedName(c.name);
                        setSelected(c);
                      }}
                      >
                        Edit
                      </button>

                      <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                       onClick={()=> handleDelete(c.slug)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal
        open={visible}
         onCancel={()=>setVisible(false)} 
         footer={null}
                  title="Edit Category"
>
  <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
         </Modal>
      </div>
    </>
  );
};

export default CreateCategory;
