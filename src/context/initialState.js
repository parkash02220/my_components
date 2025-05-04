export const initialState = {
  projects: [],
  activeProjectId: null,
  activeProject: {},
  activeTask: {},
  activeUser: {},
  loading: {
    loadingProjects: false,
    loadingActiveProject: false,
    loadingActiveTask: false,
    loadingActiveUser: false,

  },
  error: {
    errorProjects: null,
    errorActiveProject: null,
    errorActiveTask: null,
    errorActiveUser: null,
  },
  projectVersion: 0,
};
