import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import { IoAddCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTaskList } from "../store/slices/todoSlice";

const Home = () => {
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const taskList = useSelector((store) => store.task);

  // fetch tasks
  const fetchTasks = async () => {
    try {
      let url = `${import.meta.env.VITE_BACKEND_URL}/tasks?status=${status}`;
      if (status === "all") {
        url = `${import.meta.env.VITE_BACKEND_URL}/tasks`;
      }

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        dispatch(addTaskList(data?.data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [status, sortBy]);

  return (
    <div className="min-h-screen flex flex-col items-center py-10 md:py-16 lg:py-16">
      <div className="w-[90%] md:w-[80%] lg:w-[65%] mx-auto">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">
          Manage Your Tasks
        </h1>
        {/*Filter Container */}
        <div className="flex flex-row items-center justify-between mb-6 flex-wrap">
          <button
            className="flex flex-row items-center gap-2 cursor-pointer px-4 py-1.5 text-sm bg-blue-500 text-white rounded-sm"
            onClick={() => navigate("/add")}
          >
            <IoAddCircleOutline className="inline-block text-lg" />
            <span> Add Task</span>
          </button>
          <div className="flex flex-row items-center gap-6 ">
            <div>
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-gray-700 mr-2"
              >
                Sort By:
              </label>
              <select
                className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white shadow-sm outline-none sm:w-auto;"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="createdAt">Date</option>
                <option value="title">Name</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-gray-700 mr-2"
              >
                Status:
              </label>
              <select
                onChange={(e) => setStatus(e.target.value)}
                name="status"
                className="w-full outline-none sm:w-auto border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white shadow-sm "
              >
                <option value="all">All</option>
                <option value="todo">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>
          </div>
        </div>
        {/*Task Container */}
        <ul className="flex flex-col items-center justify-center my-8">
          {taskList.length > 0 ? (
            taskList.map((task) => <TaskItem task={task} key={task.id} />)
          ) : (
            <div className="flex flex-col items-center">
              <h1 className="text-lg md:text-xl  mb-6 text-gray-700">
                No Task Found
              </h1>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;
