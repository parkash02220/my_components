import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";

const { default: useDebounce } = require("@/hooks/common/useDebounce");
const { useState, useEffect } = require("react");
const { useInView } = require("react-intersection-observer");

const useGetAllUsers = () => {
  const [loadingAllUsers, setLoadingAllUsers] = useState(false);
  const [errorAllUsers, setErrorAllUsers] = useState(false);
  const [helperTextAllUsers, setHelperTextAllUsers] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [allUsers, setAllUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const { ref: loadMoreRef, inView } = useInView();

  const getAllUsersFromBackend = async ({
    signal,
    search = "",
    page = 1,
    append = false,
  }) => {
    setLoadingAllUsers(true);
    setErrorAllUsers(false);
    setHelperTextAllUsers("");

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-users?search=${search}&page=${page}&limit=${pageSize}`,
      method: "GET",
      signal,
    });

    setLoadingAllUsers(false);

    if (res?.error) {
      setErrorAllUsers(true);
      return;
    }

    const data = res?.data;
    const hasMoreUser = data && data?.page * data?.limit < data?.totalUsers;
    setHasMore(hasMoreUser);
    setTotalUsers(data?.totalUsers || 0);
    const formattedUsers = convertIdFields(data?.users || []);
    const uniqueUsers = Array.from(
      new Map(formattedUsers.map((user) => [user?.id, user])).values()
    );

    setAllUsers((prev) => (append ? [...prev, ...uniqueUsers] : uniqueUsers));
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setPage(1);
    // setAllUsers([]);
    getAllUsersFromBackend({
      signal,
      search: debouncedSearchValue,
      page: 1,
      append: false,
    });

    return () => controller.abort();
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (page === 1) return;

    const controller = new AbortController();
    const { signal } = controller;

    getAllUsersFromBackend({
      signal,
      search: debouncedSearchValue,
      page,
      append: true,
    });

    return () => controller.abort();
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loadingAllUsers) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loadingAllUsers]);

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  return {
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    getAllUsersFromBackend,
    handleSearchValueChange,
    setSearchValue,
    setPage,
    loadMoreRef,
    setAllUsers,
    debouncedSearchValue,
    totalUsers,
    hasMore,
    page,
  };
};

export default useGetAllUsers;
