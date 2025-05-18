import { useEffect, useRef, useState } from "react";
import useDebounce from "../common/useDebounce";
import { ApiCall } from "@/utils/ApiCall";
import { convertIdFields } from "@/utils";
import * as actions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";

const useSearchProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");
  const debouncedSearchInputValue = useDebounce(searchInputValue, 500);
  const { dispatch } = useProjectsContext();
  const hasInteracted = useRef(false);
  const handleSearchInputChange = (e) => {
    hasInteracted.current = true;
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    if (!hasInteracted.current) return;
    const controller = new AbortController();
    const { signal } = controller;
    const getSearchBoards = async () => {
      setLoading(true);
      setError(false);
      setHelperText("");

      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board?search=${debouncedSearchInputValue}`,
        method: "GET",
        signal,
      });

      if (res.error) {
        setLoading(false);
        setError(true);
        console.log("::error while getting boards", res);
        return;
      }
      setLoading(false);
      const formattedIdResponse = convertIdFields(res?.data?.boards || []);
      dispatch({
        type: actions.SET_PROJECTS_SUCCESS,
        payload: formattedIdResponse,
      });
    };

    getSearchBoards();

    return () => {
      controller.abort();
    };
  }, [debouncedSearchInputValue]);
  return {
    loadingSearchProject: loading,
    errorSearchProject: error,
    helperTextSearchProject: helperText,
    searchInputValue,
    handleSearchInputChange,
    setSearchInputValue,
  };
};
export default useSearchProject;
