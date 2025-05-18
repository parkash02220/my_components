import { useRef, useState } from "react";
import axios from "axios";
import { ApiCall } from "@/utils/ApiCall";  
import { convertIdFields } from "@/utils";
import useToast from "@/hooks/common/useToast";
import * as actions from '@/context/Projects/action';
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useCreateTask = (sectionId="", setCreateTaskOpen) => {
  const toastId = "create_task";
  const {showToast} = useToast();
  const [newTaskName, setNewTaskName] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [helperText,setHelperText] = useState('');
  const {dispatch} = useProjectsContext();
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
    setError(error);
    setHelperText(helperText);
  };

  const handleTaskInputKeyDown = (e) => {
     if(e.key==="Enter" && !loading){
        handleCreateTask();
     }
  }

  const handleCreateTask = async () => {
    if(loading) return;
    const trimmedName = newTaskName.trim();
    if (!trimmedName) return;
    setLoading(true);
    setError(false);
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

    if(res.error){
      setLoading(false);
      setError(true);
        showToast({toastId,type:"error",message:"Failed to create the task. Please try again."});
        console.log("::error while creating task");
        return;
    }
  setLoading(false);
    const data = res?.data;

    const formattedIdResponse = convertIdFields(data?.task || []);
     dispatch({type:actions.ADD_TASK_TO_SECTION,payload:{sectionId,task:formattedIdResponse}});
     showToast({toastId,type:"success",message:"Task created successfully."});
     setCreateTaskOpen(false);
  };

  return {loadingCreateTask:loading,errorCreateTask:error,helperTextCreateTask:helperText,newTaskName,handleTaskInputfieldChange,handleTaskInputKeyDown,setNewTaskName};
};

export default useCreateTask;
