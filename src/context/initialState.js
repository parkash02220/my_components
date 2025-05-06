export const initialState = {
  projects: [],
  activeProjectId: null,
  activeProject: {},
  activeTask: {},
  activeUser: {},
  notifications:{
    all: [],
    unread: [],
    tab: "all",
    page: 1,
    hasMore: true,
  },
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
