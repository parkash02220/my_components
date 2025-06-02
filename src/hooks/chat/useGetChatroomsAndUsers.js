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
const useGetChatroomsAndUsers = () => {
  const toastId = "get_chatroom_and_users";
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch, state } = useChatContext();
  const { activeProject } = useProjectsContext()?.state;
  const projectId = activeProject?.id;
  const { activeUser } = useAppContext()?.state;
  const { page, pageSize, hasMore } = state?.chatWindow;
  const [searchValue, setSearchValue] = useState("");
  const { ref: loadMoreRef, inView } = useInView();
  const debouncedSearchValue = useDebounce(searchValue);
  const handleSearchClear = () => {
    dispatch({ type: actions.CLEAR_CHATWINDOW_DATA });
    setSearchValue("");
  };
  const handleSearchValueChange = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
  };
  const getChatroomsAndUsers = async (
    pageToFetch = page + 1,
    search = "",
    signal
  ) => {
    if (loading) return;
    setLoading(true);
    setError(null);
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-user-chatrooms/${projectId}?search=${search}&page=${pageToFetch}&limit=${pageSize}`,
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

    dispatch({
      type: actions.SET_CHATROOMS_AND_USERS_IN_CHATWINDOW,
      payload: {
        data: formattedIdResponse,
        activeUserId: activeUser?.id,
        page: pageToFetch,
      },
    });
  };

  useEffect(() => {
    if (!projectId) return;
    dispatch({ type: actions.CLEAR_CHATWINDOW_DATA });
    const controller = new AbortController();
    const { signal } = controller;
    getChatroomsAndUsers(1, debouncedSearchValue, signal);

    return () => controller.abort();
  }, [debouncedSearchValue, projectId]);

  useEffect(() => {
    if (inView && hasMore && !loading && projectId) {
      getChatroomsAndUsers(page + 1, debouncedSearchValue);
    }
  }, [inView, hasMore, loading, projectId, debouncedSearchValue]);

  return {
    loading: loading && page === 0,
    loadingMore: loading && page > 0,
    error,
    getChatroomsAndUsers,
    loadMoreRef,
    hasMore,
    page,
    searchValue,
    debouncedSearchValue,
    handleSearchClear,
    handleSearchValueChange,
  };
};
export default useGetChatroomsAndUsers;
