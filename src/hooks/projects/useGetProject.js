import { useAppContext } from "@/context/AppContext";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useState } from "react";

const useGetProject = (id) => {
  const [loadingGetProject, setLoadingGetProject] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const { dispatch } = useAppContext();

  const getProjectById = async (id) => {
    setLoadingGetProject(true);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board-with-details/${id}`,
      method: "GET",
    });

    setLoadingGetProject(false);
    if (res.error) return;

    const formattedIdResponse = convertIdFields(res?.data?.board || {});
    dispatch({ type: "SET_ACTIVE_PROJECT", payload: formattedIdResponse });

    setProjectData(formattedIdResponse);
  };

  useEffect(() => {
    if (id) getProjectById(id);
  }, [id]);

  return { loadingGetProject, getProjectById, projectData };
};

export default useGetProject;