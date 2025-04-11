import { BOARD_SECTIONS } from "./initialData";
import { getTasksByStatus } from "./tasks";

export const initializeBoard = (tasks) => {
  const boardSections = {};

  BOARD_SECTIONS.forEach(({ id }) => {
    boardSections[id] = getTasksByStatus(tasks, id);
  });

  return boardSections;
};

export const findBoardSectionContainer = (boardSections, id) => {
  if (!id) return null;
  if (id.startsWith("bottom-")) {
    const actualId = id.replace("bottom-", "");
    if (actualId in boardSections) {
      return actualId;
    }
  }

  if (id in boardSections) {
    return id;
  }

  const container = Object.keys(boardSections).find((key) =>
    boardSections[key]?.some((item) => item && item._id === id)
  );

  return container;
};
