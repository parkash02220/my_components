// "use client"; ← This line is **not** needed here since this file does not directly use hooks or run in the component tree.

import {
  closestCorners,
  getFirstCollision,
  KeyboardCode,
} from "@dnd-kit/core";

const directions = [
  KeyboardCode.Down,
  KeyboardCode.Right,
  KeyboardCode.Up,
  KeyboardCode.Left,
];

export const coordinateGetter = (event, context) => {
  const {
    active,
    droppableRects,
    droppableContainers,
    collisionRect,
  } = context;

  if (!directions.includes(event.code)) return;

  event.preventDefault();
  if (!active || !collisionRect) return;

  const filteredContainers = [];

  droppableContainers.getEnabled().forEach((entry) => {
    if (!entry || entry.disabled) return;

    const rect = droppableRects.get(entry.id);
    if (!rect) return;

    const data = entry.data.current;

    if (data?.type === "Column" && data.children?.length > 0) {
      if (active.data.current?.type !== "Column") return;
    }

    switch (event.code) {
      case KeyboardCode.Down:
        if (active.data.current?.type === "Column") return;
        if (collisionRect.top < rect.top) filteredContainers.push(entry);
        break;
      case KeyboardCode.Up:
        if (active.data.current?.type === "Column") return;
        if (collisionRect.top > rect.top) filteredContainers.push(entry);
        break;
      case KeyboardCode.Left:
        if (collisionRect.left >= rect.left + rect.width)
          filteredContainers.push(entry);
        break;
      case KeyboardCode.Right:
        if (collisionRect.left + collisionRect.width <= rect.left)
          filteredContainers.push(entry);
        break;
      default:
        break;
    }
  });

  const collisions = closestCorners({
    active,
    collisionRect,
    droppableRects,
    droppableContainers: filteredContainers,
    pointerCoordinates: null,
  });

  const closestId = getFirstCollision(collisions, "id");

  if (closestId != null) {
    const newDroppable = droppableContainers.get(closestId);
    const newRect = newDroppable?.rect.current;

    if (newRect) {
      return {
        x: newRect.left,
        y: newRect.top,
      };
    }
  }

  return undefined;
};
