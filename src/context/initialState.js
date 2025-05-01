export const initialState = {
  projects: [],
  activeProjectId: null,
  activeProject: {},
  activeTask: {},
  activeUser: {},
  loading: {
    projects: false,
    activeProject: false,
    activeTask: false,
    activeUser: false,
  },
  error: {
    projects: null,
    activeProject: null,
    activeTask: null,
    activeUser: null,
  },
  projectVersion: 0,
};
