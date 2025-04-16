import { useAppContext } from "@/context/AppContext";

const { ApiCall } = require("@/utils/ApiCall");
const { useState, useEffect } = require("react");

const useAllProjects = () => {
  const [loadingProjects, setLoadingProjects] = useState(false);
  const { dispatch } = useAppContext();
  const fetchAllProjects = async () => {
    dispatch({ type: "SET_PROJECTS", payload: [] });
    setLoadingProjects(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board`,
    });

    setLoadingProjects(false);

    if (res.error) {
      return;
    }

    const data = res.data;
    dispatch({ type: "SET_PROJECTS", payload: data?.boards });
  };
  useEffect(() => {
    fetchAllProjects();
  }, []);

  return {loadingProjects, fetchAllProjects};
};

export default useAllProjects;
