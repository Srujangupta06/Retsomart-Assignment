import { useParams } from "react-router-dom";
import Form from "../components/Form";
import { useSelector } from "react-redux";

const Edit = () => {
  const { id } = useParams();
  const taskList = useSelector((store)=>store.task);
  const taskInfo = taskList.find((task) => task.id === id); 

  if(!taskInfo) return <h1>Loading...</h1>;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-xl md:text-2xl font-semibold mb-6 text-gray-700">
          Update Task
        </h1>
        {/*Form Container*/}
        <Form type="edit" taskInfo={taskInfo}/>
      </div>
    </div>
  );
};

export default Edit;
