

  export const BOARD_SECTIONS = {
    todo: 'todo',
    'in progress': 'in progress',
    testing: 'testing',
    done: 'done',
  };
  
import { v4 as uuidv4 } from 'uuid';

export const INITIAL_TASKS = [
    {
      id: uuidv4(),
      title: 'Title 1',
      description: 'Task for todo',
      status: 'todo', 
      image: "https://via.placeholder.com/40",
      time: "10:00 AM",
    },
    {
      id: uuidv4(),
      title: 'Title 2',
      description: 'Task in progress',
      status: 'in progress',
      image: "https://via.placeholder.com/40",
      time: "1:00 AM",
    },
    {
      id: uuidv4(),
      title: 'Title 3',
      description: 'Testing something',
      status: 'testing', 
      image: "https://via.placeholder.com/40",
      time: "12:00 AM",
    },
    {
      id: uuidv4(),
      title: 'Title 4',
      description: 'Finished task',
      status: 'done',
      image: "https://via.placeholder.com/40",
      time: "11:00 AM",
    },
  ];