import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
const { default: useDebounce } = require("@/hooks/common/useDebounce");
const { useState, useEffect } = require("react");
const { useInView } = require("react-intersection-observer");
import * as actions from "@/context/Projects/action";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import useAuthStatus from "../common/useAuthStatus";

const useGetAllProjects = () => {
  const { dispatch, state } = useProjectsContext();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [isInitialFetchDone, setIsInitialFetchDone] = useState(false);
  const isSearchLoading = state?.loadingProjects && page === 1;
  const isLoadMoreLoading = state?.loadingProjects && page > 1;
  const loadingAllProjects = state?.loadingProjects;
  const errorAllProjects = !!state?.errorProjects;
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [allProjects, setAllProjects] = useState([]);
  const [totalProjects, setTotalProjects] = useState(0);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { ref: loadMoreRef, inView } = useInView();
  const isLoggedIn = useAuthStatus();
  const handleSearchClear = () => {
    setPage(1);
    setSearchValue("");
    setAllProjects([]);
  };

  const getAllProjectsFromBackend = async ({
    signal,
    search = "",
    page = 1,
    append = false,
  } = {}) => {
    try {
      if (!isLoggedIn) return;
      dispatch({ type: actions.SET_PROJECTS_REQUEST });

      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-board?search=${search}&page=${page}&limit=${pageSize}`,
        method: "GET",
        signal,
      });

      if (res?.error) {
        dispatch({ type: actions.SET_PROJECTS_FAILURE, payload: res?.error });
        return;
      }

      const data = res?.data;
      const hasMoreProjects = data && data.page * data.limit < data.totalBoards;
      setHasMore(hasMoreProjects);
      setTotalProjects(data?.totalBoards || 0);

      const formattedProjects = convertIdFields(data?.boards || []);
      const uniqueProjects = Array.from(
        new Map(formattedProjects.map((proj) => [proj?.id, proj])).values()
      );

      const combinedProjects = append
        ? [...allProjects, ...uniqueProjects]
        : uniqueProjects;
      setAllProjects(combinedProjects);

      dispatch({
        type: actions.SET_PROJECTS_SUCCESS,
        payload: combinedProjects,
      });

      setIsInitialFetchDone(true);
    } catch (error) {
      if (error?.name !== "AbortError") {
        dispatch({
          type: actions.SET_PROJECTS_FAILURE,
          payload: error.message || "Something went wrong",
        });
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setPage(1);
    setAllProjects([]);
    getAllProjectsFromBackend({
      signal,
      search: debouncedSearchValue,
      page: 1,
      append: false,
    });

    return () => controller.abort();
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (page === 1) return;

    const controller = new AbortController();
    const { signal } = controller;

    getAllProjectsFromBackend({
      signal,
      search: debouncedSearchValue,
      page,
      append: page > 1,
    });

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    if (!isLoggedIn) return;
    if (inView && hasMore && !loadingAllProjects) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loadingAllProjects]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  return {
    allProjects,
    isSearchLoading,
    isLoadMoreLoading,
    loadingAllProjects,
    errorAllProjects,
    searchValue,
    handleSearchValueChange,
    setSearchValue,
    setPage,
    loadMoreRef,
    setAllProjects,
    debouncedSearchValue,
    totalProjects,
    getAllProjectsFromBackend,
    hasMore,
    handleSearchClear,
    isInitialFetchDone,
  };
};

export default useGetAllProjects;
