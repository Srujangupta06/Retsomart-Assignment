import { useState, useMemo } from "react";
import { differenceInDays, isPast } from "date-fns";
import { GoClockFill } from "react-icons/go";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeTask } from "../store/slices/todoSlice";
const TaskItem = ({ task }) => {
  const [showDescription, setShowDescription] = useState(false);
  const dispatch = useDispatch();
  const { title, description, status, createdAt, dueDate } = task;
  const navigate = useNavigate();
  const dueMessage = useMemo(() => {
    if (!dueDate) return "";

    const due = new Date(dueDate);
    const today = new Date();

    if (isPast(due) && differenceInDays(due, today) < 0) {
      return "Overdue";
    }

    const daysLeft = differenceInDays(due, today);

    if (daysLeft === 0) return "Due today";
    if (daysLeft === 1) return "1 day left";

    return `${daysLeft} days left`;
  }, [dueDate]);

  const deleteTask = async (id) => {
    try {
      const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/tasks/${id}`;
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        dispatch(removeTask(id));
        toast.success("Task deleted successfully", {
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
        toast.error(data?.message || "Failed to delete task", {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 2000,
        });
      }
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  };

  return (
    <li
      className={`w-full cursor-pointer shadow-md rounded-lg py-2 px-5 mb-6 border-l-4 border-blue-400 `}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
        <h3
          className={`${
            showDescription
              ? "text-md text-blue-500 underline"
              : "text-lg text-gray-800"
          } `}
        >
          {title}
        </h3>
        <span
          className={`text-sm font-semibold ${
            status === "done"
              ? "text-green-600"
              : status === "in_progress"
              ? "text-yellow-600"
              : "text-red-700"
          }`}
        >
          {status === "done"
            ? "Completed"
            : status === "in_progress"
            ? "In Progress"
            : "Not Started"}
        </span>
      </div>

      {showDescription && (
        <>
          <p className="text-gray-800 mb-1 text-sm">
            Description:{" "}
            <span className="font-semibold">
              {description ? description : "No Description"}
            </span>
          </p>
          <p className="text-sm text-gray-800">
            Created:{" "}
            <span className="font-semibold">
              {new Date(createdAt).toDateString()}
            </span>
          </p>
          <div className="my-3 flex items-center">
            <button
              className="flex items-center gap-1 mr-2 bg-blue-500 text-white text-sm px-3 py-1 rounded-sm cursor-pointer"
              onClick={() => {
                navigate(`/edit/${task.id}`);
              }}
            >
              <BiSolidEdit />
              <span>Update</span>
            </button>
            <button
              className="flex items-center gap-1 mr-2 bg-red-700 text-white text-sm px-3 py-1 rounded-sm cursor-pointer"
              onClick={() => {
                confirm("Are you sure you want to delete this task?") &&
                  deleteTask(task.id);
              }}
            >
              <AiFillDelete />
              <span>Delete</span>
            </button>
          </div>
        </>
      )}

      <div className="flex justify-between items-center">
        <span
          className="cursor-pointer text-xs text-blue-500 underline mt-2"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? "View Less" : "View More"}
        </span>
        <p
          className={`text-md flex items-center gap-1 ${
            dueMessage === "Overdue" || dueMessage === "Due today"
              ? "text-red-700"
              : "text-blue-500"
          }`}
        >
          <GoClockFill /> <span>{dueMessage}</span>
        </p>
      </div>
    </li>
  );
};

export default TaskItem;
