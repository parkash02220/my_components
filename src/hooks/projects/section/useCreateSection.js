import { useRef, useState } from "react";
import axios from "axios";
import { ApiCall } from "@/utils/ApiCall";
import { convertIdFields } from "@/utils";
import useToast from "@/hooks/common/useToast";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import * as actions from '@/context/Projects/action';
const useCreateSection = (boardId="", setShowAddColumnButton) => {
  const toastId = 'create_section';
  const {showToast} = useToast();
  const [newColumnName, setNewColumnName] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);
  const [helperText,setHelperText] = useState('');
  const {dispatch} = useProjectsContext();
  const handleColumnInputfieldChange = (e) => {
    const newName = e.target.value;
    let error = false;
    let helperText = "";

    if (!newName.trim()==="") {
      error = true;
      helperText = "Section name cannot be empty";
    } else if (newName.length < 3 || newName.length > 50) {
      error = true;
      helperText = "Section name must be between 3 and 50 characters";
    }
    setNewColumnName(newName);
    setError(error);
    setHelperText(helperText);
  };

  const handleColumnInputKeyDown = (e) => {
     if(e.key==="Enter" && !loading){
        handleCreateColumn();
     }
  }

  const handleCreateColumn = async () => {
    if(loading) return;
    const trimmedName = newColumnName.trim();
    if (!trimmedName) return;
    setLoading(true);
    const res = await ApiCall({
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/create-custom-section`,
        method:"POST",
        body:{
            boardId,
            name:newColumnName,
        },
    });

    setNewColumnName("");
    setShowAddColumnButton(true);

    if(res.error){
        setLoading(false);
      showToast({
        toastId,
        type: "error",
        message: "Failed to create the section. Please try again.",
      });
      setError(res.error);
        return;
    }
  setLoading(false);
    const data = res?.data;
    const formattedIdResponse = convertIdFields(res?.data?.section);
     dispatch({type:actions.ADD_COLUMN_TO_SECTION,payload:{section:formattedIdResponse}});
     setShowAddColumnButton(true);
     showToast({
      toastId,
      type: "success",
      message: "Section created successfully.",
    });
  };

  return {loadingCreateColumn:loading,errorCreateColumn:error,helperTextCreateColumn:helperText,newColumnName,handleColumnInputfieldChange,handleColumnInputKeyDown,setNewColumnName};
};

export default useCreateSection;
