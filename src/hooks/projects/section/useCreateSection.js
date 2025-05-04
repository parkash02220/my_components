import { useRef, useState } from "react";
import axios from "axios";
import { ApiCall } from "@/utils/ApiCall";
import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import useToast from "@/hooks/common/useToast";

const useCreateSection = (boardId="", setShowAddColumnButton) => {
  const toastId = 'create_section';
  const {showToast} = useToast();
  const [newColumnName, setNewColumnName] = useState("");
  const [loadingCreateColumn,setLoadingCreateColumn] = useState(false);
  const [errorCreateColumn,setErrorCreateColumn] = useState(false);
  const [helperTextCreateColumn,setHelperTextCreateColumn] = useState('');
  const {dispatch} = useAppContext();
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
    setErrorCreateColumn(error);
    setHelperTextCreateColumn(helperText);
  };

  const handleColumnInputKeyDown = (e) => {
     if(e.key==="Enter"){
        handleCreateColumn();
     }
  }

  const handleCreateColumn = async () => {
    const trimmedName = newColumnName.trim();
    if (!trimmedName) return;
    setLoadingCreateColumn(true);
    const res = await ApiCall({
        url:`${process.env.NEXT_PUBLIC_BASE_URL}/create-custom-section`,
        method:"POST",
        body:{
            boardId,
            name:newColumnName,
        },
    });

    setNewColumnName("");
    setLoadingCreateColumn(false);
    setShowAddColumnButton(true);

    if(res.error){
      showToast({
        toastId,
        type: "error",
        message: "Failed to create the section. Please try again.",
      });
        console.log("::error while creating Column");
        return;
    }

    const data = res?.data;
    const formattedIdResponse = convertIdFields(res?.data?.section);
     dispatch({type:"ADD_COLUMN_TO_SECTION",payload:{section:formattedIdResponse}});
     setShowAddColumnButton(true);
     showToast({
      toastId,
      type: "success",
      message: "Section created successfully.",
    });
  };

  return {loadingCreateColumn,errorCreateColumn,helperTextCreateColumn,newColumnName,handleColumnInputfieldChange,handleColumnInputKeyDown,setNewColumnName};
};

export default useCreateSection;
