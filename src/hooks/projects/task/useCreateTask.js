import { useRef, useState } from "react";
import axios from "axios";
import { ApiCall } from "@/utils/ApiCall";
import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";

const useCreateTask = (sectionId="", setCreateTaskOpen) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [loadingCreateTask,setLoadingCreateTask] = useState(false);
  const [errorCreateTask,setErrorCreateTask] = useState(false);
  const [helperTextCreateTask,setHelperTextCreateTask] = useState('');
  const {dispatch} = useAppContext();
  const handleTaskInputfieldChange = (e) => {
    const newName = e.target.value;
    let error = false;
    let helperText = "";

    if (!newName.trim()==="") {
      error = true;
      helperText = "Task name cannot be empty";
    } else if (newName.length < 3 || newName.length > 50) {
      error = true;
      helperText = "Task name must be between 3 and 50 characters";
    }
    setNewTaskName(newName);
    setErrorCreateTask(error);
    setHelperTextCreateTask(helperText);
  };

  const handleTaskInputKeyDown = (e) => {
     if(e.key==="Enter"){
        handleCreateTask();
     }
  }

  const handleCreateTask = async () => {
    const trimmedName = newTaskName.trim();
    if (!trimmedName) return;
    setLoadingCreateTask(true);
    const res = await ApiCall({
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/create-task`,
        method:"POST",
        body:{
            section_id:sectionId,
            title:newTaskName,
            description:''
        },
    });

    setNewTaskName("");

    setLoadingCreateTask(false);
    if(res.error){
        console.log("::error while creating task");
        return;
    }

    const data = res?.data;
    console.log("::data in create task",data)

    const formattedIdResponse = convertIdFields(res?.data?.task || []);

     dispatch({type:"ADD_TASK_TO_SECTION",payload:{sectionId,task:formattedIdResponse}});
     setCreateTaskOpen(false);
  };

  return {loadingCreateTask,errorCreateTask,helperTextCreateTask,newTaskName,handleTaskInputfieldChange,handleTaskInputKeyDown,setNewTaskName};
};

export default useCreateTask;
