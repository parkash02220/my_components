import { useAppContext } from "@/context/AppContext";
import * as actions from "@/context/action";
import { ApiCall } from "@/utils/ApiCall";
import useToast from "../common/useToast";
import { useEffect, useRef } from "react";
import { convertIdFields } from "@/utils";
import { useInView } from "react-intersection-observer";

const useNotifications = (open) => {
  const toastId = "get_notification";
  const { showToast } = useToast();
  const { dispatch, state } = useAppContext();
  const { notifications, loading, error } = state;
  const { tab, unReadCount, totalCount, pageSize } = notifications;
  const currentTabData = notifications[tab] || {};
  const { page, hasMore } = currentTabData;
  const { loadingNotifications } = loading;
  const { errorNotifications } = error;
  const { ref: loadMoreRef, inView } = useInView();
  const fetchNotifications = async (isFirstCall = false) => {
    if (loadingNotifications) return;
    dispatch({ type: actions.SET_NOTIFICATIONS_REQUEST });
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-notifications?unseen=${
        notifications?.tab === "unread"
      }&page=${isFirstCall ? 1 : page + 1}&limit=${pageSize}`,
      method: "GET",
    });

    if (res.error) {
      showToast({
        toastId,
        type: "error",
        message: "Failed to load notifications. Please reload page.",
      });
      dispatch({ type: actions.SET_NOTIFICATIONS_FAILURE });
      return;
    }

    const { result } = res?.data;
    const newNotifications = convertIdFields(result?.notifications || []);
    const currentPage = result?.currentPage;
    const totalUnread = result?.totalUnread || 0;
    const totalCount = result?.totalRead + result?.totalUnread || 0;
    const hasMore =
      currentPage * (result?.limit || pageSize) <
      (tab === "all" ? totalCount : totalUnread);
    dispatch({
      type: actions.SET_NOTIFICATIONS_SUCCESS,
      payload: {
        notifications: newNotifications,
        hasMore,
        totalUnread,
        totalCount,
        page: currentPage,
      },
    });
  };

  const clearNotifications = () => {
    dispatch({ type: actions.CLEAR_NOTIFICATIONS });
  };
  useEffect(() => {
    clearNotifications();
    fetchNotifications(true);
  }, [notifications?.tab]);

  useEffect(() => {
    if (inView && open && hasMore && !loadingNotifications) {
      fetchNotifications();
    }
  }, [inView, open, hasMore, loadingNotifications]);
  return {
    notifications: currentTabData?.data || [],
    loadingNotifications,
    errorNotifications,
    fetchNotifications,
    totalCount,
    unReadCount,
    loadMoreRef,
    hasMore,
    clearNotifications,
    page,
  };
};

export default useNotifications;
