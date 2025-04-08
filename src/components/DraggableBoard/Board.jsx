import { BOARD_SECTIONS } from "./initialData";
import { getTasksByStatus } from "./tasks";

export const initializeBoard = (tasks) => {
  const boardSections = {};

  Object.keys(BOARD_SECTIONS).forEach((boardSectionKey) => {
    boardSections[boardSectionKey] = getTasksByStatus(tasks, boardSectionKey);
  });

  return boardSections;
};

export const findBoardSectionContainer = (boardSections, id) => {
  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key]?.some((item) => item && item.id === id)
  );

  return container;
};
