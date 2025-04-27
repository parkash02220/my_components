import useDebounce from "@/hooks/common/useDebounce";
import { convertIdFields } from "@/utils";
import { ApiCall } from "@/utils/ApiCall";
import { useEffect, useRef, useState } from "react";

const useGetAllUsers = () => {
  const [loadingAllUsers, setLoadingAllUsers] = useState(false);
  const [errorAllUsers, setErrorAllUsers] = useState(false);
  const [helperTextAllUsers, setHelperTextAllUsers] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const hasInteracted = useRef(false);
  const [allUsers, setAllUsers] = useState([]);
  const handleSearchValueChange = (e) => {
    hasInteracted.current = true;
    setSearchValue(e.target.value);
  };

  const getAllUsersFromBackend = async (signal, search = "") => {
    setLoadingAllUsers(true);
    setErrorAllUsers(false);
    setHelperTextAllUsers("");

    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-users?search=${search}`,
      method: "GET",
      signal,
    });

    setLoadingAllUsers(false);

    if (res.error) {
      setErrorAllUsers(true);
      console.log("::error while getting all users from backend");
      return;
    }

    const data = res?.data;
    const formattedIdResponse = convertIdFields(data?.users || []);
    const uniqueUsers = Array.from(
      new Map(formattedIdResponse?.map((user) => [user?.id, user])).values()
    );
    setAllUsers(uniqueUsers);
  };

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getAllUsersFromBackend(signal, debouncedSearchValue);

    return () => {
      controller.abort();
    };
  }, [debouncedSearchValue]);

  return {
    allUsers,
    loadingAllUsers,
    errorAllUsers,
    helperTextAllUsers,
    searchValue,
    handleSearchValueChange,
    setSearchValue,
    getAllUsersFromBackend,
  };
};

export default useGetAllUsers;
