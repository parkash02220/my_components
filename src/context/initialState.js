// export const initialState = {
//     projects: {
//       project1: {
//         id: 'project1',
//         name: 'Marketing',
//         columns: {
//           column1: { id: 'column1', title: 'Todo', taskIds: ['task1', 'task2'] },
//           column2: { id: 'column2', title: 'Done', taskIds: [] },
//         },
//         tasks: {
//           task1: { id: 'task1', content: 'Design logo' },
//           task2: { id: 'task2', content: 'Set up email campaign' },
//         },
//         columnOrder: ['column1', 'column2'],
//       },
//       // more projects...
//     },
//     activeProjectId: 'project1',
//   };

export const initialState = {
  projects: [],
  activeProject: {},
  activeProjectId: "project1",
  activeTask:{},
  projectVersion:0,
  activeUser:{},
};
