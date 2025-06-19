import { useChatContext } from "@/context/Chat/ChatContext";
import useToast from "../common/useToast";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { useAppContext } from "@/context/App/AppContext";
import { useCallback, useEffect, useRef, useState } from "react";
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hasMore, setHasMore] = useState(false);
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const { dispatch, state } = useChatContext();
  const { activeProject } = useProjectsContext()?.state;
  const projectId = activeProject?.id;
  const { activeUser } = useAppContext()?.state;
  const [searchValue, setSearchValue] = useState("");
  const hasFetchedOnce = useRef(false);
  const { ref: loadMoreRef, inView } = useInView();
  const debouncedSearchValue = useDebounce(searchValue);

  const handleSearchValueChange = useCallback((e) => {
    setSearchValue(e.target.value);
    setPage(1);
    setUsers([]);
    hasFetchedOnce.current = false;
  }, []);

  const resetStates = useCallback(() => {
    setSearchValue("");
    setUsers([]);
    setPage(1);
    hasFetchedOnce.current = false;
  }, []);

  const getChatWindowUsers = useCallback(
    async ({ page, signal, type = "users", pageSize }) => {
      if (loading) return;
      setLoading(true);
      setError(null);
      const res = await ApiCall({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-user-chatrooms/${projectId}?search=${debouncedSearchValue}&page=${page}&limit=${pageSize}&type=${type}`,
        method: "GET",
        signal,
      });
      if (res.aborted) {
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
        hasFetchedOnce.current = true;
        return;
      }
      setLoading(false);
      const formattedIdResponse = convertIdFields(res?.data || {});
      const { meta, users } = formattedIdResponse;
      setPage(meta?.page || 1);
      setPageSize(meta?.limit || 10);
      setTotalUsers(meta?.totalUsers || 0);
      setHasMore(meta?.page * meta?.limit < meta?.totalUsers);
      if (meta?.page === 1) {
        setUsers(users);
      } else {
        setUsers((pre) => [...pre, ...users]);
      }
      hasFetchedOnce.current = true;
      return;
    },
    [debouncedSearchValue, projectId, pageSize,showToast,loading]
  );

  const resetStatesAndFetch = useCallback(() => {
    const controller = new AbortController();
  
    const shouldManuallyFetch = debouncedSearchValue.trim() === "";
  
    resetStates();
  
    if (shouldManuallyFetch) {
      getChatWindowUsers({
        page: 1,
        signal: controller.signal,
        pageSize,
      });
    }
  
  }, [debouncedSearchValue, getChatWindowUsers, resetStates, pageSize]);

  useEffect(() => {
    if (!projectId) return;
    const controller = new AbortController();
    const { signal } = controller;
    getChatWindowUsers({ page: 1, signal, pageSize });

    return () => controller.abort();
  }, [debouncedSearchValue, projectId]);

  useEffect(() => {
    if (!hasFetchedOnce.current) return;

    const controller = new AbortController();

    getChatWindowUsers({
      page,
      signal: controller.signal,
      pageSize,
    });

    return () => controller.abort();
  }, [page, pageSize]);

  useEffect(() => {
    if (inView && hasMore && !loading && projectId) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading, projectId, debouncedSearchValue]);

  return {
    users,
    loading: loading && !hasFetchedOnce.current,
    loadingMore: loading && hasFetchedOnce.current,
    error,
    getChatWindowUsers,
    loadMoreRef,
    hasMore,
    page,
    searchValue,
    debouncedSearchValue,
    handleSearchValueChange,
    setSearchValue,
    resetStates,
    hasFetchedOnce: hasFetchedOnce.current,
    resetStatesAndFetch,
  };
};
export default useGetChatWindowUsers;
