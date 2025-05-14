export const initialState = {
  projects: [],
  activeProjectId: null,
  activeProject: {},
  activeTask: {},
  activeUser: {
    isAdmin:false,
  },
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
  selectedDrawerItem:{},
  loading: {
    loadingProjects: false,
    loadingActiveProject: false,
    loadingActiveTask: false,
    loadingActiveUser: false,
    loadingNotifications:false,
  },
  error: {
    errorProjects: null,
    errorActiveProject: null,
    errorActiveTask: null,
    errorActiveUser: null,
    errorNotifications:null,
  },
  projectVersion: 0,
};
