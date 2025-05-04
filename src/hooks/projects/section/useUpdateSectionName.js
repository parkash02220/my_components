import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";

const { useAppContext } = require("@/context/AppContext");
const { useState } = require("react");

const useUpdateSectionName = (initialName = "",setShowEditTextfield) => {
  const toastId = 'update_section_name';
  const {showToast} = useToast();
    const [columnName, setColumnName] = useState(initialName);
    const [originalName, setOriginalName] = useState(initialName);
    const [loadingUpdateColumnName, setLoadingUpdateColumnName] = useState(false);
    const [errorUpdateColumnName, setErrorUpdateColumnName] = useState(false);
    const [helperTextUpdateColumnName, setHelperTextUpdateColumnName] = useState('');
    const { dispatch } = useAppContext();
  
    const startEditing = (currentName) => {
      setOriginalName(currentName);
      setColumnName(currentName); 
    };
  
    const cancelEditing = () => {
      setColumnName(originalName);
      setErrorUpdateColumnName(false);
      setHelperTextUpdateColumnName('');
    };
  
    const handleColumnNameInputfieldChange = (e) => {
      const newName = e.target.value;
      let error = false;
      let helperText = "";
  
      if (!newName.trim()) {
        error = true;
        helperText = "Section name cannot be empty";
      } else if (newName.length < 3 || newName.length > 50) {
        error = true;
        helperText = "Section name must be between 3 and 50 characters";
      }
  
      setColumnName(newName);
      setErrorUpdateColumnName(error);
      setHelperTextUpdateColumnName(helperText);
    };
  
    const handleColumnInputKeyDown = (e, sectionId) => {
      if (e.key === "Enter") {
        handleUpdateColumnName(sectionId);
      } else if (e.key === "Escape") {
        cancelEditing();
      }
    };
  
    const handleUpdateColumnName = async (sectionId) => {
      const trimmedName = columnName.trim();
      if (!trimmedName || trimmedName === originalName) return;
  
      setLoadingUpdateColumnName(true);
  
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/rename-section/${sectionId}`,
        method: "PATCH",
        body: { name: trimmedName },
      });
  
      setLoadingUpdateColumnName(false);
  
      if (res.error) {
        showToast({toastId,type:"error",message:"Failed to update section name. Please try again."})
        console.log("::error while renaming column", res.error);
        return;
      }

      dispatch({ type: "UPDATE_SECTION_NAME", payload: { sectionId:sectionId,newName:trimmedName } });
  
      setOriginalName(trimmedName);
      setShowEditTextfield(false);
    };
  
    return {
      columnName,
      loadingUpdateColumnName,
      errorUpdateColumnName,
      helperTextUpdateColumnName,
      setColumnName,
      handleColumnNameInputfieldChange,
      handleColumnInputKeyDown,
      handleUpdateColumnName,
      startEditing,
      cancelEditing,
    };
  };
  export default useUpdateSectionName;