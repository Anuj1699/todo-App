import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./../component/Card";

const TodoPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [task, setTask] = useState([]);
  const [error, setError] = useState("");

  const refId = JSON.parse(localStorage.getItem("user"));
  const id = refId.user._id;

  const taskTodo = task.filter((item) => item.status === "TODO");
  const taskInProgress = task.filter((item) => item.status === "IN PROGRESS");
  const taskCompleted = task.filter((item) => item.status === "COMPLETED");

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/task/addTask",
        { formData, userRef: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const showTask = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/task/getTask/${id}`
      );
      setTask(res.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  showTask();

  useEffect(() => {
    showTask();
  },[formData]);

  const handleDelete = async (taskId) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/task/deleteTask/${taskId}`
      );
      showTask();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      <form
        className="w-full mx-auto bg-amber-100 rounded-md p-3"
        onSubmit={handleTaskSubmit}
      >
        <div className="gap-3 flex flex-col">
          <div className="flex gap-2">
            <label className=" text-xl font-bold flex items-center gap-2">
              Title
            </label>
            <input
              type="text"
              className="rounded-md p-2 w-full"
              placeholder="Enter Title...."
              onChange={handleChange}
              value={formData.title}
              name="title"
            />
          </div>
          <div className="flex gap-2">
            <label className=" text-xl font-bold flex items-center gap-2">
              Description
            </label>
            <textarea
              type="text"
              className="rounded-md p-2 w-full"
              placeholder="Enter Description...."
              onChange={handleChange}
              value={formData.description}
              name="description"
            />
          </div>
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <div className="w-full flex justify-end">
          <button className="p-3 rounded-md bg-amber-500 mt-2">Add</button>
        </div>
      </form>

      <div className="flex gap-3 justify-between p-4 flex-wrap bg-amber-400 h-fit">
        <div className="flex flex-col gap-2">
          <h1 className=" font-bold text-xl">TODO</h1>
          <div className="flex gap-3 flex-col">
            {taskTodo.length === 0 ? (
              <h1 className="text-white">Not Found</h1>
            ) : (
              taskTodo.map((item) => (
                <div key={item._id}>
                  <Card data={item} onDelete={() => handleDelete(item._id)} />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" font-bold text-xl">IN PROGRESS</h1>
          <div>
            {taskInProgress.length === 0 ? (
              <h1 className="text-white">Not Found</h1>
            ) : (
              taskInProgress.map((item) => (
                <div key={item._id}>
                  <Card data={item} onDelete={() => handleDelete(item._id)} />
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className=" font-bold text-xl">COMPLETED</h1>
          <div>
            {taskCompleted.length === 0 ? (
              <h1 className="text-white">Not Found</h1>
            ) : (
              taskCompleted.map((item) => (
                <div key={item._id}>
                  <Card data={item} onDelete={() => handleDelete(item._id)} show={() => showTask()}/>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoPage;
