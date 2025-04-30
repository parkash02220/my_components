import useDebounce from "@/hooks/common/useDebounce";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const useGetAllUsers = () => {
  const [loadingAllUsers,setLoadingAllUsers] = useState(false);
  const [errorAllUsers, setErrorAllUsers] = useState(false);
  const [helperTextAllUsers, setHelperTextAllUsers] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const hasInteracted = useRef(false);
  const [allUsers, setAllUsers] = useState([]);
  const { ref: loadMoreRef, inView } = useInView();

  const handleSearchValueChange = (e) => {
    hasInteracted.current = true;
    setSearchValue(e.target.value);
    setPage(1); 
  };

  const getAllUsersFromBackend = async (signal, search = "",type="pagination") => {
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
      // console.error("::error while getting all users from backend");
      return;
    }

    const data = res?.data;
    const hasMoreUser = (data?.page * data?.limit) < data?.totalUsers;
    setHasMore(hasMoreUser);

    const formattedUsers = convertIdFields(data?.users || []);
    const uniqueUsers = Array.from(
      new Map(formattedUsers.map((user) => [user?.id, user])).values()
    );

    setAllUsers((prev) =>
      type === "search" ? uniqueUsers : [...prev, ...uniqueUsers]
    );
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    setPage(1);
    getAllUsersFromBackend(signal, debouncedSearchValue, "search");

    return () => controller.abort();
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (page > 1) {
      const controller = new AbortController();
      const { signal } = controller;

      getAllUsersFromBackend(signal, debouncedSearchValue, "pagination");

      return () => controller.abort();
    }
  }, [page]);

 
  useEffect(() => {
    if (inView && hasMore && !loadingAllUsers) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loadingAllUsers]);

  return {
    setPage,
    loadMoreRef,
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    handleSearchValueChange,
    setSearchValue,
  };
};

export default useGetAllUsers;
