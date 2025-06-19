import { useState } from "react";
import toast from "react-hot-toast";
import { MdErrorOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTask } from "../store/slices/todoSlice";
import { IoIosArrowRoundBack } from "react-icons/io";
const Form = (props) => {
  const { type, taskInfo } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [title, setTitle] = useState(taskInfo?.title || "");
  const [description, setDescription] = useState(taskInfo?.description || "");
  const [status, setStatus] = useState(taskInfo?.status || "todo");
  const [dueDate, setDueDate] = useState(taskInfo?.dueDate || "");

  const onHandleFormSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (title.trim().length > 50) {
      setError("Title cannot exceed 50 characters");
    }
    if (description && description.trim().length > 0) {
      const trimmedDesc = description.trim();

      if (trimmedDesc.length < 10) {
        setError("Description must be at least 10 characters long");
      } else if (trimmedDesc.length > 200) {
        setError("Description must be less than 200 characters long");
      }
    }

    if (!error) {
      if (type === "add") {
        createTask();
      } else if (type === "edit") {
        updateTask();
      }
    }
  };

  const createTask = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/tasks`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status, dueDate }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data?.message || "Successfully Created Task", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });
        dispatch(addTask(data?.data));
        setTitle("");
        setDescription("");
        setStatus("todo");
        setDueDate(taskInfo.dueDate);
        // Redirect to home page or clear form
      } else {
        const data = await response.json();
        toast.error(data?.message || "Failed to create task", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 5000,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateTask = async () => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskInfo.id}`;
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status, dueDate }),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data?.message || "Successfully Updated Task", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });
      } else {
        const data = await response.json();
        toast.error(data?.message || "Failed to update task", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 5000,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <form
        className="border border-gray-200 shadow-md w-[50%] p-6 rounded-md"
        onSubmit={onHandleFormSubmit}
        autoComplete="off"
      >
        <div className="mb-4">
          <label
            htmlFor="taskTitle"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            required
            id="taskTitle"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value), setError(null);
            }}
            placeholder="Enter task name"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-sm"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="taskDescription"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="taskDescription"
            value={description}
            placeholder="Enter task description"
            rows={4}
            onChange={(e) => {
              setDescription(e.target.value);
              setError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm resize-none"
          ></textarea>
        </div>
        {type === "edit" && (
          <div className="mb-4">
            <label className="block text-md font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={status}
              id="status"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="todo" selected={type === "add" ? true : false}>
                Not Started
              </option>
              <option value="in_progress">In Progress</option>
              <option value="done">Completed</option>
            </select>
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="dueDate"
            className="block text-md font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={(e) => {
              setDueDate(e.target.value), setError(null);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {type === "add" && (
            <span className="text-sm text-gray-500 mt-1 block">
              Defaults to 4 days from date of creation
            </span>
          )}
        </div>

        {error && (
          <div className="flex flex-row items-center gap-1 mb-2">
            <MdErrorOutline className="text-md text-red-700" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button className="flex flex-row items-center gap-2 w-full justify-center cursor-pointer px-4 py-1.5 text-sm bg-blue-500 text-white rounded-sm">
          {type === "add" ? "Add Task" : "Update Task"}
        </button>
      </form>
      <Link to="/home" className="text-blue-500 my-4 underline">
        <IoIosArrowRoundBack className="inline-block text-xl mr-1" />
        <span>Back to Home</span>
      </Link>
    </>
  );
};

export default Form;
