import Form from "../components/Form";

const Add = () => {

  const today = new Date();
  const futureDate = new Date(today);
  futureDate.setDate(today.getDate() + 4);
  const defaultDueDate = `${futureDate.getFullYear()}-${String(
    futureDate.getMonth() + 1
  ).padStart(2, "0")}-${String(futureDate.getDate()).padStart(2, "0")}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="w-[90%] md:w-[80%] lg:w-[65%] flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">
          Add New Task
        </h1>
        {/*Form */}
        <Form
          type="add"
          taskInfo={{
            title: '',
            description: '',
            status: "todo",
            dueDate: defaultDueDate,
          }}
        />
      </div>
    </div>
  );
};

export default Add;
