import { useProjectsContext } from "@/context/Projects/ProjectsContex";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";

const { default: useDebounce } = require("@/hooks/common/useDebounce");
const { useState, useEffect } = require("react");
const { useInView } = require("react-intersection-observer");

const useGetAllUsers = (type = "all", paginationMode = "scroll") => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { ref: loadMoreRef, inView } = useInView();
  const { state } = useProjectsContext();
  const activeProjectId = state?.activeProject?.id;
  const getAllUsersFromBackend = async ({
    signal,
    search = "",
    page = 1,
    append = paginationMode === "scroll",
    pageSize = 10,
  }) => {
    setLoading(true);
    setError(false);
    setHelperText("");
    const url =
      type === "all"
        ? `${process.env.NEXT_PUBLIC_BASE_URL}/get-users?search=${search}&page=${page}&limit=${pageSize}`
        : `${process.env.NEXT_PUBLIC_BASE_URL}/get-users?boardId=${activeProjectId}&search=${search}&page=${page}&limit=${pageSize}`;
    const res = await ApiCall({
      url,
      method: "GET",
      signal,
    });

    if (res?.error) {
      setLoading(false);
      setError(true);
      return;
    }
    setLoading(false);
    const data = res?.data;
    const hasMoreUser = data && data?.page * data?.limit < data?.totalUsers;
    setPage(data?.page);
    setPageSize(data?.limit);
    setHasMore(hasMoreUser);
    setTotalUsers(data?.totalUsers || 0);
    const formattedUsers = convertIdFields(data?.users || []);
    const uniqueUsers = Array.from(
      new Map(formattedUsers.map((user) => [user?.id, user])).values()
    );

    setAllUsers((prev) => {
      const combined = append ? [...prev, ...uniqueUsers] : [...uniqueUsers];
      const deduplicated = Array.from(
        new Map(combined.map((u) => [u.id, u])).values()
      );
      return deduplicated;
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    setAllUsers([]);
    getAllUsersFromBackend({
      signal,
      search: debouncedSearchValue,
      page: 1,
      append: false,
    });

    return () => controller.abort();
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (page <= 1) return;

    const controller = new AbortController();
    const { signal } = controller;

    getAllUsersFromBackend({
      signal,
      search: debouncedSearchValue,
      page,
      pageSize,
      append: paginationMode === "scroll",
    });

    return () => controller.abort();
  }, [page, debouncedSearchValue, pageSize]);

  useEffect(() => {
    if (paginationMode !== "scroll") return;
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  return {
    allUsers,
    loadingAllUsers: loading,
    errorAllUsers: error,
    helperTextAllUsers: helperText,
    searchValue,
    getAllUsersFromBackend,
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
  };
};

export default useGetAllUsers;
