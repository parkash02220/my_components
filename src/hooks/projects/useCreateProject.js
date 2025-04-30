import { useAppContext } from "@/context/AppContext";
import useToast from "../common/useToast";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");

const useCreateProject = () => {
  const toastId = "create_project";
  const {showToast} = useToast();
  const [loading, setLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const createProject = async (name) => {
    setLoading(true);
    showToast({toastId,type:"loading",message:"Creating project..."})
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/create-board`,
      method: "POST",
      body: { name },
    });

    setLoading(false);

    if (res.error) {
      showToast({toastId,type:"error",message:"Failed to create project."})
      console.log("::error while creating project", res);
      return;
    }
    setIsCreated(true);
    showToast({toastId,type:"success",message:"Project created successfully."})
  };

  return [loading, isCreated, createProject];
};

export default useCreateProject;
