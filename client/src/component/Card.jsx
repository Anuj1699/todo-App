import { useState } from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import axios from "axios";

const Card = ({ data, onDelete, show }) => {
  const [openClose, setOpenClose] = useState(false);
  const [formData, setFormData] = useState({
    title: data.title,
    description: data.description,
    status: data.status,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async() => {
    try {
      const res = await axios.patch(`http://localhost:3000/api/task/updateTask/${data._id}`,formData,{
        headers: {
          "Content-Type": "application/json"
        }
      })
      show();
    } catch (error) {
      console.log(error);
    }
  }

  const renderStatusIcon = () => {
    switch (formData.status) {
      case "IN PROGRESS":
        return <div className="bg-yellow-500 w-5 h-5 rounded-full"></div>;
      case "COMPLETED":
        return <div className="bg-green-500 w-5 h-5 rounded-full"></div>;
      default:
        return <div className="bg-gray-500 w-5 h-5 rounded-full"></div>;
    }
  };

  return (
    <div>
      <div className="flex flex-col max-w-80 p-3 bg-white border border-gray-200 rounded-lg relative min-h-60">
        <div className="flex items-center justify-between gap-3 overflow-hidden">
          <div className="w-3/4">
            <input
              type="text"
              name="title"
              value={formData.title}
              className="font-bold text-2xl w-3/4 outline-none bg-white"
              disabled={openClose}
              onChange={handleChange}
            />
          </div>
          <MdModeEdit
            className="cursor-pointer"
            size={18}
            onClick={() => {
              setOpenClose(!openClose);
            }}
          />

          {renderStatusIcon()}

          <GoCheckCircleFill
            size={20}
            className="cursor-pointer"
            onClick={handleUpdate}
          />
        </div>
        <div>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            className="bg-white font-normal text-xl outline-none w-full resize-none"
            disabled={openClose}
            onChange={handleChange}
          />
        </div>
        <div className="absolute bottom-0 left-0 p-2">
          <select
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="TODO">TODO</option>
            <option value="IN PROGRESS">IN PROGRESS</option>
            <option value="COMPLETED">COMPLETED</option>
          </select>
        </div>
        <div className="absolute bottom-0 right-0 p-2">
          <MdDelete size={20} className="cursor-pointer" onClick={() => onDelete(data._id)}/>
        </div>
      </div>
    </div>
  );
};

export default Card;
