import useToast from "@/hooks/common/useToast";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from '@/context/Projects/action';
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
const { useState } = require("react");

const useUpdateSectionName = (initialName = "",setShowEditTextfield) => {
  const toastId = 'update_section_name';
  const {showToast} = useToast();
    const [columnName, setColumnName] = useState(initialName);
    const [originalName, setOriginalName] = useState(initialName);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState('');
    const { dispatch } = useProjectsContext();
  
    const startEditing = (currentName) => {
      setOriginalName(currentName);
      setColumnName(currentName); 
    };
  
    const cancelEditing = () => {
      setColumnName(originalName);
      setError(false);
      setHelperText('');
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
      setError(error);
      setHelperText(helperText);
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
  
      setLoading(true);
  
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/rename-section/${sectionId}`,
        method: "PATCH",
        body: { name: trimmedName },
      });
  
      
      if (res.error) {
        setLoading(false);
        showToast({toastId,type:"error",message:"Failed to update section name. Please try again."})
        console.log("::error while renaming column", res.error);
        return;
      }
      setLoading(false);
      dispatch({ type: actions.UPDATE_SECTION_NAME, payload: { sectionId:sectionId,newName:trimmedName } });
  
      setOriginalName(trimmedName);
      setShowEditTextfield(false);
    };
  
    return {
      columnName,
      loadingUpdateColumnName:loading,
      errorUpdateColumnName:error,
      helperTextUpdateColumnName:helperText,
      setColumnName,
      handleColumnNameInputfieldChange,
      handleColumnInputKeyDown,
      handleUpdateColumnName,
      startEditing,
      cancelEditing,
    };
  };
  export default useUpdateSectionName;