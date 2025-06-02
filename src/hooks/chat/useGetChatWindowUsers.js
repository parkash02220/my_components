import { useChatContext } from "@/context/Chat/ChatContext";
import useToast from "../common/useToast";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useAppContext } from "@/context/App/AppContext";
import { useEffect, useState } from "react";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import * as actions from "@/context/Chat/action";
import { useInView } from "react-intersection-observer";
import useDebounce from "../common/useDebounce";
const useGetChatWindowUsers = () => {
  const toastId = "get_chatwindow_users";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page,setPage] = useState(0);
  const [pageSize,setPageSize] = useState(10);
  const [hasMore,setHasMore] = useState(false);
  const [totalUsers,setTotalUsers] = useState(0);
  const [users,setUsers] = useState([]);
  const { dispatch, state } = useChatContext();
  const { activeProject } = useProjectsContext()?.state;
  const projectId = activeProject?.id;
  const { activeUser } = useAppContext()?.state;
  const [searchValue, setSearchValue] = useState("");
  const { ref: loadMoreRef, inView } = useInView();
  const debouncedSearchValue = useDebounce(searchValue);

  const resetAllStates = () => {
    setPage(0);
    setUsers([]);
    setHasMore(false);
    setTotalUsers(0);
  }
  const handleSearchClear = () => {
    resetAllStates();
    setSearchValue("");
  };
  const handleSearchValueChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };
  const getChatWindowUsers = async (
    pageToFetch = page + 1,
    search = "",
    signal,
    type="users",
  ) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-user-chatrooms/${projectId}?search=${search}&page=${pageToFetch}&limit=${pageSize}&type=${type}`,
      method: "GET",
      signal,
    });
    if(res.aborted){
      return null;
    }
    if (res.error) {
      setLoading(false);
      setError(res.error);
      showToast({
        toastId,
        type: "error",
        message:
          res?.error?.message ||
          "Something went wrong while getting chatrooms.",
      });
      return;
    }
    setLoading(false);
    const formattedIdResponse = convertIdFields(res?.data || {});
    const {meta,users} = formattedIdResponse;
     setPage(meta?.page || 1);
     setPageSize(meta?.limit || 10);
     setTotalUsers(meta?.totalUsers || 0);
     setHasMore(
      (meta?.page*meta?.limit) < meta?.totalUsers
     )
     if(meta?.page === 1){
      setUsers(users);
     }else{
      setUsers((pre)=> [...pre,...users]);
     }

  };

  useEffect(() => {
    if (!projectId) return;
    resetAllStates();
    const controller = new AbortController();
    const { signal } = controller;
    getChatWindowUsers(1, debouncedSearchValue, signal);

    return () => controller.abort();
  }, [debouncedSearchValue, projectId]);

  useEffect(() => {
    if (inView && hasMore && !loading && projectId) {
      getChatWindowUsers(page + 1, debouncedSearchValue);
    }
  }, [inView, hasMore, loading, projectId, debouncedSearchValue]);

  return {
    users,
    loading: loading && page === 0,
    loadingMore: loading && page > 0,
    error,
    getChatWindowUsers,
    loadMoreRef,
    hasMore,
    page,
    searchValue,
    debouncedSearchValue,
    handleSearchClear,
    handleSearchValueChange,
    setSearchValue,
    resetAllStates,
  };
};
export default useGetChatWindowUsers;
