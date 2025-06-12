import { useState, useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import useDebounce from "@/hooks/common/useDebounce";
import useToast from "../common/useToast";

const useGetAllUsers = (type = "all", paginationMode = "scroll") => {
  const toastId = "all_users";
  const { showToast } = useToast();
  const { state: projectState } = useProjectsContext();
  const activeProjectId = projectState?.activeProject?.id;

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const hasFetchedOnce = useRef(false);
  const { ref: loadMoreRef, inView } = useInView();

  const fetchUsers = useCallback(
    async ({ page, append, signal }) => {
      setLoading(true);
      setError(false);

      const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/get-users`;
      const query = new URLSearchParams({
        search: debouncedSearchValue,
        page,
        limit: pageSize,
        ...(type !== "all" && { boardId: activeProjectId }),
      });

      const res = await ApiCall({
        url: `${baseUrl}?${query.toString()}`,
        method: "POST",
        body: { role: [] },
        signal,
      });

      if (res.aborted) {
        return;
      }

      if (res?.error) {
        setError(true);
        hasFetchedOnce.current = false;
        setLoading(false);
        showToast({
          toastId,
          type: "error",
          message: res.error?.message || "Failed to get users",
        });
        return;
      }

      const { users, totalUsers: total, page: resPage, limit } = res.data;
      const formattedUsers = convertIdFields(users || []);
      setTotalUsers(total || 0);
      setPage(resPage);
      setPageSize(limit);

      setAllUsers((prev) => {
        const combined = append
          ? [...prev, ...formattedUsers]
          : [...formattedUsers];
        const deduped = Array.from(
          new Map(combined.map((u) => [u.id, u])).values()
        );
        hasFetchedOnce.current = true;
        return deduped;
      });

      setHasMore(resPage * limit < total);
      setLoading(false);
    },
    [activeProjectId, debouncedSearchValue, pageSize, type]
  );

  useEffect(() => {
    const controller = new AbortController();
    fetchUsers({ page: 1, append: false, signal: controller.signal });
    return () => controller.abort();
  }, [debouncedSearchValue, fetchUsers]);

  useEffect(() => {
    if (page <= 1) return;
    const controller = new AbortController();
    fetchUsers({ page, append: true, signal: controller.signal });
    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    if (paginationMode !== "scroll") return;
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading, paginationMode]);

  const handleSearchValueChange = useCallback((e) => {
    setSearchValue(e.target.value);
    setPage(0);
    setAllUsers([]);
    hasFetchedOnce.current = false;
  }, []);

  const resetAndFetch = useCallback(() => {
    setSearchValue("");
    setAllUsers([]);
    setPage(1);
    hasFetchedOnce.current = false;
  }, []);

  return {
    allUsers,
    loadingAllUsers: loading,
    errorAllUsers: error,
    searchValue,
    handleSearchValueChange,
    setSearchValue,
    setPage,
    setPageSize,
    loadMoreRef,
    setAllUsers,
    debouncedSearchValue,
    totalUsers,
    hasMore,
    page,
    pageSize,
    hasFetchedOnce: hasFetchedOnce.current,
    resetAndFetch,
    getAllUsersFromBackend: fetchUsers,
  };
};

export default useGetAllUsers;
