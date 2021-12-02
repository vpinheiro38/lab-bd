import { useParams } from "react-router-dom"
import '../stylesheets/components.css'
import TaskPage from "./task_page";

function EditTask() {  
  let params = useParams();

  return (
    <TaskPage
      taskId={params.taskId}
    />
  )
}

export default EditTask;
