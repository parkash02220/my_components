export const initialState = {
  notifications:{
    all: {
      data:[],
      page:0,
      hasMore:true,
    },
    unread: {
      data:[],
      page:0,
      hasMore:true,
    },
    tab: "all",
    pageSize:10,
    totalCount:0,
    unReadCount:0,
  },
 loadingNotifications:false,
 errorNotifications:null,

};
