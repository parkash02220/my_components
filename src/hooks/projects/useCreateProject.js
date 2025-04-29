import { useAppContext } from "@/context/AppContext";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");

const useCreateProject = () => {
  const [loading, setLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const createProject = async (name) => {
    setLoading(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/create-board`,
      method: "POST",
      body: { name },
    });

    setLoading(false);

    if (res.error) {
      console.log("::error while creating project", res);
      return;
    }
    setIsCreated(true);
    console.log("::res for create project",res)
  };

  return [loading, isCreated, createProject];
};

export default useCreateProject;
