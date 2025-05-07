import { useAppContext } from "@/context/AppContext";
import * as actions from '@/context/action';
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
  const { page, pageSize, unReadCount, totalCount, hasMore } = notifications;
  const { loadingNotifications } = loading;
  const { errorNotifications } = error;
  const { ref: loadMoreRef, inView } = useInView();
  const fetchedTabsRef = useRef({});
  const fetchNotifications = async (isFirstCall=false) => {
    if (loadingNotifications) return;

    dispatch({ type: actions.SET_NOTIFICATIONS_REQUEST });
  console.log("::is first call",isFirstCall)
    const res = await ApiCall({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/get-notifications?unseen=${notifications?.tab === "unread"}&page=${isFirstCall ? 1 : (page + 1)}&limit=${pageSize}`,
      method: "GET",
    });

    if (res.error) {
      showToast({ toastId, type: "error", message: "Failed to load notifications. Please reload page." });
      dispatch({ type: actions.SET_NOTIFICATIONS_FAILURE });
      return;
    }

    const data = res?.data;
    const newNotifications = convertIdFields(data?.notifications || []);
//     const existingIds = new Set((notifications[notifications.tab] || []).map(n => n.id));
// const filteredNew = newNotifications.filter(n => !existingIds.has(n.id));
    console.log("::new noitifications",newNotifications)
    const currentPage = data?.currentPage;
    const totalUnread = data?.totalUnread || 0;
    const totalCount = (data?.totalRead + data?.totalUnread) || 0;
    const hasMore = (currentPage * data?.limit) < totalCount;
    dispatch({
      type: actions.SET_NOTIFICATIONS_SUCCESS,
      payload: {
        notifications: newNotifications,
        append: true,
        hasMore,
        totalUnread,
        totalCount,
        page: currentPage,
        isFirstCall,
      },
    });
  };

  const clearNotifications = () => {
    fetchedTabsRef.current = {};
    dispatch({type:actions.CLEAR_NOTIFICATIONS})
  }

  useEffect(() => {
    if ( !fetchedTabsRef.current[notifications?.tab]) {
      console.log("::useeffect 1")
      fetchNotifications(true);
      fetchedTabsRef.current[notifications?.tab] = true;
    }
  }, [notifications?.tab]);

  useEffect(() => {
    if (inView && open && hasMore && !loadingNotifications) {
      console.log("::useeffect 2",{inView, open, hasMore, loadingNotifications})
      fetchNotifications();
    }
  }, [inView, open, hasMore, loadingNotifications]);


  return {
    notifications: notifications[notifications?.tab],
    loadingNotifications,
    errorNotifications,
    fetchNotifications,
    totalCount,
    unReadCount,
    loadMoreRef,
    hasMore,
    clearNotifications,
  };
};

export default useNotifications;
