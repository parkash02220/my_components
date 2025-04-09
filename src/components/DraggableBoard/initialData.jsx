export const BOARD_SECTIONS = {
  todo: "Todo",
  inProgress: "In progress",
  testing: "Testing",
  done: "Done",
};

import { v4 as uuidv4 } from "uuid";

export const INITIAL_TASKS = [
  {
    id: uuidv4(),
    title: "Title 1",
    description: "Task for todo",
    status: "todo",
    image: "",
    time: "10:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 2",
    description: "Task in progress",
    status: "inProgress",
    image: "",
    time: "1:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 3",
    description: "Testing something",
    status: "testing",
    image: "",
    time: "12:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 4",
    description: "Finished task",
    status: "done",
    image: "",
    time: "11:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 5",
    description: "Task for todo",
    status: "todo",
    image: "",
    time: "10:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 6",
    description: "Task in progress",
    status: "inProgress",
    image: "",
    time: "1:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 7",
    description: "Testing something",
    status: "testing",
    image: "",
    time: "12:00 AM",
  },
  {
    id: uuidv4(),
    title: "Title 8",
    description: "Finished task",
    status: "done",
    image: "",
    time: "11:00 AM",
  },
];
