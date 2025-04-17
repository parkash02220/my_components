import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";

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
    const formattedIdResponse = convertIdFields(res?.data?.boards || []);
    dispatch({ type: "SET_PROJECTS", payload: formattedIdResponse });
  };
  useEffect(() => {
    fetchAllProjects();
  }, []);

  return {loadingProjects, fetchAllProjects};
};

export default useAllProjects;
