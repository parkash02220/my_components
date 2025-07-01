import useGetAllUsers from "@/hooks/user/useGetAllUsers";
import useGetChatWindowUsers from "@/hooks/chat/useGetChatWindowUsers";
import { getRenderTags } from "./GetRenderTags";
import { getRenderOptions } from "./GetRenderOptions";

export const autocompleteConfigMap = {
  all_users: {
    useHook: useGetAllUsers,
    getFilteredOptions: (result, selected) =>
      result?.allUsers?.filter((u) => !selected?.some((s) => s.id === u.id)),
    selectors: (result) => ({
      options: result?.allUsers,
      loading: result?.loadingAllUsers,
      loadingMore: result?.loadingMoreAllUsers,
      loadMoreRef: result?.loadMoreRef,
      hasMore: result?.hasMore,
      searchValue: result?.searchValue,
      handleSearchValueChange: result?.handleSearchValueChange,
      setSearchValue: result?.setSearchValue,
      resetStates: result?.resetStates,
      hasFetchedOnce: result?.hasFetchedOnce,
      refetchOptions: result?.resetStatesAndFetch,
    }),
    getRenderTag:(screen) => getRenderTags("username",screen),
    getRenderOption: (screen) => getRenderOptions("user_with_avatar", screen),
  },

  chatroom_users: {
    useHook: useGetChatWindowUsers,
    getFilteredOptions: (result, selected) =>
      result?.users?.filter((u) => !selected?.some((s) => s.id === u.id)),
    selectors: (result) => ({
      options: result?.users,
      loading: result?.loading,
      loadingMore: result?.loadingMore,
      loadMoreRef: result?.loadMoreRef,
      hasMore: result?.hasMore,
      searchValue: result?.searchValue,
      handleSearchValueChange: result?.handleSearchValueChange,
      setSearchValue: result?.setSearchValue,
      resetStates: result?.resetStates,
      hasFetchedOnce: result?.hasFetchedOnce,
      refetchOptions: result?.resetStatesAndFetch,
    }),
    getRenderTag:(screen) => getRenderTags("username",screen),
    getRenderOption: (screen) => getRenderOptions("user_with_avatar", screen),
  },
};
