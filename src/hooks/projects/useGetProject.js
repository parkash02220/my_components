import { useAppContext } from "@/context/AppContext";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");

const useGetProject = (id) => {
  const [loadingGetProject, setLoadingGetProject] = useState(false);
  const { dispatch } = useAppContext();
  const getProjectById = async (id) => {
    setLoadingGetProject(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board-with-details/${id}`,
      method: "GET",
    });
    if (res.error) {
      console.log("::error while getting project", res);
      return;
    }
    dispatch({ type: "SET_ACTIVE_PROJECT", payload: res?.data?.board || {} });
  };

  useEffect(() => {
    getProjectById(id);
  }, []);

  return [loadingGetProject, getProjectById];
};

export default useGetProject;
