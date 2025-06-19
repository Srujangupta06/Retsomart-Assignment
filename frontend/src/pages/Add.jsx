import Form from "../components/Form";
import { getDefaultDueDate } from "../utils/helpers";

const Add = () => {

  // Get the default due date, which is 4 days from today
  const defaultDueDate = getDefaultDueDate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="w-[90%] md:w-[80%] lg:w-[65%] flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">
          Add New Task
        </h1>

        {/*Form Container*/}
        
        <Form
          type="add"
          taskInfo={{
            title: "",
            description: "",
            status: "todo",
            dueDate: defaultDueDate,
          }}
        />
      </div>
    </div>
  );
};

export default Add;
